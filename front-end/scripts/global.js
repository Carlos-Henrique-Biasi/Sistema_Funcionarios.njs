// ==========================================================================
// 1. SEGURANÇA E BOAS-VINDAS
// ==========================================================================

// Abrimos a mochila e pegamos as informações que o login guardou
const idDaEmpresa = localStorage.getItem("id_empresa_logada");
const nomeDaEmpresa = localStorage.getItem("nome_empresa_logada");

// Se não tiver ID, é porque tentaram acessar o painel sem logar. Manda de volta!
if (!idDaEmpresa) {
    window.location.href = "index.html";
}

// Pegamos aquele <h2> vazio do HTML
const tituloBoasVindas = document.getElementById("mensagem-boas-vindas");
if (tituloBoasVindas && nomeDaEmpresa) {
    tituloBoasVindas.innerText = "Bem-vindo, " + nomeDaEmpresa + "!";
}


// ==========================================================================
// 2. NOVA PARTE: CONTROLE DO MENU LATERAL E NAVEGAÇÃO DE ABAS
// ==========================================================================

// Selecionamos o botão de 3 barrinhas e a barra do menu lateral
const btnMenu = document.getElementById("btnMenu");
const menuLateral = document.getElementById("menuLateral");

// Evento para abrir e fechar o menu hambúrguer ao clicar
if (btnMenu && menuLateral) {
    btnMenu.addEventListener("click", () => {
        menuLateral.classList.toggle("aberto"); // Adiciona/remove a classe que puxa o menu
    });
}

// Agrupamos todas as seções (as divs das telas) que vamos esconder/mostrar
const secoes = {
    funcionarios: document.getElementById("secaoFuncionarios"),
    faturamentos: document.getElementById("secaoFaturamentos"),
    despesas: document.getElementById("secaoDespesas"),
    receita: document.getElementById("secaoReceita")
};

// Agrupamos os botões (as opções) do menu lateral
const botoesAba = {
    funcionarios: document.getElementById("abaFuncionarios"),
    faturamentos: document.getElementById("abaFaturamentos"),
    despesas: document.getElementById("abaDespesas"),
    receita: document.getElementById("abaReceita")
};

// Função responsável por trocar de tela
function navegarPara(telaEscolhida) {
    // 1. Esconde TODAS as telas e tira o destaque de TODOS os botões
    for (let key in secoes) {
        if (secoes[key]) secoes[key].style.display = "none";
        if (botoesAba[key]) botoesAba[key].classList.remove("ativa");
    }
    
    // 2. Mostra APENAS a tela escolhida e destaca o botão que foi clicado
    if (secoes[telaEscolhida]) secoes[telaEscolhida].style.display = "block";
    if (botoesAba[telaEscolhida]) botoesAba[telaEscolhida].classList.add("ativa");

    // 3. Fecha o menu lateral automaticamente após a escolha (ideal para não atrapalhar a visão)
    if (menuLateral) menuLateral.classList.remove("aberto");
}

// Adicionamos a "escuta" de clique para cada botão do menu disparar a função de navegação
if (botoesAba.funcionarios) botoesAba.funcionarios.addEventListener("click", () => navegarPara("funcionarios"));
if (botoesAba.faturamentos) botoesAba.faturamentos.addEventListener("click", () => navegarPara("faturamentos"));
if (botoesAba.despesas) botoesAba.despesas.addEventListener("click", () => navegarPara("despesas"));
if (botoesAba.receita) botoesAba.receita.addEventListener("click", () => navegarPara("receita"));