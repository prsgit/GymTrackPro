// import { useState } from "react";
import "./css/Profile.css";

import { Global } from "../../../../helpers/Global";
import { useEffect } from "react";
// import imageProfile from "../../../../assets/image/user.png";

const Perfil = () => {
  let user = localStorage.getItem("user");
  let userString = JSON.parse(user);
  // let userImage = userString.image;

  // const [saved , setSaved]=useState("not_saved");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const request = await fetch(Global.url + "user/avatar", {
          method: "GET",
          body: JSON.stringify(),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await request.json();
        console.log(data);
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      }
    };

    fetchImage();
  }, []);

  const updateUser = async (e) => {
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
              <input type="password" name="password" />
            </div>
            <div className="profile">
              <label htmlFor="file0">Imagen</label>
              <img src="" alt="perfil" />
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
