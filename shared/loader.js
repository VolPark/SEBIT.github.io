/**
 * SEBIT Page Loader / Splash Screen
 * ===================================
 * Adds a branded loading overlay that fades out once the page is ready.
 *
 * Usage: Add to <head> of any page:
 *   <link rel="stylesheet" href="/shared/loader.css">
 *   <script src="/shared/loader.js"></script>
 *
 * The loader automatically creates and injects the overlay.
 * It fades out after DOMContentLoaded + a short delay for smoothness.
 */

(function() {
  'use strict';

  // Don't show loader on back/forward navigation (bfcache)
  if (performance && performance.navigation && performance.navigation.type === 2) return;

  // Create overlay
  var overlay = document.createElement('div');
  overlay.id = 'sebit-loader';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = [
    '<div class="sebit-loader__center">',
    '  <div class="sebit-loader__wordmark">',
    '    <svg viewBox="0 0 64 64" class="sebit-loader__arrow">',
    '      <polyline points="16,20 40,32 16,44" stroke="#C6FF00" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    '    </svg>',
    '    <span>SEBIT</span>',
    '  </div>',
    '  <div class="sebit-loader__march">',
    '    <svg viewBox="0 0 64 64"><polyline points="16,20 40,32 16,44" stroke="#C6FF00" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
    '    <svg viewBox="0 0 64 64"><polyline points="16,20 40,32 16,44" stroke="#C6FF00" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
    '    <svg viewBox="0 0 64 64"><polyline points="16,20 40,32 16,44" stroke="#C6FF00" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
    '  </div>',
    '</div>'
  ].join('');

  // Insert immediately (before DOM is parsed)
  if (document.body) {
    document.body.appendChild(overlay);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(overlay);
    });
  }

  // Fade out after page load
  function hideLoader() {
    var el = document.getElementById('sebit-loader');
    if (!el) return;
    // Minimum display time 400ms for brand impression
    setTimeout(function() {
      el.classList.add('sebit-loader--hidden');
      // Remove from DOM after animation
      setTimeout(function() {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 500);
    }, 400);
  }

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
})();
