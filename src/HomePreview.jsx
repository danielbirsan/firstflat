import { useRef, useState } from "react";
import posthog, { isPostHogConfigured } from "./posthog.js";

const tabs = [
  {
    id: "overview",
    label: ["Prezentare", "Overview"],
    items: [
      ["calendar", ["Transmite indexul", "Submit meter reading"], ["16 mai", "16 May"]],
      ["tool", ["Revizie centrală", "Heating service"], ["24 mai", "24 May"]],
    ],
  },
  {
    id: "bills",
    label: ["Facturi", "Bills"],
    items: [
      ["bill", ["Energie electrică · 128 lei", "Electricity · 128 lei"], ["Scadentă 20 mai", "Due 20 May"]],
      ["bill", ["Apă · 65 lei", "Water · 65 lei"], ["Plătită", "Paid"]],
    ],
  },
  {
    id: "documents",
    label: ["Documente", "Documents"],
    items: [
      ["doc", ["Contract de închiriere", "Lease agreement"], ["PDF", "PDF"]],
      ["doc", ["Garanție electrocasnic", "Appliance warranty"], ["PDF", "PDF"]],
    ],
  },
];

export default function HomePreview({ t }) {
  const [active, setActive] = useState(0);
  const tabList = useRef(null);

  function selectTab(index) {
    if (isPostHogConfigured) {
      posthog.capture("home_preview_tab_selected", { preview_section: tabs[index].id });
    }
    setActive(index);
  }

  function handleTabKey(event, index) {
    let next;
    switch (event.key) {
      case "ArrowLeft":
        next = (index - 1 + tabs.length) % tabs.length;
        break;
      case "ArrowRight":
        next = (index + 1) % tabs.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectTab(next);
    tabList.current.children[next].focus();
  }

  return (
    <figure className="home-demo" id="demo" aria-labelledby="demo-title">
      <div className="home-art" aria-hidden="true">
        <svg viewBox="0 0 580 245" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="art-bg" x2="1" y2="1"><stop stopColor="#e8eedf" /><stop offset="1" stopColor="#d6e3d0" /></linearGradient><linearGradient id="wall" x2="0" y2="1"><stop stopColor="#fffdf6" /><stop offset="1" stopColor="#eee7d7" /></linearGradient><linearGradient id="roof" x2="1" y2="1"><stop stopColor="#d47656" /><stop offset="1" stopColor="#ad533f" /></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#39543b" floodOpacity=".13" /></filter></defs>
          <rect width="580" height="245" fill="url(#art-bg)" />
          <circle cx="465" cy="55" r="31" fill="#f7f5d9" /><path d="M0 196Q120 137 250 181T580 153V245H0Z" fill="#c4d4b9" /><path d="M0 223Q160 181 325 218T580 191V245H0Z" fill="#b2c6a6" />
          <g opacity=".5" stroke="#95b28e" strokeWidth="1" fill="none"><path d="m-30 233 190-74 340 87m-380-33 172-65 200 64m-365 27 170-65 210 61" /></g>
          <ellipse cx="298" cy="216" rx="137" ry="15" fill="#7b9270" opacity=".16" />
          <g filter="url(#shadow)"><path d="m178 113 117-58 119 61-117 62Z" fill="#eae1cf" /><path d="m178 113 119 61v61l-119-61Z" fill="#eee8d9" /><path d="m297 174 117-58v61l-117 58Z" fill="url(#wall)" /><path d="m169 113 79-84 128 63-79 86Z" fill="url(#roof)" /><path d="m297 178 79-86 49 20-11 7-117 61Z" fill="#a44b38" /><path d="m376 92 38 24-117 58Z" fill="#f4eee0" /><path d="m359 57 16 8v31l-16-8Z" fill="#e1c9b4" /><path d="m375 65 10-5v31l-10 5Z" fill="#bda18e" /><path d="m359 57 10-5 16 8-10 5Z" fill="#f3e1cc" />
            <g fill="#547571" stroke="#fffaf0" strokeWidth="4"><path d="m196 140 28 14v30l-28-14Z" /><path d="m241 163 28 14v30l-28-14Z" /><path d="m319 170 25-13v30l-25 13Z" /><path d="m370 144 24-12v30l-24 12Z" /></g><path d="m351 172 15-8v37l-15 8Z" fill="#b67950" /><circle cx="355" cy="190" r="1.3" fill="#f7e1a9" />
            <g stroke="#ecdfce" strokeWidth="1.5"><path d="m210 147 0 30m-14-22 28 14m31 1v30m-14-23 28 14m62-30v30m-12-9 25-13m38-29v30m-12-9 24-12" /></g>
            <path d="m343 215 19-10 24 12-20 10Z" fill="#eae4d6" /><path d="m349 226 19-10 33 18-19 10Z" fill="#eae4d6" />
          </g>
          <g><path d="M136 177v34" stroke="#7e7855" strokeWidth="5" /><ellipse cx="136" cy="160" rx="24" ry="32" fill="#66876a" /><ellipse cx="126" cy="163" rx="15" ry="23" fill="#7b9874" /><path d="M445 172v26" stroke="#7e7855" strokeWidth="4" /><ellipse cx="445" cy="154" rx="17" ry="27" fill="#66876a" /><ellipse cx="438" cy="153" rx="12" ry="21" fill="#7d9a72" /></g>
          <g fill="#faf9f1" opacity=".8"><path d="M65 53h39a10 10 0 0 0-17-7 13 13 0 0 0-22 7Z" /><path d="M392 26h25a7 7 0 0 0-11-5 9 9 0 0 0-14 5Z" /></g>
        </svg>
      </div>
      <figcaption className="demo-window">
        <div className="demo-heading">
          <div>
            <p className="eyebrow">{t("Exemplu de locuință", "Example home")}</p>
            <h2 id="demo-title">{t("Apartamentul meu", "My apartment")}</h2>
          </div>
          <span className="demo-avatar" aria-hidden="true"><svg className="icon"><use href="#i-home" /></svg></span>
        </div>
        <div className="demo-tabs" role="tablist" aria-label={t("Turul locuinței", "Home preview")} ref={tabList}>
          {tabs.map(({ id, label }, index) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-controls={`demo-${id}`}
              aria-selected={index === active}
              tabIndex={index === active ? 0 : -1}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              {t(...label)}
            </button>
          ))}
        </div>
        {tabs.map(({ id, items }, index) => (
          <div
            key={id}
            className="demo-panel"
            role="tabpanel"
            id={`demo-${id}`}
            aria-labelledby={`tab-${id}`}
            tabIndex={0}
            hidden={index !== active}
          >
            <ul className="demo-list">
              {items.map(([icon, title, state]) => (
                <li key={title[0]}>
                  <svg className="icon" aria-hidden="true"><use href={`#i-${icon}`} /></svg>
                  <span>{t(...title)}</span>
                  <span className="demo-state">{t(...state)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
