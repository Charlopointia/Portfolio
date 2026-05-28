import CodeBackground from "../Animation/CodeBackground";

export default function Accueil() {
  const cvUrl = `${import.meta.env.BASE_URL}cv-charly-brachet.pdf`;

  return (
    <div className="hero">
      <CodeBackground />
      <div className="heroContent">
        <div className="heroCard">
          <h1 className="title">Charly Brachet</h1>
          <p className="heroSubtitle">
            Développeur fullstack orienté cybersécurité, data et IA, basé à Bordeaux.
          </p>

          <div className="heroControls" aria-label="Actions principales">
            <a href="#about" className="menuCard about">À propos</a>

            <a href="#experience" className="menuCard experience">Expérience</a>

            <a href="#contact" className="menuCard contact">Contact</a>

            <a
              href={cvUrl}
              download
              className="menuCard menuCard--secondary"
            >
              Télécharger mon CV
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
}
