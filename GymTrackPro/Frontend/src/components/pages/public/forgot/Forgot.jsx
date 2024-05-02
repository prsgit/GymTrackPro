import { useState } from "react";
import "./css/Forgot.css";
import { Navigate } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  const forgotUser = (e) => {
    e.preventDefault();
    setEnviando(true);

    // Después de enviar el formulario, limpiamos el estado del correo electrónico
    setTimeout(() => {
      setEnviando(false);
      setEmail("");
      Navigate("/login");
    }, 2000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className="forgot-content">
        <form className="forgot-form" onSubmit={forgotUser}>
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
            {enviando ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Forgot;
