import "../header/css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <>
      <header className="header">
        <FontAwesomeIcon icon={faDumbbell} size="2xl" className="icon" />

        <h1>GymTrackPro</h1>
      </header>
    </>
  );
};

export default Header;
