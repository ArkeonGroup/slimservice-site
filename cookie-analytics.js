/**
 * SlimService — Cookie consent + Google Analytics
 * GA-ID: vervang G-XXXXXXXXXX door jouw echte Measurement ID
 */

(function() {
  var GA_ID = 'G-XXXXXXXXXX'; // <-- verander dit naar jouw GA4 Measurement ID
  var CONSENT_KEY = 'ss_cookie_consent';

  function loadGA() {
    if (typeof window.gtag !== 'undefined') return;
    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  }

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch(e) { return null; }
  }

  function setConsent(val) {
    try { localStorage.setItem(CONSENT_KEY, val); } catch(e) {}
  }

  function hideBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) b.classList.add('hidden');
  }

  function onAccept() {
    setConsent('accepted');
    hideBanner();
    loadGA();
  }

  function onDecline() {
    setConsent('declined');
    hideBanner();
  }

  // If already consented, act immediately
  var existing = getConsent();
  if (existing === 'accepted') {
    loadGA();
    return;
  }
  if (existing === 'declined') return;

  // Show banner after DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    // Small delay so it doesn't clash with page load
    setTimeout(function() {
      banner.classList.remove('hidden');
    }, 800);
    document.getElementById('cookie-accept').addEventListener('click', onAccept);
    document.getElementById('cookie-decline').addEventListener('click', onDecline);
  });
})();
