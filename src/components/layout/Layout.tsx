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

  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
