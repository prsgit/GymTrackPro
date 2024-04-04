// Importar dependencias
const express = require("express");

// Cargar el router
const router = express.Router();

// Importar controlador
const workoutsController = require("../controllers/workouts");

//Configuración de subida de imagenes
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //le indica a multer dónde se van a guardar las imagenes.

    cb(null, "./uploads/workouts/");
  },

  filename: (req, file, cb) => {
    cb(null, "workout-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage }); // uploads funciona como middleware(tipo check.auth).

//Definir rutas
router.post("/save", workoutsController.saveWorkout);
router.put("/update/:id", workoutsController.update);
router.post("/upload/:id", uploads.single("file0"), workoutsController.upload); //se pueden pasar varios middlewares con []

router.get("/image/:file", workoutsController.image);
router.delete("/remove/:id", workoutsController.remove);

// Exportar router
module.exports = router;
