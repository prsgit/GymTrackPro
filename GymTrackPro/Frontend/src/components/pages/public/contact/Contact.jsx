import { useState } from "react";
import "./css/Contact.css";
import useForm from "../../../../hooks/useForm";
import { Global } from "../../../../helpers/Global";

const Contact = () => {
  const { form, changed, resetForm } = useForm({});

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

    if (data.status == "success") {
      setEmail("email");

      // Resetear el estado de 'email' después de 2 segundos
      setTimeout(() => {
        setEmail("not_sended");
      }, 2000);

      // Limpiar campos del formulario después del envío exitoso
      resetForm();
    } else {
      setEmail("error");
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={sendEmail}>
        <strong className="alert-success">
          {email == "email" ? "Mensaje enviado correctamente !" : ""}
        </strong>
        <strong className="alert-error">
          {email == "error" ? "Error al enviar el mensaje !" : ""}
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
