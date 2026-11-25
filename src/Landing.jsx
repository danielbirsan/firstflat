import { AccessForm } from "./AccessForm.jsx";
import HomePreview from "./HomePreview.jsx";

export default function Landing({ language, t, onSubmitted }) {
  return (
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{t("Pentru chiriași și proprietari", "For renters and owners")}</p>
          <h1 id="hero-title">
            <span>{t("Locuința ta,", "Your home,")}</span>
            <em>{t("în ordine.", "in order.")}</em>
          </h1>
          <p className="hero-description">{t("Ține facturile, documentele și termenele importante într-un singur loc, fie că stai în chirie sau ești proprietar.", "Keep bills, documents, and important dates in one place, whether you rent or own your home.")}</p>
          <a className="inline-link" href="#demo">
            <svg className="icon" aria-hidden="true"><use href="#i-down" /></svg>
            <span>{t("Vezi un exemplu", "Explore an example")}</span>
          </a>
        </div>
        <AccessForm language={language} onSubmitted={onSubmitted} />
        <HomePreview t={t} />
      </section>

      <section className="details-section details-tinted" id="how-it-works" aria-labelledby="how-title">
        <div className="container">
          <div className="section-heading">
            <h2 id="how-title">{t("Cum funcționează FirstFlat", "How FirstFlat works")}</h2>
          </div>
          <div className="how-grid">
            <article className="how-card">
              <div className="how-art how-papers" aria-hidden="true">
                <span><svg className="icon"><use href="#i-bill" /></svg><span>{t("Factură de energie", "Electricity bill")}</span></span>
                <span><svg className="icon"><use href="#i-doc" /></svg><span>{t("Certificat de garanție", "Warranty certificate")}</span></span>
                <span><svg className="icon"><use href="#i-home" /></svg><span>{t("Inventarul locuinței", "Home inventory")}</span></span>
              </div>
              <h3>{t("Adună totul într-un loc", "Give everything a place")}</h3>
              <p>{t("Păstrează facturile, documentele, echipamentele și istoricul intervențiilor în profilul locuinței.", "Keep bills, documents, equipment and service history together in your home profile.")}</p>
            </article>
            <article className="how-card">
              <div className="how-art how-calendar" aria-hidden="true">
                <div className="mini-calendar">
                  <span><svg className="icon"><use href="#i-calendar" /></svg><span>{t("Mai", "May")}</span></span>
                  <div className="mini-calendar-days"><span>14</span><span>15</span><strong>16</strong><span>17</span><span>18</span></div>
                  <small>{t("Trimite indexul", "Submit meter reading")}</small>
                </div>
              </div>
              <h3>{t("Ține minte datele importante", "Remember the dates that matter")}</h3>
              <p>{t("Setează mementouri pentru plăți, citirea contoarelor și revizii. Tu confirmi datele.", "Set reminders for payments, meter readings and maintenance. You confirm the dates.")}</p>
            </article>
            <article className="how-card">
              <div className="how-art how-assistant" aria-hidden="true">
                <span>{t("Când expiră asigurarea?", "When does my insurance expire?")}</span>
                <span><svg className="icon"><use href="#i-spark" /></svg><span>{t("Polița expiră pe 24 mai.", "The policy expires on 24 May.")}</span></span>
              </div>
              <h3>{t("Găsește detaliile de care ai nevoie", "Find the details you need")}</h3>
              <p>{t("Un exemplu de cum ar putea asistentul să găsească o dată în documente și să îți propună un memento.", "An example of how an assistant could find a date in your documents and suggest a reminder for you to review.")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="details-section container" id="features" aria-labelledby="features-title">
        <div className="section-heading">
          <h2 id="features-title">{t("Tot ce ține de locuința ta", "All your home essentials")}</h2>
        </div>
        <div className="details-features">
          <article className="feature">
            <span className="feature-icon"><svg className="icon" aria-hidden="true"><use href="#i-home" /></svg></span>
            <h3>{t("Locuința mea", "My home")}</h3>
            <p>{t("Un profil cu echipamentele, documentele și istoricul reparațiilor locuinței.", "A profile for your home's equipment, documents and repair history.")}</p>
          </article>
          <article className="feature">
            <span className="feature-icon"><svg className="icon" aria-hidden="true"><use href="#i-calendar" /></svg></span>
            <h3>{t("Calendarul locuinței", "Home calendar")}</h3>
            <p>{t("Vezi reînnoirile, scadențele, verificările și expirarea garanțiilor în același calendar.", "Keep renewals, payment deadlines, inspections and warranty expirations in one calendar.")}</p>
          </article>
          <article className="feature">
            <span className="feature-icon"><svg className="icon" aria-hidden="true"><use href="#i-bill" /></svg></span>
            <h3>{t("Facturi și utilități", "Bills and utilities")}</h3>
            <p>{t("Ține evidența plăților lunare, a facturilor la utilități și a indexurilor contoarelor.", "Keep track of monthly payments, utility bills and meter readings.")}</p>
          </article>
          <article className="feature">
            <span className="feature-icon"><svg className="icon" aria-hidden="true"><use href="#i-doc" /></svg></span>
            <h3>{t("Documente", "Documents")}</h3>
            <p>{t("Păstrează la îndemână contractul, procesul-verbal de predare, polițele și garanțiile.", "Keep your lease, handover report, insurance policies and warranties close at hand.")}</p>
          </article>
          <article className="feature">
            <span className="feature-icon"><svg className="icon" aria-hidden="true"><use href="#i-tool" /></svg></span>
            <h3>{t("Întreținere", "Maintenance")}</h3>
            <p>{t("Ține evidența reparațiilor și a reviziilor pentru centrală, aer condiționat și alte echipamente.", "Track repairs and service records for your heating, air conditioning and other equipment.")}</p>
          </article>
          <article className="feature">
            <span className="feature-icon"><svg className="icon" aria-hidden="true"><use href="#i-spark" /></svg></span>
            <h3>{t("Asistent pentru locuință", "Home assistant")}</h3>
            <p>{t("O modalitate de a găsi informații utile în documente și de a verifica mementourile propuse.", "A way to find useful information in your documents and review suggested reminders.")}</p>
          </article>
        </div>
      </section>

      <section className="details-section details-tinted" id="for-you" aria-labelledby="audience-title">
        <div className="container">
          <div className="section-heading">
            <h2 id="audience-title">{t("De la un apartament la un portofoliu de locuințe", "From one apartment to a property portfolio")}</h2>
          </div>
          <div className="audience-grid">
            <article>
              <span className="feature-icon"><svg className="icon" aria-hidden="true"><use href="#i-home" /></svg></span>
              <h3>{t("FirstFlat Home", "FirstFlat Home")}</h3>
              <p>{t("Pentru chiriași, proprietari și familii care vor să aibă facturile, documentele și treburile casei într-un singur loc.", "For renters, homeowners and families who want to keep bills, documents and tasks together.")}</p>
            </article>
            <article>
              <span className="feature-icon"><svg className="icon" aria-hidden="true"><use href="#i-building" /></svg></span>
              <h3>{t("FirstFlat Business", "FirstFlat Business")}</h3>
              <p>{t("Pentru administratorii care au nevoie de o evidență a predărilor, a documentelor și a reviziilor pentru mai multe locuințe.", "For property managers who need a clear view of handovers, documents and maintenance across multiple homes.")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="details-section container" id="roadmap" aria-labelledby="roadmap-title">
        <div className="section-heading">
          <h2 id="roadmap-title">{t("Ce urmează pentru FirstFlat", "Where FirstFlat is headed")}</h2>
        </div>
        <ol className="product-roadmap">
          <li><h3>{t("Mementouri pentru locuință", "Home reminders")}</h3><p>{t("Profilul locuinței, calendarul și documentele într-un singur loc.", "A home profile, a calendar and a place for every document.")}</p></li>
          <li><h3>{t("Asistent AI", "AI assistant")}</h3><p>{t("Găsește informații în documente și verifică datele propuse înainte de a le adăuga în calendar.", "Find information in documents and check suggested dates before adding them to the calendar.")}</p></li>
          <li><h3>{t("Servicii pentru locuință", "Home services")}</h3><p>{t("Leagă programările pentru reparații și întreținere de istoricul locuinței.", "Connect repair and maintenance appointments with your home's service history.")}</p></li>
        </ol>
      </section>

      <section className="details-section details-tinted" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-heading">
            <h2 id="faq-title">{t("Întrebări frecvente", "Frequently asked questions")}</h2>
          </div>
          <div className="faq-list">
            <details>
              <summary>{t("De unde vin datele mementourilor?", "Where do reminder dates come from?")}</summary>
              <p>{t("Datele pot veni din facturi, contracte, setările furnizorului sau regulile aplicabile. Le poți verifica înainte de a le trece în calendar.", "Dates can come from bills, contracts, provider settings or applicable rules. You can check them before putting them on the calendar.")}</p>
            </details>
            <details>
              <summary>{t("Trebuie să fiu proprietar?", "Do I need to own my home?")}</summary>
              <p>{t("Nu. Și pentru o locuință închiriată ai de urmărit contractul, facturile și termenele.", "No. Rented homes have their own lease, utilities and deadlines to keep track of.")}</p>
            </details>
            <details>
              <summary>{t("Ce se întâmplă după ce cer acces?", "What happens after I request access?")}</summary>
              <p>{t("Folosim adresa de e-mail pe care o introduci ca să te contactăm în legătură cu accesul la FirstFlat.", "We use the email address you enter to contact you about access to FirstFlat.")}</p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
