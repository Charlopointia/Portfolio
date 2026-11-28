import Card from "../ui/Card";
import "./style/TrainingCard.css";

import htbProfile from "../../assets/projet/htb-profile.webp";
import portswigger from "../../assets/projet/portswigger.webp";

type Platform = {
  id: string;
  label: string;
  /** Capture de la plateforme (emplacement vide tant qu'elle n'est pas ajoutée) */
  image?: string;
  imageAlt?: string;
  /** Lien ouvert au clic sur la capture */
  href?: string;
};

/* Card « CTF et formation multi-plateforme » : deux captures de plateformes */
const platforms: Platform[] = [
  {
    id: "htb",
    label: "Profil Hack The Box",
    image: htbProfile,
    imageAlt: "Profil Hack The Box de charlothetrue : niveau 46, rang Professional, Silver Tier saison 12",
    href: "https://app.hackthebox.com/home",
  },
  {
    id: "portswigger",
    label: "PortSwigger Web Security Academy",
    image: portswigger,
    imageAlt: "Page d'accueil de PortSwigger, éditeur de Burp Suite et de la Web Security Academy",
  },
];

function PlatformShot({ platform }: { platform: Platform }) {
  const image = platform.image ? (
    <img className="training-card__image" src={platform.image} alt={platform.imageAlt ?? ""} />
  ) : null;

  if (platform.href) {
    return (
      <a
        className={`training-card__frame training-card__frame--${platform.id} training-card__link`}
        href={platform.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {image}
        {/* Message affiché au survol (et au focus clavier) */}
        <span className="training-card__hint">Cliquez pour visiter le profil</span>
      </a>
    );
  }

  return <div className={`training-card__frame training-card__frame--${platform.id}`}>{image}</div>;
}

export default function TrainingCard() {
  return (
    <Card hoverable className="training-card">
      {platforms.map((platform) => (
        <figure className="training-card__shot" key={platform.id}>
          <PlatformShot platform={platform} />
          <figcaption>{platform.label}</figcaption>
        </figure>
      ))}
    </Card>
  );
}
