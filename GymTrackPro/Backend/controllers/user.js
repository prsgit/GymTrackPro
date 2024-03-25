const { param } = require("../routes/user");

// acción de prueba
const prueba = (req, res) => {
  return res.status(200).send({
    status: "success",
    message: "Message sent from: controllers/user.js",
  });
};

// Registro
const register = (req, res) => {
  // Recoger datos de la petición
  let params = req.body;

  // Comprobar que que llegan los datos bien
  if (!params.name || !params.nick || !params.email || !params.password) {
    return res.status(400).send({
      status: "error",
      message: "Require date to register user",
    });
  }

  // Validar datos

  // Control de usuarios duplicados

  // Cifrar contraseña

  // Crear objeto del usuario

  // Guardar usuario en la bd

  //Limpiar el objeto a devolver

  //Devolver un resultado

  return res.status(200).send({
    status: "success",
    message: "Registration method",
  });
};

//  exportar acciones
module.exports = {
  prueba,
  register,
};
