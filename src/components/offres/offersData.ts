/* Données des offres : une entrée = une card dans la section « Comment puis-je vous aider ? » */

export type OfferId = "pentest" | "soc" | "osint";

export type Offer = {
  id: OfferId;
  title: string;
  tagline: string;
  points: string[];
  /** Icône affichée en haut de la card (voir OfferIcon) */
  icon: "shield" | "radar" | "search";
  /** Fichier PDF à déposer dans le dossier public/ */
  reportFile: string;
};

export const offers: Offer[] = [
  {
    id: "pentest",
    title: "Test d'intrusion",
    tagline: "Trouvez vos failles avant les attaquants.",
    points: [
      "Définition avec vous du périmètre à tester (site web, réseau, applications, cloud)",
      "Tests manuels qui reproduisent les techniques de vrais attaquants, dans un cadre légal signé",
      "Rapport clair, compréhensible même par des non-spécialistes, avec le niveau de risque de chaque faille",
      "Recommandations de correctifs priorisées, puis vérification des corrections",
    ],
    icon: "shield",
    reportFile: "exemple-rapport-pentest.pdf",
  },
  {
    id: "soc",
    title: "Analyse d'événements (SOC)",
    tagline: "Détectez et comprenez les attaques en cours.",
    points: [
      "Collecte et analyse des journaux de vos systèmes (serveurs, pare-feu, postes, cloud)",
      "Détection des comportements suspects et tri des fausses alertes",
      "Investigation de chaque incident : origine, impact et étendue de la compromission",
      "Rapport d'incident avec les actions immédiates à mener et les mesures pour éviter que ça se reproduise",
    ],
    icon: "radar",
    reportFile: "exemple-rapport-soc.pdf",
  },
  {
    id: "osint",
    title: "OSINT",
    tagline: "Découvrez ce qu'un attaquant sait déjà sur vous.",
    points: [
      "Cartographie de votre exposition publique : domaines, serveurs, services visibles sur Internet",
      "Recherche de fuites de données : identifiants de vos collaborateurs, documents internes, code exposé",
      "Évaluation des risques d'ingénierie sociale (phishing, usurpation d'identité de votre entreprise)",
      "Rapport de votre surface d'attaque, avec les actions pour réduire votre exposition",
    ],
    icon: "search",
    reportFile: "exemple-rapport-osint.pdf",
  },
];
