// Importar dependencias
const express = require("express");

// Cargar el router
const router = express.Router();

// Importar controlador
const emailController = require("../controllers/email");

//Definir ruta
router.post("/save-email", emailController.saveEmail);

// Exportar router
module.exports = router;
