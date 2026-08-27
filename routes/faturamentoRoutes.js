const express = require("express")
const router = express.Router()
const faturamentoController = require("../controllers/faturamentoControllers")

router.get("/faturamentos/:id/empresa/:empresa_id", faturamentoController.pegar1Faturamento)
router.get("/faturamentos/empresa/:empresa_id", faturamentoController.listarFaturamento)
router.get("/faturamentos/total/:empresa_id", faturamentoController.calcularFaturamentoTotal)

router.post("/faturamentos", faturamentoController.gravarFaturamento)
router.put("/faturamentos/:id/empresa/:empresa_id", faturamentoController.editarFaturamento)
router.delete("/faturamentos/:id/empresa/:empresa_id", faturamentoController.excluirFaturamento)

module.exports = router