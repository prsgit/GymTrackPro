// Importar dependencias
const express = require("express");

// Cargar el router
const router = express.Router();

// Importar controlador
const userController = require("../controllers/user");

//Definir rutas
router.get("/testing", userController.prueba);
router.post("/register", userController.register);

// Exportar router
module.exports = router;
