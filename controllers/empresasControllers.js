const db = require("../data/db")
const bcrypt = require("bcryptjs") // Importamos a ferramenta de criptografia

const cadastrarEmpresa = async (req, res) => {
    const { nome_empresa, email, senha } = req.body

    // Validações básicas
    if (!nome_empresa || !email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos da empresa." })
    }

    try {
        // 1. Verificamos se o e-mail já foi cadastrado antes
        const [empresaExiste] = await db.query('SELECT * FROM empresas WHERE email = ?', [email])
        if (empresaExiste.length > 0) {
            return res.status(400).json({ erro: "Este e-mail já está cadastrado." })
        }

        // 2. Criptografando a senha
        // O número 10 significa o "custo" da criptografia (quanto mais alto, mais seguro e mais demorado)
        const salt = await bcrypt.genSalt(10) //tempero aleatório, que faz duas senhas iguais ainda sim serem diferentes
        const senhaCriptografada = await bcrypt.hash(senha, salt)

        // 3. Salvando no banco de dados
        // 1º e 2º ???: Qual o comando SQL para inserir na tabela 'empresas' as colunas (nome_empresa, email, senha)?
        // E quais variáveis vamos passar no array para substituir os '?' (Atenção: usamos a senha normal ou a criptografada?)
        const [resultado] = await db.query('INSERT INTO empresas (nome_empresa, email, senha) VALUE(?,?,?)',
            [nome_empresa, email, senhaCriptografada])

        res.status(201).json({
            respostaStatus: "Empresa cadastrada com sucesso!",
            empresaId: resultado.insertId
        })

    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao cadastrar empresa." })
    }
}

const loginEmpresa = async (req, res) => {
    const { email, senha } = req.body

    // 1. Validação básica
    if (!email || !senha) {
        return res.status(400).json({ erro: "Preencha e-mail e senha." })
    }

    try {
        // 2. Buscamos se existe alguma empresa com esse e-mail no banco
        const [empresaExiste] = await db.query('SELECT * FROM empresas WHERE email = ?', [email])
        
        // Se a lista voltar vazia (tamanho 0), é porque o e-mail não existe
        if (empresaExiste.length === 0) {
            // Nota de Segurança: Usamos uma mensagem genérica para não dar dicas a invasores
            return res.status(401).json({ erro: "E-mail ou senha incorretos." }) 
        }

        // Se o código chegou até aqui, a empresa existe! Vamos guardar os dados dela numa variável
        const empresa = empresaExiste[0]

        // 3. A Prova Real (Comparando as senhas)
        // O bcrypt.compare() pede duas coisas: a senha pura (digitada agora) e a senha criptografada (do banco)
        const senhaValida = await bcrypt.compare(senha, empresa.senha)

        if (!senhaValida) {
            return res.status(401).json({ erro: "E-mail ou senha incorretos." })
        }

        // 4. Deu tudo certo, senha aprovada!
        res.status(200).json({
            respostaStatus: "Login realizado com sucesso!",
            empresaId: empresa.id,
            nome_empresa: empresa.nome_empresa
        })

    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao fazer login." })
    }
}



module.exports = {
    cadastrarEmpresa,
    loginEmpresa
}