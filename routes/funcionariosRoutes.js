const express = require("express")
const router = express.Router()
const funcionariosController = require("../controllers/funcionariosControllers") // [[../]] volta uma pasta // e isso é uma rota

router.get(
    "/funcionarios/:id/empresa/:empresa_id",
    funcionariosController.buscarFuncionario

) //Express, quando alguém acessar essa rota, chama a função buscarFuncionario que está no controller.

router.get(
    "/funcionarios/empresa/:empresa_id",
    funcionariosController.listarFuncionarios
  // Ei, o recurso principal que eu quero buscar é funcionários. 
  // Mas eu quero filtrar isso pela empresa de ID X
)

router.post(
    "/funcionarios",
    funcionariosController.criarFuncionario
) 

router.put(
    "/funcionarios/:id/empresa/:empresa_id",
    funcionariosController.atualizarFuncionario
)

router.delete(
    "/funcionarios/:id/empresa/:empresa_id",
    funcionariosController.deletarFuncionario
)


module.exports = router //Server, toma aqui esse router que contém todas as rotas de funcionários