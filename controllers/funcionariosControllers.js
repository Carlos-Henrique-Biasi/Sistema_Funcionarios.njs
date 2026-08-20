const db = require("../data/db")

const buscarFuncionario = async (req, res) => {
    const { id, empresa_id } = req.params
    try {
        const [funcionarios] = await db.query(
            'SELECT * FROM funcionarios WHERE id = ? AND empresa_id = ?', 
            [id, empresa_id]
        )
        if (funcionarios.length === 0) {
            return res.status(404).json({ erro: "Funcionário não encontrado ou não pertence a esta empresa." })
        }
        res.json(funcionarios[0])
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao buscar o funcionário." })
    }
}

const listarFuncionarios = async (req, res) => {
    const { empresa_id } = req.params
    try {
        const [funcionarios] = await db.query(
            'SELECT * FROM funcionarios WHERE empresa_id = ?', 
            [empresa_id]
        )
        res.status(200).json(funcionarios)
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao buscar os funcionários." })
    }
}

// NOVA FUNÇÃO
const calcularFolhaPagamento = async (req, res) => {
    const { empresa_id } = req.params
    try {
        const [funcionarios] = await db.query(
            'SELECT SUM(salario) as total, COUNT(*) as qtd FROM funcionarios WHERE empresa_id = ?', 
            [empresa_id]
        )
        res.status(200).json(funcionarios[0])
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao calcular folha." })
    }
}

const criarFuncionario = async (req, res) => {
    let nome = req.body.nome
    const salario = Number(req.body.salario)
    const empresa_id = req.body.empresa_id
    if(nome == undefined || nome.trim().length === 0){ return res.status(400).json({erro:"O nome é obrigatório"})}
    if(salario <= 0 || Number.isNaN(salario)){ return res.status(400).json({erro:"O salário deve ser acima de 0"})}
    if(!empresa_id){ return res.status(400).json({erro:"Digite o id da empresa"})}
    nome = nome.trim()
    try {
        const [resultado] = await db.query(
            'INSERT INTO funcionarios (nome, salario, empresa_id) VALUES (? ,?, ?)', 
            [nome, salario, empresa_id]
        )
        res.status(201).json({respostaStatus: "Funcionário cadastrado com sucesso.", funcionarioId: resultado.insertId})
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao cadastrar o funcionário." })
    }
}

const atualizarFuncionario = async (req, res) => {
    const { id, empresa_id } = req.params 
    const { nome, salario } = req.body 
    
    if (nome === undefined && salario === undefined){
         return res.status(400).json({erro: "Alguma informação deve receber alteração."})
    }
    
    try {
        let camposParaAtualizar = []
        let valores = []

        if (nome !== undefined) { camposParaAtualizar.push('nome = ?'); valores.push(nome) }
        if (salario !== undefined) { camposParaAtualizar.push('salario = ?'); valores.push(salario) }

        valores.push(id, empresa_id)
        const query = `UPDATE funcionarios SET ${camposParaAtualizar.join(', ')} WHERE id = ? AND empresa_id = ?`
        const [resultado] = await db.query(query, valores)

        if (resultado.affectedRows === 0){
             return res.status(404).json({ erro: "Funcionário não encontrado ou não pertence a esta empresa." })
        }
        
        res.status(200).json({ mensagem: "Funcionário atualizado com sucesso!" })
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao atualizar funcionário." })
    }
}

const deletarFuncionario = async (req, res) => {
    const { id, empresa_id } = req.params 
    try {
        const [resultado] = await db.query('DELETE FROM funcionarios WHERE id = ? AND empresa_id = ?', [id, empresa_id])
        if (resultado.affectedRows === 0) { return res.status(404).json({ erro: "Funcionário não encontrado ou não pertence a esta empresa." })}
        res.status(200).json({ mensagem: "Funcionário apagado com sucesso!" })
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao apagar funcionário." })
    }
}

module.exports = {
    buscarFuncionario,
    listarFuncionarios,
    calcularFolhaPagamento,
    criarFuncionario,
    atualizarFuncionario,
    deletarFuncionario
}