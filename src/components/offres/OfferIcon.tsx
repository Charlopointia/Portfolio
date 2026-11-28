import type { Offer } from "./offersData";

/*
 * Icônes au trait, dans le même style que celles de la section Contact
 * (SVG inline, stroke = currentColor : elles prennent la couleur de l'offre).
 */
const paths: Record<Offer["icon"], React.ReactNode> = {
  // Bouclier
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  // Radar
  radar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12 18.4 5.6" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  // Loupe
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
};

export default function OfferIcon({ icon }: { icon: Offer["icon"] }) {
  return (
    <svg className="offer-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}
