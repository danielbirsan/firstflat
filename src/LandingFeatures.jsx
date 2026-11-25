import "./landing-features.css";

const features = [
  {
    icon: "i-bill",
    title: ["Facturi și indexuri", "Bills and meter readings"],
    description: [
      "Păstrează facturile și indexurile contoarelor pe luni, ca să vezi ce s-a plătit și cum a variat consumul.",
      "Keep bills and meter readings by month to see what’s been paid and how usage has changed.",
    ],
  },
  {
    icon: "i-calendar",
    title: ["Termene comune", "Shared reminders"],
    description: [
      "Notează în calendarul comun scadențele, zilele de citire a contoarelor și data reînnoirii contractului.",
      "Follow payment deadlines, meter reading dates and lease renewals on a shared calendar.",
    ],
  },
  {
    icon: "i-doc",
    title: ["Contract și predare", "Lease and handover"],
    description: [
      "Găsește contractul, inventarul și fotografiile de la predare în dosarul locuinței.",
      "Keep the lease, inventory and move-in photos together in the home’s records.",
    ],
  },
  {
    icon: "i-tool",
    title: ["Reparații și istoric", "Repairs and history"],
    description: [
      "Înregistrează cererile de reparații, adaugă fotografii și vezi ce s-a rezolvat în timp.",
      "Log repair requests with photos and see what’s been fixed over time.",
    ],
  },
];

export default function LandingFeatures({ t }) {
  return (
    <section className="landing-features" id="features" aria-labelledby="landing-features-title">
      <div className="landing-shell">
        <h2 id="landing-features-title">
          {t("Tot ce ai de urmărit pentru locuință", "Keep track of what your home needs")}
        </h2>
        <div className="landing-features-grid">
          {features.map(({ icon, title, description }) => (
            <article className="landing-feature" key={icon}>
              <span className="landing-feature-mark" aria-hidden="true">
                <svg focusable="false"><use href={`#${icon}`} /></svg>
              </span>
              <h3>{t(...title)}</h3>
              <p>{t(...description)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
