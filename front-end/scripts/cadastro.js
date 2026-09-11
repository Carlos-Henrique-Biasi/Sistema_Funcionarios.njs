// 1. Agarramos o formulário pelo ID que colocamos no HTML
const formCadastro = document.getElementById("form-cadastro");
const respostaCadastro = document.getElementById('respostaCadastro')
// Criamos uma função auxiliar que faz o JavaScript "dormir" (esperar)
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 2. Adicionamos o "ouvinte" para o clique do botão de cadastrar
formCadastro.addEventListener("submit", async (event) => {
    
    // 3. Bloqueia o recarregamento automático da página
    event.preventDefault(); 

    // 4. Pegamos os valores que o usuário digitou nas três caixinhas
    const nomeDigitado = document.getElementById("nome_empresa").value;
    const emailDigitado = document.getElementById("email").value;
    const senhaDigitada = document.getElementById("senha").value;

    // 5. Montamos o pacote JSON para enviar pro Node.js
    // ATENÇÃO: Os nomes à esquerda (nome_empresa, email, senha) precisam ser 
    // EXATAMENTE iguais aos que o seu req.body espera lá no seu controller de cadastro!
    const dadosCadastro = {
        nome_empresa: nomeDigitado,
        email: emailDigitado,
        senha: senhaDigitada
    };

    try {
    const resposta = await fetch("/empresas", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosCadastro) 
    });

    // Verificamos o status ANTES de tentar converter para JSON
    if (resposta.ok) {
        respostaCadastro.textContent = "Cadastro Realizado com sucesso!";
        respostaCadastro.style.color = "green";
        
        await esperar(2000);
        window.location.href = "index.html"; 
    } else {
        // Só tenta ler o JSON se deu erro (assumindo que o erro vem em JSON)
        const dadosResposta = await resposta.json();
        alert("Erro ao cadastrar: " + dadosResposta.erro);
    }

} catch (erro) {
    // Mudei para console.error para você ver no painel do navegador qual foi o erro exato
    console.error("Erro exato na comunicação:", erro); 
    alert("Não foi possível conectar com o servidor.");
}
});