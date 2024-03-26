// Importaciones
const bcrypt = require("bcrypt");
const validate = require("../helpers/validate");
const User = require("../models/user");
const jwt = require("../helpers/jwt");

//test de prueba---------------------------------------------------------------------------------------
const prueba = (req, res) => {
  return res.status(200).send({
    status: "success",
    message: "Message sent from: controllers/user.js",
  });
};

//------------------------------------------------------------------------------------------------
const register = async (req, res) => {
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
  try {
    validate(params);
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "Validation not passed",
    });
  }

  // Control de usuarios duplicados
  try {
    const users = await User.find({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    }).exec();

    if (users && users.length >= 1) {
      return res.status(200).send({
        status: "error",
        message: "The user already exists",
      });
    }

    // Cifrar contraseña
    let pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;

    // Crear objeto del usuario
    let userToSave = new User(params);

    // Guardar usuario en la bd
    try {
      const userStored = await userToSave.save();

      //Limpiar el objeto a devolver(password y role)
      let userCreated = userStored.toObject();
      delete userCreated.password;
      delete userCreated.role;

      //Devolver un resultado
      return res.status(200).send({
        status: "success",
        message: "Correctly registered user",
        user: userCreated,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: "error",
        message: "Error when registering the user",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};
//-------------------------------------------------------------------------------------------------------------
const login = async (req, res) => {
  try {
    // Recoger los params de la petición
    let params = req.body;

    // Comprobar que me llegan
    if (!params.email || !params.password) {
      return res.status(400).send({
        status: "error",
        message: "Missing data to be sent",
      });
    }

    // Buscar en la bd si existe el mail
    const user = await User.findOne({ email: params.email }).select(
      "+password +role"
    );

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "The user doesn´t exist",
      });
    }

    //Comprobar contraseña
    const pwd = bcrypt.compareSync(params.password, user.password);

    if (!pwd) {
      return res.status(404).send({
        status: "error",
        message: "Password not found",
      });
    }

    // limpiar objetos
    let identityUser = user.toObject();
    delete identityUser.password;
    delete identityUser.role;

    //Conseguir token jwt(crear un servicio que permita crear el token,está en helpers jwt.js)
    const token = jwt.createToken(user);

    //Devolver datos de usuario y token
    return res.status(200).send({
      status: "success",
      message: "Login method",
      user: identityUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};

//-------------------------------------------------------------------------------------------------------
const profile = async (req, res) => {
  try {
    //Recoger id usuario url
    const id = req.params.id;

    // Consulta para obtener los datos del perfil
    const userProfile = await User.findById(id);

    if (!userProfile) {
      return res.status(404).send({
        status: "error",
        message: "The user doesn´t exist",
      });
    }

    // Devolver resultado
    return res.status(200).send({
      status: "success",
      id,
      userProfile,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};

//  exportar acciones
module.exports = {
  prueba,
  register,
  login,
  profile,
};
