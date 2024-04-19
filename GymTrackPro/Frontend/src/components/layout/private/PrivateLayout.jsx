import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

const PrivateLayout = () => {
  return (
    <>
      {/*Layout*/}
      <Header />
      <Nav />

      {/*Contenido principal */}
      <section className="layout-content">
        <Outlet />
      </section>
    </>
  );
};

export default PrivateLayout;
