const email = require("../models/email");

const saveEmail = async (req, res) => {
  // Recoger datos de la petición
  let params = req.body;

  // Comprobar que que llegan los datos bien
  if (!params.email || !params.message) {
    return res.status(400).send({
      status: "error",
      message: " Required data to send an email is missing",
    });
  }

  // Crear objeto del email y envia el mensaje a la base de datos

  let newEmail = new email({
    email: params.email,
    message: params.message,
  });

  //Guardar y devolver resultado
  try {
    await newEmail.save();
    return res.status(200).json({
      status: "success",
      message: "Email sent successfully",
      email: newEmail,
    });
  } catch (error) {
    console.log("Error sending email:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = { saveEmail };
