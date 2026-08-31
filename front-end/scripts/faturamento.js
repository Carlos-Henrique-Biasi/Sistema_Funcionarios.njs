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

        if(resposta.ok){
            msgCadastroFat.textContent = "Faturamento cadastrado com sucesso!"
            document.querySelector("#cadastrarValorFat").value = "";
            document.querySelector("#cadastrarMotivoFat").value = "";
            document.querySelector("#cadastrarDataFat").value = "";

            await listarFaturamentos()
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
        infoAtualizarFat.textContent = "Digite um valor de id por favor."
        return
    }

    try{
        const resposta = await fetch(`http://localhost:3000/faturamentos/${id}/empresa/${idDaEmpresa}`)
        const faturamento = await resposta.json()
        
        if(!resposta.ok){
            infoAtualizarFat.textContent = faturamento.erro || "Faturamento não encontrado."
        }else{
            const{valor, motivo, data} = faturamento
            const dataFormatada = new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })

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
            botaoAFaturamento.addEventListener("click", atualizarFaturamento)
        
            async function atualizarFaturamento() {
                const NValor = document.getElementById('novoValor').value
                const NMotivo = document.getElementById('novoMotivo').value.trim()
                const NData = document.getElementById('novaData').value

                if(NValor === "" && NMotivo === "" && NData === ""){
                    infoAtualizarFat.innerHTML += "<br> Digite pelo menos um campo para ser alterado. <style> #status{color: red;}</style>"
                    return
                }

                if(NValor !== "" && isNaN(NValor) || NMotivo !== "" && !isNaN(NMotivo)){
                    infoAtualizarFat.innerHTML = "Por favor, digite um campo válido. <style> #status{color: red;}</style>"
                    return;
                }

                const dadosAtualizados = {}

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
                    await listarFaturamentos()
                    await resultadoFaturamento(); 
                }else{
                    infoAtualizarFat.textContent = respostaJSON.erro 
                }

            }
        }

    }catch(erro){
        infoAtualizarFat.textContent = "Erro ao conectar com o servidor."
    }
}

async function buscarFaturamentoExclusao(){
    divExcluirFat.textContent = ""

    const id = document.getElementById('verificarExcluirFat').value
    if(!id){
        divExcluirFat.textContent = "Digite um valor no campo de ID."
    }

    const resposta = await fetch(`http://localhost:3000/faturamentos/${id}/empresa/${idDaEmpresa}`)
    const faturamento = await resposta.json()
    const dataFormatada = new Date(faturamento.dataF).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) // formatar data

    if(!resposta.ok){
        divExcluirFat.textContent = faturamento.erro || "Faturamento não encontrado."
    }else{

        divExcluirFat.innerHTML = `
            Valor: ${faturamento.valor} <br>
            Motivo: ${faturamento.motivo} <br>
            Data: ${dataFormatada}
            <br><br>

            <button id="excluirFat" class="form-button-danger">Confirmar Exclusão</button>
        `

        const botaoExcluirFat = document.getElementById('excluirFat')
        botaoExcluirFat.addEventListener("click", excluirFat)

        async function excluirFat() {
            const respostaDelete = await fetch(`http://localhost:3000/faturamentos/${id}/empresa/${idDaEmpresa}`,{
                method: "DELETE"
            })
            const respostaJSON = await respostaDelete.json()

            if(respostaDelete.ok){
                divExcluirFat.textContent = "Faturamento excluido com sucesso."
                await listarFaturamentos()
                await resultadoFaturamento()
            }else{
                divExcluirFat.textContent = respostaJSON.erro
            }
            
        }
    }
}

async function resultadoFaturamento(){
    const resposta = await fetch(`http://localhost:3000/faturamentos/total/${idDaEmpresa}`);
    const dadosFat = await resposta.json();

    if (dadosFat.qtd > 0) {
        qntregistros.textContent = dadosFat.qtd;
       // Formata para 2 casas decimais e troca o ponto por vírgula
        const valorFormatado = Number(dadosFat.total).toFixed(2).replace('.', ',');
        valorTotal.textContent = `R$ ${valorFormatado}`;
    } else {
        qntregistros.textContent = "0";
        valorTotal.textContent = "R$ 0.00";
    }
}

async function listarFaturamentos(){
    const resposta = await fetch(`http://localhost:3000/faturamentos/empresa/${idDaEmpresa}`)
    const listaJSON = await resposta.json()

    listaFaturamento.textContent = ""

    if (listaJSON.length === 0) {
        listaFaturamento.textContent = "Nenhum faturamento cadastrado para esta empresa."
        return;
    }

     listaJSON.forEach(faturamento => {
        const dataFormatada = new Date(faturamento.dataF).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) // formatar data
        const p = document.createElement("p")
        p.textContent = `ID: ${faturamento.id} | Valor: R$${faturamento.valor} | Motivo: ${faturamento.motivo || 'Não especificado.' } | Data: ${dataFormatada}`
        listaFaturamento.appendChild(p)
    });
}

//============================== FUNÇÕES DOS BOTÕES DE FATURAMENTO ================================