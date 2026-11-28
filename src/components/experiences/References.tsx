import "./style/Experience.css";
import Carousel from "./Carousel";

/** Bandeau des références (logos), placé entre les sections About et Expérience */
export default function References() {
  return (
    <div className="references">
      <h2 className="social-validation-title">
        Ils m'ont fait confiance pour leurs projets&nbsp;:
      </h2>
      <div className="experience-carousel">
        <Carousel />
      </div>
    </div>
  );
}
