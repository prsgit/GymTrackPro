import useForm from "../../../../hooks/useForm";
import "./css/Register.css";
import { Global } from "../../../../helpers/Global";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { form, changed } = useForm({});

  const [saved, setSaved] = useState("not_sended");

  const navigate = useNavigate();

  const [registrando] = useState();

  const validateEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|net|org|es)$/;
    return emailRegex.test(email);
  };

  const saveUser = async (e) => {
    e.preventDefault();

    // Validar el correo electrónico antes de enviarlo
    if (!validateEmail(form.email)) {
      setSaved("error");
      setTimeout(() => {
        setSaved("not_sended");
      }, 2000);
      return;
    }

    let newUser = form;

    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      setSaved("saved");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setSaved("error");
      setTimeout(() => {
        setSaved("not_sended");
      }, 2000);
    }
  };

  return (
    <>
      <div className="main-content">
        <form className="register-form" onSubmit={saveUser}>
          <strong className="alert-success">
            {saved == "saved" ? "¡Usuario registrado correctamente!" : ""}
          </strong>
          <strong className="alert-error">
            {saved == "error" ? "¡Error al registrar el usuario !" : ""}
          </strong>
          <div className="register">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              onChange={changed}
              disabled={registrando}
            />
          </div>
          <div className="register">
            <label htmlFor="surname">Apellidos</label>
            <input
              type="text"
              name="surname"
              onChange={changed}
              disabled={registrando}
            />
          </div>
          <div className="register">
            <label htmlFor="nick">Nick</label>
            <input
              type="text"
              name="nick"
              onChange={changed}
              disabled={registrando}
            />
          </div>
          <div className="register">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={changed}
              disabled={registrando}
            />
          </div>
          <div className="register">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              onChange={changed}
              disabled={registrando}
            />
          </div>

          <button
            type="submit"
            className="btn"
            disabled={registrando || saved.trim() === ""}
          >
            Registrate
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
