import "./css/Initialpage.css";
import mobile from "../../../../assets/image/mobile.jpg";
import tablet from "../../../../assets/image/tablet.jpg";
import desktop from "../../../../assets/image/desktop.jpg";
import { useNavigate } from "react-router-dom";

const Initialpage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="initial">
        <img className="desktop-img" src={desktop} alt="front-cover" />
        <img className="mobile-img" src={mobile} alt="front-cover" />
        <img className="tablet-img" src={tablet} alt="front-cover" />

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
