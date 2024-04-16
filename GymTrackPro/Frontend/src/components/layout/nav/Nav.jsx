import "../nav/css/Nav.css";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/inicio">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/entrenamientos">Entrenamientos</NavLink>
          </li>
          <li>
            <NavLink to="/contacto">Contacto</NavLink>
          </li>
          <li>
            <NavLink to="/perfil">Perfil</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
