import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "../components/layout/footer/Footer";
import PublicLayout from "../components/layout/public/PublicLayout";
import PrivateLayout from "../components/layout/private/PrivateLayout";
import Initialpage from "../components/pages/public/initialpage/Initialpage";
import Login from "../components/pages/public/login/Login";
import Register from "../components/pages/public/register/Register";
import Error404 from "../components/pages/public/error 404/Error404";
import Inicio from "../components/pages/private/inicio/Home";
import Contact from "../components/pages/public/contact/Contact";
import Entrenamientos from "../components/pages/private/typeworkouts/Entrenamientos";
import Perfil from "../components/pages/private/profile/Perfil";
import Logout from "../components/pages/private/logout/Logout";
// import AuthProvider from "../context/AuthProvider";

const Rutas = () => {
  return (
    <>
      <BrowserRouter>
        {/* <AuthProvider> */}
        <Routes>
          <Route index element={<Initialpage />} />
          <Route path="initial" element={<Initialpage />} />
          <Route path="/" element={<PublicLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="contacto" element={<Contact />} />
          </Route>

          <Route path="/private" element={<PrivateLayout />}>
            <Route index element={<Inicio />} />
            <Route path="entrenamientos" element={<Entrenamientos />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="cerrar-sesion" element={<Logout />} />
          </Route>

          <Route path="*" element={<Error404 />}></Route>
        </Routes>

        <Footer />
        {/* </AuthProvider> */}
      </BrowserRouter>
    </>
  );
};

export default Rutas;
