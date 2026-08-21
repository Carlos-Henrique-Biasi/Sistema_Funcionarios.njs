// 1. Primeiro, nós "agarramos" o formulário do HTML usando o ID que criamos lá.
const formLogin = document.getElementById("form-login");

// 2. Adicionamos um "ouvinte de eventos" (addEventListener).
// Ele fica esperando o usuário clicar no botão de "submit" (Entrar no Sistema).
formLogin.addEventListener("submit", async (event) => {
    
    // 3. Essa linha é mágica e obrigatória em formulários! 
    // Ela impede que o navegador recarregue a página sozinho quando clicamos no botão.
    event.preventDefault(); 

    // 4. Pegamos o que o usuário digitou nas caixinhas de email e senha.
    const emailDigitado = document.getElementById("email").value;
    const senhaDigitada = document.getElementById("senha").value;

    // 5. Montamos o "pacote" (JSON) que vamos mandar para o servidor.
    const dadosLogin = {
        email: emailDigitado,
        senha: senhaDigitada
    };

    try {
        // 6. Fazemos o pedido (fetch) para a nossa API no backend (igual o Thunder Client faz).
        const resposta = await fetch("http://localhost:3000/login", {
            method: "POST", // Login é POST porque estamos enviando dados.
            headers: {
                "Content-Type": "application/json" // Avisamos que o pacote está no formato JSON.
            },
            // Transformamos o nosso pacote (dadosLogin) em texto puro para viajar pela internet.
            body: JSON.stringify(dadosLogin) 
        });

        // 7. Recebemos e abrimos a resposta do servidor.
        const dadosResposta = await resposta.json();

        // 8. O "resposta.ok" verifica se o status foi sucesso (200, 201...).
        if (resposta.ok) {
            
            // ==========================================
            // A CURA DA AMNÉSIA ACONTECE NESTA LINHA AQUI!
            // ==========================================
            
            // Pegamos o ID da empresa que o backend devolveu no login (dadosResposta.id)
            // e guardamos na "mochila" do navegador (localStorage) com a etiqueta "id_empresa_logada".
            // O navegador NÃO VAI ESQUECER essa informação quando pularmos para o painel!
            localStorage.setItem("id_empresa_logada", dadosResposta.empresaId);
            //Guardamos também o NOME na mochila!
            localStorage.setItem("nome_empresa_logada", dadosResposta.nome_empresa);
            
            // Avisamos que deu certo.
            alert("Login feito com sucesso!");

            // 9. Mudamos de página! Redirecionamos o usuário automaticamente para o painel.
            window.location.href = "painel.html"; 

        } else {
            // Se a senha estiver errada ou o e-mail não existir, mostramos o erro do backend.
            alert("Erro ao logar: " + dadosResposta.erro);
        }

    } catch (erro) {
        // Se o servidor Node.js estiver desligado, o erro cai aqui.
        console.log("Erro na comunicação:", erro);
        alert("Não foi possível conectar com o servidor.");
    }
});