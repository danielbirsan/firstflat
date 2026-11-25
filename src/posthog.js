import posthog from "posthog-js";

const projectToken = import.meta.env.VITE_POSTHOG_KEY;
const apiHost = import.meta.env.VITE_POSTHOG_HOST;

export const posthogConfigured = Boolean(projectToken && apiHost);

if (!posthogConfigured) {
  if (import.meta.env.DEV) {
    throw new Error(
      `VITE_POSTHOG_${projectToken ? "HOST" : "KEY"} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_${projectToken ? "HOST" : "KEY"} is configured`,
    );
  }
} else {
  posthog.init(projectToken, {
    api_host: apiHost,
    defaults: "2026-08-30",
    opt_out_capturing_by_default: true,
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
}

export default posthog;
