import "./css/Register.css";

const Register = () => {
  return (
    <>
      <div className="main-content">
        <form className="register-form">
          <div className="register">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" />
          </div>
          <div className="register">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" name="surname" />
          </div>
          <div className="register">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" />
          </div>
          <div className="register">
            <label htmlFor="email">Email</label>
            <input type="email" name="name" />
          </div>
          <div className="register">
            <label htmlFor="passowrd">Contraseña</label>
            <input type="password" name="password" />
          </div>

          <button type="submit" value="Registrate" className="btn" />
        </form>
      </div>
    </>
  );
};

export default Register;
