// Importar dependencias
const express = require("express");
const check = require("../middlewares/auth");

// Cargar el router
const router = express.Router();

// Importar controlador
const userController = require("../controllers/user");

//Definir rutas
router.get("/testing", check.auth, userController.prueba);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", check.auth, userController.profile);

// Exportar router
module.exports = router;
