import Accueil from "../components/accueil/Accueil";
import About from "../components/about/About";
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

      <section id="experience" className="section">
        <Experience />
      </section>

      <section id="contact" className="section">
        <Contact />
      </section>
    </>
  );
}
