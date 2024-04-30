import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/initial");
  });

  return (
    <>
      <h1>Cerrando sesión</h1>
    </>
  );
};

export default Logout;
