const express = require("express")
const router = express.Router()
const empresasController = require("../controllers/empresasControllers")

// Rota para cadastrar a empresa
router.post(
    "/empresas",
    empresasController.cadastrarEmpresa
)

// Rota para fazer login de empresa
router.post(
    "/login",
    empresasController.loginEmpresa
)

module.exports = router