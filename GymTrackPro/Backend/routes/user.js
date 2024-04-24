// Importar dependencias
const express = require("express");
const check = require("../middlewares/auth");

// Cargar el router
const router = express.Router();

// Importar controlador
const userController = require("../controllers/user");

//Configuración de subida de imagenes
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //le indica a multer dónde se van a guardar las imagenes.

    cb(null, "./uploads/avatars/");
  },

  filename: (req, file, cb) => {
    cb(null, "avatar-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage }); // uploads funciona como middleware(tipo check.auth).

//Definir rutas
router.get("/testing", check.auth, userController.prueba);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", check.auth, userController.profile);
router.put("/update", check.auth, userController.update);
router.post(
  "/upload",
  [check.auth, uploads.single("file0")],
  userController.upload
); //se pueden pasar varios middlewares con []
router.post("/forgotpassword", check.auth, userController.forgotPassword);

// Exportar router
module.exports = router;
