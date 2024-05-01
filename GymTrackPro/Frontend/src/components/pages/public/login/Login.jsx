import { useState } from "react";
import { Global } from "../../../../helpers/Global";
import useForm from "../../../../hooks/useForm";
import "./css/Login.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { form, changed } = useForm({});

  const [loged, setLoged] = useState("not_sended");

  const loginUser = async (e) => {
    e.preventDefault();

    //Datos del form.
    let userToLogin = form;

    //Petición al back.
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      //Persistir los datos en el navegador.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setLoged("login");

      //Redirección

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setLoged("error");
    }
  };

  return (
    <>
      <div className="login-content">
        <strong className="alert-success">
          {loged == "login" ? "Usuario identificado correctamente !" : ""}
        </strong>
        <strong className="alert-error">
          {loged == "error" ? "Error al identificar el usuario !" : ""}
        </strong>

        <form className="login-form" onSubmit={loginUser}>
          <div className="login">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={changed} />
          </div>
          <div className="login">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={changed}
            />
          </div>
          <div className="forgot-password">
            <NavLink className={"forgot-link"} to="/forgot">
              ¿Has olvidado tu contraseña?
            </NavLink>
          </div>
          <button type="submit" className="btn">
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
