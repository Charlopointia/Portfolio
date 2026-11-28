import { useEffect, useState } from "react";
import Card from "../ui/Card";
type AboutToggleCardProps = {
  activeToggle: AboutToggleId;
  setActiveToggle: (activeToggle: AboutToggleId) => void;
};

type AboutSkillsCardProps = {
  activeToggle: AboutToggleId;
};

type AboutToggleId = "pentesting" | "soc" | "osint" | "dev";

type Certification = {
  code: string;
  name: string;
};

type AboutToggleItem = {
  id: AboutToggleId;
  label: string;
  /** Liste simple de compétences */
  skills?: string[];
  /**
   * Ou bien : card en 2 parties, outils + (certifications, challenges ou compétences).
   * toolsTitle remplace le titre « Outils maîtrisés » de la 1re partie.
   */
  toolsTitle?: string;
  tools?: string[];
  certifications?: {
    acquired: Certification[];
    inProgress: Certification[];
  };
  challenges?: string[];
};

/*
 * Les 4 toggles. Chaque domaine a sa couleur (About.css, .about-theme--<id>),
 * utilisée par le toggle sélectionné et par les puces/titres de sa liste :
 *   pentesting → rouge, soc → bleu, osint → violet, dev → vert.
 */
const aboutToggleItems: AboutToggleItem[] = [
  {
    id: "pentesting",
    label: "Pentesting",
    tools: [
      "Burp Suite",
      "Nmap",
      "ffuf",
      "John the Ripper",
      "Exegol",
      "sqlmap",
      "Gobuster",
      "Hydra",
    ],
    certifications: {
      acquired: [{ code: "CJCA", name: "Certified Junior Cybersecurity Associate" }],
      inProgress: [
        { code: "BSCP", name: "Burp Suite Certified Practitioner" },
        { code: "CWES", name: "Certified Web Exploitation Specialist" },
      ],
    },
  },
  {
    id: "soc",
    label: "Analyse SOC",
    tools: [
      "Wazuh",
      "Elastic",
      "KQL",
      "Splunk",
      "Wireshark",
      "Suricata",
      "Sysmon",
      "TheHive",
    ],
    certifications: {
      // CJCA couvre aussi une partie défensive
      acquired: [{ code: "CJCA", name: "Certified Junior Cybersecurity Associate" }],
      inProgress: [],
    },
  },
  {
    id: "osint",
    label: "OSINT",
    tools: [
      "Maigret",
      "Obsidian",
      "Wayback Machine",
      "Sherlock",
      "theHarvester",
      "Shodan",
      "Google Dorks",
      "ExifTool",
    ],
    challenges: ["Needle by Epitech", "Nmap creator challenge"],
  },
  {
    id: "dev",
    label: "Dev",
    toolsTitle: "Langages",
    tools: ["Python", "C", "Bash", "JavaScript", "SQL"],
    skills: [
      "React et TypeScript",
      "Gestion des bases de données",
      "Logique frontend et backend",
      "Connexion avec des API",
    ],
  },
];

function getActiveToggleIndex(activeToggle: AboutToggleId) {
  return aboutToggleItems.findIndex((item) => item.id === activeToggle);
}

/**
 * Card photo : une seule photo, indépendante des toggles.
 * Emplacement vide en attendant la photo définitive. Pour l'ajouter :
 *   import photo from "../../assets/about/<fichier>.webp";
 *   <img className="about-profile-image" src={photo} alt="…" /> dans le cadre.
 */
export function AboutProfileCard() {
  return (
    <Card className="about-card about-card--profile">
      <div className="about-profile-frame" />
    </Card>
  );
}

const DOT_COUNT = 3;
const DOT_INTERVAL = 500; // ms passées sur chaque position

/**
 * Un seul point visible, qui avance de la 1re à la 3e position, en boucle :
 * illustre une certification « en cours ».
 * (Avec « réduire les animations » activé, les 3 points restent affichés.)
 */
function LoadingDots() {
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setPosition((current) => (current + 1) % DOT_COUNT);
    }, DOT_INTERVAL);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <span className="loading-dots" aria-hidden="true">
      {Array.from({ length: DOT_COUNT }, (_, index) => (
        <span key={index} className={reduceMotion || index === position ? "is-visible" : undefined}>
          .
        </span>
      ))}
    </span>
  );
}

function CertificationItem({ certification, inProgress = false }: {
  certification: Certification;
  inProgress?: boolean;
}) {
  return (
    <li>
      {/* Le nom complet s'affiche au survol du sigle */}
      <abbr className="about-cert-code" title={certification.name}>
        {certification.code}
      </abbr>
      {inProgress ? <LoadingDots /> : null}
    </li>
  );
}

/** 2e partie d'une slide : certifications (acquises / en cours), challenges ou compétences */
function SecondaryPart({ item }: { item: AboutToggleItem }) {
  if (item.skills) {
    return (
      <div className="about-skills-part">
        <h4 className="about-skills-subtitle">Compétences</h4>
        <ul className="about-cert-list">
          {item.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (item.challenges) {
    return (
      <div className="about-skills-part">
        <h4 className="about-skills-subtitle">Challenges</h4>
        <ul className="about-cert-list">
          {item.challenges.map((challenge) => (
            <li key={challenge}>{challenge}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (!item.certifications) return null;

  return (
    <div className="about-skills-part">
      <h4 className="about-skills-subtitle">Certifications</h4>
      {/* Chaque rubrique ne s'affiche que si elle contient une certification */}
      {item.certifications.acquired.length > 0 ? (
        <>
          <p className="about-cert-status">Acquises</p>
          <ul className="about-cert-list">
            {item.certifications.acquired.map((certification) => (
              <CertificationItem key={certification.code} certification={certification} />
            ))}
          </ul>
        </>
      ) : null}
      {item.certifications.inProgress.length > 0 ? (
        <>
          <p className="about-cert-status">En cours</p>
          <ul className="about-cert-list">
            {item.certifications.inProgress.map((certification) => (
              <CertificationItem key={certification.code} certification={certification} inProgress />
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

/** Contenu d'une slide : liste simple, ou 2 parties (outils + certifications/challenges) */
function SkillsContent({ item }: { item: AboutToggleItem }) {
  if (item.tools && (item.certifications || item.challenges || item.skills)) {
    return (
      <div className="about-skills-split">
        <div className="about-skills-part">
          <h4 className="about-skills-subtitle">{item.toolsTitle ?? "Outils maîtrisés"}</h4>
          <ul className="about-skills-tools">
            {item.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>

        <div className="about-skills-divider" aria-hidden="true" />

        <SecondaryPart item={item} />
      </div>
    );
  }

  return (
    <ul>
      {item.skills?.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}

export function AboutSkillsCard({ activeToggle }: AboutSkillsCardProps) {
  const activeIndex = getActiveToggleIndex(activeToggle);

  return (
    <Card className="about-card about-card--skills">
      <div className="about-skills-viewport">
        <div
          className="about-slide-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {aboutToggleItems.map((item) => (
            <div
              className={`about-skills-slide about-theme--${item.id}`}
              key={item.id}
              aria-hidden={item.id !== activeToggle}
            >
              {/* La slide en 2 parties a ses propres sous-titres */}
              {item.tools ? null : <h3>{item.label}</h3>}
              <SkillsContent item={item} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function AboutDescriptionCard() {
  return (
    <Card className="about-card about-card--description">
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
    </Card>
  );
}

export function AboutToggleCard({
  activeToggle,
  setActiveToggle,
}: AboutToggleCardProps) {
  return (
    <Card className="about-card about-card--toggle">
      <div
        className="about-toggle-list"
        role="radiogroup"
        aria-label="Options de la section about"
      >
        {aboutToggleItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`about-toggle-switch about-theme--${item.id}${
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
    </Card>
  );
}

export default function AboutCards() {
  const [activeToggle, setActiveToggle] = useState<AboutToggleId>("pentesting");

  return (
    <div className="about-grid">
      <div className="about-aside-stack">
        <AboutProfileCard />
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
