const db = require("../data/db")

const gravarFaturamento = async (req,res) =>{
    const {empresa_id} = req.params
    const {valor, motivo ,data} = req.body

    if(valor <= 0 || Number.isNaN(valor) || valor.trim().length == 0){
        return res.status(400).json({ erro: "Digite um valor válido."})
    }
    if(motivo == Number){
        return res.status(400).json{( erro: "Digite um valor diferente de um número.")}
    }
    if(data == undefined || data.trim().length == 0){
        return res.status(400).json({ erro: "Digite um valor válido."})
    }

    
    try{
       

    }catch(erro){
        console.log(erro)
        res.status(500).json({ erro: "Erro ao cadastrar faturamento." })
    }
}

const editarFaturamento = async (req,res) =>{
    
}
const excluirFaturamento = async (req,res) =>{
    
}

const lerFaturamento = async (req,res) =>{
    
}