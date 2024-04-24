import "./css/Contact.css";

const Contact = () => {
  return (
    <>
      <form className="contact-form">
        <div className="contact">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="contact">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" />
        </div>
        <button className="btn" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
};

export default Contact;
