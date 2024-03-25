// Importar dependencias
const express = require("express");

// Cargar el router
const router = express.Router();

// Importar controlador
const typesController = require("../controllers/types_of_workouts");

//Definir rutas
router.get("/testing", typesController.prueba);

// Exportar router
module.exports = router;
