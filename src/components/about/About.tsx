import AboutCards from "./About_card";
import "./style/About.css";

export default function About() {
  return (
    <div className="about about--centered">
      {/* Zone entre la fin de l'accueil et le haut des cards : le titre y est centré */}
      <div className="about-title-area">
        <h2 className="aboutTitle">
          La graine de l'expertise cyber à&nbsp;Bordeaux
        </h2>
      </div>

      <AboutCards />
    </div>
  );
}
