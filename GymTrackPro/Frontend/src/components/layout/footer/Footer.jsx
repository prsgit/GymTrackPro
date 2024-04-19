import "../footer/css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <a href="https://www.instagram.com/irongymalhaurin">
          <FontAwesomeIcon icon={faInstagram} size="2xl" className="icon" />
        </a>
        <a href="https://www.twitter.com">
          <FontAwesomeIcon
            icon={faSquareXTwitter}
            size="2xl"
            className="icon"
          />
        </a>
        <a href="https://www.linkedin.com/">
          <FontAwesomeIcon icon={faLinkedin} size="2xl" className="icon" />
        </a>
        &copy; GymTrackPro - Contacto:
        <a href="https://gymtrackpro.es"> gymtrackpro.es</a>
      </footer>
    </>
  );
};

export default Footer;
