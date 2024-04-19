import "../nav/css/Nav.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <FontAwesomeIcon icon={faUser} size="sm" className="icon" />
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <FontAwesomeIcon icon={faUsers} size="sm" className="icon" />
            <NavLink to="/registro">Registro</NavLink>
          </li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} size="sm" className="icon" />
            <NavLink to="/contacto">Contacto</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
