import { Routes, Route, BrowserRouter } from "react-router-dom";
import Inicio from "../components/pages/inicio/Home";
import Contact from "../components/pages/contact/Contact";
import Entrenamientos from "../components/pages/typeworkouts/Entrenamientos";
import Perfil from "../components/pages/profile/Perfil";
import Header from "../components/layout/headers/Header";
import Nav from "../components/layout/nav/Nav";
import Footer from "../components/layout/footer/Footer";

const Rutas = () => {
  return (
    <>
      <BrowserRouter>
        {/*Layout*/}
        <Header />
        <Nav />

        {/*Contenido central y rutas*/}
        <section id="content" className="content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/entrenamientos" element={<Entrenamientos />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </section>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Rutas;
