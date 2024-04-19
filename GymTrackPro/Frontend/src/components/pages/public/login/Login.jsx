import "./css/Login.css";

const Login = () => {
  return (
    <>
      <form className="login-form">
        <div className="login">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="login">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" />
        </div>
        <button className="btn" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </>
  );
};

export default Login;
