export const validateForm = (formData) => {
  const errors = {};

  // Validación del correo electrónico
  const re = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|net|org|es)$/;
  if (!formData.email) {
    errors.email = "El campo no puede estar vacío";
  } else if (!re.test(formData.email)) {
    errors.email = "Por favor introduzca un email válido";
  }

  // Validación del resto del formulario
  if (!formData.name) errors.name = "El campo no puede estar vacío";
  if (!formData.surname) errors.surname = "El campo no puede estar vacío";
  if (!formData.nick) errors.nick = "El campo no puede estar vacío";

  return errors;
};
