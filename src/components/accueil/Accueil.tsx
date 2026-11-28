import { useRef } from "react";
import CodeBackground from "../Animation/CodeBackground";

export default function Accueil() {
  const cvUrl = `${import.meta.env.BASE_URL}cv-charly-brachet.pdf`;
  // Centre de gravité du tourbillon
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="hero">
      <CodeBackground anchorRef={cardRef} />
      <div className="heroContent">
        <div className="heroCard" ref={cardRef}>
          <h1 className="title">Charly Brachet</h1>
          <p className="heroSubtitle">
            Étudiant en cybersécurité, pentesteur et analyste SOC freelance.
          </p>

          <div className="heroControls" aria-label="Actions principales">
            <a href="#about" className="menuCard about">À propos</a>

            <a href="#offres" className="menuCard offres">Prestations</a>

            <a href="#experience" className="menuCard experience">Expérience</a>

            <a href="#contact" className="menuCard contact">Contact</a>

            <a
              href={cvUrl}
              download
              className="menuCard menuCard--secondary"
            >
              Mon CV
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
}
