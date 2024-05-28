import "../header/css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="header">
        <NavLink to={"/login"}>
          <FontAwesomeIcon icon={faDumbbell} size="2xl" className="icon" />
        </NavLink>

        <NavLink to={"/login"}>
          <h1 className="name">GymTrackPro</h1>
        </NavLink>
      </header>
    </>
  );
};

export default Header;
