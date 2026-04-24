const API_BASE = "http://127.0.0.1:5000";

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
    // Suplementos originais
    1: "img/whey.png",           // Whey Protein Concentrado
    2: "img/whey3.png",          // Whey Protein Isolado
    3: "img/creatina.png",       // Creatina Monohidratada
    4: "img/pre.treino.png",     // Pré-Treino Pepay Perips
    5: "img/bcaa.png",           // BCAA LifeUp
    6: "img/barrinha.png",       // Barrinha de Proteína
    // Roupas originais
    7: "img/camisaazul.png",     // Camiseta de Treino Azul
    8: "img/camisapreta.png",    // Camiseta de Treino Preta
    9: "img/calca1.png",         // Calça de Treino
    10: "img/conju.png",         // Conjunto de Treino
    11: "img/regata1.png",       // Regata de Treino
    12: "img/shortazul.png",     // Short de Treino
    // Vitaminas
    13: "img/vitac.png",         // Vitamina C 1000mg
    14: "img/vitad.png",         // Vitamina D3 + K2
    15: "img/omega.png",         // Ômega 3 Fish Oil
    16: "img/multivita.png",     // Multivitamínico
    17: "img/magnesio.png",      // Magnésio Quelato
    18: "img/b12.png",           // Vitamina B12
    // Suplementos novos
    19: "img/whey4.png",         // Whey Protein 3W
    20: "img/whey2.png",         // Whey Protein Zero Lactose
    21: "img/creatina2.png",     // Creatina Micronizada
    22: "img/pre2.png",          // Pré-Treino Explosive
    23: "img/pre3.png",          // Pré-Treino Black
    24: "img/pre4.png",          // Pré-Treino Pump
    25: "img/cafeina.png",       // Cafeína 200mg
    26: "img/cafeina2.png",      // Cafeína + L-Teanina
    27: "img/termo.png",         // Termogênico LifeUp
    28: "img/multi.png",         // Multivitamínico Sport
    29: "img/Hiper.png",         // Hipercalórico Mass
    30: "img/clore.png",         // Clorofila Líquida
    31: "img/coen.png",          // Coenzima Q10
    // Roupas novas
    32: "img/blu1.png",          // Blusa de Treino Feminina
    33: "img/blu2.png",          // Blusa de Frio Moletom
    34: "img/blu3.png",          // Blusa de Frio Zip
    35: "img/calca2.png",        // Calça de Treino Slim
    36: "img/calca3.png",        // Calça de Treino Cargo
    37: "img/calca4.png",        // Calça de Treino Jogger
    38: "img/camisacinza2.png",  // Camiseta Cinza Mescla
    39: "img/camisetacinza.png", // Camiseta Cinza Slim
    40: "img/camisetacolorida.png", // Camiseta Colorida
    41: "img/conju2.png",        // Conjunto de Treino Premium
    42: "img/conju3.png",        // Conjunto de Treino Sport
    43: "img/regata2.png",       // Regata Dry-Fit
    44: "img/regata3.png",       // Regata Muscle
    45: "img/regata4.png",       // Regata Compressão
    46: "img/regata5.png",       // Regata Performance
    47: "img/shortpreto.png",    // Short Preto Treino
    48: "img/shortpreto2.png"    // Short Preto Slim
};

// Mapeamento de id_produtos → slugs dos filtros do loja.html
const CATEGORIAS_PRODUTO = {
    // Suplementos
    1: "suplemento whey",
    2: "suplemento whey",
    3: "suplemento creatina",
    4: "suplemento pre-treino",
    5: "suplemento",
    6: "suplemento",
    // Roupas
    7: "roupa",
    8: "roupa",
    9: "roupa",
    10: "roupa",
    11: "roupa",
    12: "roupa",
    // Vitaminas
    13: "suplemento vitamina",
    14: "suplemento vitamina",
    15: "suplemento vitamina",
    16: "suplemento vitamina",
    17: "suplemento vitamina",
    18: "suplemento vitamina",
    // Suplementos novos
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
    // Roupas novas
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

// Variantes por produto: tamanhos de roupas e sabores/tamanhos de suplementos
// Formato: { label, tipo, opcoes: [{ nome, preco }] }
const VARIANTES_PRODUTO = {
    // Whey
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
    // Creatina
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
    // Pre-Treino
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
    // Outros suplementos
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
    // Roupas — tamanhos com preço fixo por produto
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

// Atualiza o link de Login no nav para mostrar o nome do usuário logado
function atualizarNav() {
    const usuario = JSON.parse(localStorage.getItem("usuario_logado"));

    // Remove o link de Cadastro se estiver logado
    document.querySelectorAll('nav a[href="cadastro.html"]').forEach(link => {
        if (usuario) {
            link.style.display = "none";
        } else {
            link.style.display = "";
        }
    });

    if (!usuario) return;

    const loginLinks = document.querySelectorAll('nav a[href="entrar.html"]');
    loginLinks.forEach(link => {
        // Substitui o link por um wrapper com dropdown
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
                <a class="user-menu-item" href="perfil.html">
                    <span>🪪</span> Meus Dados
                </a>
                <a class="user-menu-item" href="pedidos.html">
                    <span>📦</span> Minhas Compras
                </a>
                <div class="user-menu-divider"></div>
                <a class="user-menu-item" href="entrar.html" onclick="trocarConta(event)">
                    <span>🔄</span> Trocar de Conta
                </a>
                <a class="user-menu-item user-menu-sair" href="#" onclick="encerrarSessao(event)">
                    <span>🚪</span> Encerrar Sessão
                </a>
            </div>
        `;
        link.replaceWith(wrapper);
    });

    // Fecha o dropdown ao clicar fora
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

// Páginas que não precisam de login
const PAGINAS_PUBLICAS = ["site.html", "entrar.html", "cadastro.html"];

// Verifica se a página atual exige login e redireciona se necessário
function verificarLogin() {
    const paginaAtual = window.location.pathname.split("/").pop() || "site.html";
    const publica = PAGINAS_PUBLICAS.some(p => paginaAtual === p);
    if (publica) return;

    const usuario = JSON.parse(localStorage.getItem("usuario_logado"));
    if (!usuario) {
        window.location.href = "entrar.html";
    }
}

// Executa assim que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    verificarLogin();
    atualizarNav();
});

function paginadetalhes(id){
    window.location.href=`detalhes.html?id_produto=${id}`;
}

function carregarHome(){
    const produtosSection = document.getElementById("produtos")
    produtosSection.innerHTML = ''

    fetch(API_BASE + "/listar/produtos")
    .then((response) => {
        if (!response.ok) {
            throw new Error('Erro na resposta da API: ' + response.status);
        }
        return response.json();
    })
    .then((produtos) => {
        let grid = `<div class="products">`

        produtos.forEach((item) => {
            const categoria = CATEGORIAS_PRODUTO[item.id_produtos] || 'suplemento'
            const imagem = IMAGENS_PRODUTOS[item.id_produtos] || `img/produtos/${item.id_produtos}.png`

            let card = `<div class="product" data-categoria="${categoria}" onclick="paginadetalhes(${item.id_produtos})">
                <img src="${imagem}" alt="${item.nome_produto}">
                <h3>${item.nome_produto}</h3>
                <p>${item.marca || 'LifeUp'}</p>
                <span class="price">R$ ${parseFloat(item.preco).toFixed(2)}</span>
                <a href="detalhes.html?id_produto=${item.id_produtos}" onclick="event.stopPropagation()" class="btn">Ver Detalhes</a>
            </div>`

            grid += card
        })

        grid += `</div>`
        produtosSection.innerHTML = grid

        // Atualiza o contador após os produtos serem inseridos no DOM
        filtrar('todos', document.querySelector('.filtro.ativo'))
    })
    .catch((e) => {
        console.error(`Erro ao carregar produtos-> ${e}`)
        produtosSection.innerHTML = '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
    })
}

function trocafoto(foto){
    document.getElementById("fotocapa").src = foto
}

function exibirfoto(foto){
    alert(document.getElementById("fotocapa").src)
}

function carregarDetalhes(){
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id_produto')

    const detalhesproduto = document.getElementById("detalhesproduto")

    if (!id) {
        detalhesproduto.innerHTML = '<p class="detalhe-erro">Produto não encontrado.</p>'
        return
    }

    fetch(API_BASE + "/listar/produtos/" + id)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Erro na resposta da API: ' + response.status)
        }
        return response.json()
    })
    .then((item) => {
        const imagem    = IMAGENS_PRODUTOS[item.id_produtos] || `img/produtos/${item.id_produtos}.png`
        const precoUnit = parseFloat(item.preco)
        const variante  = VARIANTES_PRODUTO[item.id_produtos]

        // Gera o seletor de variante (tamanho/sabor) se existir
        let varianteHTML = ''
        let precoInicial = precoUnit  // pode ser sobrescrito pela primeira variante

        if (variante) {
            const primeira = variante.opcoes[0]
            precoInicial = primeira.preco  // usa o preço da primeira opção

            if (variante.tipo === 'botao') {
                const botoesHTML = variante.opcoes.map((op, i) =>
                    `<button class="variante-btn${i === 0 ? ' ativo' : ''}"
                        data-preco="${op.preco}"
                        onclick="selecionarVariante(this, '${op.nome}', ${op.preco})">${op.nome}
                        ${op.preco !== primeira.preco ? `<span class="variante-preco-diff">R$ ${op.preco.toFixed(2).replace('.',',')}</span>` : ''}
                    </button>`
                ).join('')
                varianteHTML = `
                <div class="variante-section">
                    <p class="variante-label">${variante.label}: <strong id="variante-selecionada">${primeira.nome}</strong></p>
                    <div class="variante-btns">${botoesHTML}</div>
                </div>`
            } else {
                const opcoesHTML = variante.opcoes.map((op, i) =>
                    `<option value="${op.nome}" data-preco="${op.preco}"${i === 0 ? ' selected' : ''}>
                        ${op.nome} — R$ ${op.preco.toFixed(2).replace('.',',')}
                    </option>`
                ).join('')
                varianteHTML = `
                <div class="variante-section">
                    <label class="variante-label" for="variante-select">${variante.label}</label>
                    <select id="variante-select" class="variante-select"
                        onchange="atualizarPrecoVariante(this)">
                        ${opcoesHTML}
                    </select>
                    <span id="variante-selecionada" style="display:none">${primeira.nome}</span>
                </div>`
            }
        }

        detalhesproduto.innerHTML = `
        <div class="detalhe-container">
            <div class="detalhe-img">
                <img src="${imagem}" id="fotocapa" alt="${item.nome_produto}">
            </div>
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
        </div>`
    })
    .catch((e) => {
        console.error(`Erro ao carregar detalhes-> ${e}`)
        detalhesproduto.innerHTML = '<p class="detalhe-erro">Erro ao carregar detalhes do produto. Tente novamente mais tarde.</p>'
    })
}

function adicionar(id_produto){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemExistente = cart.find(item => item.id_produtos === id_produto);

    if (itemExistente) {
        itemExistente.quantidade++;
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${itemExistente.name} — quantidade atualizada para ${itemExistente.quantidade}!`);
        return;
    }

    fetch("http://127.0.0.1:5000/listar/produtos/" + id_produto)
    .then((response) => {
        if (!response.ok) throw new Error('Erro na resposta da API: ' + response.status);
        return response.json();
    })
    .then((produto) => {
        cart.push({
            id_produtos: produto.id_produtos,
            name: produto.nome_produto,
            price: parseFloat(produto.preco),
            priceOriginal: parseFloat(produto.preco),
            desconto: 0,
            imagem: IMAGENS_PRODUTOS[produto.id_produtos] || `img/produtos/${produto.id_produtos}.png`,
            quantidade: 1
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${produto.nome_produto} adicionado ao carrinho!`);
    })
    .catch((e) => {
        console.error(`Erro ao adicionar-> ${e}`);
        alert('Erro ao adicionar produto ao carrinho. Tente novamente.');
    });
}

function alterarQty(delta, precoUnit, estoque) {
    const el = document.getElementById("qtyValor")
    let qty = parseInt(el.textContent) + delta
    if (qty < 1) qty = 1
    if (qty > estoque) qty = estoque
    el.textContent = qty

    const preco = window._precoAtual || precoUnit
    const { totalComDesconto, pct } = aplicarDesconto(preco, qty)
    document.getElementById("precoFinal").textContent =
        "R$ " + totalComDesconto.toFixed(2).replace('.', ',')

    const badge = document.getElementById("desconto-badge")
    if (badge) {
        if (pct > 0) {
            badge.textContent = `${pct}% de desconto aplicado`
            badge.style.display = "inline-block"
        } else {
            badge.style.display = "none"
        }
    }
}

function adicionarComQty(id_produto) {
    const qty = parseInt(document.getElementById("qtyValor").textContent)
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    let itemExistente = cart.find(item => item.id_produtos === id_produto)

    const finalizar = (nome, precoUnit) => {
        const { totalComDesconto, pct } = aplicarDesconto(precoUnit, qty)
        const precoFinal = totalComDesconto / qty
        const variante   = obterVarianteSelecionada()

        // Valida se variante é obrigatória
        if (VARIANTES_PRODUTO[id_produto] && !variante) {
            alert('Selecione um tamanho ou sabor antes de adicionar ao carrinho.')
            return
        }

        if (itemExistente) {
            itemExistente.quantidade = qty
            itemExistente.price      = precoFinal
            itemExistente.desconto   = pct
            if (variante) itemExistente.variante = variante
        } else {
            cart.push({
                id_produtos:   id_produto,
                name:          variante ? `${nome} — ${variante}` : nome,
                nameBase:      nome,
                variante:      variante || null,
                price:         precoFinal,
                priceOriginal: precoUnit,
                desconto:      pct,
                imagem:        IMAGENS_PRODUTOS[id_produto] || `img/produtos/${id_produto}.png`,
                quantidade:    qty
            })
        }
        localStorage.setItem("cart", JSON.stringify(cart))
        document.getElementById("modal-nome-produto").textContent = variante ? `${nome} — ${variante}` : nome
        document.getElementById("modal-qty").textContent = qty
        document.getElementById("modal-carrinho").style.display = "flex"
    }

    if (itemExistente) {
        finalizar(itemExistente.nameBase || itemExistente.name, obterPrecoVariante() || itemExistente.priceOriginal || itemExistente.price)
        return
    }

    fetch(API_BASE + "/listar/produtos/" + id_produto)
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
    .then(produto => {
        const precoBase = obterPrecoVariante() || parseFloat(produto.preco)
        finalizar(produto.nome_produto, precoBase)
    })
    .catch(e => {
        console.error(`Erro ao adicionar-> ${e}`)
        alert('Erro ao adicionar produto ao carrinho. Tente novamente.')
    })
}

function fecharModal() {
    document.getElementById("modal-carrinho").style.display = "none"
}

function selecionarVariante(btn, valor, preco) {
    document.querySelectorAll('.variante-btn').forEach(b => b.classList.remove('ativo'))
    btn.classList.add('ativo')
    const span = document.getElementById('variante-selecionada')
    if (span) span.textContent = valor
    if (preco) _atualizarPrecoDetalhe(preco)
}

function atualizarPrecoVariante(select) {
    const opt   = select.options[select.selectedIndex]
    const preco = parseFloat(opt.dataset.preco)
    const span  = document.getElementById('variante-selecionada')
    if (span) span.textContent = opt.value
    if (preco) _atualizarPrecoDetalhe(preco)
}

function _atualizarPrecoDetalhe(preco) {
    window._precoAtual = preco
    const qty = parseInt(document.getElementById('qtyValor')?.textContent) || 1
    const { totalComDesconto, pct } = aplicarDesconto(preco, qty)
    document.getElementById('precoFinal').textContent = 'R$ ' + totalComDesconto.toFixed(2).replace('.', ',')
    document.getElementById('preco-unit-ref').textContent = 'R$ ' + preco.toFixed(2).replace('.', ',') + ' / unidade'
    const badge = document.getElementById('desconto-badge')
    if (badge) {
        badge.textContent = pct > 0 ? `${pct}% de desconto aplicado` : ''
        badge.style.display = pct > 0 ? 'inline-block' : 'none'
    }
}

function obterVarianteSelecionada() {
    const sel = document.getElementById('variante-select')
    if (sel) return sel.options[sel.selectedIndex]?.value || null
    const span = document.getElementById('variante-selecionada')
    if (span && span.textContent) return span.textContent
    return null
}

function obterPrecoVariante() {
    // Retorna o preço da variante selecionada ou o preço atual
    if (window._precoAtual) return window._precoAtual
    const sel = document.getElementById('variante-select')
    if (sel) return parseFloat(sel.options[sel.selectedIndex]?.dataset.preco) || null
    const btn = document.querySelector('.variante-btn.ativo')
    if (btn) return parseFloat(btn.dataset.preco) || null
    return null
}

// ── Botão voltar (histórico) ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;

  const btnVoltar = document.createElement('button');
  btnVoltar.className = 'btn-voltar-hist';
  btnVoltar.title = 'Voltar';
  btnVoltar.innerHTML = '&#8592;';
  btnVoltar.addEventListener('click', () => history.back());

  const btnAvancar = document.createElement('button');
  btnAvancar.className = 'btn-voltar-hist btn-avancar-hist';
  btnAvancar.title = 'Avançar';
  btnAvancar.innerHTML = '&#8594;';
  btnAvancar.addEventListener('click', () => history.forward());

  // Agrupa os dois num wrapper lado a lado
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-hist-wrapper';
  navWrapper.appendChild(btnVoltar);
  navWrapper.appendChild(btnAvancar);
  header.insertBefore(navWrapper, header.firstChild);

  function atualizarBotao() {
    const temHistorico = history.length > 1;
    btnVoltar.classList.toggle('visivel', temHistorico);
    btnAvancar.classList.toggle('visivel', temHistorico);
  }

  atualizarBotao();
  window.addEventListener('popstate', atualizarBotao);
});

// ── Suporte global à tecla Enter ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const pagina = window.location.pathname.split('/').pop() || 'site.html';

    // ── entrar.html ──────────────────────────────────────────────────────────
    if (pagina === 'entrar.html') {
      // Modal de recuperar senha aberto
      const modalRec = document.getElementById('modal-recuperar');
      if (modalRec && modalRec.style.display === 'flex') {
        const btnRec = document.getElementById('btn-rec');
        if (btnRec) btnRec.click();
        return;
      }
      // Formulário de login
      if (typeof entrar === 'function') entrar();
      return;
    }

    // ── cadastro.html ────────────────────────────────────────────────────────
    if (pagina === 'cadastro.html') {
      // Modal de recuperar senha aberto
      const modalCad = document.getElementById('modal-recuperar-cad');
      if (modalCad && modalCad.style.display === 'flex') {
        const btnCad = document.getElementById('cad-btn-rec');
        if (btnCad) btnCad.click();
        return;
      }
      if (typeof cadastrar === 'function') cadastrar();
      return;
    }

    // ── carrinho.html ────────────────────────────────────────────────────────
    if (pagina === 'carrinho.html') {
      // Fechar modais com Escape já é padrão; Enter fecha modal de aviso
      const modalCep = document.getElementById('modal-cep');
      if (modalCep && modalCep.style.display === 'flex') {
        if (typeof fecharModalCep === 'function') fecharModalCep();
        return;
      }
      const modalVazio = document.getElementById('modal-carrinho-vazio');
      if (modalVazio && modalVazio.style.display === 'flex') {
        if (typeof fecharCarrinhoVazio === 'function') fecharCarrinhoVazio();
        return;
      }
      // Campo de CEP — busca ao pressionar Enter
      if (document.activeElement?.id === 'frete-cep') {
        if (typeof buscarCEP === 'function') buscarCEP();
        return;
      }
      // Campo de cupom
      if (document.activeElement?.id === 'cupom-input') {
        if (typeof aplicarCupom === 'function') aplicarCupom();
        return;
      }
      // Finalizar compra (quando nenhum campo específico está focado)
      const checkout = document.getElementById('checkout');
      if (checkout && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'SELECT') {
        checkout.click();
      }
      return;
    }

    // ── site.html ────────────────────────────────────────────────────────────
    if (pagina === 'site.html' || pagina === '') {
      if (document.activeElement?.id === 'searchInput') {
        if (typeof pesquisar === 'function') pesquisar();
      }
      return;
    }

    // ── loja.html ────────────────────────────────────────────────────────────
    if (pagina === 'loja.html') {
      if (document.activeElement?.id === 'searchInput' || document.activeElement?.id === 'busca') {
        const btn = document.querySelector('.search-box button');
        if (btn) btn.click();
      }
      return;
    }

    // ── detalhes.html ────────────────────────────────────────────────────────
    if (pagina === 'detalhes.html') {
      // Modal de carrinho aberto — fecha com Enter
      const modalCart = document.getElementById('modal-carrinho');
      if (modalCart && modalCart.style.display === 'flex') {
        if (typeof fecharModal === 'function') fecharModal();
        return;
      }
      // Adiciona ao carrinho
      const btnAdd = document.querySelector('.detalhe-btns .btn');
      if (btnAdd && document.activeElement?.tagName !== 'SELECT') btnAdd.click();
      return;
    }

    // ── perfil.html ──────────────────────────────────────────────────────────
    if (pagina === 'perfil.html') {
      const btnSalvar = document.querySelector('button[onclick*="salvar"], button[onclick*="Salvar"]');
      if (btnSalvar && document.activeElement?.tagName === 'INPUT') btnSalvar.click();
      return;
    }
  });

  // Alt + Seta esquerda = voltar / Alt + Seta direita = avançar
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'ArrowLeft'  && history.length > 1) history.back();
    if (e.altKey && e.key === 'ArrowRight' && history.length > 1) history.forward();
  });

  // Fechar qualquer modal visível com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;    [
      { id: 'modal-recuperar',      fn: 'fecharRecuperar' },
      { id: 'modal-recuperar-cad',  fn: 'fecharRecuperarCad' },
      { id: 'modal-cep',            fn: 'fecharModalCep' },
      { id: 'modal-carrinho-vazio', fn: 'fecharCarrinhoVazio' },
      { id: 'modal-boleto',         fn: 'fecharBoleto' },
      { id: 'modal-sucesso',        fn: 'fecharSucesso' },
      { id: 'modal-carrinho',       fn: 'fecharModal' },
      { id: 'modal-responsabilidade', fn: null },
    ].forEach(({ id, fn }) => {
      const el = document.getElementById(id);
      if (el && el.style.display === 'flex') {
        if (fn && typeof window[fn] === 'function') window[fn]();
        else el.style.display = 'none';
      }
    });
  });
});
