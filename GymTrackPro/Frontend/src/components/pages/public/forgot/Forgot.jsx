import { useState } from "react";
import "./css/Forgot.css";
// import { Navigate } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const [enviando, setEnviando] = useState(false);

  const validateEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|net|org|es)$/;
    return emailRegex.test(email);
  };

  const forgotUser = (e) => {
    e.preventDefault();
    setEnviando(true);

    if (validateEmail(email)) {
      setEmail("email");
      setTimeout(() => {
        setEnviando(false);
        setEmail("");
      }, 2000);
      return; // Detener la ejecución si el correo electrónico no es válido
    } else {
      setEmail("error");
      setTimeout(() => {
        setEnviando(false);
        setEmail("");
      }, 2000);
      return; // Detener la ejecución si el correo electrónico no es válido
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className="forgot-content">
        <form className="forgot-form" onSubmit={forgotUser}>
          <strong className="alert-success">
            {email == "email" ? "¡Mensaje enviado correctamente !" : ""}
          </strong>
          <strong className="alert-error">
            {email == "error" ? "¡Introduzca un email válido !" : ""}
          </strong>
          <div className="forgot">
            <span className="text">¿Has olvidado tu contraseña?</span>
            <label htmlFor="email"></label>
            <input
              placeholder="introduzca su email"
              type="email"
              id="email"
              name="email"
              value={email} // Asignamos el valor del estado al input.
              onChange={handleEmailChange} // Manejamos el cambio del input.
              disabled={enviando} // Deshabilita el input mientras se está enviando el formulario.
            />
            <span className="info">
              Enviaremos un código de verificación a este email si coincide con
              una cuenta de GymTrackPro existente.
            </span>
          </div>
          <button
            type="submit"
            className="btn"
            disabled={enviando || email.trim() === ""}
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default Forgot;
