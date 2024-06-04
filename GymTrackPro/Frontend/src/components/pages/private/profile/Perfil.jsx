import "./css/Profile.css";
import { Global } from "../../../../helpers/Global";
import { useEffect, useState } from "react";
import imageProfile from "../../../../assets/image/profile.jpg";

const Perfil = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [saved, setSaved] = useState("not_saved");
  const [userData, setUserData] = useState(user);
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    password: user.password,
    image: user.image,
  });

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const imageUrl =
    userData.image !== "default.png"
      ? `${Global.url}user/avatar/${userData.image}`
      : imageProfile;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //------------------cambiar datos profile------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Global.url}user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        setSaved("saved");
        setUserData(formData);
        localStorage.setItem("user", JSON.stringify(formData));
        window.location.reload();
      } else {
        setSaved("error");
      }
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
      setSaved("error");
    }
  };

  //------------------cambiar imagen profile------------------------------------------------
  const ImageProfileUpload = async (file) => {
    const url = Global.url + "user/upload";

    const uploadData = new FormData();
    uploadData.append("file0", file);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: uploadData,
      });

      const result = await response.json();

      if (response.ok) {
        const updatedUser = { ...userData, image: result.user.image };
        setUserData(updatedUser);
        setFormData(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
        setSaved("saved");
      } else {
        console.error("Error en la carga de la imagen", result);
        setSaved("error");
      }
    } catch (error) {
      console.error("Error al subir la imagen", error);
      setSaved("error");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      ImageProfileUpload(file);
    }
  };
  //---------------------------------------------------------------------------------------

  return (
    <div className="main-content">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile">
          <label className="image-label" htmlFor="fileInput">
            <img src={imageUrl} alt="perfil" />
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
        </div>
        <strong className="alert-success">
          {saved === "saved" ? "Usuario modificado correctamente!" : ""}
        </strong>
        <strong className="alert-error">
          {saved === "error" ? "Error al modificar el usuario!" : ""}
        </strong>

        <div className="profile">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="profile">
          <label htmlFor="surname">Apellidos</label>
          <input
            type="text"
            name="surname"
            defaultValue={user.surname}
            onChange={handleInputChange}
          />
        </div>
        <div className="profile">
          <label htmlFor="nick">Nick</label>
          <input
            type="text"
            name="nick"
            defaultValue={user.nick}
            onChange={handleInputChange}
          />
        </div>
        <div className="profile">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="profile">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </div>

        <button type="submit" className="btn">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default Perfil;
