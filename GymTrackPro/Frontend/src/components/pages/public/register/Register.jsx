import useForm from "../../../../hooks/useForm";
import "./css/Register.css";
import { Global } from "../../../../helpers/Global";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { form, changed } = useForm({});

  const [saved, setSaved] = useState("not_sended");

  const navigate = useNavigate();

  const saveUser = async (e) => {
    //Prevenir actulización de la pantalla.
    e.preventDefault();

    //Recoger datos del form.
    let newUser = form;

    //Guardar en el back.
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

      // Después de 2 segundo, navega a la página de inicio de sesión
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <div className="main-content">
        <strong className="alert-success">
          {saved == "saved" ? "Usuario registrado correctamente !" : ""}
        </strong>
        <strong className="alert-error">
          {saved == "error" ? "Error al registrar el ususario !" : ""}
        </strong>

        <form className="register-form" onSubmit={saveUser}>
          <div className="register">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed} />
          </div>
          <div className="register">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" name="surname" onChange={changed} />
          </div>
          <div className="register">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" onChange={changed} />
          </div>
          <div className="register">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="register">
            <label htmlFor="passowrd">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <button type="submit" className="btn">
            Registrate
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
