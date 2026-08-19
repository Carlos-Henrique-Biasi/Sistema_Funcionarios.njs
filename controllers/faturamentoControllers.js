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

    }catch(erro){

    }
}
const excluirFaturamento = async (req,res) =>{
    
}

const listarFaturamento = async (req,res) =>{
    
}