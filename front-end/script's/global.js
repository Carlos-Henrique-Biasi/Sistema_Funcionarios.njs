// 1. Abrimos a mochila e pegamos as informações que o login guardou
const idDaEmpresa = localStorage.getItem("id_empresa_logada");
const nomeDaEmpresa = localStorage.getItem("nome_empresa_logada");

// 2. Se não tiver ID, é porque tentaram acessar o painel sem logar. Manda de volta!
if (!idDaEmpresa) {
    window.location.href = "index.html";
}

// 3. Pegamos aquele <h2> vazio do HTML
const tituloBoasVindas = document.getElementById("mensagem-boas-vindas");
if (tituloBoasVindas && nomeDaEmpresa) {
    tituloBoasVindas.innerText = "Bem-vindo, " + nomeDaEmpresa + "!";
}