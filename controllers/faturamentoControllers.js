const db = require("../data/db")

const gravarFaturamento = async (req,res) =>{
    const {empresa_id} = req.params
    const {valor, motivo, data} = req.body
    const valorConvertido = Number(valor)

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

    if(
        (valorConvertido == undefined || Number.isNaN(valorConvertido) || valorConvertido <= 0) && 
        (motivo == undefined || motivo.trim().length == 0) &&
        (data == undefined || new Date(data) > new Date() || Number.isNaN(new Date(data).getTime()))
    ){
        return res.status(400).json({ erro : "Algum campo deve ser editado com valores válidos."})
    }

    try{
        //codigo para enviar ao mysql
    }catch(erro){
        //codigo de erro ao se conectar
    }
}
const excluirFaturamento = async (req,res) =>{
    const {id, empresa_id} = req.params

}

const listarFaturamento = async (req,res) =>{
    
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

module.exports = {
    gravarFaturamento,
    editarFaturamento,
    excluirFaturamento,
    listarFaturamento,
    pegar1Faturamento
}