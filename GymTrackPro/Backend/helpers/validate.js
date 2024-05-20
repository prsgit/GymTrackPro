const validator = require("validator");

const validateUser = (params, isEditing = false) => {
  let errors = {};

  // Validación del nombre
  if (params.name !== undefined) {
    if (
      !validator.isEmpty(params.name) &&
      validator.isLength(params.name, { min: 3, max: undefined }) &&
      validator.isAlpha(params.name, "es-ES")
    ) {
      errors.name = null;
    } else {
      errors.name = "El nombre no es válido";
    }
  }

  // Validación del apodo (nick)
  if (params.nick !== undefined) {
    if (
      !validator.isEmpty(params.nick) &&
      validator.isLength(params.nick, { min: 2, max: 60 })
    ) {
      errors.nick = null;
    } else {
      errors.nick = "El apodo (nick) no es válido";
    }
  }

  // Validación del correo electrónico
  if (params.email !== undefined) {
    if (!validator.isEmpty(params.email) && validator.isEmail(params.email)) {
      errors.email = null;
    } else {
      errors.email = "El correo electrónico no es válido";
    }
  }

  // Validación de la contraseña
  if (params.password !== undefined) {
    if (!validator.isEmpty(params.password)) {
      errors.password = null;
    } else {
      errors.password = "La contraseña no es válida";
    }
  }

  // Validación del apellido
  if (params.surname !== undefined) {
    if (
      !validator.isEmpty(params.surname) &&
      validator.isLength(params.surname, { min: 3, max: undefined }) &&
      validator.isAlpha(params.surname, "es-ES")
    ) {
      errors.surname = null;
    } else {
      errors.surname = "El apellido no es válido";
    }
  }

  if (params.image !== undefined || params.image !== null) {
    let validImageExtensions = ["jpg", "jpeg", "png", "gif"];
    let imageExtension = params.image.split(".").pop().toLowerCase();

    let imageValid = validImageExtensions.includes(imageExtension);

    if (!imageValid) {
      throw new Error("The validation for 'image' hasn´t been passed");
    } else {
      console.log("Validation passed for image");
    }
  }

  // Si estamos en modo edición, comprobamos si hay algún error
  if (isEditing) {
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) {
      throw new Error("Los datos del usuario no son válidos");
    }
  } else {
    // Si estamos en modo creación, devolvemos los errores encontrados
    return errors;
  }
};

module.exports = validateUser;
