//Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//Importar clave secreta
const { secret } = require("../helpers/jwt");

//Crear el middleware(método o función)
exports.auth = (req, res, next) => {
  //Comprobar si llega la cabecera auth
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "The request doesn´t have the authentication header",
    });
  }

  //Limpiar el token
  let token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    //Decodificar el token
    let payload = jwt.decode(token, secret);

    // Comprobar la expiración del token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        status: "error",
        message: "Expired token",
      });
    }

    //Agregar datos del usuario a la request
    req.user = payload;
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "Token invalidated",
      error,
    });
  }

  //Pasar a la ejecución de la acción
  next();
};
