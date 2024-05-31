import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

const PrivateLayout = () => {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");

  return (
    <>
      {/*Layout*/}
      <Header />
      <Nav />

      {/*Contenido principal */}
      <section className="layout-content">
        {token !== null &&
        token !== undefined &&
        user !== null &&
        user !== undefined ? (
          <Outlet />
        ) : (
          <Navigate to="/login" />
        )}
      </section>
    </>
  );
};

export default PrivateLayout;
