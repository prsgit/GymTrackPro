import { Global } from "../../../../helpers/Global";
import { useState } from "react";

export const ImageProfileUpload = () => {
  const [newImage, setNewImage] = useState(null);

  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    // Para poder hacer click en la imagen y pueda cambiarla.
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleSubmitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", newImage);

    try {
      const request = await fetch(Global.url + "user/upload", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: token,
        },
      });

      const data = await request.json();
      console.log(data, "imagen");

      //   if (data.status == "success") {
      //     localStorage.setItem("user", JSON.stringify(formData));
      //     window.location.reload(); // Recargar la página
      //   } else {
      //     ("");
      //   }
    } catch (error) {
      console.error("Error al guardar la imagen", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitImage}>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </form>
    </>
  );
};
