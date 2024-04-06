// Importaciones
const bcrypt = require("bcrypt");
const validate = require("../helpers/validate");
const User = require("../models/user");
const jwt = require("../helpers/jwt");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

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
    console.log(params);

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

//----------------------------------------------------------------------------------------------

const update = async (req, res) => {
  try {
    // Recoger datos usuario identificado
    let userIdentity = req.user;

    // Recoger datos a actualizar
    let userToUpdate = req.body;

    // Validar datos
    try {
      validate(userToUpdate);
    } catch (error) {
      return res.status(400).send({
        status: "error",
        message: "Validation not passed",
      });
    }

    // Comprobar si el usuario existe
    const users = await User.find({
      $or: [
        { email: userToUpdate.email.toLowerCase() },
        { nick: userToUpdate.nick.toLowerCase() },
      ],
    });

    // Comprobar si el usuario existe y no soy yo (el identificado)
    let userIsset = false;
    users.forEach((user) => {
      if (user && user._id != userIdentity.id) userIsset = true;
    });

    // Si ya existe devuelvo una respuesta
    if (userIsset) {
      return res.status(200).send({
        status: "success",
        message: "The user already exists",
      });
    }

    // Cifrar password si me llega
    if (userToUpdate.password) {
      let pwd = await bcrypt.hash(userToUpdate.password, 10);
      userToUpdate.password = pwd;
    } else {
      delete userToUpdate.password;
    }

    // Buscar usuario en la bd y actualizar datos
    let userUpdated = await User.findByIdAndUpdate(
      userIdentity.id,
      userToUpdate,
      { new: true }
    ); // Esto último nos devuelve el objeto actualizado.

    if (!userUpdated) {
      return res.status(500).send({
        status: "error",
        message: "Error when updating",
      });
    }

    // Devolver respuesta
    return res.status(200).send({
      status: "success",
      user: userUpdated,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error when updating",
    });
  }
};

//------------------------------------------------------------------------------

const upload = async (req, res) => {
  try {
    // Configuración de subida (multer) está en routes/user.js
    // y la ponemos en devolver respuesta file:req.file.

    // Recoger fichero de imagen y comprobar si existe
    if (!req.file) {
      return res.status(404).send({
        status: "error",
        message: "The request doesn't include the image",
      });
    }

    // Conseguir el nombre del archivo
    let image = req.file.originalname;

    // Sacar info. de la imagen
    const imageSplit = image.split(".");
    const extension = imageSplit[1];

    // Comprobar si la extensión es válida
    if (
      extension != "png" &&
      extension != "jpg" &&
      extension != "jpeg" &&
      extension != "webp"
    ) {
      // Borrar archivo
      const filePath = req.file.path;
      const fileDeleted = fs.unlinkSync(filePath);

      // Devolver error
      return res.status(404).send({
        status: "error",
        message: "The extension isn't valid",
      });
    }

    // Si es correcto, guardar la imagen en la bbdd
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.user.id },
      { image: req.file.filename },
      { new: true }
    );

    if (!userUpdated) {
      return res.status(500).send({
        status: "error",
        message: "Error in file upload",
      });
    }

    // Devolver respuesta
    return res.status(200).send({
      status: "success",
      user: userUpdated,
      file: req.file,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error in file upload",
    });
  }
};

//-------------------------------------------------------------------------------------

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Generar el token
    const token = crypto.randomBytes(20).toString("hex");

    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user was found with this email" });
    }

    // Establecer el token y la expiración
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    // Mostrar mensaje de restablecimiento de contraseña en la consola
    console.log(`Password reset message send to: ${user.email}`);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//---------------------------------------------------------------------------------------

//  exportar acciones
module.exports = {
  prueba,
  register,
  login,
  update,
  upload,
  forgotPassword,
};
