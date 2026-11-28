import { useState } from "react";
import OfferCard from "./OfferCard";
import QuoteDialog from "./QuoteDialog";
import { offers, type Offer } from "./offersData";
import "./style/Offers.css";

/** Section des offres : une card par entrée du tableau `offers` */
export default function Offers() {
  // Offre dont la pop-up « Demander un devis » est ouverte
  const [quoteOffer, setQuoteOffer] = useState<Offer | null>(null);

  return (
    <div className="offers">
      <div className="offers-title-area">
        <h2 id="offres-titre" className="offers-title">
          Comment puis-je vous aider&nbsp;?
        </h2>
        <p className="offers-intro">
          Peu importe la mission, peu importe la taille de votre structure, mes mots
          d'ordre sont les mêmes pour tous les projets : clarté et rigueur.
        </p>
      </div>

      <div className="offers-grid">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} onRequestQuote={setQuoteOffer} />
        ))}
      </div>

      <QuoteDialog offer={quoteOffer} onClose={() => setQuoteOffer(null)} />
    </div>
  );
}
