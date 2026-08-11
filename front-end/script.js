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


const botaoF = document.getElementById("buscar");
const botaoL = document.getElementById("listar")
const botaoC = document.getElementById('cadastrar')
const botaoB = document.getElementById('buscarId')
const botaoV = document.getElementById('VExcluir')

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


botaoF.addEventListener("click", buscarFuncionario);
botaoL.addEventListener("click", gerarLista)
botaoC.addEventListener("click", cadastrarFuncionario)
botaoB.addEventListener("click", buscarId)
botaoV.addEventListener("click", verificar)


async function buscarFuncionario(){
    const id = inputID.value

    if (!id) {
        pNome.textContent = "Por favor, digite um valor de ID.";
        pSalario.textContent = "";
        return;
    }

    // Passando o id do funcionário E o id da empresa logada na URL
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
    // Buscando a lista filtrada apenas pelos funcionários desta empresa
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

async function cadastrarFuncionario() {
    const nomeC = document.querySelector("#cadastrarNome").value.trim()
    const salarioC = Number(document.querySelector("#cadastrarSalario").value)

    // Validação extra: Se digitaram algo no nome, verifica se não é composto apenas por números
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

    // Enviando o empresa_id junto no pacote JSON para o backend salvar vinculado à empresa
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

            // Validação extra: Se digitaram algo no nome, verifica se não é composto apenas por números
            if(NNome !== "" && !isNaN(NNome)){
                status.textContent = "Por favor, digite um nome válido (não apenas números)."
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
            }else{
                divExcluir.textContent = respostaJSON.erro
            }
        }
    } 
}