const API_BASE = "https://life-up-back-end-production.up.railway.app";

// Tabela de descontos progressivos por quantidade
// 2 unid → 7%, 3 → 14%, 4 → 21%, 5+ → 28% (teto)
function calcularDesconto(quantidade) {
    if (quantidade < 2) return 0;
    return Math.min((quantidade - 1) * 7, 28);
}

function aplicarDesconto(precoUnit, quantidade) {
    const pct = calcularDesconto(quantidade);
    const total = precoUnit * quantidade;
    const desconto = total * (pct / 100);
    return { total, desconto, totalComDesconto: total - desconto, pct };
}

// Mapeamento de id_produtos → imagem real disponível em img/
const IMAGENS_PRODUTOS = {
    1: "img/whey.png",
    2: "img/whey3.png",
    3: "img/creatina.png",
    4: "img/pre.treino.png",
    5: "img/bcaa.png",
    6: "img/barrinha.png",
    7: "img/camisaazul.png",
    8: "img/camisapreta.png",
    9: "img/calca1.png",
    10: "img/conju.png",
    11: "img/regata1.png",
    12: "img/shortazul.png",
    13: "img/vitac.png",
    14: "img/vitad.png",
    15: "img/omega.png",
    16: "img/multivita.png",
    17: "img/magnesio.png",
    18: "img/b12.png",
    19: "img/whey4.png",
    20: "img/whey2.png",
    21: "img/creatina2.png",
    22: "img/pre2.png",
    23: "img/pre3.png",
    24: "img/pre4.png",
    25: "img/cafeina.png",
    26: "img/cafeina2.png",
    27: "img/termo.png",
    28: "img/multi.png",
    29: "img/Hiper.png",
    30: "img/clore.png",
    31: "img/coen.png",
    32: "img/blu1.png",
    33: "img/blu2.png",
    34: "img/blu3.png",
    35: "img/calca2.png",
    36: "img/calca3.png",
    37: "img/calca4.png",
    38: "img/camisacinza2.png",
    39: "img/camisetacinza.png",
    40: "img/camisetacolorida.png",
    41: "img/conju2.png",
    42: "img/conju3.png",
    43: "img/regata2.png",
    44: "img/regata3.png",
    45: "img/regata4.png",
    46: "img/regata5.png",
    47: "img/shortpreto.png",
    48: "img/shortpreto2.png"
};

const CATEGORIAS_PRODUTO = {
    1: "suplemento whey",
    2: "suplemento whey",
    3: "suplemento creatina",
    4: "suplemento pre-treino",
    5: "suplemento",
    6: "suplemento",
    7: "roupa",
    8: "roupa",
    9: "roupa",
    10: "roupa",
    11: "roupa",
    12: "roupa",
    13: "suplemento vitamina",
    14: "suplemento vitamina",
    15: "suplemento vitamina",
    16: "suplemento vitamina",
    17: "suplemento vitamina",
    18: "suplemento vitamina",
    19: "suplemento whey",
    20: "suplemento whey",
    21: "suplemento creatina",
    22: "suplemento pre-treino",
    23: "suplemento pre-treino",
    24: "suplemento pre-treino",
    25: "suplemento pre-treino",
    26: "suplemento pre-treino",
    27: "suplemento pre-treino",
    28: "suplemento vitamina",
    29: "suplemento",
    30: "suplemento vitamina",
    31: "suplemento vitamina",
    32: "roupa",
    33: "roupa",
    34: "roupa",
    35: "roupa",
    36: "roupa",
    37: "roupa",
    38: "roupa",
    39: "roupa",
    40: "roupa",
    41: "roupa",
    42: "roupa",
    43: "roupa",
    44: "roupa",
    45: "roupa",
    46: "roupa",
    47: "roupa",
    48: "roupa"
};

const VARIANTES_PRODUTO = {
    1:  { tipo: 'select', label: 'Sabor / Tamanho', opcoes: [
            { nome: 'Chocolate 900g',  preco: 129.90 },
            { nome: 'Baunilha 900g',   preco: 129.90 },
            { nome: 'Morango 900g',    preco: 129.90 },
            { nome: 'Chocolate 1,8kg', preco: 229.90 },
            { nome: 'Baunilha 1,8kg',  preco: 229.90 }
        ]},
    2:  { tipo: 'select', label: 'Sabor / Tamanho', opcoes: [
            { nome: 'Chocolate 900g',  preco: 159.90 },
            { nome: 'Baunilha 900g',   preco: 159.90 },
            { nome: 'Morango 900g',    preco: 159.90 },
            { nome: 'Sem Sabor 900g',  preco: 149.90 }
        ]},
    19: { tipo: 'select', label: 'Sabor / Tamanho', opcoes: [
            { nome: 'Chocolate 900g',  preco: 189.90 },
            { nome: 'Baunilha 900g',   preco: 189.90 },
            { nome: 'Morango 900g',    preco: 189.90 },
            { nome: 'Chocolate 1,8kg', preco: 339.90 }
        ]},
    20: { tipo: 'select', label: 'Sabor / Tamanho', opcoes: [
            { nome: 'Chocolate 900g',  preco: 149.90 },
            { nome: 'Baunilha 900g',   preco: 149.90 },
            { nome: 'Sem Sabor 900g',  preco: 139.90 }
        ]},
    3:  { tipo: 'select', label: 'Tamanho', opcoes: [
            { nome: '300g', preco: 79.90  },
            { nome: '500g', preco: 119.90 },
            { nome: '1kg',  preco: 199.90 }
        ]},
    21: { tipo: 'select', label: 'Tamanho', opcoes: [
            { nome: '300g', preco: 89.90  },
            { nome: '500g', preco: 129.90 },
            { nome: '1kg',  preco: 219.90 }
        ]},
    4:  { tipo: 'select', label: 'Sabor', opcoes: [
            { nome: 'Frutas Vermelhas', preco: 99.90 },
            { nome: 'Limao',            preco: 99.90 },
            { nome: 'Melancia',         preco: 99.90 },
            { nome: 'Sem Sabor',        preco: 94.90 }
        ]},
    22: { tipo: 'select', label: 'Sabor', opcoes: [
            { nome: 'Frutas Vermelhas', preco: 109.90 },
            { nome: 'Limao',            preco: 109.90 },
            { nome: 'Melancia',         preco: 109.90 },
            { nome: 'Uva',              preco: 109.90 }
        ]},
    23: { tipo: 'select', label: 'Sabor', opcoes: [
            { nome: 'Frutas Vermelhas', preco: 119.90 },
            { nome: 'Limao',            preco: 119.90 },
            { nome: 'Sem Sabor',        preco: 114.90 }
        ]},
    24: { tipo: 'select', label: 'Sabor', opcoes: [
            { nome: 'Frutas Vermelhas', preco: 99.90 },
            { nome: 'Melancia',         preco: 99.90 },
            { nome: 'Sem Sabor',        preco: 94.90 }
        ]},
    5:  { tipo: 'select', label: 'Sabor', opcoes: [
            { nome: 'Natural',  preco: 59.90 },
            { nome: 'Limao',    preco: 59.90 },
            { nome: 'Laranja',  preco: 59.90 }
        ]},
    6:  { tipo: 'select', label: 'Sabor', opcoes: [
            { nome: 'Chocolate', preco: 9.90 },
            { nome: 'Baunilha',  preco: 9.90 },
            { nome: 'Morango',   preco: 9.90 },
            { nome: 'Amendoim',  preco: 9.90 }
        ]},
    29: { tipo: 'select', label: 'Sabor / Tamanho', opcoes: [
            { nome: 'Chocolate 3kg', preco: 139.90 },
            { nome: 'Baunilha 3kg',  preco: 139.90 },
            { nome: 'Morango 3kg',   preco: 139.90 }
        ]},
    7:  { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 79.90 }, { nome: 'M', preco: 79.90 },
            { nome: 'G', preco: 79.90 }, { nome: 'GG', preco: 84.90 }, { nome: 'XGG', preco: 89.90 }
        ]},
    8:  { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 79.90 }, { nome: 'M', preco: 79.90 },
            { nome: 'G', preco: 79.90 }, { nome: 'GG', preco: 84.90 }, { nome: 'XGG', preco: 89.90 }
        ]},
    9:  { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 119.90 }, { nome: 'M', preco: 119.90 },
            { nome: 'G', preco: 119.90 }, { nome: 'GG', preco: 124.90 }, { nome: 'XGG', preco: 129.90 }
        ]},
    10: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 189.90 }, { nome: 'M', preco: 189.90 },
            { nome: 'G', preco: 189.90 }, { nome: 'GG', preco: 199.90 }, { nome: 'XGG', preco: 209.90 }
        ]},
    11: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 59.90 }, { nome: 'M', preco: 59.90 },
            { nome: 'G', preco: 59.90 }, { nome: 'GG', preco: 64.90 }, { nome: 'XGG', preco: 69.90 }
        ]},
    12: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: '38', preco: 89.90 }, { nome: '40', preco: 89.90 }, { nome: '42', preco: 89.90 },
            { nome: '44', preco: 94.90 }, { nome: '46', preco: 94.90 }
        ]},
    32: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'PP', preco: 89.90 }, { nome: 'P', preco: 89.90 }, { nome: 'M', preco: 89.90 },
            { nome: 'G', preco: 89.90 }, { nome: 'GG', preco: 94.90 }
        ]},
    33: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 129.90 }, { nome: 'M', preco: 129.90 },
            { nome: 'G', preco: 129.90 }, { nome: 'GG', preco: 134.90 }, { nome: 'XGG', preco: 139.90 }
        ]},
    34: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 119.90 }, { nome: 'M', preco: 119.90 },
            { nome: 'G', preco: 119.90 }, { nome: 'GG', preco: 124.90 }, { nome: 'XGG', preco: 129.90 }
        ]},
    35: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 109.90 }, { nome: 'M', preco: 109.90 },
            { nome: 'G', preco: 109.90 }, { nome: 'GG', preco: 114.90 }, { nome: 'XGG', preco: 119.90 }
        ]},
    36: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 129.90 }, { nome: 'M', preco: 129.90 },
            { nome: 'G', preco: 129.90 }, { nome: 'GG', preco: 134.90 }, { nome: 'XGG', preco: 139.90 }
        ]},
    37: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 119.90 }, { nome: 'M', preco: 119.90 },
            { nome: 'G', preco: 119.90 }, { nome: 'GG', preco: 124.90 }, { nome: 'XGG', preco: 129.90 }
        ]},
    38: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 79.90 }, { nome: 'M', preco: 79.90 },
            { nome: 'G', preco: 79.90 }, { nome: 'GG', preco: 84.90 }, { nome: 'XGG', preco: 89.90 }
        ]},
    39: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 84.90 }, { nome: 'M', preco: 84.90 },
            { nome: 'G', preco: 84.90 }, { nome: 'GG', preco: 89.90 }, { nome: 'XGG', preco: 94.90 }
        ]},
    40: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 89.90 }, { nome: 'M', preco: 89.90 },
            { nome: 'G', preco: 89.90 }, { nome: 'GG', preco: 94.90 }, { nome: 'XGG', preco: 99.90 }
        ]},
    41: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'PP', preco: 219.90 }, { nome: 'P', preco: 219.90 }, { nome: 'M', preco: 219.90 },
            { nome: 'G', preco: 219.90 }, { nome: 'GG', preco: 229.90 }
        ]},
    42: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 169.90 }, { nome: 'M', preco: 169.90 },
            { nome: 'G', preco: 169.90 }, { nome: 'GG', preco: 179.90 }, { nome: 'XGG', preco: 189.90 }
        ]},
    43: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 64.90 }, { nome: 'M', preco: 64.90 },
            { nome: 'G', preco: 64.90 }, { nome: 'GG', preco: 69.90 }, { nome: 'XGG', preco: 74.90 }
        ]},
    44: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 59.90 }, { nome: 'M', preco: 59.90 },
            { nome: 'G', preco: 59.90 }, { nome: 'GG', preco: 64.90 }, { nome: 'XGG', preco: 69.90 }
        ]},
    45: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 74.90 }, { nome: 'M', preco: 74.90 },
            { nome: 'G', preco: 74.90 }, { nome: 'GG', preco: 79.90 }, { nome: 'XGG', preco: 84.90 }
        ]},
    46: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: 'P', preco: 69.90 }, { nome: 'M', preco: 69.90 },
            { nome: 'G', preco: 69.90 }, { nome: 'GG', preco: 74.90 }, { nome: 'XGG', preco: 79.90 }
        ]},
    47: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: '38', preco: 89.90 }, { nome: '40', preco: 89.90 }, { nome: '42', preco: 89.90 },
            { nome: '44', preco: 94.90 }, { nome: '46', preco: 94.90 }
        ]},
    48: { tipo: 'botao', label: 'Tamanho', opcoes: [
            { nome: '38', preco: 94.90 }, { nome: '40', preco: 94.90 }, { nome: '42', preco: 94.90 },
            { nome: '44', preco: 99.90 }, { nome: '46', preco: 99.90 }
        ]}
};

function atualizarNav() {
    const usuario = JSON.parse(localStorage.getItem("usuario_logado"));
    document.querySelectorAll('nav a[href="cadastro.html"]').forEach(link => {
        if (usuario) { link.style.display = "none"; } else { link.style.display = ""; }
    });
    if (!usuario) return;
    const loginLinks = document.querySelectorAll('nav a[href="entrar.html"]');
    loginLinks.forEach(link => {
        const wrapper = document.createElement("div");
        wrapper.className = "user-menu-wrapper";
        wrapper.innerHTML = `
            <button class="user-menu-btn" onclick="toggleUserMenu(event)">
                👤 ${usuario.nome} <span class="user-menu-arrow">▾</span>
            </button>
            <div class="user-menu-dropdown" id="userMenuDropdown">
                <div class="user-menu-header">
                    <span class="user-menu-avatar">👤</span>
                    <div>
                        <p class="user-menu-name">${usuario.nome}</p>
                        <p class="user-menu-email">${usuario.email || ''}</p>
                    </div>
                </div>
                <div class="user-menu-divider"></div>
                <a class="user-menu-item" href="perfil.html"><span>🪪</span> Meus Dados</a>
                <a class="user-menu-item" href="pedidos.html"><span>📦</span> Minhas Compras</a>
                <div class="user-menu-divider"></div>
                <a class="user-menu-item" href="entrar.html" onclick="trocarConta(event)"><span>🔄</span> Trocar de Conta</a>
                <a class="user-menu-item user-menu-sair" href="#" onclick="encerrarSessao(event)"><span>🚪</span> Encerrar Sessão</a>
            </div>`;
        link.replaceWith(wrapper);
    });
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".user-menu-wrapper")) {
            const dd = document.getElementById("userMenuDropdown");
            if (dd) dd.classList.remove("open");
        }
    });
}

function toggleUserMenu(e) {
    e.stopPropagation();
    const dd = document.getElementById("userMenuDropdown");
    if (dd) dd.classList.toggle("open");
}

function encerrarSessao(e) {
    e.preventDefault();
    localStorage.removeItem("usuario_logado");
    window.location.href = "entrar.html";
}

function trocarConta(e) {
    e.preventDefault();
    localStorage.removeItem("usuario_logado");
    window.location.href = "entrar.html";
}

const PAGINAS_PUBLICAS = ["index.html", "entrar.html", "cadastro.html"];

function verificarLogin() {
    const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
    const publica = PAGINAS_PUBLICAS.some(p => paginaAtual === p);
    if (publica) return;
    const usuario = JSON.parse(localStorage.getItem("usuario_logado"));
    if (!usuario) { window.location.href = "entrar.html"; }
}

document.addEventListener("DOMContentLoaded", () => {
    verificarLogin();
    atualizarNav();
});

function paginadetalhes(id) {
    window.location.href = `detalhes.html?id_produto=${id}`;
}

function carregarHome() {
    const produtosSection = document.getElementById("produtos");
    produtosSection.innerHTML = '';
    fetch(API_BASE + "/listar/produtos")
    .then((response) => {
        if (!response.ok) throw new Error('Erro na resposta da API: ' + response.status);
        return response.json();
    })
    .then((produtos) => {
        let grid = `<div class="products">`;
        produtos.forEach((item) => {
            const categoria = CATEGORIAS_PRODUTO[item.id_produtos] || 'suplemento';
            const imagem = IMAGENS_PRODUTOS[item.id_produtos] || `img/produtos/${item.id_produtos}.png`;
            grid += `<div class="product" data-categoria="${categoria}" onclick="paginadetalhes(${item.id_produtos})">
                <img src="${imagem}" alt="${item.nome_produto}">
                <h3>${item.nome_produto}</h3>
                <p>${item.marca || 'LifeUp'}</p>
                <span class="price">R$ ${parseFloat(item.preco).toFixed(2)}</span>
                <a href="detalhes.html?id_produto=${item.id_produtos}" onclick="event.stopPropagation()" class="btn">Ver Detalhes</a>
            </div>`;
        });
        grid += `</div>`;
        produtosSection.innerHTML = grid;
        filtrar('todos', document.querySelector('.filtro.ativo'));
    })
    .catch((e) => {
        console.error(`Erro ao carregar produtos-> ${e}`);
        produtosSection.innerHTML = '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
    });
}

function trocafoto(foto) { document.getElementById("fotocapa").src = foto; }
function exibirfoto(foto) { alert(document.getElementById("fotocapa").src); }

function carregarDetalhes() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id_produto');
    const detalhesproduto = document.getElementById("detalhesproduto");
    if (!id) { detalhesproduto.innerHTML = '<p class="detalhe-erro">Produto não encontrado.</p>'; return; }
    fetch(API_BASE + "/listar/produtos/" + id)
    .then((response) => {
        if (!response.ok) throw new Error('Erro na resposta da API: ' + response.status);
        return response.json();
    })
    .then((item) => {
        const imagem    = IMAGENS_PRODUTOS[item.id_produtos] || `img/produtos/${item.id_produtos}.png`;
        const precoUnit = parseFloat(item.preco);
        const variante  = VARIANTES_PRODUTO[item.id_produtos];
        let varianteHTML = '';
        let precoInicial = precoUnit;
        if (variante) {
            const primeira = variante.opcoes[0];
            precoInicial = primeira.preco;
            if (variante.tipo === 'botao') {
                const botoesHTML = variante.opcoes.map((op, i) =>
                    `<button class="variante-btn${i === 0 ? ' ativo' : ''}" data-preco="${op.preco}" onclick="selecionarVariante(this, '${op.nome}', ${op.preco})">${op.nome}${op.preco !== primeira.preco ? `<span class="variante-preco-diff">R$ ${op.preco.toFixed(2).replace('.',',')}</span>` : ''}</button>`
                ).join('');
                varianteHTML = `<div class="variante-section"><p class="variante-label">${variante.label}: <strong id="variante-selecionada">${primeira.nome}</strong></p><div class="variante-btns">${botoesHTML}</div></div>`;
            } else {
                const opcoesHTML = variante.opcoes.map((op, i) =>
                    `<option value="${op.nome}" data-preco="${op.preco}"${i === 0 ? ' selected' : ''}>${op.nome} — R$ ${op.preco.toFixed(2).replace('.',',')}</option>`
                ).join('');
                varianteHTML = `<div class="variante-section"><label class="variante-label" for="variante-select">${variante.label}</label><select id="variante-select" class="variante-select" onchange="atualizarPrecoVariante(this)">${opcoesHTML}</select><span id="variante-selecionada" style="display:none">${primeira.nome}</span></div>`;
            }
        }
        detalhesproduto.innerHTML = `
        <div class="detalhe-container">
            <div class="detalhe-img"><img src="${imagem}" id="fotocapa" alt="${item.nome_produto}"></div>
            <div class="detalhe-info">
                <h2>${item.nome_produto}</h2>
                <p class="detalhe-marca">${item.marca || 'LifeUp'}</p>
                <p class="detalhe-desc">${item.descricao_produto}</p>
                <p class="detalhe-estoque">Estoque: ${item.estoque} unidades</p>
                ${varianteHTML}
                <span class="detalhe-preco" id="precoFinal">R$ ${precoInicial.toFixed(2).replace('.', ',')}</span>
                <span class="detalhe-preco-unit" id="preco-unit-ref">R$ ${precoInicial.toFixed(2).replace('.', ',')} / unidade</span>
                <span class="desconto-badge" id="desconto-badge" style="display:none"></span>
                <div class="detalhe-quantidade">
                    <button class="qty-btn" onclick="alterarQty(-1, window._precoAtual || ${precoInicial}, ${item.estoque})">−</button>
                    <span id="qtyValor">1</span>
                    <button class="qty-btn" onclick="alterarQty(1, window._precoAtual || ${precoInicial}, ${item.estoque})">+</button>
                </div>
                <div class="detalhe-btns">
                    <a href="#" onclick="event.preventDefault(); adicionarComQty(${item.id_produtos})" class="btn">Adicionar ao Carrinho</a>
                    <a href="carrinho.html" class="btn btn-outline">Ver Carrinho</a>
                </div>
            </div>
        </div>`;
    })
    .catch((e) => {
        console.error(`Erro ao carregar detalhes-> ${e}`);
        detalhesproduto.innerHTML = '<p class="detalhe-erro">Erro ao carregar detalhes do produto. Tente novamente mais tarde.</p>';
    });
}

function adicionar(
