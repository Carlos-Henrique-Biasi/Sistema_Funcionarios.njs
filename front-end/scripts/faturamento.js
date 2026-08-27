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
    fatValor.textContent = ""
    fatMotivo.textContent = ""
    fatData.textContent = ""
    
    const id = document.getElementById('idBuscaFat').value

    if(!id){
        fatValor.textContent = "Digite um valor de id"
        fatMotivo.textContent = ""
        fatData.textContent = ""
        return
    }

    try{
        const resposta = await fetch(`http://localhost:3000/faturamentos/${id}/empresa/${idDaEmpresa}`)
        const faturamento = await resposta.json()

        if(!resposta.ok){
            fatValor.textContent = faturamento.erro || "Faturamento não encontrado."
        } else {
            // Desestruturação dos dados retornados pelo backend
            const { valor, motivo, data } = faturamento

            fatValor.textContent = `Valor: R$ ${valor}`
            fatMotivo.textContent = `Motivo: ${motivo || 'Não informado'}`
            
            // Formatando a data do banco para exibição (ex: DD/MM/AAAA)
            const dataFormatada = new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
            fatData.textContent = `Data: ${dataFormatada}`
        
        }
    }catch (erro){
        fatValor.textContent = "Erro ao conectar com o servidor."
    }
}
async function cadastrarFaturamento(){
    msgCadastroFat.textContent = ""

    const valor = document.getElementById('cadastrarValorFat').value
    const motivo = document.getElementById('cadastrarMotivoFat'). value
    const dataF = document.getElementById('cadastrarDataFat').value

    if(valor == undefined || isNaN(Number(valor)) || Number(valor) <= 0){
        msgCadastroFat.textContent = "Por favor digite um número valido no campo valor."
        return
    }

    if(dataF == undefined){
        msgCadastroFat.textContent = "Por favor selecione uma data."
        return
    }

    const faturamento = {
        valor : valor,
        motivo : motivo.trim() !== "" ? motivo : null,
        data : dataF,
        empresa_id: idDaEmpresa
    }

    try{
        const resposta = await fetch("http://localhost:3000/faturamentos", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(faturamento)
        })

        const respostaJSON = await resposta.json();

        console.log(resposta)

        if(resposta.ok){
            msgCadastroFat.textContent = "Faturamento cadastrado com sucesso!"
            document.querySelector("#cadastrarValorFat").value = "";
            document.querySelector("#cadastrarMotivoFat").value = "";
            document.querySelector("#cadastrarDataFat").value = "";

            await listarFaturamento()
            await resultadoFaturamento(); 
        }else{
            msgCadastroFat.textContent = respostaJSON.erro || "Erro ao cadastrar faturamento."
        }
    }catch(erro){
        msgCadastroFat.textContent = "Erro ao conectar com o servidor."
    }
   
}

async function buscarFaturamentoAtualizacao(){
    infoAtualizarFat.textContent = ""
    const id = document.getElementById('buscaIdFat_input').value
    if(!id){
        infoAtualizarFat = "Digite um valor de id por favor."
        return
    }

    const resposta = await fetch(`http://localhost:3000/faturamentos/${id}/empresa/${idDaEmpresa}`)
    const faturamento = await resposta.json()

    const{valor, motivo, data} = faturamento

    const dataFormatada = new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    
    if(resposta.ok){
        infoAtualizarFat.textContent = faturamento.erro || "Faturamento não encontrado."

    }else{
        infoAtualizarFat.innerHTML = `
        Valor: ${valor} <br>
        Motivo: ${motivo} <br>
        Data: ${dataFormatada} <br> <br>

        <label class="form-label">Digite o novo valor (opcional):</label>
        <input id="novoValor" class="form-input form-input-pequeno" type="text">

        <label class="form-label">Digite o novo Motivo (opcional):</label>
        <input id="novoMotivo" class="form-input form-input-pequeno" type="text">

        <label class="form-label">Selecione uma nova data (opicional): (opcional):</label>
        <input id="novaData" class="form-input form-input-pequeno" type="date">

        <button id="atualizarFaturamentoId" class="form-button form-button-pequeno">Salvar Alterações</button>

        <p id="status" class="aviso-sucesso"></p>
        `
        const botaoAFaturamento = document.getElementById('atualizarFaturamentoId')
        botaoAFaturamento.addEventListener("clcik", atualizarFaturamento)
    
        async function atualizarFaturamento() {
            const NValor = document.getElementById('novoValor').value
            const NMotivo = document.getElementById('novoMotivo').value.trim()
            const NData = document.getElementById('novaData').value

            if(NValor === "" && NMotivo === "" && NData === ""){
                infoAtualizarFat.innerHTML += "<br> Digite pelo menos um campo para ser alterado. <style> #status{color: red;}</style>"
                return
            }

            if(NValor !== "" && isNaN(NValor) || NMotivo !== "" && !isNaN(NMotivo)){
                infoAtualizar.innerHTML = "Por favor, digite um campo válido. <style> #status{color: red;}</style>"
                return;
            }

            const dadosAtualizados = {
                empresa_id: idDaEmpresa
            }

            if(NValor !== ""){
                dadosAtualizados.valor = Number(NValor)
            }
            if(NMotivo !== ""){
                dadosAtualizados.motivo = NMotivo
            }
            if(NData !== ""){
                dadosAtualizados.data = NData
            }

            const respostaUpdate = await fetch(`http://localhost:3000/faturamentos/${id}/empresa/${idDaEmpresa}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(dadosAtualizados)
            })
            const respostaJSON = await respostaUpdate.json();

            if(respostaUpdate.ok){
                infoAtualizarFat.textContent = "Faturamento atualizado com sucesso!"
                await listarFaturamento()
                await resultadoFaturamento(); 
            }else{
                infoAtualizarFat.textContent = respostaJSON.erro 
            }

        }
    }
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