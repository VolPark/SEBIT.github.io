/**
 * SEBIT Solutions – GDPR Cookie Consent
 * Jednoduchý cookie banner bez externích závislostí.
 * GA4 se načte pouze po udělení souhlasu.
 *
 * Pro aktivaci GA4: nahraď 'G-XXXXXXXXXX' svým Measurement ID z Google Analytics.
 */
(function () {
  'use strict';

  var GA4_ID = 'G-XXXXXXXXXX'; // ← Nahraď svým GA4 Measurement ID
  var CONSENT_KEY = 'sebit_cookie_consent';

  function loadGA4() {
    if (GA4_ID === 'G-XXXXXXXXXX') return; // GA4 není nakonfigurováno
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_ID, { anonymize_ip: true });
  }

  function hideBanner(banner) {
    banner.style.transform = 'translateY(100%)';
    banner.style.opacity = '0';
    setTimeout(function () { banner.remove(); }, 400);
  }

  function createBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Nastavení cookies');
    banner.style.cssText = [
      'position:fixed', 'bottom:0', 'left:0', 'right:0', 'z-index:9999',
      'background:#002B5C', 'color:#fff', 'padding:1rem 1.5rem',
      'display:flex', 'flex-wrap:wrap', 'align-items:center', 'gap:1rem',
      'box-shadow:0 -4px 16px rgba(0,0,0,0.15)',
      'transition:transform 0.4s ease, opacity 0.4s ease'
    ].join(';');

    banner.innerHTML =
      '<p style="flex:1;min-width:200px;font-size:0.875rem;line-height:1.5;margin:0;">' +
        'Tento web používá cookies pro zlepšení vašeho zážitku. ' +
        'Analytické cookies aktivujeme pouze s vaším souhlasem. ' +
        '<a href="/privacy" style="color:#C6FF00;text-decoration:underline;">Více informací</a>' +
      '</p>' +
      '<div style="display:flex;gap:0.75rem;flex-shrink:0;">' +
        '<button id="cookie-accept" style="background:#C6FF00;color:#002B5C;font-weight:700;padding:0.5rem 1.25rem;border:none;border-radius:6px;cursor:pointer;font-size:0.875rem;">Přijmout vše</button>' +
        '<button id="cookie-reject" style="background:transparent;color:#fff;font-weight:500;padding:0.5rem 1.25rem;border:2px solid rgba(255,255,255,0.4);border-radius:6px;cursor:pointer;font-size:0.875rem;">Odmítnout</button>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      loadGA4();
      hideBanner(banner);
    });

    document.getElementById('cookie-reject').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'rejected');
      hideBanner(banner);
    });
  }

  function init() {
    var consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
      loadGA4();
    } else if (!consent) {
      // Zobraz banner při první návštěvě
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBanner);
      } else {
        createBanner();
      }
    }
    // consent === 'rejected' → nic se nenačítá
  }

  init();
})();
