const express = require("express")
const router = express.Router()
const funcionariosController = require("../controllers/funcionariosControllers")

router.get("/funcionarios/:id/empresa/:empresa_id", funcionariosController.buscarFuncionario)
router.get("/funcionarios/empresa/:empresa_id", funcionariosController.listarFuncionarios)
// NOVA ROTA
router.get("/funcionarios/folha/:empresa_id", funcionariosController.calcularFolhaPagamento)

router.post("/funcionarios", funcionariosController.criarFuncionario)
router.put("/funcionarios/:id/empresa/:empresa_id", funcionariosController.atualizarFuncionario)
router.delete("/funcionarios/:id/empresa/:empresa_id", funcionariosController.deletarFuncionario)

module.exports = router