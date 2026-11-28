import { useEffect, useRef } from "react";
import { email, linkedinUrl } from "../contact/contactInfo";
import type { Offer } from "./offersData";

type QuoteDialogProps = {
  /** Offre concernée ; null = pop-up fermée */
  offer: Offer | null;
  onClose: () => void;
};

/**
 * Pop-up « Demander un devis » : email (sujet pré-rempli avec l'offre) et LinkedIn.
 * <dialog> natif : Échap pour fermer, focus gardé dans la pop-up puis rendu
 * au bouton qui l'a ouverte.
 */
export default function QuoteDialog({ offer, onClose }: QuoteDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (offer && !dialog.open) dialog.showModal();
    if (!offer && dialog.open) dialog.close();
  }, [offer]);

  const subject = offer ? `Demande de devis : ${offer.title}` : "Demande de devis";
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  return (
    <dialog
      ref={dialogRef}
      className="quote-dialog"
      aria-labelledby="quote-dialog-title"
      // Échap ou fermeture native → on remet l'état à jour
      onClose={onClose}
      // Clic sur le fond assombri (en dehors de la boîte) → fermeture
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {/* Couleurs de l'offre concernée (voir .offer-theme--<id> dans Offers.css) */}
      <div className={`quote-dialog__box${offer ? ` offer-theme--${offer.id}` : ""}`}>
        <button
          type="button"
          className="quote-dialog__close"
          onClick={onClose}
          aria-label="Fermer"
        />

        <h2 id="quote-dialog-title" className="quote-dialog__title">
          Demander un devis
        </h2>
        {offer ? <p className="quote-dialog__offer">{offer.title}</p> : null}

        <p className="quote-dialog__text">
          Écrivez-moi par email ou sur LinkedIn, avec votre besoin et votre contexte.
        </p>
        <p className="quote-dialog__delay">Je réponds sous 24&nbsp;h.</p>

        <ul className="quote-dialog__contacts">
          <li>
            <span className="quote-dialog__label">Email</span>
            <a className="quote-dialog__link" href={mailtoHref}>
              {email}
            </a>
          </li>
          <li>
            <span className="quote-dialog__label">LinkedIn</span>
            <a
              className="quote-dialog__link"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Charly Brachet
              <span className="visually-hidden"> (nouvel onglet)</span>
            </a>
          </li>
        </ul>
      </div>
    </dialog>
  );
}
