// Importar dependencias
const express = require("express");

// Cargar el router
const router = express.Router();

// Importar controlador
const workoutsController = require("../controllers/workouts");

//Definir rutas
router.get("/testing", workoutsController.prueba);

// Exportar router
module.exports = router;
