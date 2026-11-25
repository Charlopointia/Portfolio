import type { MouseEvent } from "react";
import { useLocation } from "react-router";
import Card from "../ui/Card";
import "./Footer.css";

export default function Footer() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Sur l'accueil, l'ancre #accueil existe. Ailleurs, on remonte simplement en haut.
  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isHome) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="site-footer-wrap">
      <Card as="footer" className="site-footer">
        <p>© 2026 Charly Brachet · Bordeaux · Fullstack / Cyber / Data-IA</p>
        <a href={isHome ? "#accueil" : "#"} onClick={scrollToTop}>
          Retour en haut
        </a>
      </Card>
    </div>
  );
}
