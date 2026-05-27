import { useState } from "react";
import cyber from "../../assets/about/cyber.webp";
import data from "../../assets/about/data.webp";
import fullstack from "../../assets/about/fullstack.webp";

type AboutProfileCardProps = {
  activeToggle: AboutToggleId;
};

type AboutToggleCardProps = {
  activeToggle: AboutToggleId;
  setActiveToggle: (activeToggle: AboutToggleId) => void;
};

type AboutSkillsCardProps = {
  activeToggle: AboutToggleId;
};

const aboutToggleItems = [
  {
    id: "cyber",
    label: "Cyber",
    image: cyber,
    imageAlt: "Illustration cybersécurité",
    skills: [
      "Audit de sécurité et pentesting",
      "Rigueur technique",
      "Analyse des failles de sécurité",
      "Veille sur les menaces",
    ],
  },
  {
    id: "fullstack",
    label: "Full stack",
    image: fullstack,
    imageAlt: "Illustration développement full stack",
    skills: [
      "React et TypeScript",
      "Gestion des bases de données",
      "Logique frontend et backend",
      "Connexion avec des API",
    ],
  },
  {
    id: "dataia",
    label: "Data/IA",
    image: data,
    imageAlt: "Illustration data et intelligence artificielle",
    skills: [
      "Analyse et structuration des données",
      "Implémentation de modèles IA",
      "Création de pipelines de données",
      "Création de rapports et visualisations",
    ],
  },
] as const;

type AboutToggleId = (typeof aboutToggleItems)[number]["id"];

function getActiveToggleIndex(activeToggle: AboutToggleId) {
  return aboutToggleItems.findIndex((item) => item.id === activeToggle);
}

export function AboutProfileCard({ activeToggle }: AboutProfileCardProps) {
  const activeIndex = getActiveToggleIndex(activeToggle);
  const activeItem = aboutToggleItems[activeIndex];

  return (
    <div className="about-card about-card--profile">
      <div className="about-profile-frame">
        <div
          className="about-slide-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {aboutToggleItems.map((item) => (
            <div
              className={`about-profile-slide about-profile-slide--${item.id}`}
              key={item.id}
              aria-hidden={item.id !== activeToggle}
            >
              <img
                className="about-profile-image"
                src={item.image}
                alt={item.imageAlt}
              />
            </div>
          ))}
        </div>
      </div>

      <p className="about-profile-caption">{activeItem.label}</p>
    </div>
  );
}

export function AboutSkillsCard({ activeToggle }: AboutSkillsCardProps) {
  const activeIndex = getActiveToggleIndex(activeToggle);

  return (
    <div className="about-card about-card--skills">
      <div className="about-skills-viewport">
        <div
          className="about-slide-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {aboutToggleItems.map((item) => (
            <div
              className="about-skills-slide"
              key={item.id}
              aria-hidden={item.id !== activeToggle}
            >
              <h3>{item.label}</h3>
              <ul>
                {item.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutDescriptionCard() {
  return (
    <div className="about-card about-card--description">
      <p className="aboutText">
        Développeur autodidacte, j’ai choisi de
        rejoindre le campus d'Epitech Bordeaux afin de structurer et
        professionnaliser mes compétences techniques.
        <br />
        <br />
        Orienté cybersécurité et analyse de données, je m’intéresse particulièrement aux
        problématiques de sécurité applicative, d’analyse et de compréhension
        des systèmes.
        <br />
        <br />
        Mon parcours hybride me permet d’allier curiosité, autonomie et
        rigueur technique dans chacun de mes projets.
      </p>
    </div>
  );
}

export function AboutToggleCard({
  activeToggle,
  setActiveToggle,
}: AboutToggleCardProps) {
  return (
    <div className="about-card about-card--toggle">
      <div
        className="about-toggle-list"
        role="radiogroup"
        aria-label="Options de la section about"
      >
        {aboutToggleItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`about-toggle-switch${
              item.id === activeToggle ? " is-active" : ""
            }`}
            onClick={() => setActiveToggle(item.id)}
            role="radio"
            aria-checked={item.id === activeToggle}
          >
            <span className="about-toggle-label">{item.label}</span>
            <span className="about-toggle-track" aria-hidden="true">
              <span className="about-toggle-thumb" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AboutCards() {
  const [activeToggle, setActiveToggle] = useState<AboutToggleId>("cyber");

  return (
    <div className="about-grid">
      <div className="about-aside-stack">
        <AboutProfileCard activeToggle={activeToggle} />
        <AboutToggleCard
          activeToggle={activeToggle}
          setActiveToggle={setActiveToggle}
        />
      </div>

      <div className="about-content-stack">
        <AboutDescriptionCard />
        <AboutSkillsCard activeToggle={activeToggle} />
      </div>
    </div>
  );
}
