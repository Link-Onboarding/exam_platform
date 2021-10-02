import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

const Slideshow = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,    
        slidesToScroll: 1
    };

    return (
    <Slider className="slider" {...settings}>
        <div className="slide">
            <img src="https://imgur.com/zHdpv6h.png" alt="slide" />
        </div>
        <div className="slide">
            <img src="https://imgur.com/ViAMnuo.png" alt="slide" />
        </div>
        <div className="slide">
            <img src="https://imgur.com/WVna4eG.png" alt="slide" />
        </div>
    </Slider>
    );
}

export default Slideshow;