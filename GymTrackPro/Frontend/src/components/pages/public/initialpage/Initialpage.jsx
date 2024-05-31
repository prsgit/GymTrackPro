import "./css/Initialpage.css";
import initial from "../../../../assets/image/initial-mobile.jpg";
import gym from "../../../../assets/image/initial.jpg";
import { useNavigate } from "react-router-dom";

const Initialpage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="initial">
        <img className="desktop-img" src={gym} alt="front-cover" />
        <img className="mobile-img" src={initial} alt="front-cover" />

        <span className="text">
          Tu transformación comienza aquí, tan sólo estás a un click!
          <button className="btn-initial" onClick={handleClick}>
            Click!
          </button>
        </span>
      </div>
    </>
  );
};

export default Initialpage;
