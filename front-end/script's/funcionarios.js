//===========================BOTOES FOLHA DE PAGAMENTO==========================================
const botaoF = document.getElementById("buscar");
const botaoL = document.getElementById("listar")
const botaoC = document.getElementById('cadastrar')
const botaoB = document.getElementById('buscarId')
const botaoV = document.getElementById('VExcluir')
const btnFolha = document.getElementById("btnFolha"); // Botão novo da folha
//===========================BOTOES FOLHA DE PAGAMENTO=============================================

//===========================ELEMENTOS FOLHA DE PAGAMENTO==========================================
const inputID = document.querySelector("#idF");
const pNome = document.getElementById("nome");
const pSalario = document.getElementById("salario");
const lista = document.getElementById("lista")
const cvn = document.getElementById("cvn")
const cvs = document.getElementById("cvs")
const fc = document.getElementById("fc")
const IdB = document.getElementById("buscarId_input")
const infos = document.getElementById("infoAtualizar")
const dados = document.getElementById("dadosA")
const pid = document.getElementById("pid")
const divExcluir = document.getElementById("divExcluir")

// Elementos onde os números grandes da folha vão aparecer
const infoQtd = document.getElementById("infoQtd");
const infoTotal = document.getElementById("infoTotal");
//===========================ELEMENTOS FOLHA DE PAGAMENTO==========================================

//===========================ACOES DOS BOTOES FOLHA DE PAGAMENTO===================================

botaoF.addEventListener("click", buscarFuncionario);
botaoL.addEventListener("click", gerarLista)
botaoC.addEventListener("click", cadastrarFuncionario)
botaoB.addEventListener("click", buscarId)
botaoV.addEventListener("click", verificar)
btnFolha.addEventListener("click", calcularFolha); // Evento da folha

//===========================ACOES DOS BOTOES FOLHA DE PAGAMENTO===================================

//===========================FUNCOES FOLHA DE PAGAMENTO============================================
async function buscarFuncionario(){
    const id = inputID.value

    if (!id) {
        pNome.textContent = "Por favor, digite um valor de ID.";
        pSalario.textContent = "";
        return;
    }

    const resposta = await fetch(`http://localhost:3000/funcionarios/${id}/empresa/${idDaEmpresa}`)
    const funcionario = await resposta.json()

    if(!resposta.ok){
        pNome.textContent = funcionario.erro || "Funcionário não encontrado";
        pSalario.textContent = "";
    } else {
        pNome.textContent = `Nome: ${funcionario.nome}`
        pSalario.textContent = `Salário: R$${funcionario.salario}`
    }
}

async function gerarLista() {
    const resposta = await fetch(`http://localhost:3000/funcionarios/empresa/${idDaEmpresa}`)
    const listaJSON = await resposta.json()

    lista.textContent = ""
    
    if (listaJSON.length === 0) {
        lista.textContent = "Nenhum funcionário cadastrado para esta empresa."
        return;
    }

    listaJSON.forEach(funcionario => {
        const p = document.createElement("p")
        p.textContent = `ID: ${funcionario.id} | Nome: ${funcionario.nome} | Salário: R$${funcionario.salario}`
        lista.appendChild(p)
    });
}

// NOVA FUNÇÃO: Calcula a folha e injeta nos novos elementos HTML
async function calcularFolha() {
    const resposta = await fetch(`http://localhost:3000/funcionarios/folha/${idDaEmpresa}`);
    const dadosApi = await resposta.json();

    if (dadosApi.qtd > 0) {
        infoQtd.textContent = dadosApi.qtd;
        // Formata o número com 2 casas decimais e substitui o ponto pela vírgula (padrão Brasil)
        infoTotal.textContent = `R$ ${Number(dadosApi.total).toFixed(2)}`;
    } else {
        infoQtd.textContent = "0";
        infoTotal.textContent = "R$ 0.00";
    }
}

async function cadastrarFuncionario() {
    const nomeC = document.querySelector("#cadastrarNome").value.trim()
    const salarioC = Number(document.querySelector("#cadastrarSalario").value)

    if(nomeC !== "" && !isNaN(nomeC)){
        cvn.textContent = "Por favor, digite um nome válido (não apenas números)."
        return;
    }

    if(nomeC.length == 0){
        cvn.textContent = "Por favor, digite o nome de um funcionário."
        cvs.textContent = ""
        fc.textContent = ""
        return;
    }

    if(salarioC <= 0 || Number.isNaN(salarioC)){
        cvs.textContent = "Por favor, digite um valor de salário válido."
        cvn.textContent = ""
        fc.textContent = ""
        return;
    }

    cvn.textContent = ""
    cvs.textContent = ""
    fc.textContent = ""

    const funcionario = {
        nome: nomeC,
        salario: salarioC,
        empresa_id: idDaEmpresa 
    }

    const resposta = await fetch("http://localhost:3000/funcionarios", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(funcionario)
    })

    const respostaJSON = await resposta.json();

    if(resposta.ok){
        fc.textContent = "Funcionário cadastrado com sucesso!"
        document.querySelector("#cadastrarNome").value = "";
        document.querySelector("#cadastrarSalario").value = "";
        await gerarLista()
        // Opcional: já atualiza a folha automaticamente após cadastrar
        await calcularFolha(); 
    }else{
        fc.textContent = `Erro: ${respostaJSON.erro}`
    }
}

async function buscarId() {
    dados.textContent = ""
    infos.textContent = ""
    const id = IdB.value

    if (!id) {
        dados.textContent = "Digite um valor de ID."
        return;
    }

    const resposta = await fetch(`http://localhost:3000/funcionarios/${id}/empresa/${idDaEmpresa}`)
    const funcionario = await resposta.json()

    if(!resposta.ok){
        dados.textContent = funcionario.erro || "Funcionário não encontrado."
    }else{
        dados.innerHTML = `
        Nome: ${funcionario.nome} <br>
        Salário: ${funcionario.salario}
        `
        
        infos.innerHTML = `
        <label class="form-label">Digite o novo nome (opcional):</label>
        <input id="novoNome" class="form-input form-input-pequeno" type="text">

        <label class="form-label">Digite o novo salário (opcional):</label>
        <input id="novoSalario" class="form-input form-input-pequeno" type="number"> <br>

        <button id="atualizar" class="form-button form-button-pequeno">Salvar Alterações</button>
        <p id="status" class="aviso-sucesso"></p>
        `
        
        const botaoA = document.getElementById("atualizar")
        botaoA.addEventListener("click", atualizarFuncionario)

        async function atualizarFuncionario(){
            const NNome = document.getElementById("novoNome").value.trim()
            const NSalario = document.getElementById("novoSalario").value
            const status = document.getElementById("status")

            status.textContent = ""

            if(NNome === "" && NSalario === ""){
                status.innerHTML = "Digite pelo menos um valor para ser alterado. <style> #status{color: red;}</style>"
                return;
            }

            if(NNome !== "" && !isNaN(NNome)){
                status.innerHTML = "Por favor, digite um nome válido (não apenas números). <style> #status{color: red;}</style>"
                return;
            }

            const dadosAtualizados = {
                empresa_id: idDaEmpresa
            }
            if(NNome !== ""){
                dadosAtualizados.nome = NNome
            }
            if(NSalario !== ""){
                dadosAtualizados.salario = Number(NSalario)
            }

            const respostaUpdate = await fetch(`http://localhost:3000/funcionarios/${id}/empresa/${idDaEmpresa}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(dadosAtualizados)
            })
            const respostaJSON = await respostaUpdate.json();

            if(respostaUpdate.ok){
                status.textContent = "Funcionário atualizado com sucesso!"
                await gerarLista()
                // Atualiza a folha de pagamento caso o salário tenha sido alterado
                await calcularFolha(); 
                dados.textContent = ""
                infos.textContent = ""
            }else{
                status.textContent = respostaJSON.erro
            }
        }
    }
}

async function verificar() {
    pid.textContent = ""
    divExcluir.textContent = ""
    const id = document.getElementById("verificarExcluir").value
    
    if(id.trim() === ""){
        pid.textContent = "Digite um valor no campo de ID."
        return;
    }

    const resposta = await fetch(`http://localhost:3000/funcionarios/${id}/empresa/${idDaEmpresa}`)
    const funcionario = await resposta.json()
    
    if(!resposta.ok){
        pid.textContent = funcionario.erro || "Funcionário não encontrado."
    }else{
        pid.innerHTML = `Nome: ${funcionario.nome} <br> Salário: ${funcionario.salario}`
        divExcluir.innerHTML = `
        <button id="excluir" class="form-button-danger">Confirmar Exclusão</button>
        `
        const botaoE = document.getElementById("excluir")
        botaoE.addEventListener("click", excluir)

        async function excluir() {
            const respostaDelete = await fetch(`http://localhost:3000/funcionarios/${id}/empresa/${idDaEmpresa}`, {
                method: "DELETE"
            })
            const respostaJSON = await respostaDelete.json() 

            if(respostaDelete.ok){
                pid.textContent = "" 
                divExcluir.textContent = "Funcionário excluído com sucesso."
                await gerarLista()
                // Atualiza a folha após a exclusão de um funcionário
                await calcularFolha();
            }else{
                divExcluir.textContent = respostaJSON.erro
            }
        }
    } 
}
//===========================FUNCOES FOLHA DE PAGAMENTO============================================
