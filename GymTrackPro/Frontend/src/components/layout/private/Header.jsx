import "../header/css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header">
        <NavLink to={"/private"}>
          <FontAwesomeIcon icon={faDumbbell} size="2xl" className="icon" />
        </NavLink>
        <h1>GymTrackPro</h1>
      </header>
    </>
  );
};

export default Header;
