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
    if(data == undefined){
        return res.status(400).json({ erro: "Digite um valor válido."})
    }

    try{

    }catch(erro){
        console.log(erro)
        res.status(500).json({ erro: "Erro ao cadastrar faturamento." })
    }
}

const editarFaturamento = async (req,res) =>{
    const {id, empresa_id} = req.params
    const {valor, motivo, data} = req.body
    const valorConvertido = Number(valor)

    //função de pegar 1 faturamento
    
    if (motivo && String(motivo).trim() !== "") {  // so valida se tiver campo preenchido, já que é opicional
        if (!Number.isNaN(Number(motivo))) {
            return res.status(400).json({ erro: "Digite um motivo diferente de um número." });
        }
    }

    if(
        (valorConvertido == undefined || Number.isNaN(valorConvertido) || valorConvertido <= 0) && 
        (motivo == undefined || motivo.trim().length == 0) &&
        (data == undefined)
    ){
        return res.status(400).json({ erro : "Algum valor deve ser editado com valores válidos."})
    }

    try{
        //codigo para enviar ao mysql
    }catch(erro){
        //codigo de erro ao se conectar
    }
}
const excluirFaturamento = async (req,res) =>{
    const {id, empresa_id} = req.params
    //funcao de pegar 1 faturamento

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