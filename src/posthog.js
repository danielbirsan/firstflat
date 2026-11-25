import posthog from "posthog-js";

const apiKey = import.meta.env.VITE_POSTHOG_KEY;
const apiHost = import.meta.env.VITE_POSTHOG_HOST;
const hasEnvironmentConfig = Boolean(apiKey && apiHost);

let initialized = false;
export let isPostHogConfigured = false;

export const posthogLogger = {
  info(message, attributes) {
    if (isPostHogConfigured) posthog.logger.info(message, attributes);
  },
  warn(message, attributes) {
    if (isPostHogConfigured) posthog.logger.warn(message, attributes);
  },
};

if (import.meta.env.DEV) {
  for (const [name, value] of [
    ["VITE_POSTHOG_KEY", apiKey],
    ["VITE_POSTHOG_HOST", apiHost],
  ]) {
    if (!value) {
      console.error(
        new Error(
          `${name} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${name} is configured`,
        ),
      );
    }
  }
}

export function applyPostHogConsent(preference) {
  if (!hasEnvironmentConfig) return;

  if (preference === "granted") {
    if (!initialized) {
      posthog.init(apiKey, {
        api_host: apiHost,
        logs: {
          serviceName: "firstflat-web",
          environment: import.meta.env.MODE,
        },
        capture_exceptions: {
          capture_unhandled_errors: true,
          capture_unhandled_rejections: true,
          capture_console_errors: false,
        },
      });
      initialized = true;
    } else {
      posthog.opt_in_capturing();
    }
    isPostHogConfigured = true;
    return;
  }

  if (initialized) posthog.opt_out_capturing();
  isPostHogConfigured = false;
}

export default posthog;
