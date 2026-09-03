// 1. Agarramos o formulário pelo ID que colocamos no HTML
const formCadastro = document.getElementById("form-cadastro");

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
        // 6. Fazemos o POST para a rota de criar empresa
        // Substitua a URL abaixo se a sua rota no Node.js for diferente de /empresas
        const resposta = await fetch("/empresas", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(dadosCadastro) 
        });

        const dadosResposta = await resposta.json();

        // 7. Se o servidor responder com sucesso (Status 201 Created, por exemplo)
        if (resposta.ok) {
            
            alert("Empresa cadastrada com sucesso! Faça login para continuar.");
            
            // 8. Redireciona a empresa para a tela de login
            window.location.href = "index.html"; 

        } else {
            // Se o e-mail já existir no banco, por exemplo, mostra o erro
            alert("Erro ao cadastrar: " + dadosResposta.erro);
        }

    } catch (erro) {
        console.log("Erro na comunicação:", erro);
        alert("Não foi possível conectar com o servidor.");
    }
});