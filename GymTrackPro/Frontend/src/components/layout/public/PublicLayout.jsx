import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

const PublicLayout = () => {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");

  return (
    <>
      {token !== null &&
      token !== undefined &&
      user !== null &&
      user !== undefined ? (
        (location.href = "/private")
      ) : (
        <>
          <Header />
          <Nav />

          <section className="layout-content">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default PublicLayout;
