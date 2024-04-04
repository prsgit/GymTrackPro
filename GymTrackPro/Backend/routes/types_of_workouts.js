// Importar dependencias
const express = require("express");

// Cargar el router
const router = express.Router();

// Importar controlador
const typesController = require("../controllers/types_of_workouts");

//Definir rutas
router.post("/save", typesController.saveTypeWorkout);
router.get("/type/:id", typesController.oneTypeWorkout);
router.put("/update/:id", typesController.update);
router.delete("/remove/:id", typesController.remove);

// Exportar router
module.exports = router;
