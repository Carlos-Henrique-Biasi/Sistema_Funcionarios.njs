/*
variaveis: 
id  -  PK
empresa_id  -  PF
valor
motivo
data
*/

const db = require("../data/db")

const gravarFaturamento = async (req,res) =>{
    const {valor, motivo, data, empresa_id} = req.body
    const valorConvertido = Number(valor)

    if(!empresa_id || empresa_id < 0){
        return res.status(400).json({ erro: "Empresa não informada."})
    }
    if(valorConvertido <= 0 || Number.isNaN(valorConvertido) || valorConvertido == undefined){
        return res.status(400).json({ erro: "Digite um valor válido."})
    }
    if (motivo && String(motivo).trim() !== "") {  // so valida se tiver campo preenchido, já que é opicional
        if (!Number.isNaN(Number(motivo))) {
            return res.status(400).json({ erro: "Digite um motivo diferente de um número." });
        }
    }
    if(data == undefined || new Date(data) > new Date() || Number.isNaN(new Date(data).getTime())){ //getTime() é tipo um number, que verifica o formato e se não estiver em formato de data, devolve NaN
        return res.status(400).json({ erro: "Escolha um valor válido."})
    }

    try{ 
        //codigo mysql
    }catch(erro){
        console.log(erro)
        res.status(500).json({ erro: "Erro ao cadastrar faturamento." })
    }
}

const editarFaturamento = async (req,res) =>{
    const {id, empresa_id} = req.params
    const {valor, motivo, data} = req.body
    const valorConvertido = Number(valor)

    if (motivo && String(motivo).trim() !== "") {  // so valida se tiver campo preenchido, já que é opicional
        if (!Number.isNaN(Number(motivo))) {
            return res.status(400).json({ erro: "Digite um motivo diferente de um número." });
        }
    }

    if (valor !== undefined && (Number.isNaN(valorConvertido) || valorConvertido <= 0)) {
        return res.status(400).json({ erro: "Digite um valor válido." });
    }

    if (data !== undefined && (Number.isNaN(new Date(data).getTime()) || new Date(data) > new Date())) {
        return res.status(400).json({ erro: "Escolha uma data válida." });
    }

    if(
        valor == undefined && 
        (motivo == undefined || motivo.trim().length == 0) &&
        data == undefined
    ){
        return res.status(400).json({ erro : "Algum campo deve ser preenchido para editar."})
    }

    try{
        //codigo para enviar ao mysql
    }catch(erro){
        console.log(erro)
        res.status(500).json({ erro: "Erro ao editar faturamento." })
    }
}
const excluirFaturamento = async (req,res) =>{
    const { id, empresa_id } = req.params 
    try {
        const [resultado] = await db.query(
            'DELETE FROM faturamento WHERE id = ? AND empresa_id = ?',
             [id, empresa_id]
        )
        
        if (resultado.affectedRows === 0){
             return res.status(404).json({ erro: "Faturamento não encontrado ou não pertence a esta empresa." })
        }

        res.status(200).json({ mensagem: "Faturamento apagado com sucesso!" })
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao apagar faturamento." })
    }

}

const listarFaturamento = async (req,res) =>{
    const { empresa_id } = req.params
    try {
        const [faturamentos] = await db.query(
            'SELECT * FROM faturamento WHERE empresa_id = ?', 
            [empresa_id]
        )
        res.status(200).json(faturamentos)
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao buscar os faturamentos." })
    }
}

const pegar1Faturamento = async (req,res) =>{
    const {empresa_id, id} = req.params
    
    try{
        const [faturamento] = await db.query(
            'SELECT * FROM faturamento WHERE empresa_id = ? AND id = ?', 
            [empresa_id, id]
        )

        if(faturamento.length === 0){
            return res.status(404).json({ erro: "Faturamento não encontardo, ou não pertencente a empresa."})
        }

        res.json(faturamento[0])
        
    }catch(erro){
        console.log(erro)
        res.status(500).json({ erro: "Erro ao buscar os faturamento." })
    }
}

const calcularFaturamentoTotal = async (req,res) =>{
    const { empresa_id } = req.params
        try {
            const [faturamento] = await db.query(
                'SELECT SUM(valor) as total, COUNT(*) as qtd FROM faturamento WHERE empresa_id = ?', 
                [empresa_id]
            )
            res.status(200).json(faturamento[0])
        } catch (erro) {
            console.log(erro)
            res.status(500).json({ erro: "Erro ao calcular faturamento total." })
        }
}

module.exports = {
    gravarFaturamento,
    editarFaturamento,
    excluirFaturamento,
    listarFaturamento,
    pegar1Faturamento,
    calcularFaturamentoTotal
}