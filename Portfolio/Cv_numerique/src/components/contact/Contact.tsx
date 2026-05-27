
import { useEffect, useRef, useState } from "react";
import "./style/Contact.css";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/charly-brachet-810683293/" },
  { label: "GitHub", href: "https://github.com/Charlopointia" },
  { label: "Instagram", href: "https://www.instagram.com/charly_brct/" },
];

export default function Contact() {
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = "charly.brachet@epitech.com";

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setIsEmailCopied(true);
    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current);
    }
    copiedTimeoutRef.current = setTimeout(() => {
      setIsEmailCopied(false);
    }, 1800);
  };

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="contact-section">
      <header className="contact-header">
        <h2>Construisons votre prochain projet</h2>
      </header>

      <div className="contact-card">
        <p className="contact-intro">
          Envoyez-moi un message avec votre besoin, votre contexte et vos délais.
        </p>
        <p className="contact-email-line">
          <span>{email}</span>
          <button
            className={`contact-copy-btn${isEmailCopied ? " is-copied" : ""}`}
            type="button"
            onClick={copyEmail}
            aria-label={isEmailCopied ? "Email copié" : "Copier l'email"}
            title={isEmailCopied ? "Email copié" : "Copier l'email"}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="contact-copy-icon"
            >
              {isEmailCopied ? (
                <path d="m5 12 4 4 10-10" />
              ) : (
                <>
                  <rect x="9" y="9" width="10" height="10" rx="2" />
                  <path d="M5 15V7a2 2 0 0 1 2-2h8" />
                </>
              )}
            </svg>
          </button>
        </p>

        <div className="contact-actions">
          <a className="contact-btn contact-btn--primary" href={`mailto:${email}`}>
            Me contacter
          </a>

          {socialLinks.map((link) => (
            <a
              key={link.label}
              className="contact-btn"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <footer className="contact-footer">
        <p>© 2026 Charly Brachet · Bordeaux · Fullstack / Cyber / Data-IA</p>
        <a href="#accueil">Retour en haut</a>
      </footer>
    </section>
  );
}
