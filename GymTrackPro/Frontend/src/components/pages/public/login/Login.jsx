import { useState } from "react";
import { Global } from "../../../../helpers/Global";
import useForm from "../../../../hooks/useForm";
import "./css/Login.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { form, changed } = useForm({});

  const [loged, setLoged] = useState("not_sended");

  const [iniciando, setIniciando] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setIniciando(true);

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
      }, 2000);
    } else {
      setLoged("error");
      setTimeout(() => {
        setLoged("not_sended");
      }, 2000);

      setTimeout(() => {
        setIniciando(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="login-content">
        <form className="login-form" onSubmit={loginUser}>
          <strong className="alert-error">
            {loged == "error" ? "Error al identificar el usuario !" : ""}
          </strong>
          <div className="login">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={changed}
              disabled={iniciando}
            />
          </div>
          <div className="login">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={changed}
              disabled={iniciando} //evita acceder al input mientras se esta ejecutando.
            />
          </div>

          <div className="forgot-password">
            <NavLink className={"forgot-link"} to="/forgot">
              ¿Has olvidado tu contraseña?
            </NavLink>
          </div>
          <button
            type="submit"
            className="btn"
            disabled={iniciando || loged.trim() === ""} //evita múltiples solicitudes mientras esta iniciando.
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
