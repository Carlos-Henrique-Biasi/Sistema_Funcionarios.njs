const db = require("../data/db")


const buscarFuncionario = async (req, res) => {
    // Pegamos os dois IDs da URL (igualzinho você fez no DELETE)
    const { id, empresa_id } = req.params

    try {
        // Travamos a busca com o AND
        const [funcionarios] = await db.query(
            'SELECT * FROM funcionarios WHERE id = ? AND empresa_id = ?', 
            [id, empresa_id]
        )

        // Se a lista vier vazia, ou o ID não existe, ou o funcionário é de outra empresa
        if (funcionarios.length === 0) {
            return res.status(404).json({ erro: "Funcionário não encontrado ou não pertence a esta empresa." })
        }

        // Retornamos o primeiro (e único) funcionário da lista
        res.json(funcionarios[0])

    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao buscar o funcionário." })
    }
}


const listarFuncionarios = async (req, res) => {
    // 1. Pegamos o ID da empresa que veio digitado na URL
    const { empresa_id } = req.params

    try {
        // 2. Qual o comando SQL para selecionar TODOS os campos da tabela 'funcionarios' 
        // ONDE (WHERE) a coluna empresa_id seja igual ao ID que recebemos na URL?
        const [funcionarios] = await db.query(
            'SELECT * FROM funcionarios WHERE empresa_id = ?', 
            [empresa_id]
        )

        // 3. Devolvemos a lista de funcionários para o usuário
        res.status(200).json(funcionarios)

    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao buscar os funcionários." })
    }
}

const criarFuncionario = async (req, res) => {
    // 1. Pegamos os dados (igualzinho você já fez)
    let nome = req.body.nome
    const salario = Number(req.body.salario)
    const empresa_id = req.body.empresa_id

    //validamos os dados
   if(nome == undefined || nome.trim().length === 0){
        return res.status(400).json({
            erro:"O nome é obrigatório"
        })
    }

    if(salario <= 0 || Number.isNaN(salario)){
        return res.status(400).json({
            erro:"O salário deve ser acima de 0"
        })
    }

    if(!empresa_id){
        return res.status(400).json({
            erro:"Digite o id da empresa"
        })
    }

    nome = nome.trim()

    // 3. Bloco do Banco de Dados
    try {
        // 1º e 2º ???: Qual o comando SQL para INSERIR na tabela 'funcionarios' nas colunas (nome, salario)?
        // E no array seguinte, quais são as DUAS variáveis que vão substituir os dois '?' ?
        const [resultado] = await db.query(
            'INSERT INTO funcionarios (nome, salario, empresa_id) VALUES (? ,?, ?)', 
            [nome, salario, empresa_id]
        )

        res.status(201).json({
            respostaStatus: "Funcionário cadastrado com sucesso.",
            funcionarioId: resultado.insertId
        })

    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao cadastrar o funcionário." })
    }
}

const atualizarFuncionario = async (req, res) => {
    const { id, empresa_id } = req.params 
    const { nome, salario } = req.body 

    if (nome === undefined && salario === undefined) {
        return res.status(400).json({
            erro: "Alguma informação deve receber alteração."
        })
    }

    try {
        // Montamos a query dinamicamente baseada no que o usuário preencheu
        let camposParaAtualizar = []
        let valores = []

        if (nome !== undefined) {
            camposParaAtualizar.push('nome = ?')
            valores.push(nome)
        }

        if (salario !== undefined) {
            camposParaAtualizar.push('salario = ?')
            valores.push(salario)
        }

        // Adiciona os IDs no final do array para o WHERE
        valores.push(id, empresa_id)

        const query = `UPDATE funcionarios SET ${camposParaAtualizar.join(', ')} WHERE id = ? AND empresa_id = ?`

        const [resultado] = await db.query(query, valores)

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Funcionário não encontrado ou não pertence a esta empresa." })
        }

        res.status(200).json({ mensagem: "Funcionário atualizado com sucesso!" })

    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao atualizar funcionário." })
    }
}

const deletarFuncionario = async (req, res) => {
    // Pegamos os DOIS IDs direto da URL
    const { id, empresa_id } = req.params 

    try {
        // Preencha os ??? com o comando de DELETE travando pelas duas colunas
        const [resultado] = await db.query(
            'DELETE FROM funcionarios WHERE id = ? AND empresa_id = ?',
            [id, empresa_id]
        )

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Funcionário não encontrado ou não pertence a esta empresa." })
        }

        res.status(200).json({ mensagem: "Funcionário apagado com sucesso!" })

    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao apagar funcionário." })
    }
}


module.exports = {
    buscarFuncionario,
    listarFuncionarios,
    criarFuncionario,
    atualizarFuncionario,
    deletarFuncionario
} // aqui o file mostra pra todos os outros as funções que ele está liberando para outros usarem