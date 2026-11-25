import apartmentPhoto from "../assets/landing/apartment.webp";
import { AccessForm } from "./AccessForm.jsx";
import LandingCollaboration from "./LandingCollaboration.jsx";
import LandingFeatures from "./LandingFeatures.jsx";

function Icon({ name }) {
  return <svg className="icon landing-icon" aria-hidden="true"><use href={`#i-${name}`} /></svg>;
}

function Hero({ t }) {
  return (
    <section className="landing-hero container" aria-labelledby="landing-title">
      <div className="landing-hero-copy">
        <h1 id="landing-title">
          {t("O locuință.", "One home.")}{" "}
          <em>{t("Un plan comun.", "One shared plan.")}</em>
        </h1>
        <p>
          {t(
            "FirstFlat aduce facturile, actele și reparațiile într-un loc comun pentru chiriași și proprietari. De la predarea cheilor până la ultima citire de contor.",
            "FirstFlat gives tenants and landlords a shared place for bills, documents, and repairs, from the key handover to the latest meter reading.",
          )}
        </p>
        <div className="landing-hero-actions">
          <a className="landing-button" href="#access">{t("Cere acces", "Request access")}<Icon name="arrow" /></a>
          <a className="landing-text-link" href="#how-it-works">{t("Vezi cum funcționează", "See how it works")}<Icon name="down" /></a>
        </div>
      </div>

      <figure className="landing-hero-art">
        <img
          src={apartmentPhoto}
          width="1200"
          height="900"
          alt={t("Livingul unui apartament, luminat de soare", "A sunlit apartment living room")}
          fetchPriority="high"
        />
        <figcaption className="landing-property">
          <div className="landing-property-head">
            <span className="landing-property-mark"><Icon name="home" /></span>
            <div>
              <p>{t("Apartamentul 12", "Apartment 12")}</p>
              <span>{t("Exemplu de spațiu comun", "Example shared space")}</span>
            </div>
          </div>
          <ul>
            <li><Icon name="key" /><span>{t("Predarea cheilor", "Key handover")}</span><small>{t("Proces-verbal", "Handover report")}</small></li>
            <li><Icon name="calendar" /><span>{t("Citirea contorului", "Meter reading")}</span><small>{t("24 mai", "24 May")}</small></li>
          </ul>
        </figcaption>
      </figure>
    </section>
  );
}

export default function Landing({ language, t, onSubmitted }) {
  return (
    <main id="main">
      <Hero t={t} />
      <LandingCollaboration t={t} />
      <LandingFeatures t={t} />
      <section className="landing-access container" aria-label={t("Acces la FirstFlat", "FirstFlat access")}>
        <AccessForm language={language} onSubmitted={onSubmitted} />
      </section>
    </main>
  );
}
