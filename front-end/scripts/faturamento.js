//======================================= BOTÕES DE FATURAMENTO ===================================
const botaoBuscarF = document.getElementById('btnBuscarFat')
const botaoCadastrarF = document.getElementById('btnCadastrarFat')
const botaoBuscarIDF = document.getElementById('btnBuscarIdFat') // busca primeiro para depois gerar os elementos dinâmicos
const botaoBuscarIDF2 = document.getElementById('btnVExcluirFat') // Mesma coisa porém com exclusão
const botaoResultadoF = document.getElementById('btnTotalFat')
const botaoBuscarFS = document.getElementById('btnListarFat')
//======================================= BOTÕES DE FATURAMENTO ===================================

//=================================== ELEMENTOS DE FATURAMENTO ====================================

//BUSCAR FATURAMENTO
const fatValor = document.getElementById("fatValor")
const fatMotivo= document.getElementById("fatMotivo")
const fatData= document.getElementById("fatData")
//BUSCAR FATURAMENTO

//CADASTRAR FATURAMENTO
const msgCadastroFat = document.getElementById("msgCadFat")
//CADASTRAR FATURAMENTO

//ATUALIZAR FATURAMENTO
const infoAtualizarFat = document.getElementById("infoAtualizarFat")
//ATUALIZAR FATURAMENTO

//EXCLUIR FATURAMENTO
const divExcluirFat = document.getElementById("divExcluirFat")
//EXCLUIR FATURAMENTO

//RESULTADO DE FATURAMENTO
const qntregistros = document.getElementById("infoQtdFat")
const valorTotal = document.getElementById("infoTotalFat")
//RESULTADO DE FATURAMENTO

//LISTAR FATURAMENTO
const listaFaturamento = document.getElementById("listaFat")
//LISTAR FATURAMENTO

//=================================== ELEMENTOS DE FATURAMENTO ====================================

//================================ AÇÕES DOS BOTÕES DE FATURAMENTO ================================
botaoBuscarF.addEventListener("click", buscarFaturamento)
botaoCadastrarF.addEventListener("click", cadastrarFaturamento)
botaoBuscarIDF.addEventListener("click", buscarFaturamentoAtualizacao)
botaoBuscarIDF2.addEventListener("click", buscarFaturamentoExclusao)
botaoResultadoF.addEventListener("click", resultadoFaturamento)
botaoBuscarFS.addEventListener("click", listarFaturamentos)
//================================ AÇÕES DOS BOTÕES DE FATURAMENTO ================================

//============================== FUNÇÕES DOS BOTÕES DE FATURAMENTO ================================
async function buscarFaturamento(){
    //limpar areas que podem estar preenchidas
    //validar informações usando if's
    //validado, fazer fatch, para jogar informações para back end
    //se nescessário, fazer o fatch complexo, mostrando o método e demais infos
    //devolver o status com json
}

async function cadastrarFaturamento(){
    //limpar areas que podem estar preenchidas
    //validar informações usando if's
    //validado, fazer fatch, para jogar informações para back end
    //se nescessário, fazer o fatch complexo, mostrando o método e demais infos
    //devolver o status com json
}

async function buscarFaturamentoAtualizacao(){
    //limpar areas que podem estar preenchidas
    //validar informações usando if's
    //validado, fazer fatch, para jogar informações para back end
    //se nescessário, fazer o fatch complexo, mostrando o método e demais infos
    //devolver o status com json
}

async function buscarFaturamentoExclusao(){
    //limpar areas que podem estar preenchidas
    //validar informações usando if's
    //validado, fazer fatch, para jogar informações para back end
    //se nescessário, fazer o fatch complexo, mostrando o método e demais infos
    //devolver o status com json
}

async function resultadoFaturamento(){
    //limpar areas que podem estar preenchidas
    //validar informações usando if's
    //validado, fazer fatch, para jogar informações para back end
    //se nescessário, fazer o fatch complexo, mostrando o método e demais infos
    //devolver o status com json
}

async function listarFaturamentos(){
    //limpar areas que podem estar preenchidas
    //validar informações usando if's
    //validado, fazer fatch, para jogar informações para back end
    //se nescessário, fazer o fatch complexo, mostrando o método e demais infos
    //devolver o status com json
}

//============================== FUNÇÕES DOS BOTÕES DE FATURAMENTO ================================