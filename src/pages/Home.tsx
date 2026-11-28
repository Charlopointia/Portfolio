import Accueil from "../components/accueil/Accueil";
import About from "../components/about/About";
import Offers from "../components/offres/Offers";
import References from "../components/experiences/References";
import Experience from "../components/experiences/Experience";
import Contact from "../components/contact/Contact";

export default function Home() {
  return (
    <>
      <section id="accueil" className="section">
        <Accueil />
      </section>

      <section id="about" className="section">
        <About />
      </section>

      <section id="offres" className="section" aria-labelledby="offres-titre">
        <Offers />
      </section>

      {/* Carrousel des logos */}
      <section id="references" className="section">
        <References />
      </section>

      <section id="experience" className="section">
        <Experience />
      </section>

      <section id="contact" className="section">
        <Contact />
      </section>
    </>
  );
}
