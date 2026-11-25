import { useId, useRef, useState } from "react";
import "./landing-collaboration.css";

const collaborationSteps = [
  {
    title: ["Adaugi locuința", "Add the home"],
    description: [
      "Proprietarul creează fișa locuinței și adună documentele care țin de ea.",
      "The owner creates a record for the home and gathers its documents.",
    ],
  },
  {
    title: ["Inviți chiriașul", "Invite the tenant"],
    description: [
      "Chiriașul primește o invitație la fișa aceleiași locuințe.",
      "The tenant gets an invitation to the same home record.",
    ],
  },
  {
    title: ["Consultați aceleași date", "Refer to the same records"],
    description: [
      "Amândoi puteți găsi detaliile de la predare, indexurile contoarelor și solicitările de reparații.",
      "Both can find the handover details, meter readings, and repair requests.",
    ],
  },
];

const audiences = [
  {
    label: ["Sunt proprietar", "I’m an owner"],
    benefits: [
      {
        title: ["Mai multe locuințe, o singură listă", "All your properties in one place"],
        description: [
          "Vezi ce ține de fiecare locuință pe care o închiriezi și treci de la una la alta din aceeași listă.",
          "See what belongs to each property you rent out and switch between homes from the same list.",
        ],
      },
      {
        title: ["Contract și predare", "Lease and handover"],
        description: [
          "Păstrezi contractul, procesul-verbal de predare-primire și indexurile contoarelor în fișa locuinței.",
          "Keep the lease, handover record, and meter readings with the right property.",
        ],
      },
      {
        title: ["Istoricul solicitărilor", "Request history"],
        description: [
          "Regăsești ce reparații a semnalat chiriașul, ce ați stabilit și ce s-a rezolvat.",
          "Look up what the tenant reported, what you agreed to do, and what has been fixed.",
        ],
      },
    ],
  },
  {
    label: ["Sunt chiriaș", "I’m a tenant"],
    benefits: [
      {
        title: ["Evidența cheltuielilor", "Expense records"],
        description: [
          "Notezi chiria, utilitățile și cheltuielile împărțite, ca să știi ce ai plătit și ce urmează.",
          "Record rent, bills, and shared expenses so you know what you’ve paid and what’s next.",
        ],
      },
      {
        title: ["Date de ținut minte", "Dates to remember"],
        description: [
          "Setezi mementouri pentru chirie, facturi sau citirea contoarelor.",
          "Set reminders for rent, bills, or meter readings.",
        ],
      },
      {
        title: ["Reparații la zi", "Repair updates"],
        description: [
          "Vezi ce reparații ai semnalat și ce mai rămâne de rezolvat.",
          "See the repairs you’ve reported and what’s still outstanding.",
        ],
      },
    ],
  },
];

export default function LandingCollaboration({ t }) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const tabs = useRef([]);

  function handleTabKey(event, index) {
    const destinations = {
      ArrowLeft: 1 - index,
      ArrowRight: 1 - index,
      Home: 0,
      End: 1,
    };
    if (!Object.hasOwn(destinations, event.key)) return;

    event.preventDefault();
    const next = destinations[event.key];
    setSelected(next);
    tabs.current[next].focus();
  }

  return (
    <section className="landing-collaboration" id="how-it-works" aria-labelledby={`${id}-heading`}>
      <div className="landing-shell">
        <div className="landing-collaboration-intro">
          <h2 id={`${id}-heading`}>{t("Aceeași locuință. Aceleași informații.", "Same home. Same information.")}</h2>
          <dl className="landing-collaboration-steps">
            {collaborationSteps.map(({ title, description }) => (
              <div key={title[0]}>
                <dt>{t(...title)}</dt>
                <dd>{t(...description)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="landing-audience">
          <div className="landing-audience-tabs" role="tablist" aria-label={t("Beneficii în funcție de rol", "Benefits by role")}>
            {audiences.map(({ label }, index) => (
              <button
                key={label[0]}
                ref={(button) => { tabs.current[index] = button; }}
                id={`${id}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-controls={`${id}-panel-${index}`}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => handleTabKey(event, index)}
              >
                {t(...label)}
              </button>
            ))}
          </div>

          {audiences.map(({ label, benefits }, index) => (
            <div
              className="landing-audience-panel"
              key={label[0]}
              id={`${id}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${index}`}
              hidden={selected !== index}
              tabIndex={0}
            >
              <ul className="landing-audience-benefits">
                {benefits.map(({ title, description }) => (
                  <li key={title[0]}>
                    <h3>{t(...title)}</h3>
                    <p>{t(...description)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
