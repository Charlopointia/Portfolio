import Card from "../ui/Card";
import OfferIcon from "./OfferIcon";
import type { Offer } from "./offersData";

type OfferCardProps = {
  offer: Offer;
  /** Ouvre la pop-up de contact pour cette offre */
  onRequestQuote: (offer: Offer) => void;
};

/** Card d'une offre : icône, titre, accroche, points clés et deux boutons en bas */
export default function OfferCard({ offer, onRequestQuote }: OfferCardProps) {
  const reportUrl = `${import.meta.env.BASE_URL}${offer.reportFile}`;
  const titleId = `offre-${offer.id}-titre`;

  return (
    <Card
      as="article"
      hoverable
      className={`offer-card offer-card--${offer.id} offer-theme--${offer.id}`}
      aria-labelledby={titleId}
    >
      <span className="offer-card__icon-wrap">
        <OfferIcon icon={offer.icon} />
      </span>

      <h3 id={titleId} className="offer-card__title">{offer.title}</h3>
      <p className="offer-card__tagline">{offer.tagline}</p>

      <ul className="offer-card__points">
        {offer.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      {/* margin-top: auto → boutons alignés en bas, quelle que soit la longueur du texte */}
      <div className="offer-card__actions">
        <button
          type="button"
          className="offer-btn offer-btn--primary"
          onClick={() => onRequestQuote(offer)}
          aria-haspopup="dialog"
        >
          Demander un devis
        </button>
        <a
          className="offer-btn"
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir un exemple de rapport
          <span className="visually-hidden"> (PDF, nouvel onglet)</span>
        </a>
      </div>
    </Card>
  );
}
