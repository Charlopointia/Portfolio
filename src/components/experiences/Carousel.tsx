import "./style/Carousel.css";

import img1 from "../../assets/Experience/Asset1.webp";
import img2 from "../../assets/Experience/Asset2.webp";
import img3 from "../../assets/Experience/Asset3.webp";
import img4 from "../../assets/Experience/Asset4.webp";
import img5 from "../../assets/Experience/Asset5.webp";

export default function Carousel() {
  const logos = [
    { src: img1, alt: "Logo Royal Savoy Hotel & Spa Lausanne" },
    { src: img2, alt: "Logo KBM Recycling" },
    { src: img3, alt: "Logo Gîtes de France" },
    { src: img4, alt: "Logo Epitech" },
    { src: img5, alt: "Logo IONIS Education Group" },
  ];

  return (
    <div className="marquee">
      <div className="marquee__header"></div>
        <div className="marquee__inner">
        <div className="marquee__group">
          {logos.map((logo) => (
            <img key={`a-${logo.alt}`} src={logo.src} alt={logo.alt} />
          ))}
        </div>

        {/* Copie pour la boucle infinie : ignorée par les lecteurs d'écran */}
        <div className="marquee__group" aria-hidden="true">
          {logos.map((logo) => (
            <img key={`b-${logo.alt}`} src={logo.src} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}
