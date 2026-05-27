import "./style/Experience.css";
import Carousel from "./Carousel";
import Experiencescard from "./Experiencescard";

export default function Experience() {
  return (
    <section id="experience">
      <h2 className="experience-title">
        Une expérience bâtie au cours de nombreux projets
      </h2>
      <p className="experience-text">
        Du site vitrine à l'audit de sécurité, un seul mot d'ordre : la rigueur.
      </p>
      <div className="experience-project-card-wrapper">
        <Experiencescard />
      </div>
      <h2 className="social-validation-title">
        Ensemble, nous sommes déjà allés au bout de leurs ambitions :
      </h2>
      <div className="experience-carousel">
        <Carousel />
      </div>
    </section>
  );
}
