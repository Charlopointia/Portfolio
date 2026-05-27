import AboutCards from "./About_card";
import "./style/About.css";

export default function About() {
  return (
    <div className="about about--centered">
      <h2 className="aboutTitle">
        Vous cherchez un développeur fullstack à Bordeaux ? 
      </h2>

      <AboutCards />
    </div>
  );
}
