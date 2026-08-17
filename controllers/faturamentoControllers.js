const db = require("../data/db")

const gravarFaturamento = async (req,res) =>{
    const {empresa_id} = req.params
    const {faturamento} = req.body

    if(faturamento <= 0){
        return res.status(400).json({ erro: "Digite um valor válido."})
    }

    try{
        const [faturamentoExiste] = await db.query('SELECT * FROM faturamento WHERE empresa_id = ?', [empresa_id])
        if(faturamentoExiste.length > 0){
            //código que atualiza o banco de dados.
        }else{
            //código que adiciona ao banco de dados.
        }
    }catch(erro){
        console.log(erro)
        res.status(500).json({ erro: "Erro ao cadastrar faturamento." })
    }
}

const excluirFaturamento = async (req,res) =>{
    
}

const lerFaturamento = async (req,res) =>{
    
}