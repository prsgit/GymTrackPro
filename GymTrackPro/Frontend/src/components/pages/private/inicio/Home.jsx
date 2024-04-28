import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../inicio/css/Inicio.css";
import image1 from "../../../../assets/carousel/image1.jpeg";
import image2 from "../../../../assets/carousel/image2.jpeg";
import image3 from "../../../../assets/carousel/image3.jpeg";
import image4 from "../../../../assets/carousel/image4.jpeg";
import image5 from "../../../../assets/carousel/image5.jpeg";
import image6 from "../../../../assets/carousel/image6.jpeg";
import image7 from "../../../../assets/carousel/image7.jpeg";
import image8 from "../../../../assets/carousel/image8.jpeg";
import image9 from "../../../../assets/carousel/image9.jpeg";

const Home = () => {
  return (
    <>
      <div className="carousel-content">
        <Carousel
          autoPlay={true}
          interval={6500}
          transitionTime={2000}
          stopOnHover={false}
        >
          <div className="carousel">
            <img src={image1} alt="Imagen 1" />
          </div>
          <div>
            <img src={image2} alt="Imagen 2" />
          </div>
          <div>
            <img src={image3} alt="Imagen 3" />
          </div>
          <div>
            <img src={image4} alt="Imagen 4" />
          </div>
          <div>
            <img src={image5} alt="Imagen 5" />
          </div>
          <div>
            <img src={image6} alt="Imagen 6" />
          </div>
          <div>
            <img src={image7} alt="Imagen 7" />
          </div>
          <div>
            <img src={image8} alt="Imagen 8" />
          </div>
          <div>
            <img src={image9} alt="Imagen 9" />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Home;
