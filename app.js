/* ==========================================================
   APP — liga a busca à tela
   ========================================================== */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const campo     = $('#busca');
  const fantasma  = $('#fantasma');
  const limpar    = $('#limpar');
  const chipsEl   = $('#chips');
  const listaEl   = $('#resultados');
  const vazioEl   = $('#vazio');
  const statusEl  = $('#status');
  const contadorEl= $('#contador');
  const avisoEl   = $('#aviso');

  const INDICE = prepararIndice(CLASSES_FINAL);
  const POR_PAGINA = 12;           // renderiza poucos de cada vez → busca instantânea
  const SEM_BUSCA_MAX = 8;         // quantos mostrar na tela inicial

  let categoriaAtiva = null;
  let mostrandoTudo = false;
  let ultimoResultado = [];
  let ultimosTermos = [];
  let valorEscolhido = {};         // guarda o número (0–5) escolhido em cada família

  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  /* ------------------ Chips de categoria ------------------ */
  function montarChips() {
    const contagem = {};
    CLASSES_FINAL.forEach(c => contagem[c.cat] = (contagem[c.cat] || 0) + 1);

    const todos = criarChip(null, '✨', 'Tudo', CLASSES_FINAL.length);
    chipsEl.appendChild(todos);
    CATEGORIAS.forEach(cat => chipsEl.appendChild(criarChip(cat.id, cat.icone, cat.nome, contagem[cat.id] || 0)));
    atualizarChips();
  }

  function criarChip(id, icone, nome, n) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.cat = id || '';
    b.innerHTML = `<span aria-hidden="true">${icone}</span>${esc(nome)} <span class="chip-n">${n}</span>`;
    b.addEventListener('click', () => {
      categoriaAtiva = (categoriaAtiva === id) ? null : id;
      atualizarChips();
      executarBusca();
    });
    return b;
  }

  function atualizarChips() {
    chipsEl.querySelectorAll('.chip').forEach(b => {
      const ativo = (b.dataset.cat || null) === categoriaAtiva;
      b.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });
  }

  /* ------------------ Busca ------------------ */
  function executarBusca() {
    const texto = campo.value;
    const { resultados, termos } = buscar(INDICE, texto, categoriaAtiva);
    ultimoResultado = resultados;
    ultimosTermos = termos;
    mostrandoTudo = false;
    limpar.hidden = !texto;
    desenhar();
  }

  function desenhar() {
    const temTexto = campo.value.trim().length > 0;
    const total = ultimoResultado.length;

    if (total === 0) {
      listaEl.innerHTML = '';
      statusEl.innerHTML = '';
      montarVazio();
      vazioEl.hidden = false;
      return;
    }
    vazioEl.hidden = true;

    let limite;
    if (mostrandoTudo) limite = total;
    else limite = temTexto || categoriaAtiva ? POR_PAGINA : SEM_BUSCA_MAX;

    const fatia = ultimoResultado.slice(0, limite);
    listaEl.innerHTML = fatia.map(r => cartao(r.ix.item)).join('');

    /* status */
    let msg;
    if (temTexto) {
      msg = `<span><strong>${total}</strong> ${total === 1 ? 'classe encontrada' : 'classes encontradas'}</span>`;
    } else if (categoriaAtiva) {
      const cat = CATEGORIAS.find(c => c.id === categoriaAtiva);
      msg = `<span>Categoria <strong>${esc(cat.nome)}</strong>: ${total} classes</span>`;
    } else {
      msg = `<span>As mais importantes pra começar. Digite acima pra buscar entre todas.</span>`;
    }
    const restantes = total - fatia.length;
    const botao = restantes > 0
      ? `<button class="ver-tudo" type="button" id="verTudo">Mostrar mais ${restantes}</button>` : '';
    statusEl.innerHTML = msg + botao;
    const vt = $('#verTudo');
    if (vt) vt.addEventListener('click', () => { mostrandoTudo = true; desenhar(); });
  }

  /* ------------------ Cartão ------------------ */
  function nomeAtual(item) {
    if (!item.base) return item.cls;
    const v = valorEscolhido[item.base] ?? item.valores[Math.min(3, item.valores.length - 1)];
    return item.base + v;
  }

  function cartao(item) {
    const cat = CATEGORIAS.find(c => c.id === item.cat);
    const nome = nomeAtual(item);
    const temValores = !!item.base;

    let nomeHtml;
    if (temValores) {
      const v = String(nome).slice(item.base.length);
      nomeHtml = `${destacar(item.base, ultimosTermos)}<span class="valor-sel">${esc(v)}</span>`;
    } else {
      nomeHtml = destacar(nome, ultimosTermos);
    }

    /* seletor de valor */
    let seletor = '';
    if (temValores) {
      const atual = valorEscolhido[item.base] ?? item.valores[Math.min(3, item.valores.length - 1)];
      seletor = `<div class="valores" role="group" aria-label="Escolher o número">
        <span class="valores-rotulo">Escolha o número:</span>
        ${item.valores.map(v => `<button type="button" class="valor-btn" data-base="${esc(item.base)}" data-v="${v}" aria-pressed="${String(v) === String(atual)}">${v}</button>`).join('')}
      </div>`;
    }

    /* demo */
    let demo = '';
    const html = item.demoModelo ? item.demoModelo.replace(/\{C\}/g, nome) : item.demo;
    if (html) {
      demo = `<div class="demo-bloco">
        <p class="demo-rotulo">Como fica:</p>
        <div class="demo" data-demo>${html}</div>
      </div>`;
    }

    /* onde funciona */
    const afeta = (item.afeta || []).map(a => `<span class="tag-el">${esc(a)}</span>`).join('');

    /* dica */
    const extra = item.extra ? `<div class="dica-extra">💡 ${esc(item.extra)}</div>` : '';

    /* família */
    let familia = '';
    if (item.familia) {
      const todosParentes = CLASSES_FINAL.filter(c => c.familia === item.familia && c !== item);
      const parentes = todosParentes.slice(0, 14);
      const sobram = todosParentes.length - parentes.length;
      if (parentes.length) {
        familia = `<div class="familia">
          <p class="familia-titulo">Classes parecidas (clique pra ver):</p>
          <div class="familia-lista">
            ${parentes.map(p => `<button type="button" class="parente" data-buscar="${esc(p.base ? p.base.replace(/-$/, '') : p.cls)}">${esc(p.base || p.cls)}</button>`).join('')}
            ${sobram > 0 ? `<button type="button" class="parente parente-mais" data-buscar="${esc(item.familia.replace(/-todos$/, ''))}">+${sobram} outras</button>` : ''}
          </div>
        </div>`;
      }
    }

    return `<article class="res" role="listitem">
      <div class="res-topo">
        <button type="button" class="res-classe" data-copiar="${esc(nome)}" title="Clique pra copiar">
          <span>${nomeHtml}</span><span class="ico-copiar" aria-hidden="true">⧉ copiar</span>
        </button>
        <span class="res-cat">${cat ? cat.icone + ' ' + esc(cat.nome) : ''}</span>
      </div>
      <p class="res-desc">${destacar(item.desc, ultimosTermos)}</p>
      ${seletor}
      ${demo}
      <div class="info-linha"><span class="info-rotulo">Funciona em:</span>${afeta}</div>
      ${extra}
      ${familia}
    </article>`;
  }

  /* ------------------ Estado vazio ------------------ */
  function montarVazio() {
    const sugs = ['centralizar', 'botão vermelho', 'esconder no celular', 'sombra', 'coluna', 'negrito', 'foto redonda', 'menu'];
    vazioEl.innerHTML = `
      <h2>Nada por aqui… ainda 🔍</h2>
      <p>Não achei nada pra <strong>“${esc(campo.value)}”</strong>${categoriaAtiva ? ' nessa categoria' : ''}.
      Tente uma palavra mais simples ou clique em uma sugestão:</p>
      <div class="sugestoes">
        ${categoriaAtiva ? '<button type="button" class="sugestao" data-tirar-cat>Buscar em todas as categorias</button>' : ''}
        ${sugs.map(s => `<button type="button" class="sugestao" data-buscar="${esc(s)}">${esc(s)}</button>`).join('')}
      </div>`;
  }

  /* ------------------ Cliques (delegação) ------------------ */
  document.addEventListener('click', (e) => {
    const copiar = e.target.closest('[data-copiar]');
    if (copiar) { copiarTexto(copiar.dataset.copiar); return; }

    const vbtn = e.target.closest('.valor-btn');
    if (vbtn) {
      valorEscolhido[vbtn.dataset.base] = vbtn.dataset.v;
      const posicao = window.scrollY;
      desenhar();
      window.scrollTo(0, posicao);
      return;
    }

    const buscarBtn = e.target.closest('[data-buscar]');
    if (buscarBtn) {
      campo.value = buscarBtn.dataset.buscar;
      executarBusca();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      campo.focus();
      return;
    }

    if (e.target.closest('[data-tirar-cat]')) {
      categoriaAtiva = null; atualizarChips(); executarBusca();
    }
  });

  /* Impede que links/botões dentro das demos façam algo (ex: navegar) */
  listaEl.addEventListener('click', (e) => {
    if (e.target.closest('[data-demo]')) {
      const a = e.target.closest('a'); if (a) e.preventDefault();
    }
  });
  listaEl.addEventListener('submit', (e) => e.preventDefault());

  /* ------------------ Copiar ------------------ */
  let timerAviso;
  function copiarTexto(txt) {
    const ok = () => {
      avisoEl.innerHTML = `Copiado: <code>${esc(txt)}</code>`;
      avisoEl.classList.add('mostrar');
      clearTimeout(timerAviso);
      timerAviso = setTimeout(() => avisoEl.classList.remove('mostrar'), 1800);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(ok).catch(() => fallback(txt, ok));
    } else fallback(txt, ok);
  }
  function fallback(txt, ok) {
    const t = document.createElement('textarea');
    t.value = txt; t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(t); ok();
  }

  /* ------------------ Campo de busca ------------------ */
  let debounce;
  campo.addEventListener('input', () => {
    /* imediato: sem esperar, sem botão */
    cancelAnimationFrame(debounce);
    debounce = requestAnimationFrame(executarBusca);
  });
  limpar.addEventListener('click', () => { campo.value = ''; executarBusca(); campo.focus(); });

  document.addEventListener('keydown', (e) => {
    const digitando = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === '/' && !digitando) { e.preventDefault(); campo.focus(); campo.select(); }
    if (e.key === 'Escape' && document.activeElement === campo) {
      if (campo.value) { campo.value = ''; executarBusca(); } else campo.blur();
    }
  });

  /* ------------------ Placeholder que digita sozinho ------------------ */
  const EXEMPLOS = [
    'centralizar um texto', 'botão vermelho', 'esconder no celular', 'deixar em negrito',
    'imagem redonda', 'espaço entre os itens', 'sombra', 'coluna', 'flex', 'menu de navegação',
  ];
  const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animarFantasma() {
    if (reduzido) { fantasma.textContent = 'centralizar um texto'; return; }
    let i = 0, pos = 0, apagando = false;
    (function passo() {
      if (campo.value) { setTimeout(passo, 400); return; }
      const alvo = EXEMPLOS[i];
      if (!apagando) {
        pos++;
        fantasma.textContent = alvo.slice(0, pos);
        if (pos === alvo.length) { apagando = true; return setTimeout(passo, 1500); }
        return setTimeout(passo, 65 + Math.random() * 45);
      } else {
        pos--;
        fantasma.textContent = alvo.slice(0, pos);
        if (pos === 0) { apagando = false; i = (i + 1) % EXEMPLOS.length; return setTimeout(passo, 350); }
        return setTimeout(passo, 28);
      }
    })();
  }

  /* ------------------ Início ------------------ */
  contadorEl.textContent = `${CLASSES_FINAL.length} classes`;
  montarChips();
  executarBusca();
  animarFantasma();
  campo.focus({ preventScroll: true });
})();
