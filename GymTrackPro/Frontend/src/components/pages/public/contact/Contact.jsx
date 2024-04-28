import { useState } from "react";
import "./css/Contact.css";
import useForm from "../../../../hooks/useForm";
import { Global } from "../../../../helpers/Global";

const Contact = () => {
  const { form, changed } = useForm({});

  const [email, setEmail] = useState("not_sended");

  const sendEmail = async (e) => {
    //Prevenir actulización de la pantalla.
    e.preventDefault();

    //Recoger datos del form.
    let newEmail = form;

    //Guardar en el back.
    const request = await fetch(Global.url + "email/save-email", {
      method: "POST",
      body: JSON.stringify(newEmail),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    console.log(data);

    if (data.status == "success") {
      setEmail("email");
    } else {
      setEmail("error");
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={sendEmail}>
        <strong className="alert-success">
          {email == "email" ? "Usuario registrado correctamente !" : ""}
        </strong>
        <strong className="alert-error">
          {email == "error" ? "Error al registrar el ususario !" : ""}
        </strong>
        <div className="contact">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={changed} />
        </div>
        <div className="contact">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" onChange={changed} />
        </div>
        <button className="btn" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
};

export default Contact;
