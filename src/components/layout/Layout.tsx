import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";

/**
 * Structure commune à toutes les pages : contenu de la page + footer.
 * Une navigation partagée viendra se placer ici, au-dessus de <main>.
 */
export default function Layout() {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  // En changeant de page, on repart du haut. Pas au premier chargement,
  // pour laisser le navigateur restaurer la position au rechargement.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  // Lien direct vers une section (ex. …/Portfolio/#contact) : au chargement,
  // le navigateur cherche l'ancre avant que React ait affiché la page → on y va ici.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
