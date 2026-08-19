const express = require("express")
const router = express.Router()
const faturamentoController = require("../controllers/faturamentoControllers")

router.get("/faturamento/:id/empresa/:empresa_id", faturamentoController.pegar1Faturamento)
router.get("/faturamento/empresa/:empresa_id", faturamentoController.listarFaturamento)
router.get("/faturamento/total/:empresa_id", faturamentoController.calcularFaturamentoTotal)

router.post("/faturamento", faturamentoController.gravarFaturamento)
router.put("/faturamento/:id/empresa/:empresa_id", faturamentoController.editarFaturamento)
router.delete("/faturamento/:id/empresa/:empresa_id", faturamentoController.excluirFaturamento)

module.exports = router