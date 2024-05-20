// import "./css/Profile.css";
// import { Global } from "../../../../helpers/Global";
// import { useEffect, useState } from "react";
// import imageProfile from "../../../../assets/image/user.png";
// import { SerializeForm } from "../../../../helpers/SerializeForm";

// const Perfil = () => {
//   let user = localStorage.getItem("user");
//   let userString = JSON.parse(user);

//   let userImage = userString.image;

//   let imageUrl =
//     userImage !== "default.png"
//       ? Global.url + "user/avatar/" + userImage
//       : imageProfile;

//   const [setNewImage] = useState(null);

//   const [saved, setSaved] = useState("not_saved");

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const request = await fetch(Global.url + "user/avatar", {
//           method: "GET",
//           body: JSON.stringify(),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await request.json();
//         console.log(data);
//       } catch (error) {
//         console.error("Error al obtener la imagen:", error);
//       }
//     };

//     fetchImage();
//   }, []);

//   const handleImageChange = (e) => {
//     //Para poder hacer click en la imagen y pueda cambiarla.
//     const file = e.target.files[0];
//     setNewImage(file);
//   };

//   // ------------------------------------ guardar usuario editado ----------------------------------------------------
//   const updateUser = async (e) => {
//     e.preventDefault();

//     //Recoger datos del formulario
//     let newDataUser = SerializeForm(e.target);

//     //Borrar la imagen
//     // delete newDataUser.file0;

//     //Actualizar usuario en la base de datos
//     const request = await fetch(Global.url + "user/update", {
//       method: "PUT",
//       body: JSON.stringify(newDataUser),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: localStorage.getItem("token"),
//       },
//     });

//     const data = await request.json();

//     if (data.status == "success") {
//       setSaved("saved");
//     } else {
//       setSaved("error");
//     }
//   };

//   //------------------------------------------------------------------------------------------------
//   return (
//     <>
//       <>
//         <div className="main-content">
//           <strong className="alert-success">
//             {saved == "saved" ? "Usuario modificado correctamente !" : ""}
//           </strong>
//           <strong className="alert-error">
//             {saved == "error" ? "Error al modificar el ususario !" : ""}
//           </strong>

//           <form className="profile-form" onSubmit={updateUser}>
//             <div className="profile">
//               <label htmlFor="fileInput">
//                 <img src={imageUrl} alt="perfil" />
//               </label>
//               <input
//                 type="file"
//                 id="fileInput"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />
//             </div>
//             <div className="profile">
//               <label htmlFor="name">Nombre</label>
//               <input type="text" name="name" defaultValue={userString.name} />
//             </div>
//             <div className="profile">
//               <label htmlFor="surname">Apellidos</label>
//               <input
//                 type="text"
//                 name="surname"
//                 defaultValue={userString.surname}
//               />
//             </div>
//             <div className="profile">
//               <label htmlFor="nick">Nick</label>
//               <input type="text" name="nick" defaultValue={userString.nick} />
//             </div>
//             <div className="profile">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 defaultValue={userString.email}
//               />
//             </div>
//             <div className="profile">
//               <label htmlFor="password">Contraseña</label>
//               <input type="password" name="password" />
//             </div>

//             <button type="submit" className="btn">
//               Guardar
//             </button>
//           </form>
//         </div>
//       </>
//     </>
//   );
// };

// export default Perfil;

//--------------------------------------------------------------------------------

// import "./css/Profile.css";
// import { Global } from "../../../../helpers/Global";
// import { useEffect, useState } from "react";
// import imageProfile from "../../../../assets/image/user.png";
// import { SerializeForm } from "../../../../helpers/SerializeForm";

// const Perfil = () => {
//   let user = localStorage.getItem("user");
//   let userString = JSON.parse(user);

//   let userImage = userString.image;

//   let imageUrl =
//     userImage !== "default.png"
//       ? Global.url + "user/avatar/" + userImage
//       : imageProfile;

//   const [setNewImage] = useState(null);

//   const [saved, setSaved] = useState("not_saved");

//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const request = await fetch(Global.url + "user/avatar", {
//           method: "GET",
//           body: JSON.stringify(),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await request.json();
//         console.log(data);
//       } catch (error) {
//         console.error("Error al obtener la imagen:", error);
//       }
//     };

//     fetchImage();
//   }, []);

//   const handleImageChange = (e) => {
//     //Para poder hacer click en la imagen y pueda cambiarla.
//     const file = e.target.files[0];
//     setNewImage(file);
//   };

//   // ------------------------------------ guardar usuario editado ----------------------------------------------------
//   const updateUser = async (e) => {
//     e.preventDefault();

//     //Recoger datos del formulario
//     let newDataUser = SerializeForm(e.target);

//     //Borrar la imagen
//     // delete newDataUser.file0;

//     //Actualizar usuario en la base de datos
//     const request = await fetch(Global.url + "user/update", {
//       method: "PUT",
//       body: JSON.stringify(newDataUser),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: localStorage.getItem("token"),
//       },
//     });

//     const data = await request.json();

//     if (data.status == "success") {
//       setSaved("saved");
//       setUserData(newDataUser);
//       localStorage.setItem("user", JSON.stringify(newDataUser));
//     } else {
//       setSaved("error");
//     }
//   };
//   useEffect(() => {
//     let storageUser = localStorage.getItem("user");

//     if (storageUser) {
//       setUserData(JSON.parse(storageUser));
//     }
//     console.log(userData);
//   }, []);

//   //------------------------------------------------------------------------------------------------
//   return (
//     <>
//       <>
//         <div className="main-content">
//           <form className="profile-form" onSubmit={updateUser}>
//             <div className="profile">
//               <label htmlFor="fileInput">
//                 <img src={imageUrl} alt="perfil" />
//               </label>
//               <input
//                 type="file"
//                 id="fileInput"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />
//             </div>
//             <strong className="alert-success">
//               {saved == "saved" ? "Usuario modificado correctamente !" : ""}
//             </strong>
//             <strong className="alert-error">
//               {saved == "error" ? "Error al modificar el ususario !" : ""}
//             </strong>

//             <div className="profile">
//               <label htmlFor="name">Nombre</label>
//               <input type="text" name="name" defaultValue={userString.name} />
//             </div>

//             <div className="profile">
//               <label htmlFor="surname">Apellidos</label>
//               <input
//                 type="text"
//                 name="surname"
//                 defaultValue={userString.surname}
//               />
//             </div>
//             <div className="profile">
//               <label htmlFor="nick">Nick</label>
//               <input type="text" name="nick" defaultValue={userString.nick} />
//             </div>
//             <div className="profile">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 defaultValue={userString.email}
//               />
//             </div>
//             <div className="profile">
//               <label htmlFor="password">Contraseña</label>
//               <input type="password" name="password" />
//             </div>

//             <button type="submit" className="btn">
//               Guardar
//             </button>
//           </form>
//         </div>
//       </>
//     </>
//   );
// };

// export default Perfil;

//--------------------------------------------PRUEBA----------------------------------------------------------------------

import "./css/Profile.css";
import { Global } from "../../../../helpers/Global";
import { useEffect, useState } from "react";
import imageProfile from "../../../../assets/image/user.png";
import { ImageProfileUpload } from "./ImageProfileUpload";

const Perfil = () => {
  let user = localStorage.getItem("user");
  let userString = JSON.parse(user);

  let userImage = userString.image;
  console.log(userString);
  let imageUrl =
    userImage !== "default.png"
      ? Global.url + "user/avatar/" + userImage
      : imageProfile;

  const [saved, setSaved] = useState("not_saved");

  const [userData, setUserData] = useState(null);

  const token = localStorage.getItem("token");

  //--------------------------------------Guardar usuario editado------------------------------------
  const [formData, setFormData] = useState({
    name: userString.name,
    surname: userString.surname,
    nick: userString.nick,
    email: userString.email,
    password: userString.password,
    image: userString.image,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(Global.url + "user/update", {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await request.json();

      if (data.status == "success") {
        setSaved("saved");
        setUserData(formData);
        localStorage.setItem("user", JSON.stringify(formData));
        window.location.reload(); // Recargar la página
      } else {
        setSaved("error");
      }
    } catch (error) {
      console.error("Error al obtener el usuario");
    }
  };
  console.log(handleSubmit);

  useEffect(() => {
    let storageUser = localStorage.getItem("user");

    if (storageUser) {
      setUserData(JSON.parse(storageUser));
    }
  }, []);
  console.log(userData);
  //--------------------------------------------------------------------------------------------------------------

  // ------------------------------------ cambiar imagen ----------------------------------------------------

  // //   // subida de imagen
  //    const file = document.querySelector("#fileInput");

  //    if (data.status == "success" && file.files[0]) {
  //      //Recoger imagen a subir
  //      const formData = new FormData();
  //      formData.append("file0", file.files[0]);
  //      console.log(formData);

  //      // Petición

  //      const uploadRequest = await fetch(Global.url + "user/upload", {
  //        method: "PUT",
  //        body: formData,
  //        headers: {
  //          Authorization: token,
  //        },
  //      });

  //      const uploadData = await uploadRequest.json();
  //      console.log(uploadData);

  //      if (uploadData.status == "success") {

  //        setSaved("saved");
  //      } else {
  //        setSaved("error");
  //      }
  //    }
  // };

  //------------------------------------------------------------------------------------------------
  return (
    <div className="main-content">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile">
          <label className="image-label" htmlFor="fileInput">
            <img src={imageUrl} alt="perfil" />
            <ImageProfileUpload />
          </label>
        </div>
        <strong className="alert-success">
          {saved == "saved" ? "Usuario modificado correctamente !" : ""}
        </strong>
        <strong className="alert-error">
          {saved == "error" ? "Error al modificar el usuario !" : ""}
        </strong>

        <div className="profile">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            defaultValue={userString.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="profile">
          <label htmlFor="surname">Apellidos</label>
          <input
            type="text"
            name="surname"
            defaultValue={userString.surname}
            onChange={handleInputChange}
          />
        </div>
        <div className="profile">
          <label htmlFor="nick">Nick</label>
          <input
            type="text"
            name="nick"
            defaultValue={userString.nick}
            onChange={handleInputChange}
          />
        </div>
        <div className="profile">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={userString.email}
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
