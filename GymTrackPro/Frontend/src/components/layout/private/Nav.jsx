import "../nav/css/Nav.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const Nav = () => {
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <FontAwesomeIcon icon={faHouse} size="sm" className="icon" />
            <NavLink to="inicio">Inicio</NavLink>
          </li>
          <li>
            <FontAwesomeIcon icon={faDumbbell} size="sm" className="icon" />
            <NavLink to="entrenamientos">Entrenamientos</NavLink>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} size="sm" className="icon" />
            <NavLink to="perfil">Perfil</NavLink>
          </li>
          <li className="logout">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size="sm"
              className="icon"
            />
            <NavLink to="cerrar-sesion">Cerrar sesión</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
