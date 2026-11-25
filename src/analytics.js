import { readStorage, writeStorage } from './storage.js';

const sourceKey = 'firstflat.attribution';
const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'];
const measurementId = document.querySelector('meta[name="firstflat-ga4"]')?.content.trim();
const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId || '');

let consent;
let attribution = {};
let analyticsStarted = false;

function captureAttribution() {
  const campaign = {};
  const params = new URLSearchParams(location.search);
  for (const key of campaignKeys) {
    const value = params.get(key)?.trim();
    if (value && /^[\p{L}\p{N} ._+~-]{1,100}$/u.test(value)) {
      campaign[key] = value;
    }
  }
  const referrer = document.referrer ? new URL(document.referrer).origin : '';
  if (referrer && referrer !== 'null' && referrer !== location.origin) {
    campaign.referrer = referrer;
  }
  if (Object.keys(campaign).length) {
    writeStorage('sessionStorage', sourceKey, JSON.stringify(campaign));
    return campaign;
  }
  try {
    return JSON.parse(readStorage('sessionStorage', sourceKey)) || {};
  } catch {
    return {};
  }
}

function track() {
  window.dataLayer.push(arguments);
}

function analyticsContext() {
  const url = new URL(location.origin);
  url.pathname = location.pathname;
  for (const key of campaignKeys) {
    if (attribution[key]) url.searchParams.set(key, attribution[key]);
  }
  return { page_location: url.href, page_referrer: attribution.referrer || '' };
}

function enableAnalytics() {
  if (!analyticsConfigured) return;
  window[`ga-disable-${measurementId}`] = false;
  if (analyticsStarted) {
    track('consent', 'update', { analytics_storage: 'granted' });
    return;
  }

  analyticsStarted = true;
  window.dataLayer = window.dataLayer || [];
  track('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  track('js', new Date());
  track('config', measurementId, {
    ...analyticsContext(),
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_domain: 'none',
    cookie_expires: 60 * 60 * 24 * 90,
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
  track('event', 'page_view', analyticsContext());
}

function disableAnalytics() {
  attribution = {};
  writeStorage('sessionStorage', sourceKey, null);
  if (!analyticsConfigured) return;
  window[`ga-disable-${measurementId}`] = true;
  if (analyticsStarted) track('consent', 'update', { analytics_storage: 'denied' });
  for (const name of ['_ga', `_ga_${measurementId.slice(2)}`]) {
    document.cookie = `${name}=; Max-Age=0; Path=/`;
  }
}

export function applyAnalyticsConsent(preference) {
  if (consent === preference) return;
  consent = preference;
  if (preference === 'granted') {
    attribution = captureAttribution();
    enableAnalytics();
  } else {
    disableAnalytics();
  }
}

export function trackAccessContinue() {
  if (consent === 'granted' && analyticsStarted) {
    track('event', 'access_continue', analyticsContext());
  }
}
