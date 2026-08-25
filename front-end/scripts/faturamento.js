//======================================= BOTÕES DE FATURAMENTO ===================================
const botaoBuscarF = document.getElementById('btnBuscaFat')
const botaoCadastrarF = document.getElementById('btnCadastrarFat')
const botaoBuscarIDF = document.getElementById('btnBuscarIdFat') // busca primeiro para depois gerar os elementos dinâmicos
const botaoBuscarIDF2 = document.getElementById('btnVExcluirFat') // Mesma coisa porém com exclusão
const botaoResultadoF = document.getElementById('btnTotalFat')
const botaoBuscarFS = document.getElementById('btnListarFat')
//======================================= BOTÕES DE FATURAMENTO ===================================

//================================ AÇÕES DOS BOTÕES DE FATURAMENTO ================================
botaoBuscarF.addEventListener("click", buscarFaturamento)
botaoCadastrarF.addEventListener("click", cadastrarFaturamento)
botaoBuscarIDF.addEventListener("click", buscarFaturamentoAtualizacao)
botaoBuscarIDF2.addEventListener("click", buscarFaturamentoExclusao)
botaoResultadoF.addEventListener("click", resultadoFaturamento)
botaoBuscarFS.addEventListener("clcik", listarFaturamentos)
//================================ AÇÕES DOS BOTÕES DE FATURAMENTO ================================
