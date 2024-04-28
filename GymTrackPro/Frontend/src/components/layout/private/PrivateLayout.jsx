import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
// import useAuth from "../../../hooks/useAuth";

const PrivateLayout = () => {
  // const { auth } = useAuth();
  // console.log(auth);
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  // if (
  //   token === null ||
  //   token === undefined ||
  //   user === null ||
  //   user === undefined
  // ) {
  //   location.href = "/login";
  //   // <Navigate to="/login" replace />;
  // }
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
        {/* <Outlet /> */}
      </section>
    </>
  );
};

export default PrivateLayout;
