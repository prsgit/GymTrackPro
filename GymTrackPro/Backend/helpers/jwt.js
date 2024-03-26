// Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//Definir clave secreta
const secret = "CLAVE_SECRETA_de_MI_proyecto_de_GYM_track_PRO_05011990";

//Crear la función para generar tokens
const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(), //fecha de creación del token.
    exp: moment().add(30, "days").unix(), //fecha de expiración del token.
  };

  //Devolver token
  return jwt.encode(payload, secret);
};

//Exportar módulos
module.exports = {
  secret,
  createToken,
};
