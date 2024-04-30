import "./css/Profile.css";

const Perfil = () => {
  let user = localStorage.getItem("user");
  let userString = JSON.parse(user);

  const updateUser = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <>
        <div className="main-content">
          <strong className="alert-success">
            {/* {saved == "saved" ? "Usuario modificado correctamente !" : ""} */}
          </strong>
          <strong className="alert-error">
            {/* {saved == "error" ? "Error al modificar el ususario !" : ""} */}
          </strong>

          <form className="profile-form" onSubmit={updateUser}>
            <div className="profile">
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" defaultValue={userString.name} />
            </div>
            <div className="profile">
              <label htmlFor="surname">Apellidos</label>
              <input
                type="text"
                name="surname"
                defaultValue={userString.surname}
              />
            </div>
            <div className="profile">
              <label htmlFor="nick">Nick</label>
              <input type="text" name="nick" defaultValue={userString.nick} />
            </div>
            <div className="profile">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={userString.email}
              />
            </div>
            <div className="profile">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                defaultValue={userString.password}
              />
            </div>
            <div className="profile">
              <label htmlFor="file0">Imagen</label>
              <div className="imagen">{/* {Mostrar imagen} */}</div>
              <input type="file" name="file0" id="file" />
            </div>

            <button type="submit" className="btn">
              Guardar
            </button>
          </form>
        </div>
      </>
    </>
  );
};

export default Perfil;
