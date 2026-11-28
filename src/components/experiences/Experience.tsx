import "./style/Experience.css";
import Experiencescard from "./Experiencescard";
import TrainingCard from "./TrainingCard";

export default function Experience() {
  return (
    <div className="experience">
      <h2 className="experience-title">
        Une expérience bâtie au cours de nombreux projets :
      </h2>
      {/* Deux cards de même taille : formation à gauche, projets à droite */}
      <div className="experience-project-card-wrapper experience-columns">
        <div className="experience-column">
          <h3 className="experience-column__title">CTF et formation multi-plateforme</h3>
          <TrainingCard />
        </div>
        <div className="experience-column">
          <h3 className="experience-column__title">Projet d'apprentissage</h3>
          <Experiencescard />
        </div>
      </div>
    </div>
  );
}
