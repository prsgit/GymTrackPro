import "../nav/css/Nav.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import imageProfile from "../../../assets/image/user.png";
const Nav = () => {
  return (
    <>
      <nav className="nav">
        <ul className="logout-content"></ul>
        <ul>
          <li>
            <FontAwesomeIcon icon={faHouse} size="sm" className="icon" />
            <NavLink to="/private">Inicio</NavLink>
          </li>
          <li>
            <FontAwesomeIcon icon={faDumbbell} size="sm" className="icon" />
            <NavLink to="entrenamientos">Entrenamientos</NavLink>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} size="sm" className="icon" />
            <NavLink to="perfil">Perfil</NavLink>
          </li>
        </ul>
        <ul className="profile-content">
          <li className="name-profile">
            <span className="name">nick</span>
          </li>

          <li className="image-profile">
            <a href="" className="image">
              <img src={""} alt="imagen" />
            </a>
          </li>
        </ul>
        <ul className="logout-content">
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
