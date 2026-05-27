import { type CSSProperties, useState } from "react";
import "./style/Experiencescard.css";

import apiImage from "../../assets/projet/asset6.webp";
import ctfImage from "../../assets/projet/asset1.webp";
import riddingImage from "../../assets/projet/asset4.webp";
import auditImage from "../../assets/projet/DemoHacky.gif";
import aliceImage from "../../assets/projet/CLI.gif";
import ctf2Image from "../../assets/projet/HTB.webp";

const projects = [
  {
    title: "hacky chatbot IA",
    category: "IA & Cybersécurité",
    description: "Création d'un chatbot basé sur le modèle Llama 3 et une architecture RAG, avec pour spécialité de guider les utilisateurs dans leur apprentissage du pentesting.",
    image: auditImage,
    tools: ["Llama 3", "RAG", "Python", "Prompt engineering", "all-MiniLM-L6-v2"],
  },
  {
    title: "CTF Hack & Juice shop",
    category: "Cybersécurité",
    description: "Compétition CTF intercampus sur la platefome Hack & Juice shop, avec des défis de reverse engineering, exploitation de vulnérabilités et cryptographie.",
    image: ctfImage,
    tools: ["Burp Suite", "OWASP Juice Shop", "Linux", "Cryptographie"],
  },
  {
    title: "Alice in Wonderland Project",
    category: "IA / CLI",
    description: "Création d'une interface en ligne de commande utilisant un modèle de vectorisation de texte dans le but d'effectuer des recherches sémantiques dans la bibliothèque open source Gutemberg project.",
    image: aliceImage,
    tools: ["Python", "CLI", "all-MiniLM-L6-v2", "Gutemberg project"],
  },
  {
    title: "Riding Session",
    category: "Fullstack",
    description: "MVP d'un réseau social dédié à l'organisation de sessions de sports extrêmes.",
    image: riddingImage,
    tools: ["React", "API météo", "Leaflet", "Chat temps réel"],
  },
   {
    title: "Application Fullstack e-todo",
    category: "Fullstack",
    description: "Création et gestion d'une application fullstack de gestion de tâches, avec authentification et gestion des utilisateurs.",
    image: apiImage,
    tools: ["React", "API REST", "SQL", "Authentification"],
  },
  {
    title: "Entrainement CTF sur Hack The Box",
    category: "Cybersécurité",
    description: "Entrainement sur la plateforme Hack The Box, avec des défis de pentesting, d'exploitation de vulnérabilités et de reverse engineering.",
    image: ctf2Image,
    tools: ["Exegol", "Nmap", "Burp Suite", "Linux"],
  }
];

export default function Experiencescard() {
  const [activeProject, setActiveProject] = useState(0);

  const showNextProject = () => {
    setActiveProject((currentProject) => (currentProject + 1) % projects.length);
  };

  return (
    <button
      className="experiences-card"
      type="button"
      onClick={showNextProject}
      aria-label="Afficher le projet suivant"
    >
      <div className="experiences-card__viewport">
        <div
          className="experiences-card__track"
          style={{ transform: `translateX(-${activeProject * 100}%)` }}
        >
          {projects.map((project) => (
            <article
              className="experiences-card__project"
              key={project.title}
              style={
                {
                  "--project-background": `url(${project.image})`,
                } as CSSProperties
              }
            >
              <div className="experiences-card__content">
                <span className="experiences-card__category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="experiences-card__tools" aria-label="Outils utilisés">
                  <span className="experiences-card__tools-label">Outils</span>
                  <ul>
                    {project.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <span className="experiences-card__next-indicator" aria-hidden="true" />
    </button>
  );
}
