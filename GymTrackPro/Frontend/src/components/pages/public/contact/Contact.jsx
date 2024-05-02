import { useState } from "react";
import "./css/Contact.css";
import useForm from "../../../../hooks/useForm";
import { Global } from "../../../../helpers/Global";

const Contact = () => {
  const { form, changed, resetForm } = useForm({});

  const [email, setEmail] = useState("not_sended");

  const validateEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|net|org|es)$/;
    return emailRegex.test(email);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    // Validar el correo electrónico antes de enviarlo
    if (!validateEmail(form.email)) {
      setEmail("error");
      setTimeout(() => {
        setEmail("not_sended");
      }, 2000);
      return; // Detener la ejecución si el correo electrónico no es válido
    }

    let newEmail = form;

    const request = await fetch(Global.url + "email/save-email", {
      method: "POST",
      body: JSON.stringify(newEmail),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      setEmail("email");
      setTimeout(() => {
        setEmail("not_sended");
      }, 2000);
      resetForm();
    } else {
      setEmail("error");
      setTimeout(() => {
        setEmail("not_sended");
      }, 2000);
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={sendEmail}>
        <strong className="alert-success">
          {email == "email" ? "¡Mensaje enviado correctamente !" : ""}
        </strong>
        <strong className="alert-error">
          {email == "error" ? "¡Error al enviar el mensaje !" : ""}
        </strong>
        <div className="contact">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={changed}
            value={form.email || ""}
          />
        </div>
        <div className="contact">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            onChange={changed}
            value={form.message || ""}
          />
        </div>
        <button className="btn" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
};

export default Contact;
