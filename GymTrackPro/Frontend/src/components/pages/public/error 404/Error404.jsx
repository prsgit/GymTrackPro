import error from "../../../../assets/image/error404.jpg";
import "../error 404/css/Error404.css";

const Error404 = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="error">
        <h2>Página no encontrada</h2>
        <img src={error} alt="Error 404" />
        <p>Lo sentimos , la página que estás buscando no se pudo encontrar</p>
        <button onClick={handleGoBack}>Volver</button>
      </div>
    </>
  );
};

export default Error404;
