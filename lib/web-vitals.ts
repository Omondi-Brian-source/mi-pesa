import { CLS, FID, FCP, LCP, TTFB } from 'web-vitals';

const vitalsURL = process.env.NEXT_PUBLIC_VITALS_URL || '';

function getConnectionSpeed() {
  if (typeof navigator === 'undefined') return 'unknown';

  const connection = (navigator as any)?.connection;
  if (!connection) return 'unknown';

  return connection.effectiveType;
}

export function sendToAnalytics(metric: any) {
  // Only send if analytics URL is configured
  if (!vitalsURL) return;

  const body = {
    ...metric,
    url: window.location.href,
    connectionSpeed: getConnectionSpeed(),
  };

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsURL, JSON.stringify(body));
  } else {
    fetch(vitalsURL, {
      body: JSON.stringify(body),
      method: 'POST',
      keepalive: true,
    });
  }
}

export function reportWebVitals() {
  try {
    LCP(sendToAnalytics);
    FID(sendToAnalytics);
    FCP(sendToAnalytics);
    CLS(sendToAnalytics);
    TTFB(sendToAnalytics);
  } catch (error) {
    console.warn('Web Vitals reporting not available:', error);
  }
}
