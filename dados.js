/* ==========================================================
   BASE DE DADOS — classes do Bootstrap 5
   ----------------------------------------------------------
   Cada item tem:
     cls      → nome da classe (como se escreve no HTML)
     desc     → o que ela faz, em português simples
     afeta    → em quais elementos ela funciona
     familia  → (opcional) agrupa classes parecidas
     demo     → (opcional) HTML pra mostrar ao vivo
     tags     → palavras extras pra ajudar na busca (PT e EN)
     extra    → dica ou aviso pro aluno
   ========================================================== */

const CATEGORIAS = [
  { id: 'botoes',     nome: 'Botões',        icone: '🔘' },
  { id: 'cores',      nome: 'Cores',         icone: '🎨' },
  { id: 'texto',      nome: 'Texto',         icone: '🔤' },
  { id: 'espacamento',nome: 'Espaçamento',   icone: '📏' },
  { id: 'layout',     nome: 'Grade e layout',icone: '🧱' },
  { id: 'flex',       nome: 'Flexbox',       icone: '↔️' },
  { id: 'display',    nome: 'Exibição',      icone: '👁️' },
  { id: 'tamanho',    nome: 'Tamanhos',      icone: '📐' },
  { id: 'bordas',     nome: 'Bordas e sombras', icone: '🔲' },
  { id: 'componentes',nome: 'Componentes',   icone: '🧩' },
  { id: 'formularios',nome: 'Formulários',   icone: '📝' },
  { id: 'tabelas',    nome: 'Tabelas',       icone: '📊' },
  { id: 'imagens',    nome: 'Imagens',       icone: '🖼️' },
  { id: 'posicao',    nome: 'Posição',       icone: '📍' },
];

/* Cores do tema usadas pra gerar classes repetitivas */
const CORES = [
  ['primary',   'principal (cor de destaque do tema)'],
  ['secondary', 'secundária (cinza/apagada)'],
  ['success',   'sucesso (verde)'],
  ['danger',    'perigo ou erro (vermelho)'],
  ['warning',   'aviso (amarelo)'],
  ['info',      'informação (azul-claro)'],
  ['light',     'clara'],
  ['dark',      'escura'],
];

const BREAKPOINTS = [
  ['sm', '576px', 'celulares grandes'],
  ['md', '768px', 'tablets'],
  ['lg', '992px', 'notebooks'],
  ['xl', '1200px', 'monitores'],
  ['xxl', '1400px', 'monitores grandes'],
];

const CLASSES = [];
const add = (o) => CLASSES.push(o);

/* ================= BOTÕES ================= */
add({ cat:'botoes', cls:'btn', familia:'btn',
  desc:'Transforma um elemento em botão. É a classe base: sozinha ela deixa o botão sem cor, então quase sempre vem junto com uma classe de cor (btn-primary, btn-success...).',
  afeta:['<button>','<a>','<input type="submit">'],
  tags:['botao','button','butom','buton','botão','clicar','click'],
  extra:'Sempre use "btn" + uma cor. Exemplo: class="btn btn-primary".',
  demo:'<button class="btn btn-secondary">Botão</button>' });

CORES.forEach(([c, nome]) => {
  add({ cat:'botoes', cls:`btn-${c}`, familia:'btn',
    desc:`Pinta o botão com a cor ${nome}. Precisa da classe "btn" junto.`,
    afeta:['<button>','<a>'],
    tags:['botao','button','cor','color',c],
    demo:`<button class="btn btn-${c}">${c}</button>` });
  add({ cat:'botoes', cls:`btn-outline-${c}`, familia:'btn',
    desc:`Botão só com contorno na cor ${nome}, sem preenchimento. Ao passar o mouse, ele se preenche.`,
    afeta:['<button>','<a>'],
    tags:['botao','button','contorno','borda','outline','vazado',c],
    demo:`<button class="btn btn-outline-${c}">${c}</button>` });
});

add({ cat:'botoes', cls:'btn-lg', familia:'btn',
  desc:'Deixa o botão maior (large).', afeta:['.btn'],
  tags:['grande','large','maior','tamanho','size'],
  demo:'<button class="btn btn-primary btn-lg">Grande</button>' });
add({ cat:'botoes', cls:'btn-sm', familia:'btn',
  desc:'Deixa o botão menor (small).', afeta:['.btn'],
  tags:['pequeno','small','menor','tamanho','size'],
  demo:'<button class="btn btn-primary btn-sm">Pequeno</button>' });
add({ cat:'botoes', cls:'btn-link', familia:'btn',
  desc:'Faz o botão parecer um link (sem fundo, com sublinhado ao passar o mouse).', afeta:['.btn'],
  tags:['link','texto','sem fundo'],
  demo:'<button class="btn btn-link">Parece link</button>' });
add({ cat:'botoes', cls:'btn-close', familia:'btn',
  desc:'Cria um botão de fechar (o "X"). Muito usado em alertas e janelas modais.', afeta:['<button>'],
  tags:['fechar','close','x','sair'],
  demo:'<button class="btn-close" aria-label="Fechar"></button>' });
add({ cat:'botoes', cls:'btn-group', familia:'btn-group',
  desc:'Junta vários botões lado a lado, como se fossem um só bloco.', afeta:['<div>','<span>'],
  tags:['grupo','juntar','agrupar','group'],
  demo:'<div class="btn-group"><button class="btn btn-primary">Um</button><button class="btn btn-primary">Dois</button><button class="btn btn-primary">Três</button></div>' });
add({ cat:'botoes', cls:'btn-group-vertical', familia:'btn-group',
  desc:'Igual ao btn-group, mas os botões ficam empilhados um embaixo do outro.', afeta:['<div>'],
  tags:['vertical','empilhar','coluna'],
  demo:'<div class="btn-group-vertical"><button class="btn btn-primary">Um</button><button class="btn btn-primary">Dois</button></div>' });
add({ cat:'botoes', cls:'active', familia:'btn',
  desc:'Mostra o botão como "pressionado" ou selecionado.', afeta:['.btn','.nav-link','.list-group-item'],
  tags:['ativo','selecionado','pressionado'],
  demo:'<button class="btn btn-primary active">Ativo</button>' });
add({ cat:'botoes', cls:'disabled', familia:'btn',
  desc:'Desativa o elemento: fica apagado e não responde a cliques.', afeta:['.btn','.nav-link','<a>'],
  tags:['desativado','desabilitado','bloquear','apagado'],
  extra:'Em <button> também dá pra usar o atributo "disabled".',
  demo:'<button class="btn btn-primary disabled">Desativado</button>' });
add({ cat:'botoes', cls:'d-grid', familia:'btn',
  desc:'Faz o botão ocupar 100% da largura do pai. Aplique a classe no CONTAINER que envolve o botão.', afeta:['<div> (pai do botão)'],
  tags:['largura total','ocupar tudo','botao largo','block','full width'],
  demo:'<div class="d-grid"><button class="btn btn-primary">Largura total</button></div>' });

/* ================= CORES ================= */
CORES.forEach(([c, nome]) => {
  add({ cat:'cores', cls:`text-${c}`, familia:'text-cor',
    desc:`Muda a cor do TEXTO para ${nome}.`,
    afeta:['qualquer elemento com texto'],
    tags:['cor','color','letra','texto','fonte',c],
    demo:`<span class="text-${c} fw-bold ${c==='dark'?'bg-light px-2':''}">Texto ${c}</span>` });
  add({ cat:'cores', cls:`bg-${c}`, familia:'bg-cor',
    desc:`Muda a cor de FUNDO para ${nome}.`,
    afeta:['qualquer elemento'],
    tags:['fundo','background','cor','color',c],
    demo:`<div class="bg-${c} p-2 rounded ${['warning','info','light'].includes(c)?'text-dark':'text-white'}">Fundo ${c}</div>` });
  add({ cat:'cores', cls:`border-${c}`, familia:'border',
    desc:`Pinta a BORDA de ${nome}. Precisa da classe "border" junto.`,
    afeta:['qualquer elemento com borda'],
    tags:['borda','contorno','cor',c],
    demo:`<div class="border border-3 border-${c} p-2 rounded">Borda ${c}</div>` });
});
add({ cat:'cores', cls:'text-white', familia:'text-cor', desc:'Texto branco.', afeta:['qualquer elemento com texto'], tags:['branco','white','cor'],
  demo:'<span class="text-white bg-dark px-2 rounded">Texto branco</span>' });
add({ cat:'cores', cls:'text-muted', familia:'text-cor', desc:'Texto cinza, mais apagado. Bom pra informações secundárias.', afeta:['qualquer elemento com texto'], tags:['cinza','apagado','discreto','secundario'],
  demo:'<span class="text-muted">Texto apagado</span>' });
add({ cat:'cores', cls:'bg-white', familia:'bg-cor', desc:'Fundo branco.', afeta:['qualquer elemento'], tags:['branco','white','fundo'],
  demo:'<div class="bg-white text-dark p-2 rounded">Fundo branco</div>' });
add({ cat:'cores', cls:'bg-transparent', familia:'bg-cor', desc:'Remove o fundo (deixa transparente).', afeta:['qualquer elemento'], tags:['transparente','sem fundo','invisivel'],
  demo:'<div class="bg-transparent border p-2 rounded">Sem fundo</div>' });
add({ cat:'cores', cls:'opacity-50', familia:'opacity',
  desc:'Deixa o elemento meio transparente. Existem opacity-0, 25, 50, 75 e 100.', afeta:['qualquer elemento'],
  tags:['transparencia','opacidade','transparente','fade','apagar'],
  demo:'<div class="opacity-50 bg-primary text-white p-2 rounded">50% visível</div>' });

/* ================= TEXTO ================= */
[['start','alinha à ESQUERDA','esquerda','left'],
 ['center','CENTRALIZA o texto','centro','centralizar'],
 ['end','alinha à DIREITA','direita','right']].forEach(([v,d,t1,t2]) => {
  add({ cat:'texto', cls:`text-${v}`, familia:'text-align',
    desc:`O texto ${d}.`, afeta:['<p>','<div>','<h1>–<h6>','qualquer bloco com texto'],
    tags:['alinhar','alinhamento','align',t1,t2],
    extra:'Só funciona em texto. Pra centralizar uma caixa inteira, use mx-auto.',
    demo:`<div class="text-${v} border p-2 rounded">Texto alinhado</div>` });
});
add({ cat:'texto', cls:'text-justify', familia:'text-align', desc:'Justifica o texto (as linhas ficam com a mesma largura).', afeta:['<p>'], tags:['justificar','justificado'], demo:'<p class="text-justify mb-0">Texto justificado ocupa a linha inteira de ponta a ponta, como em um jornal.</p>' });
add({ cat:'texto', cls:'fw-bold', familia:'fw',
  desc:'Deixa o texto em NEGRITO. Outras opções: fw-light, fw-normal, fw-semibold, fw-bolder.',
  afeta:['qualquer elemento com texto'], tags:['negrito','bold','grosso','peso','weight'],
  demo:'<span class="fw-bold">Negrito</span>' });
add({ cat:'texto', cls:'fw-light', familia:'fw', desc:'Texto mais fininho (peso leve).', afeta:['qualquer elemento com texto'], tags:['fino','leve','light'], demo:'<span class="fw-light">Texto leve</span>' });
add({ cat:'texto', cls:'fw-normal', familia:'fw', desc:'Peso normal (tira o negrito).', afeta:['qualquer elemento com texto'], tags:['normal','tirar negrito'], demo:'<b class="fw-normal">Sem negrito</b>' });
add({ cat:'texto', cls:'fw-semibold', familia:'fw', desc:'Peso semi-negrito (meio termo).', afeta:['qualquer elemento com texto'], tags:['semi','meio negrito'], demo:'<span class="fw-semibold">Semi-negrito</span>' });
add({ cat:'texto', cls:'fst-italic', familia:'fst', desc:'Texto em itálico (inclinado).', afeta:['qualquer elemento com texto'], tags:['italico','itálico','inclinado','italic'], demo:'<span class="fst-italic">Itálico</span>' });
add({ cat:'texto', cls:'fst-normal', familia:'fst', desc:'Tira o itálico.', afeta:['qualquer elemento com texto'], tags:['normal','tirar italico'], demo:'<i class="fst-normal">Sem itálico</i>' });
add({ cat:'texto', cls:'text-uppercase', familia:'text-transform', desc:'Transforma TUDO em MAIÚSCULAS.', afeta:['qualquer elemento com texto'], tags:['maiuscula','maiúsculo','caixa alta','uppercase','grande'], demo:'<span class="text-uppercase">maiúsculas</span>' });
add({ cat:'texto', cls:'text-lowercase', familia:'text-transform', desc:'Transforma tudo em minúsculas.', afeta:['qualquer elemento com texto'], tags:['minuscula','minúsculo','caixa baixa','lowercase'], demo:'<span class="text-lowercase">MINÚSCULAS</span>' });
add({ cat:'texto', cls:'text-capitalize', familia:'text-transform', desc:'Coloca a Primeira Letra De Cada Palavra em maiúscula.', afeta:['qualquer elemento com texto'], tags:['capitalizar','primeira letra','capitalize'], demo:'<span class="text-capitalize">primeira letra maiúscula</span>' });
add({ cat:'texto', cls:'text-decoration-none', familia:'text-decoration', desc:'Tira o sublinhado (muito usado em links).', afeta:['<a>'], tags:['sublinhado','link','tirar','underline'], demo:'<a href="#" class="text-decoration-none" onclick="return false">Link sem sublinhado</a>' });
add({ cat:'texto', cls:'text-decoration-underline', familia:'text-decoration', desc:'Coloca sublinhado no texto.', afeta:['qualquer elemento com texto'], tags:['sublinhado','underline'], demo:'<span class="text-decoration-underline">Sublinhado</span>' });
add({ cat:'texto', cls:'text-decoration-line-through', familia:'text-decoration', desc:'Risca o texto no meio, como se fosse apagado.', afeta:['qualquer elemento com texto'], tags:['riscado','riscar','cortado','line-through','tachado'], demo:'<span class="text-decoration-line-through">Riscado</span>' });
add({ cat:'texto', cls:'text-truncate', desc:'Se o texto for grande demais pra caixa, corta e coloca "…" no final.', afeta:['<p>','<div>','<span> (com largura definida)'], tags:['cortar','reticencias','três pontinhos','truncar','ellipsis'], extra:'O elemento precisa ter uma largura limitada.', demo:'<div class="text-truncate" style="max-width:140px">Um texto muito comprido que não cabe</div>' });
add({ cat:'texto', cls:'text-wrap', familia:'text-wrap', desc:'Permite que o texto quebre em várias linhas.', afeta:['qualquer elemento com texto'], tags:['quebrar linha','wrap'] });
add({ cat:'texto', cls:'text-nowrap', familia:'text-wrap', desc:'Impede a quebra de linha: o texto fica sempre em uma linha só.', afeta:['qualquer elemento com texto'], tags:['nao quebrar','linha unica','nowrap'] });
add({ cat:'texto', cls:'lead', desc:'Destaca um parágrafo: letra maior e mais leve. Ótimo pra introduções.', afeta:['<p>'], tags:['destaque','introducao','maior','paragrafo'], demo:'<p class="lead mb-0">Parágrafo em destaque</p>' });
add({ cat:'texto', cls:'small', desc:'Deixa o texto menor (85% do tamanho normal).', afeta:['qualquer elemento com texto'], tags:['pequeno','menor','letra pequena'], demo:'<span class="small">Texto pequeno</span>' });
add({ cat:'texto', cls:'mark', desc:'Destaca o texto com fundo amarelo, como um marca-texto.', afeta:['<mark>','qualquer texto'], tags:['marca texto','destacar','amarelo','highlight'], demo:'<span class="mark">Destacado</span>' });
for (let i = 1; i <= 6; i++) {
  add({ cat:'texto', cls:`fs-${i}`, familia:'fs',
    desc:`Tamanho de fonte nível ${i}. fs-1 é o MAIOR, fs-6 é o menor. Muda só o tamanho, sem mudar a tag.`,
    afeta:['qualquer elemento com texto'], tags:['tamanho','fonte','letra','size','font size'],
    demo:`<span class="fs-${i}">fs-${i}</span>` });
}
for (let i = 1; i <= 6; i++) {
  add({ cat:'texto', cls:`display-${i}`, familia:'display-titulo',
    desc:`Título GIGANTE de destaque (nível ${i}). display-1 é o maior de todos. Bom pra páginas de abertura.`,
    afeta:['<h1>–<h6>','<p>'], tags:['titulo','gigante','enorme','grande','heading'],
    demo:`<span class="display-${i}" style="line-height:1">Aa</span>` });
}
add({ cat:'texto', cls:'font-monospace', desc:'Usa fonte de código (todas as letras com a mesma largura).', afeta:['qualquer elemento com texto'], tags:['codigo','code','monoespaçada','courier'], demo:'<span class="font-monospace">código()</span>' });
add({ cat:'texto', cls:'lh-1', familia:'lh', desc:'Altura da linha bem apertada. Existem lh-1, lh-sm, lh-base e lh-lg.', afeta:['<p>'], tags:['espaco entre linhas','line height','entrelinha'] });

/* ================= ESPAÇAMENTO ================= */
const LADOS = [
  ['',  'em TODOS os lados', 'todos'],
  ['t', 'em CIMA (top)', 'cima topo'],
  ['b', 'EMBAIXO (bottom)', 'baixo'],
  ['s', 'à ESQUERDA (start)', 'esquerda'],
  ['e', 'à DIREITA (end)', 'direita'],
  ['x', 'dos lados: esquerda e direita', 'horizontal lados'],
  ['y', 'em cima e embaixo', 'vertical'],
];
[['m','margin','margem','Margem = espaço FORA da caixa, entre ela e as vizinhas.'],
 ['p','padding','preenchimento','Padding = espaço DENTRO da caixa, entre a borda e o conteúdo.']].forEach(([p, en, pt, explica]) => {
  LADOS.forEach(([l, texto, tg]) => {
    const nome = p + l;
    add({ cat:'espacamento', cls:`${nome}-3`, base:`${nome}-`, familia:`${p}${l||'-todos'}`,
      valores:[0,1,2,3,4,5],
      desc:`${en === 'margin' ? 'Margem' : 'Padding'} ${texto}. Escolha o número: 0 = nenhum, 5 = bastante. Cada número é um degrau de espaço.`,
      afeta:['qualquer elemento'],
      tags:[pt, en, 'espaco','espaço','espacamento', ...tg.split(' ')],
      extra: explica,
      demoModelo: p==='m'
        ? `<div class="bg-secondary bg-opacity-25 rounded d-inline-block"><div class="bg-primary text-white rounded {C}" style="font-size:.8rem">margem</div></div>`
        : `<div class="bg-primary text-white rounded {C}" style="font-size:.8rem;display:inline-block"><span class="bg-dark rounded px-1">conteúdo</span></div>` });
  });
});
add({ cat:'espacamento', cls:'mx-auto', familia:'m-auto',
  desc:'CENTRALIZA uma caixa na horizontal. Funciona em elementos que têm largura definida (ex: w-50).', afeta:['<div>','<img>','qualquer bloco com largura'],
  tags:['centralizar','centro','meio','margem automatica','auto','caixa'],
  extra:'É o jeito de centralizar uma CAIXA. Pra centralizar TEXTO, use text-center.',
  demo:'<div class="mx-auto bg-primary text-white text-center rounded p-1" style="width:120px">centro</div>' });
add({ cat:'espacamento', cls:'m-auto', familia:'m-auto', desc:'Margem automática em todos os lados. Em flexbox, empurra o elemento pro centro.', afeta:['qualquer elemento'], tags:['centralizar','automatico','auto'] });
add({ cat:'espacamento', cls:'ms-auto', familia:'m-auto', desc:'Empurra o elemento pra DIREITA (margem esquerda automática).', afeta:['itens dentro de flexbox','<div>'], tags:['direita','empurrar','right'] });
add({ cat:'espacamento', cls:'me-auto', familia:'m-auto', desc:'Empurra o elemento pra ESQUERDA (margem direita automática).', afeta:['itens dentro de flexbox','<div>'], tags:['esquerda','empurrar','left'] });
add({ cat:'espacamento', cls:'gap-3', familia:'gap',
  desc:'Cria espaço ENTRE os filhos de um container flex ou grid. Vai de gap-0 a gap-5.', afeta:['.d-flex','.d-grid','.row'],
  tags:['espaco entre','distancia','separar','intervalo','gap'],
  extra:'Só funciona no PAI (o container), não nos filhos.',
  demo:'<div class="d-flex gap-3"><div class="bg-primary rounded p-2"></div><div class="bg-primary rounded p-2"></div><div class="bg-primary rounded p-2"></div></div>' });
add({ cat:'espacamento', cls:'g-3', familia:'gap', desc:'Espaço entre as colunas e linhas de uma grade (.row). Vai de g-0 a g-5. Também existem gx-* e gy-*.', afeta:['.row'], tags:['gutter','espaco','colunas','grade'] });

/* ================= LAYOUT ================= */
add({ cat:'layout', cls:'container', familia:'container',
  desc:'Caixa central da página, com largura máxima que muda conforme a tela e margens nas laterais. É onde você coloca o conteúdo do site.', afeta:['<div>','<main>','<section>'],
  tags:['caixa','centralizar','conteudo','pagina','largura'],
  extra:'Uma página normalmente tem: container → row → col.' });
add({ cat:'layout', cls:'container-fluid', familia:'container', desc:'Igual ao container, mas ocupa 100% da largura da tela, sem limite.', afeta:['<div>','<main>'], tags:['largura total','tela inteira','100%','fluid'] });
BREAKPOINTS.forEach(([b, px, quem]) => {
  add({ cat:'layout', cls:`container-${b}`, familia:'container',
    desc:`Ocupa 100% da largura até a tela chegar em ${px} (${quem}). A partir daí, vira um container normal.`, afeta:['<div>'], tags:['responsivo','container',b] });
});
add({ cat:'layout', cls:'row', familia:'grade',
  desc:'Cria uma LINHA da grade. As colunas (col) vão dentro dela. A grade tem 12 espaços por linha.', afeta:['<div>'],
  tags:['linha','grade','grid','layout'], extra:'Toda .col precisa estar dentro de uma .row.' });
add({ cat:'layout', cls:'col', familia:'grade',
  desc:'Cria uma COLUNA que divide o espaço igualmente com as outras colunas da linha.', afeta:['<div> dentro de .row'],
  tags:['coluna','grade','grid','dividir'],
  demo:'<div class="row g-2 text-center"><div class="col"><div class="bg-primary rounded p-1">col</div></div><div class="col"><div class="bg-primary rounded p-1">col</div></div><div class="col"><div class="bg-primary rounded p-1">col</div></div></div>' });
add({ cat:'layout', cls:'col-6', familia:'grade',
  desc:'Coluna que ocupa 6 dos 12 espaços (metade da linha). Use de col-1 até col-12.', afeta:['<div> dentro de .row'],
  tags:['coluna','metade','largura','grade','12'],
  extra:'Somando: col-6 + col-6 = 12 = linha completa. col-4 ×3 = 12 também.',
  demo:'<div class="row g-2 text-center"><div class="col-8"><div class="bg-primary rounded p-1">col-8</div></div><div class="col-4"><div class="bg-info rounded p-1 text-dark">col-4</div></div></div>' });
add({ cat:'layout', cls:'col-auto', familia:'grade', desc:'A coluna ocupa só o tamanho do próprio conteúdo.', afeta:['<div> dentro de .row'], tags:['automatico','conteudo','tamanho'] });
BREAKPOINTS.forEach(([b, px, quem]) => {
  add({ cat:'layout', cls:`col-${b}-6`, familia:'grade',
    desc:`Coluna que ocupa 6 espaços SÓ em telas de ${px} pra cima (${quem}). Em telas menores, ocupa a linha inteira e empilha. Use de col-${b}-1 a col-${b}-12.`,
    afeta:['<div> dentro de .row'],
    tags:['responsivo','responsiva','tela','celular','mobile','coluna',b],
    extra:'Assim o site se adapta: no celular empilha, no computador fica lado a lado.' });
});
add({ cat:'layout', cls:'offset-2', familia:'grade', desc:'Empurra a coluna pra direita, deixando espaços vazios antes dela. Vai de offset-1 a offset-11.', afeta:['<div> dentro de .row'], tags:['empurrar','vazio','deslocar','margem','coluna'] });
add({ cat:'layout', cls:'order-1', familia:'order', desc:'Muda a ORDEM visual do elemento. Menor número aparece primeiro. Vai de order-0 a order-5, além de order-first e order-last.', afeta:['colunas','itens flex'], tags:['ordem','reordenar','trocar posicao','sequencia'] });
add({ cat:'layout', cls:'vstack', desc:'Empilha os filhos na vertical, um embaixo do outro (atalho de flex-column).', afeta:['<div>'], tags:['empilhar','vertical','coluna','stack'], demo:'<div class="vstack gap-2"><div class="bg-primary rounded p-1">A</div><div class="bg-primary rounded p-1">B</div></div>' });
add({ cat:'layout', cls:'hstack', desc:'Coloca os filhos lado a lado na horizontal (atalho de flex-row).', afeta:['<div>'], tags:['lado a lado','horizontal','linha','stack'], demo:'<div class="hstack gap-2"><div class="bg-primary rounded p-1">A</div><div class="bg-primary rounded p-1">B</div></div>' });

/* ================= FLEX ================= */
add({ cat:'flex', cls:'d-flex', familia:'flex',
  desc:'Liga o FLEXBOX. Os filhos diretos passam a ficar lado a lado e ganham superpoderes de alinhamento. É o primeiro passo pra usar qualquer classe flex.', afeta:['<div> (o pai dos itens)'],
  tags:['flexbox','flex','lado a lado','alinhar','layout','comecar','principal','ativar'],
  extra:'As outras classes flex (justify-*, align-*) só funcionam se o pai tiver d-flex.',
  demo:'<div class="d-flex gap-2"><div class="bg-primary rounded p-2">A</div><div class="bg-primary rounded p-2">B</div><div class="bg-primary rounded p-2">C</div></div>' });
add({ cat:'flex', cls:'d-inline-flex', familia:'flex', desc:'Igual ao d-flex, mas o container só ocupa o tamanho do conteúdo.', afeta:['<div>'], tags:['flex','inline'] });
[['row','LADO A LADO (padrão)','horizontal linha'],
 ['column','UM EMBAIXO DO OUTRO','vertical coluna empilhar'],
 ['row-reverse','lado a lado, em ORDEM INVERTIDA','inverter'],
 ['column-reverse','empilhados, em ORDEM INVERTIDA','inverter']].forEach(([v,d,t]) => {
  add({ cat:'flex', cls:`flex-${v}`, familia:'flex-direction',
    desc:`Define a direção dos itens: ${d}.`, afeta:['.d-flex'], tags:['direcao','direção','sentido',...t.split(' ')],
    demo:`<div class="d-flex flex-${v} gap-1"><div class="bg-primary rounded px-2">1</div><div class="bg-primary rounded px-2">2</div><div class="bg-primary rounded px-2">3</div></div>` });
});
[['start','no INÍCIO (esquerda)','esquerda'],
 ['center','no CENTRO','centralizar meio'],
 ['end','no FIM (direita)','direita'],
 ['between','com espaço ENTRE eles (primeiro colado no começo, último no fim)','espalhar separar'],
 ['around','com espaço ao REDOR de cada um','espalhar'],
 ['evenly','com espaços IGUAIS entre todos','igual']].forEach(([v,d,t]) => {
  add({ cat:'flex', cls:`justify-content-${v}`, familia:'justify-content',
    desc:`Alinha os itens na HORIZONTAL: ${d}.`, afeta:['.d-flex'],
    tags:['alinhar','horizontal','justificar','justify',...t.split(' ')],
    extra:'Funciona no eixo principal (por padrão, horizontal).',
    demo:`<div class="d-flex justify-content-${v} border rounded p-1 gap-1"><div class="bg-primary rounded px-2">A</div><div class="bg-primary rounded px-2">B</div><div class="bg-primary rounded px-2">C</div></div>` });
});
[['start','no TOPO','cima topo'],
 ['center','no MEIO (vertical)','centralizar meio vertical'],
 ['end','na BASE','baixo fundo'],
 ['baseline','alinhados pela linha do texto','texto'],
 ['stretch','ESTICADOS até preencher a altura toda (padrão)','esticar']].forEach(([v,d,t]) => {
  add({ cat:'flex', cls:`align-items-${v}`, familia:'align-items',
    desc:`Alinha os itens na VERTICAL: ${d}.`, afeta:['.d-flex'],
    tags:['alinhar','vertical','align',...t.split(' ')],
    extra:'Precisa que o container tenha altura (ex: h-100, ou min-vh-100).',
    demo:`<div class="d-flex align-items-${v} border rounded p-1 gap-1" style="height:70px"><div class="bg-primary rounded px-2">A</div><div class="bg-primary rounded px-2 py-3">B</div><div class="bg-primary rounded px-2">C</div></div>` });
});
add({ cat:'flex', cls:'align-self-center', familia:'align-self', desc:'Alinha SÓ ESTE item no meio (vertical), ignorando o align-items do pai. Também existem align-self-start, -end, -stretch.', afeta:['filho de .d-flex'], tags:['alinhar','individual','so um','vertical'] });
add({ cat:'flex', cls:'flex-wrap', familia:'flex-wrap', desc:'Se os itens não couberem, eles vão pra próxima linha em vez de espremer.', afeta:['.d-flex'], tags:['quebrar','proxima linha','wrap','quebra'] });
add({ cat:'flex', cls:'flex-nowrap', familia:'flex-wrap', desc:'Nunca quebra linha (padrão): os itens ficam sempre na mesma linha.', afeta:['.d-flex'], tags:['nao quebrar','nowrap'] });
add({ cat:'flex', cls:'flex-grow-1', familia:'flex-grow', desc:'O item cresce e ocupa TODO o espaço que sobrou.', afeta:['filho de .d-flex'], tags:['crescer','esticar','ocupar espaco','preencher','grow'],
  demo:'<div class="d-flex gap-1"><div class="bg-primary rounded px-2">fixo</div><div class="bg-info text-dark rounded px-2 flex-grow-1">cresce</div></div>' });
add({ cat:'flex', cls:'flex-fill', desc:'Faz todos os itens dividirem o espaço igualmente, cada um crescendo pra preencher.', afeta:['filho de .d-flex'], tags:['preencher','igual','dividir','fill'] });
add({ cat:'flex', cls:'flex-shrink-0', desc:'Impede que o item seja espremido quando falta espaço.', afeta:['filho de .d-flex'], tags:['nao encolher','shrink'] });

/* ================= DISPLAY ================= */
[['none','ESCONDE o elemento (some e não ocupa espaço)','esconder sumir ocultar'],
 ['block','Mostra como BLOCO (ocupa a linha toda)','bloco linha inteira'],
 ['inline','Mostra em linha, como um texto','linha texto'],
 ['inline-block','Em linha, mas aceita largura e altura','linha bloco']].forEach(([v,d,t]) => {
  add({ cat:'display', cls:`d-${v}`, familia:'display',
    desc:`${d}.`, afeta:['qualquer elemento'], tags:['exibir','mostrar','display','visibilidade',...t.split(' ')] });
});
BREAKPOINTS.forEach(([b, px]) => {
  add({ cat:'display', cls:`d-${b}-none`, familia:'display',
    desc:`ESCONDE o elemento em telas de ${px} pra cima. Quer mostrar só no celular? Combine: d-block d-${b}-none.`, afeta:['qualquer elemento'],
    tags:['esconder','responsivo','celular','mobile','ocultar','tela',b],
    extra:'Padrão: escondido em cima, mostrado embaixo. Leia como "a partir dessa tela, faça isso".' });
});
add({ cat:'display', cls:'visible', familia:'visibility', desc:'Deixa o elemento visível (padrão).', afeta:['qualquer elemento'], tags:['visivel','mostrar'] });
add({ cat:'display', cls:'invisible', familia:'visibility', desc:'Deixa o elemento invisível, mas ele CONTINUA ocupando espaço (diferente do d-none).', afeta:['qualquer elemento'], tags:['invisivel','esconder','oculto','manter espaco'] });
add({ cat:'display', cls:'visually-hidden', desc:'Esconde da tela mas continua disponível pra leitores de tela (acessibilidade).', afeta:['qualquer elemento'], tags:['acessibilidade','leitor de tela','esconder'] });
add({ cat:'display', cls:'overflow-auto', familia:'overflow', desc:'Se o conteúdo passar da caixa, aparece uma barra de rolagem.', afeta:['<div> com tamanho definido'], tags:['rolagem','scroll','barra','transbordar'] });
add({ cat:'display', cls:'overflow-hidden', familia:'overflow', desc:'Corta o que passar da caixa (esconde o excesso).', afeta:['<div> com tamanho definido'], tags:['cortar','esconder excesso','overflow'] });
add({ cat:'display', cls:'float-start', familia:'float', desc:'Faz o elemento flutuar à esquerda, com o texto contornando.', afeta:['<img>','<div>'], tags:['flutuar','esquerda','float','contornar'] });
add({ cat:'display', cls:'float-end', familia:'float', desc:'Faz o elemento flutuar à direita, com o texto contornando.', afeta:['<img>','<div>'], tags:['flutuar','direita','float','contornar'] });
add({ cat:'display', cls:'clearfix', desc:'Conserta o pai quando os filhos estão flutuando (evita que ele "colapse").', afeta:['<div> (pai de floats)'], tags:['limpar','float','consertar'] });

/* ================= TAMANHOS ================= */
[25,50,75,100].forEach(n => {
  add({ cat:'tamanho', cls:`w-${n}`, familia:'largura',
    desc:`LARGURA de ${n}% do elemento pai. Opções: w-25, w-50, w-75, w-100 e w-auto.`, afeta:['qualquer elemento'],
    tags:['largura','width','tamanho','porcentagem','w'],
    demo:`<div class="border rounded p-1"><div class="w-${n} bg-primary rounded" style="height:18px"></div></div>` });
  add({ cat:'tamanho', cls:`h-${n}`, familia:'altura',
    desc:`ALTURA de ${n}% do pai. O pai precisa ter altura definida pra funcionar.`, afeta:['qualquer elemento'],
    tags:['altura','height','tamanho','porcentagem','h'] });
});
add({ cat:'tamanho', cls:'w-auto', familia:'largura', desc:'Largura automática (do tamanho do conteúdo).', afeta:['qualquer elemento'], tags:['largura','auto'] });
add({ cat:'tamanho', cls:'mw-100', desc:'Largura MÁXIMA de 100% do pai: o elemento nunca passa da caixa onde está.', afeta:['<img>','qualquer elemento'], tags:['maximo','limite','largura maxima','nao estourar'] });
add({ cat:'tamanho', cls:'vw-100', desc:'Largura de 100% da TELA inteira (viewport width).', afeta:['qualquer elemento'], tags:['tela toda','viewport','largura'] });
add({ cat:'tamanho', cls:'vh-100', desc:'Altura de 100% da TELA (viewport height). Faz o elemento ocupar a tela inteira na vertical.', afeta:['qualquer elemento'], tags:['tela toda','altura','viewport','tela cheia'] });
add({ cat:'tamanho', cls:'min-vh-100', desc:'Altura MÍNIMA de 100% da tela. Ótimo com d-flex + align-items-center pra centralizar na tela.', afeta:['<div>','<body>','<section>'], tags:['altura minima','tela cheia','centralizar na tela'] });

/* ================= BORDAS ================= */
add({ cat:'bordas', cls:'border', familia:'border', desc:'Adiciona uma borda fina em volta do elemento. Use border-top, border-bottom, border-start ou border-end pra só um lado.', afeta:['qualquer elemento'], tags:['borda','contorno','linha','moldura'], demo:'<div class="border p-2 rounded-0">Com borda</div>' });
add({ cat:'bordas', cls:'border-0', familia:'border', desc:'Remove a borda.', afeta:['qualquer elemento'], tags:['sem borda','tirar','remover'] });
[1,2,3,4,5].forEach(n => {
  add({ cat:'bordas', cls:`border-${n}`, familia:'border', desc:`Espessura da borda: ${n} (1 = fina, 5 = grossa). Precisa da classe "border".`, afeta:['.border'], tags:['espessura','grossura','largura da borda'],
    demo:`<div class="border border-${n} p-2 rounded-0">border-${n}</div>` });
});
add({ cat:'bordas', cls:'rounded', familia:'rounded', desc:'Arredonda os cantos um pouco.', afeta:['qualquer elemento','<img>'], tags:['arredondar','canto','redondo','borda'], demo:'<div class="bg-primary text-white p-3 rounded">rounded</div>' });
add({ cat:'bordas', cls:'rounded-0', familia:'rounded', desc:'Cantos retos (sem arredondar).', afeta:['qualquer elemento'], tags:['reto','quadrado','sem arredondar'], demo:'<div class="bg-primary text-white p-3 rounded-0">rounded-0</div>' });
[1,2,3,4,5].forEach(n => {
  add({ cat:'bordas', cls:`rounded-${n}`, familia:'rounded', desc:`Arredondamento nível ${n} (1 = leve, 5 = bem redondo).`, afeta:['qualquer elemento'], tags:['arredondar','canto'],
    demo:`<div class="bg-primary text-white p-3 rounded-${n}">rounded-${n}</div>` });
});
add({ cat:'bordas', cls:'rounded-circle', familia:'rounded', desc:'Deixa o elemento redondo como um círculo. Para dar certo, largura e altura precisam ser iguais.', afeta:['<img>','<div>'], tags:['circulo','redondo','redonda','bolinha','avatar','foto','foto de perfil','perfil','imagem'], extra:'Perfeito pra foto de perfil. Coloque numa <img> com largura e altura iguais.', demo:'<div class="bg-primary rounded-circle" style="width:56px;height:56px"></div>' });
add({ cat:'bordas', cls:'rounded-pill', familia:'rounded', desc:'Cantos totalmente arredondados, formato de pílula. Ótimo pra botões e etiquetas.', afeta:['.btn','.badge','qualquer elemento'], tags:['pilula','capsula','redondo','botao'], demo:'<button class="btn btn-primary rounded-pill px-4">pílula</button>' });
add({ cat:'bordas', cls:'shadow', familia:'shadow', desc:'Adiciona sombra ao redor do elemento. Variações: shadow-sm (pequena), shadow-lg (grande), shadow-none (sem sombra).', afeta:['qualquer elemento'], tags:['sombra','shadow','profundidade','destaque'], demo:'<div class="shadow p-3 rounded bg-body">Com sombra</div>' });
add({ cat:'bordas', cls:'shadow-sm', familia:'shadow', desc:'Sombra pequena e discreta.', afeta:['qualquer elemento'], tags:['sombra','pequena'], demo:'<div class="shadow-sm p-3 rounded bg-body">shadow-sm</div>' });
add({ cat:'bordas', cls:'shadow-lg', familia:'shadow', desc:'Sombra grande e marcante.', afeta:['qualquer elemento'], tags:['sombra','grande'], demo:'<div class="shadow-lg p-3 rounded bg-body">shadow-lg</div>' });
add({ cat:'bordas', cls:'shadow-none', familia:'shadow', desc:'Remove a sombra.', afeta:['qualquer elemento'], tags:['sem sombra','remover'] });

/* ================= COMPONENTES ================= */
add({ cat:'componentes', cls:'card', familia:'card',
  desc:'Cria um cartão: uma caixinha com borda e fundo, ótima pra agrupar informações (ex: perfil, produto, notícia).', afeta:['<div>'],
  tags:['cartao','cartão','caixa','produto','perfil'],
  demo:'<div class="card"><div class="card-body">Um cartão simples</div></div>' });
add({ cat:'componentes', cls:'card-body', familia:'card', desc:'O miolo do cartão, com espaçamento interno. Coloque o conteúdo aqui.', afeta:['<div> dentro de .card'], tags:['cartao','conteudo','corpo'] });
add({ cat:'componentes', cls:'card-title', familia:'card', desc:'Título do cartão.', afeta:['<h5>','<h1>–<h6>'], tags:['cartao','titulo'] });
add({ cat:'componentes', cls:'card-text', familia:'card', desc:'Texto do cartão.', afeta:['<p>'], tags:['cartao','texto','paragrafo'] });
add({ cat:'componentes', cls:'card-header', familia:'card', desc:'Cabeçalho do cartão (faixa no topo).', afeta:['<div> dentro de .card'], tags:['cartao','topo','cabecalho'] });
add({ cat:'componentes', cls:'card-footer', familia:'card', desc:'Rodapé do cartão (faixa embaixo).', afeta:['<div> dentro de .card'], tags:['cartao','rodape','base'] });
add({ cat:'componentes', cls:'card-img-top', familia:'card', desc:'Coloca uma imagem no topo do cartão, ocupando a largura toda.', afeta:['<img> dentro de .card'], tags:['cartao','imagem','foto','topo'] });
add({ cat:'componentes', cls:'navbar', familia:'navbar', desc:'Cria a barra de navegação (menu) do topo do site. Ela é responsiva e se transforma em menu sanduíche no celular.', afeta:['<nav>'], tags:['menu','barra','topo','navegacao','cabecalho','header'], extra:'Combine com navbar-expand-lg, navbar-brand e navbar-nav.' });
add({ cat:'componentes', cls:'navbar-brand', familia:'navbar', desc:'O nome ou logo do site, no canto da navbar.', afeta:['<a>','<span>'], tags:['logo','marca','nome'] });
add({ cat:'componentes', cls:'navbar-nav', familia:'navbar', desc:'A lista com os itens (links) do menu.', afeta:['<ul>'], tags:['lista','links','itens','menu'] });
add({ cat:'componentes', cls:'navbar-toggler', familia:'navbar', desc:'O botão sanduíche (☰) que aparece no celular pra abrir o menu.', afeta:['<button>'], tags:['sanduiche','hamburguer','menu celular'] });
add({ cat:'componentes', cls:'navbar-expand-lg', familia:'navbar', desc:'A navbar fica aberta (itens lado a lado) a partir de telas grandes. Em telas menores, vira menu sanduíche. Existem sm, md, lg, xl e xxl.', afeta:['.navbar'], tags:['responsivo','expandir','celular'] });
add({ cat:'componentes', cls:'nav', familia:'nav', desc:'Cria uma lista de links de navegação simples (pode virar abas ou pílulas).', afeta:['<ul>','<nav>'], tags:['navegacao','abas','links','menu'] });
add({ cat:'componentes', cls:'nav-link', familia:'nav', desc:'Um link dentro de um menu (.nav ou .navbar-nav).', afeta:['<a>'], tags:['link','menu','item'] });
add({ cat:'componentes', cls:'nav-tabs', familia:'nav', desc:'Transforma o .nav em abas.', afeta:['.nav'], tags:['abas','tabs'] });
add({ cat:'componentes', cls:'nav-pills', familia:'nav', desc:'Transforma o .nav em botões arredondados (pílulas).', afeta:['.nav'], tags:['pilulas','botoes','pills'] });
CORES.forEach(([c, nome]) => {
  add({ cat:'componentes', cls:`alert-${c}`, familia:'alert',
    desc:`Caixa de aviso na cor ${nome}. Use junto com a classe "alert".`, afeta:['<div>'],
    tags:['aviso','alerta','mensagem','notificacao',c],
    demo:`<div class="alert alert-${c} mb-0 py-2" role="alert">Mensagem ${c}</div>` });
  add({ cat:'componentes', cls:`badge text-bg-${c}`, familia:'badge',
    desc:`Etiquetinha colorida (${nome}), boa pra números ou status.`, afeta:['<span>'],
    tags:['etiqueta','selo','contador','badge',c],
    demo:`<span class="badge text-bg-${c}">${c}</span>` });
});
add({ cat:'componentes', cls:'alert', familia:'alert', desc:'Caixa de aviso. Precisa de uma cor: alert-success, alert-danger, etc.', afeta:['<div>'], tags:['aviso','alerta','mensagem'] });
add({ cat:'componentes', cls:'alert-dismissible', familia:'alert', desc:'Permite que o usuário feche o alerta. Precisa de um .btn-close dentro dele.', afeta:['.alert'], tags:['fechar','dispensar'] });
add({ cat:'componentes', cls:'badge', familia:'badge', desc:'Etiquetinha pequena. Use text-bg-primary pra dar cor.', afeta:['<span>'], tags:['etiqueta','selo','contador'] });
add({ cat:'componentes', cls:'list-group', familia:'list-group', desc:'Cria uma lista estilizada, com bordas entre os itens.', afeta:['<ul>','<div>'], tags:['lista','itens'], demo:'<ul class="list-group"><li class="list-group-item">Item 1</li><li class="list-group-item">Item 2</li></ul>' });
add({ cat:'componentes', cls:'list-group-item', familia:'list-group', desc:'Cada item de um .list-group.', afeta:['<li>','<a>','<button>'], tags:['lista','item'] });
add({ cat:'componentes', cls:'list-unstyled', desc:'Tira as bolinhas e o recuo de uma lista.', afeta:['<ul>','<ol>'], tags:['tirar bolinha','lista','sem marcador'] });
add({ cat:'componentes', cls:'list-inline', desc:'Deixa os itens da lista lado a lado. Use com list-inline-item nos filhos.', afeta:['<ul>'], tags:['lista','horizontal'] });
add({ cat:'componentes', cls:'modal', familia:'modal', desc:'Cria uma janelinha que aparece por cima da página (pop-up).', afeta:['<div>'], tags:['popup','janela','pop-up','dialogo'], extra:'Precisa do JavaScript do Bootstrap e de data-bs-toggle="modal" no botão que abre.' });
add({ cat:'componentes', cls:'dropdown', familia:'dropdown', desc:'Cria um menu que se abre ao clicar (o "cai pra baixo").', afeta:['<div>'], tags:['menu suspenso','abrir','cair','selecao'], extra:'Precisa do JavaScript do Bootstrap.' });
add({ cat:'componentes', cls:'dropdown-menu', familia:'dropdown', desc:'A caixa com as opções do dropdown.', afeta:['<ul>'], tags:['opcoes','menu'] });
add({ cat:'componentes', cls:'dropdown-item', familia:'dropdown', desc:'Cada opção dentro do dropdown-menu.', afeta:['<a>','<button>'], tags:['opcao','item'] });
add({ cat:'componentes', cls:'accordion', familia:'accordion', desc:'Cria seções que abrem e fecham ao clicar (perguntas frequentes, por exemplo).', afeta:['<div>'], tags:['sanfona','abrir','fechar','faq','expandir'] });
add({ cat:'componentes', cls:'carousel', familia:'carousel', desc:'Cria um carrossel: imagens que passam automaticamente ou com setas.', afeta:['<div>'], tags:['slider','slide','imagens','galeria','passar'], extra:'Precisa do JavaScript do Bootstrap.' });
add({ cat:'componentes', cls:'progress', familia:'progress', desc:'Cria uma barra de progresso (o fundo dela). A parte colorida é o .progress-bar.', afeta:['<div>'], tags:['barra','carregando','porcentagem','loading'], demo:'<div class="progress"><div class="progress-bar" style="width:65%">65%</div></div>' });
add({ cat:'componentes', cls:'spinner-border', familia:'spinner', desc:'Uma rodinha girando, pra mostrar que algo está carregando.', afeta:['<div>','<span>'], tags:['carregando','loading','girando','rodinha'], demo:'<div class="spinner-border text-primary" role="status"></div>' });
add({ cat:'componentes', cls:'spinner-grow', familia:'spinner', desc:'Uma bolinha que pulsa, pra indicar carregamento.', afeta:['<div>'], tags:['carregando','loading','pulsando'], demo:'<div class="spinner-grow text-primary" role="status"></div>' });
add({ cat:'componentes', cls:'breadcrumb', desc:'Mostra o caminho da página atual (Início > Categoria > Produto).', afeta:['<ol>'], tags:['caminho','trilha','navegacao'] });
add({ cat:'componentes', cls:'pagination', desc:'Botões de paginação (1, 2, 3…) pra navegar entre páginas.', afeta:['<ul>'], tags:['paginas','numeros','paginacao'] });
add({ cat:'componentes', cls:'tooltip', desc:'Balãozinho com dica que aparece ao passar o mouse.', afeta:['qualquer elemento'], tags:['dica','balao','hover'], extra:'Precisa de JavaScript pra ativar.' });
add({ cat:'componentes', cls:'toast', desc:'Notificação pequena que aparece e some sozinha.', afeta:['<div>'], tags:['notificacao','aviso','mensagem'] });
add({ cat:'componentes', cls:'offcanvas', desc:'Painel que desliza da lateral da tela, muito usado como menu no celular.', afeta:['<div>'], tags:['painel','lateral','menu','gaveta'] });
add({ cat:'componentes', cls:'collapse', desc:'Esconde o conteúdo até o usuário clicar pra mostrar.', afeta:['<div>'], tags:['esconder','recolher','mostrar','expandir'] });
add({ cat:'componentes', cls:'jumbotron', desc:'⚠️ Não existe mais no Bootstrap 5. Use container + p-5 + bg-light + rounded pra fazer um destaque grande.', afeta:['<div>'], tags:['destaque','banner','hero'], extra:'Foi removida no Bootstrap 5. Aparece em tutoriais antigos.' });

/* ================= FORMULÁRIOS ================= */
add({ cat:'formularios', cls:'form-control', familia:'form', desc:'Estiliza campos de texto, e-mail, senha, textarea… deixando com largura total e visual bonito.', afeta:['<input>','<textarea>'], tags:['campo','input','digitar','texto','caixa de texto'], demo:'<input class="form-control" placeholder="Digite aqui…">' });
add({ cat:'formularios', cls:'form-control-lg', familia:'form', desc:'Campo maior.', afeta:['.form-control'], tags:['grande','maior','tamanho'], demo:'<input class="form-control form-control-lg" placeholder="Grande">' });
add({ cat:'formularios', cls:'form-control-sm', familia:'form', desc:'Campo menor.', afeta:['.form-control'], tags:['pequeno','menor','tamanho'], demo:'<input class="form-control form-control-sm" placeholder="Pequeno">' });
add({ cat:'formularios', cls:'form-label', familia:'form', desc:'Estiliza o rótulo (o nome) que fica acima do campo.', afeta:['<label>'], tags:['rotulo','nome','legenda'] });
add({ cat:'formularios', cls:'form-select', familia:'form', desc:'Estiliza a caixa de seleção (lista suspensa).', afeta:['<select>'], tags:['selecao','lista','opcoes','dropdown'], demo:'<select class="form-select"><option>Escolha…</option><option>Opção 1</option></select>' });
add({ cat:'formularios', cls:'form-check', familia:'form-check', desc:'Container para checkbox ou radio, alinhando a caixinha com o texto.', afeta:['<div>'], tags:['checkbox','marcar','radio','opcao'], demo:'<div class="form-check"><input class="form-check-input" type="checkbox" id="fc1"><label class="form-check-label" for="fc1">Marcar</label></div>' });
add({ cat:'formularios', cls:'form-check-input', familia:'form-check', desc:'Estiliza a caixinha do checkbox ou a bolinha do radio.', afeta:['<input type="checkbox">','<input type="radio">'], tags:['checkbox','radio','caixinha'] });
add({ cat:'formularios', cls:'form-check-label', familia:'form-check', desc:'O texto ao lado do checkbox/radio.', afeta:['<label>'], tags:['checkbox','radio','texto'] });
add({ cat:'formularios', cls:'form-switch', familia:'form-check', desc:'Transforma o checkbox em um interruptor liga/desliga.', afeta:['.form-check'], tags:['interruptor','ligar','desligar','toggle','switch'], demo:'<div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="fs1" checked><label class="form-check-label" for="fs1">Ligado</label></div>' });
add({ cat:'formularios', cls:'form-range', familia:'form', desc:'Estiliza uma barra deslizante (slider).', afeta:['<input type="range">'], tags:['slider','deslizar','barra','volume'], demo:'<input type="range" class="form-range">' });
add({ cat:'formularios', cls:'input-group', familia:'input-group', desc:'Junta um campo com um botão ou texto colado nele (ex: "@" antes do e-mail).', afeta:['<div>'], tags:['grudar','juntar','campo','botao'], demo:'<div class="input-group"><span class="input-group-text">@</span><input class="form-control" placeholder="usuário"></div>' });
add({ cat:'formularios', cls:'form-floating', familia:'form', desc:'Faz o rótulo flutuar dentro do campo e subir quando você digita.', afeta:['<div>'], tags:['flutuante','label','rotulo','animado'] });
add({ cat:'formularios', cls:'is-valid', familia:'validacao', desc:'Marca o campo como VÁLIDO (borda verde).', afeta:['.form-control','.form-select'], tags:['valido','certo','verde','ok','validacao'], demo:'<input class="form-control is-valid" value="Tudo certo">' });
add({ cat:'formularios', cls:'is-invalid', familia:'validacao', desc:'Marca o campo como INVÁLIDO (borda vermelha).', afeta:['.form-control','.form-select'], tags:['invalido','errado','vermelho','erro','validacao'], demo:'<input class="form-control is-invalid" value="Erro aqui">' });
add({ cat:'formularios', cls:'valid-feedback', familia:'validacao', desc:'Mensagem de sucesso que aparece embaixo do campo válido.', afeta:['<div>'], tags:['mensagem','sucesso','validacao'] });
add({ cat:'formularios', cls:'invalid-feedback', familia:'validacao', desc:'Mensagem de erro que aparece embaixo do campo inválido.', afeta:['<div>'], tags:['mensagem','erro','validacao'] });

/* ================= TABELAS ================= */
add({ cat:'tabelas', cls:'table', familia:'table', desc:'Estiliza a tabela com visual limpo do Bootstrap.', afeta:['<table>'], tags:['tabela','dados','linhas','colunas'], demo:'<table class="table table-sm mb-0"><thead><tr><th>Nome</th><th>Idade</th></tr></thead><tbody><tr><td>Ana</td><td>15</td></tr><tr><td>Beto</td><td>16</td></tr></tbody></table>' });
add({ cat:'tabelas', cls:'table-striped', familia:'table', desc:'Linhas zebradas: alternam entre fundo claro e escuro.', afeta:['.table'], tags:['zebra','listrada','alternar'], demo:'<table class="table table-striped table-sm mb-0"><tbody><tr><td>A</td><td>1</td></tr><tr><td>B</td><td>2</td></tr><tr><td>C</td><td>3</td></tr></tbody></table>' });
add({ cat:'tabelas', cls:'table-hover', familia:'table', desc:'Destaca a linha quando o mouse passa por cima.', afeta:['.table'], tags:['destacar','mouse','hover'] });
add({ cat:'tabelas', cls:'table-bordered', familia:'table', desc:'Coloca bordas em todas as células.', afeta:['.table'], tags:['borda','celulas','grade'], demo:'<table class="table table-bordered table-sm mb-0"><tbody><tr><td>A</td><td>1</td></tr><tr><td>B</td><td>2</td></tr></tbody></table>' });
add({ cat:'tabelas', cls:'table-sm', familia:'table', desc:'Tabela compacta, com menos espaço nas células.', afeta:['.table'], tags:['compacta','pequena'] });
add({ cat:'tabelas', cls:'table-responsive', familia:'table', desc:'Cria rolagem horizontal quando a tabela não cabe na tela do celular.', afeta:['<div> que envolve a <table>'], tags:['celular','rolagem','responsiva','mobile'], extra:'Coloque uma <div class="table-responsive"> em volta da tabela.' });
CORES.forEach(([c, nome]) => {
  add({ cat:'tabelas', cls:`table-${c}`, familia:'table', desc:`Pinta a tabela, linha ou célula na cor ${nome}.`, afeta:['.table','<tr>','<td>'], tags:['cor','tabela',c] });
});

/* ================= IMAGENS ================= */
add({ cat:'imagens', cls:'img-fluid', familia:'img', desc:'Deixa a imagem RESPONSIVA: ela encolhe quando a tela é pequena e nunca estoura a caixa.', afeta:['<img>'], tags:['responsiva','imagem','foto','encolher','ajustar','tela'], extra:'Coloque em TODAS as imagens do seu site!' });
add({ cat:'imagens', cls:'img-thumbnail', familia:'img', desc:'Imagem com borda e cantos arredondados, como uma foto de álbum.', afeta:['<img>'], tags:['miniatura','borda','moldura','foto'] });
add({ cat:'imagens', cls:'object-fit-cover', familia:'object-fit', desc:'A imagem preenche a caixa toda, cortando as sobras (sem distorcer).', afeta:['<img>','<video>'], tags:['cobrir','preencher','cortar','ajustar'] });
add({ cat:'imagens', cls:'object-fit-contain', familia:'object-fit', desc:'A imagem inteira cabe dentro da caixa, podendo sobrar espaço.', afeta:['<img>','<video>'], tags:['conter','caber','ajustar'] });
add({ cat:'imagens', cls:'ratio', familia:'ratio', desc:'Cria uma caixa com proporção fixa (16:9, 4:3…). Boa pra vídeos do YouTube.', afeta:['<div> que envolve iframe/vídeo'], tags:['proporcao','video','youtube','16x9'], extra:'Use com ratio-16x9, ratio-4x3 ou ratio-1x1.' });

/* ================= POSIÇÃO ================= */
add({ cat:'posicao', cls:'position-relative', familia:'position', desc:'Marca o elemento como ponto de referência pros filhos com position-absolute.', afeta:['qualquer elemento'], tags:['relativo','referencia','posicionar'] });
add({ cat:'posicao', cls:'position-absolute', familia:'position', desc:'Tira o elemento do fluxo e posiciona ele em relação ao pai com position-relative.', afeta:['qualquer elemento'], tags:['absoluto','sobrepor','posicionar','canto'], extra:'Use com top-0, start-0, bottom-0, end-0 pra escolher o canto.' });
add({ cat:'posicao', cls:'position-fixed', familia:'position', desc:'Fixa o elemento na tela: ele NÃO se mexe quando você rola a página.', afeta:['qualquer elemento'], tags:['fixo','preso','rolar','flutuante','botao whatsapp'] });
add({ cat:'posicao', cls:'position-sticky', familia:'position', desc:'O elemento rola junto até chegar no topo, e aí fica grudado.', afeta:['qualquer elemento'], tags:['grudar','fixar','topo','sticky'] });
add({ cat:'posicao', cls:'fixed-top', familia:'position', desc:'Gruda o elemento no topo da tela, ocupando toda a largura. Muito usado em navbar.', afeta:['.navbar','<header>'], tags:['topo','fixo','menu fixo'] });
add({ cat:'posicao', cls:'fixed-bottom', familia:'position', desc:'Gruda o elemento no rodapé da tela.', afeta:['<footer>','.navbar'], tags:['base','fixo','rodape'] });
add({ cat:'posicao', cls:'sticky-top', familia:'position', desc:'Gruda o elemento no topo quando você rola até ele.', afeta:['.navbar','<div>'], tags:['grudar','topo','menu'] });
[['top-0','encosta no TOPO'],['bottom-0','encosta na BASE'],['start-0','encosta na ESQUERDA'],['end-0','encosta na DIREITA']].forEach(([v,d]) => {
  add({ cat:'posicao', cls:v, familia:'offset-pos', desc:`Com position-absolute/fixed, o elemento ${d} do pai.`, afeta:['elementos com position'], tags:['canto','posicao','encostar'] });
});
add({ cat:'posicao', cls:'top-50', familia:'offset-pos', desc:'Posiciona a 50% da altura. Combine com translate-middle pra centralizar de verdade.', afeta:['elementos com position'], tags:['centralizar','meio','posicao'] });
add({ cat:'posicao', cls:'translate-middle', desc:'Puxa o elemento 50% de volta em X e Y. Junto com top-50 start-50, centraliza exatamente no meio.', afeta:['elementos com position'], tags:['centralizar','meio','exato','centro'], extra:'Receita: position-absolute top-50 start-50 translate-middle.' });
add({ cat:'posicao', cls:'z-3', desc:'Define quem fica por cima. Número maior = mais na frente. Vai de z-n1 a z-3.', afeta:['elementos com position'], tags:['camada','frente','tras','sobrepor','z-index'] });

/* ==========================================================
   Ajusta a lista: garante nomes únicos e devolve prontos
   ========================================================== */
const _vistos = new Set();
const CLASSES_FINAL = CLASSES.filter(c => {
  const chave = c.cat + '|' + c.cls;
  if (_vistos.has(chave)) return false;
  _vistos.add(chave);
  return true;
});
