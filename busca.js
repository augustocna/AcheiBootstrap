/* ==========================================================
   MOTOR DE BUSCA
   - ignora acentos e maiúsculas
   - entende sinônimos ("centralizar" acha "center", "mx-auto"…)
   - tolera erro de digitação ("botao", "butom", "marjem")
   - dá mais peso pra quem começa igual e pra nome exato
   ========================================================== */

/* Classes fundamentais: ganham um empurrãozinho quando há empate,
   pra o aluno ver primeiro o que mais importa. */
const CLASSES_CHAVE = new Set([
  'btn','d-flex','container','row','col','card','navbar','text-center','mx-auto',
  'img-fluid','form-control','table','shadow','rounded','border','d-none','fw-bold',
  'justify-content-center','align-items-center','gap-3','p-3','m-3','w-100','bg-primary',
  'text-primary','btn-primary','alert','modal','list-group'
]);

const SINONIMOS = {
  'centralizar': ['center','centro','meio','auto'],
  'centrar':     ['center','centro','meio'],
  'meio':        ['center','centro'],
  'esconder':    ['none','hidden','oculto','invisible'],
  'sumir':       ['none','hidden','esconder'],
  'mostrar':     ['block','visible','show'],
  'cor':         ['color','primary','secondary','success','danger','warning','info'],
  'cores':       ['color','primary','success','danger'],
  'vermelho':    ['danger'],
  'verde':       ['success'],
  'azul':        ['primary','info'],
  'amarelo':     ['warning'],
  'cinza':       ['secondary','muted'],
  'preto':       ['dark'],
  'branco':      ['light','white'],
  'botao':       ['btn','button'],
  'botoes':      ['btn','button'],
  'button':      ['btn','botao'],
  'margem':      ['margin','m-'],
  'preenchimento':['padding','p-'],
  'espaco':      ['margin','padding','gap','m-','p-'],
  'espacamento': ['margin','padding','gap'],
  'grande':      ['lg','large','display','fs-','xl'],
  'pequeno':     ['sm','small'],
  'tamanho':     ['size','lg','sm','w-','h-','fs-'],
  'letra':       ['text','font','fw','fs'],
  'fonte':       ['font','text','fw','fs'],
  'negrito':     ['bold','fw'],
  'italico':     ['italic','fst'],
  'sublinhado':  ['underline','decoration'],
  'menu':        ['nav','navbar','dropdown'],
  'cartao':      ['card'],
  'caixa':       ['container','card','box','border'],
  'coluna':      ['col','column'],
  'linha':       ['row'],
  'grade':       ['grid','row','col'],
  'celular':     ['sm','mobile','responsivo','col-'],
  'mobile':      ['sm','celular','responsivo'],
  'responsivo':  ['sm','md','lg','xl','col-'],
  'redondo':     ['rounded','circle','pill'],
  'redonda':     ['rounded','circle','pill'],
  'circulo':     ['circle','rounded'],
  'arredondar':  ['rounded'],
  'sombra':      ['shadow'],
  'borda':       ['border'],
  'foto':        ['img','image','imagem'],
  'imagem':      ['img','image'],
  'esquerda':    ['start','left'],
  'direita':     ['end','right'],
  'cima':        ['top','start'],
  'baixo':       ['bottom'],
  'topo':        ['top','fixed-top'],
  'fixo':        ['fixed','sticky'],
  'aviso':       ['alert','warning'],
  'alerta':      ['alert'],
  'formulario':  ['form'],
  'campo':       ['form-control','input'],
  'tabela':      ['table'],
  'lista':       ['list'],
  'popup':       ['modal'],
  'carregando':  ['spinner','progress'],
  'flexbox':     ['flex','d-flex'],
  'alinhar':     ['align','justify','text-'],
  'lado':        ['flex','row','col'],
};

function normalizar(txt) {
  return (txt || '')
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\-\s.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* distância de edição (Levenshtein), com limite de saída rápida */
function distancia(a, b, max = 2) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const m = a.length, n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    let menor = i;
    for (let j = 1; j <= n; j++) {
      const custo = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + custo);
      if (cur[j] < menor) menor = cur[j];
    }
    if (menor > max) return max + 1;
    prev = cur;
  }
  return prev[n];
}

/* Prepara cada item uma vez só, pra busca ficar instantânea */
function prepararIndice(lista) {
  return lista.map(item => {
    const nomeN = normalizar(item.base ? item.base.replace(/-$/, '') : item.cls);
    const nomeOriginal = normalizar(item.base || item.cls);
    const partesNome = nomeN.split(/[\-\s]/).filter(Boolean);
    const cat = CATEGORIAS.find(c => c.id === item.cat);
    return {
      item,
      nome: nomeN,
      nomeOriginal,
      partesNome,
      desc: normalizar(item.desc),
      tags: (item.tags || []).map(normalizar),
      afeta: normalizar((item.afeta || []).join(' ')),
      catNome: normalizar(cat ? cat.nome : ''),
      familia: normalizar(item.familia || ''),
    };
  });
}

/* Pontua um item contra UM termo. Devolve 0 se não casou.
   apenasNome=true → usado pelos sinônimos: só olha nome e tags,
   pra não trazer resultados aleatórios por causa de uma palavra solta na descrição. */
function pontuarTermo(ix, termo, apenasNome = false) {
  let p = 0;

  /* termo terminado em hífen ("mt-", "p-") = "começa com isso". Só casa por prefixo. */
  if (termo.endsWith('-') && termo.length >= 2) {
    const alvo = termo.slice(0, -1);
    if (ix.nome === alvo || ix.nome.startsWith(alvo + '-') || ix.nomeOriginal.startsWith(termo)) return 75;
    return 0;
  }
  if (ix.nome === termo) p = Math.max(p, 100);
  else if (ix.nome.startsWith(termo)) p = Math.max(p, 70);
  else if (ix.partesNome.includes(termo)) p = Math.max(p, 60);
  else if (termo.length >= 3 && ix.partesNome.some(x => x.startsWith(termo))) p = Math.max(p, 50);
  else if (termo.length >= 4 && ix.nome.includes(termo)) p = Math.max(p, 40);

  for (const t of ix.tags) {
    if (t === termo) p = Math.max(p, 55);
    else if (t.startsWith(termo) && termo.length >= 3) p = Math.max(p, 35);
    else if (termo.length >= 3 && t.includes(termo)) p = Math.max(p, 22);
  }

  if (ix.familia && ix.familia.includes(termo) && termo.length >= 2) p = Math.max(p, 30);
  if (!apenasNome) {
    if (ix.catNome.includes(termo) && termo.length >= 3) p = Math.max(p, 18);
    if (termo.length >= 3 && ix.desc.includes(termo)) p = Math.max(p, 15);
    if (termo.length >= 3 && ix.afeta.includes(termo)) p = Math.max(p, 12);
  }

  /* tolerância a erro de digitação: só quando nada casou.
     Compara só com o começo das palavras, e exige começar com a mesma letra. */
  if (p === 0 && !apenasNome && termo.length >= 5) {
    const lim = termo.length >= 7 ? 2 : 1;
    const candidatos = [...ix.partesNome, ...ix.tags.flatMap(t => t.split(' '))];
    for (const c of candidatos) {
      if (c.length < 5 || c[0] !== termo[0]) continue;
      if (distancia(termo, c, lim) <= lim) { p = Math.max(p, 20); break; }
      if (c.length > termo.length && c.length <= termo.length + 3 &&
          distancia(termo, c.slice(0, termo.length), lim) <= lim) {
        p = Math.max(p, 16); break;
      }
    }
  }
  return p;
}

/* Expande "centralizar" em ["centralizar","center","centro","meio","auto"] */
function expandirTermo(termo) {
  const extras = SINONIMOS[termo] || [];
  return { original: termo, extras };
}

function buscar(indice, consulta, filtroCat) {
  const q = normalizar(consulta);
  let base = filtroCat ? indice.filter(ix => ix.item.cat === filtroCat) : indice;

  if (!q) return { resultados: base.map(ix => ({ ix, pontos: 0 })), termos: [] };

  const termos = q.split(' ').filter(Boolean);
  const resultados = [];

  for (const ix of base) {
    let total = 0;
    let fortes = 0;
    let todosCasaram = true;

    for (const termo of termos) {
      const { extras } = expandirTermo(termo);
      let melhor = pontuarTermo(ix, termo);

      /* sinônimos valem um pouco menos que a palavra digitada */
      for (const ex of extras) {
        const pe = pontuarTermo(ix, normalizar(ex), true) * 0.75;
        if (pe > melhor) melhor = pe;
      }

      if (melhor === 0) { todosCasaram = false; break; }
      if (melhor >= 30) fortes++;
      total += melhor;
    }

    /* com 2+ palavras, pelo menos uma precisa casar no nome/tag (não só na descrição).
       Isso evita que "botão vermelho" traga rounded-pill só porque a descrição diz "botão". */
    if (termos.length >= 2 && fortes === 0) todosCasaram = false;

    if (todosCasaram) {
      /* leve preferência por nomes curtos e comuns */
      total += Math.max(0, 8 - ix.nome.length * 0.2);
      if (CLASSES_CHAVE.has(ix.item.cls)) total += 12;
      resultados.push({ ix, pontos: total });
    }
  }

  resultados.sort((a, b) => b.pontos - a.pontos || a.ix.nome.length - b.ix.nome.length);
  return { resultados, termos };
}

/* Destaca os termos encontrados dentro de um texto (seguro contra HTML) */
function destacar(texto, termos) {
  const esc = (s) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if (!termos || !termos.length) return esc(texto);

  const norm = normalizar(texto);
  /* só destaca se o comprimento normalizado bate com o original */
  if (norm.length !== texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').length) {
    return esc(texto);
  }
  const base = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const marcas = new Array(texto.length).fill(false);
  for (const t of termos) {
    if (t.length < 2) continue;
    let i = 0;
    while ((i = base.indexOf(t, i)) !== -1) {
      for (let k = i; k < i + t.length && k < marcas.length; k++) marcas[k] = true;
      i += t.length;
    }
  }
  let out = '', aberto = false;
  for (let k = 0; k < texto.length; k++) {
    if (marcas[k] && !aberto) { out += '<mark>'; aberto = true; }
    if (!marcas[k] && aberto) { out += '</mark>'; aberto = false; }
    out += esc(texto[k]);
  }
  if (aberto) out += '</mark>';
  return out;
}

/* Permite testar em Node sem navegador */
if (typeof module !== 'undefined') {
  module.exports = { normalizar, distancia, prepararIndice, buscar, destacar };
}
