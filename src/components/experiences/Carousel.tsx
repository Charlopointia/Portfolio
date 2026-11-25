import "./style/Carousel.css";

import img1 from "../../assets/Experience/Asset1.webp";
import img2 from "../../assets/Experience/Asset2.webp";
import img3 from "../../assets/Experience/Asset3.webp";
import img4 from "../../assets/Experience/Asset4.webp";
import img5 from "../../assets/Experience/Asset5.webp";

export default function Carousel() {
  const images = [img1, img2, img3, img4, img5];

  return (
    <div className="marquee">
      <div className="marquee__header"></div>
        <div className="marquee__inner">
        <div className="marquee__group">
          {images.map((src, i) => (
            <img key={`a-${i}`} src={src} alt={`Aperçu ${i + 1}`} />
          ))}
        </div>

        <div className="marquee__group" aria-hidden="true">
          {images.map((src, i) => (
            <img key={`b-${i}`} src={src} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}
