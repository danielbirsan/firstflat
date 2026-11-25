import { useEffect, useRef, useState } from "react";
import posthog, { isPostHogConfigured, posthogLogger } from "./posthog.js";
import "./access-form.css";

const formEndpoint =
  "https://docs.google.com/forms/d/e/1FAIpQLSfZT9xbOekJwySDErokGepQsXeGG10rnlOF4G1Q9DQGF-MPHg/formResponse";
const roleField = "entry.461125814";
const nameField = "entry.464851562";
const emailField = "entry.709261515";

function capture(event, properties) {
  if (isPostHogConfigured) posthog.capture(event, properties);
}

const content = {
  ro: {
    heading: "Cere acces",
    description: "Spune-ne cum ai folosi FirstFlat. Te vom contacta la adresa pe care ne-o lași pentru detalii despre acces.",
    role: "Cum ai folosi FirstFlat?",
    renter: "Ca chiriaș",
    owner: "Ca proprietar",
    advance: "Continuă",
    roleStep: "Pasul 1 din 2 · Locuința ta",
    name: "Numele tău",
    email: "Adresa de e-mail",
    note: "Cererea ta este trimisă prin Google Forms.",
    submit: "Trimite cererea",
    sending: "Se trimite cererea…",
    back: "Înapoi",
    contactStep: "Pasul 2 din 2 · Contact",
    missingRole: "Alege dacă ești chiriaș sau proprietar.",
    missingName: "Introdu numele tău.",
    sendError: "Trimiterea cererii nu a putut fi verificată. Verifică conexiunea și încearcă din nou.",
    confirmation: "Mulțumim pentru interes!",
    confirmationMessage: "Folosim adresa de e-mail pe care ai introdus-o pentru a te contacta în legătură cu accesul la FirstFlat.",
    returnHome: "Înapoi la FirstFlat",
  },
  en: {
    heading: "Request access",
    description: "Tell us how you’d use FirstFlat. We’ll use the email you leave to get in touch about access.",
    role: "How would you use FirstFlat?",
    renter: "As a renter",
    owner: "As an owner",
    advance: "Continue",
    roleStep: "Step 1 of 2 · Your home",
    name: "Your name",
    email: "Email address",
    note: "Your request is sent through Google Forms.",
    submit: "Send request",
    sending: "Sending request…",
    back: "Back",
    contactStep: "Step 2 of 2 · Contact",
    missingRole: "Choose renter or property owner.",
    missingName: "Enter your name.",
    sendError: "We couldn’t verify that the request was sent. Check your connection and try again.",
    confirmation: "Thanks for your interest!",
    confirmationMessage: "We use the email address you entered to get in touch about access to FirstFlat.",
    returnHome: "Back to FirstFlat",
  },
};

export function AccessForm({ language, onSubmitted }) {
  const copy = content[language];
  const [showDetails, setShowDetails] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const renter = useRef(null);
  const owner = useRef(null);
  const name = useRef(null);
  const nextFocus = useRef(null);

  useEffect(() => {
    nextFocus.current?.focus();
    nextFocus.current = null;
  }, [showDetails]);

  useEffect(() => {
    if (renter.current.validity.customError) {
      renter.current.setCustomValidity(copy.missingRole);
    }
    if (name.current.validity.customError) {
      name.current.setCustomValidity(copy.missingName);
    }
  }, [copy.missingRole, copy.missingName]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (sending) return;

    if (!showDetails) {
      const requesterRole = owner.current.checked ? "owner" : "renter";
      capture("access_request_details_started", { requester_role: requesterRole });
      posthogLogger.info("access request details started", { requester_role: requesterRole });
      nextFocus.current = name.current;
      setShowDetails(true);
      return;
    }

    const trimmedName = name.current.value.trim();
    if (!trimmedName) {
      name.current.setCustomValidity(copy.missingName);
      name.current.reportValidity();
      return;
    }

    const form = event.currentTarget;
    const fields = new URLSearchParams(new FormData(form));
    fields.set(nameField, trimmedName);
    setSending(true);
    setSendError(false);
    document.dispatchEvent(new Event("firstflat:accesscontinue"));

    try {
      // Google Forms accepts the POST but exposes only an opaque response to this site.
      await fetch(form.action, { method: "POST", mode: "no-cors", body: fields });
    } catch {
      capture("access_request_submission_failed");
      posthogLogger.warn("access request submission failed");
      setSending(false);
      setSendError(true);
      return;
    }

    const requesterRole = owner.current.checked ? "owner" : "renter";
    capture("access_request_submitted", { requester_role: requesterRole });
    posthogLogger.info("access request submitted", { requester_role: requesterRole });
    onSubmitted();
  }

  function backToRole() {
    nextFocus.current = owner.current.checked ? owner.current : renter.current;
    setShowDetails(false);
  }

  return (
    <div className="access-card" id="access">
      <div className="access-heading">
        <span className="access-icon"><svg className="icon" aria-hidden="true"><use href="#i-key" /></svg></span>
        <h2>{copy.heading}</h2>
        <p>{copy.description}</p>
      </div>

      <form id="access-form" action={formEndpoint} method="post" onSubmit={handleSubmit}>
        <div data-form-step="role" hidden={showDetails}>
          <fieldset onChange={() => renter.current.setCustomValidity("")}>
            <legend>{copy.role}</legend>
            <div className="role-options">
              <label className="role-option">
                <input
                  ref={renter}
                  type="radio"
                  name={roleField}
                  value="Chirias"
                  required
                  onInvalid={({ currentTarget }) => currentTarget.setCustomValidity(copy.missingRole)}
                />
                <span>{copy.renter}</span>
              </label>
              <label className="role-option">
                <input ref={owner} type="radio" name={roleField} value="Proprietar" required />
                <span>{copy.owner}</span>
              </label>
            </div>
          </fieldset>
          <button type="submit" className="button button-primary" data-form-next="">
            <span>{copy.advance}</span>
            <svg className="icon" aria-hidden="true"><use href="#i-arrow" /></svg>
          </button>
          <p className="form-step">{copy.roleStep}</p>
        </div>

        <div data-form-step="details" hidden={!showDetails}>
          <div className="form-fields">
            <label>
              <span>{copy.name}</span>
              <input
                ref={name}
                type="text"
                name={nameField}
                autoComplete="name"
                required
                disabled={!showDetails}
                readOnly={sending}
                onInput={({ currentTarget }) => currentTarget.setCustomValidity("")}
              />
            </label>
            <label>
              <span>{copy.email}</span>
              <input type="email" name={emailField} autoComplete="email" required disabled={!showDetails} readOnly={sending} />
            </label>
          </div>
          <p className="form-note">{copy.note}</p>
          {sendError && <p className="form-note form-error" role="alert">{copy.sendError}</p>}
          <button type="submit" className="button button-primary" disabled={sending}>
            <span>{sending ? copy.sending : copy.submit}</span>
            <svg className="icon" aria-hidden="true"><use href="#i-arrow" /></svg>
          </button>
          <div className="form-secondary">
            <button type="button" className="text-button" data-form-back="" onClick={backToRole} disabled={sending}>
              {copy.back}
            </button>
            <p className="form-step">{copy.contactStep}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export function AccessConfirmation({ language }) {
  const copy = content[language];
  const heading = useRef(null);

  useEffect(() => {
    heading.current.focus();
  }, []);

  return (
    <section className="container access-confirmation" aria-labelledby="access-confirmation-heading">
      <div className="access-card">
        <div className="access-heading">
          <span className="access-icon"><svg className="icon" aria-hidden="true"><use href="#i-key" /></svg></span>
          <h1 id="access-confirmation-heading" ref={heading} tabIndex={-1}>{copy.confirmation}</h1>
          <p>{copy.confirmationMessage}</p>
        </div>
        <a className="button button-primary" href="#access">{copy.returnHome}</a>
      </div>
    </section>
  );
}
