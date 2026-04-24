/**
 * SEBIT Shared Components
 * ========================
 * Centralized JS for common UI behaviors across all pages.
 * Import this script at the bottom of every page:
 *   <script src="/shared/components.js"></script>
 *
 * Features:
 *   - Mobile menu toggle
 *   - Auto-set current year in footer
 *   - "Zjistit více" expandable sections
 *   - EmailJS contact form handler
 */

document.addEventListener("DOMContentLoaded", () => {

  // ── Current year in footer ──────────────────────────────────────────
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── Mobile menu toggle ──────────────────────────────────────────────
  const menuButton = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
    // Close menu when a link is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }

  // ── "Zjistit více" expandable sections (Modal) ──────────────────────────────
  // Create a single modal overlay for the whole page
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'sebit-modal-overlay';
  modalOverlay.innerHTML = `
    <div class="sebit-modal" role="dialog" aria-modal="true">
      <button class="sebit-modal__close" aria-label="Zavřít okno">&times;</button>
      <div class="sebit-modal__content"></div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  const modalContent = modalOverlay.querySelector('.sebit-modal__content');
  const modalClose = modalOverlay.querySelector('.sebit-modal__close');

  function closeModal() {
    modalOverlay.classList.remove('sebit-modal-overlay--active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('sebit-modal-overlay--active')) {
      closeModal();
    }
  });

  document.querySelectorAll('.more-btn').forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const text = this.dataset.text;
      if (!text) {
        console.warn("Atribut data-text nebyl nalezen u tlačítka!");
        return;
      }
      
      modalContent.innerHTML = text;
      modalOverlay.classList.add('sebit-modal-overlay--active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // ── EmailJS contact form ────────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  // SVG pro inline loader (three-arrow march z Design Systemu)
  const loaderSvg = `
    <span class="sebit-loader__march" style="gap: 6px; transform: scale(0.8);">
      <svg viewBox="0 0 64 64" style="width: 12px; height: 12px;"><polyline points="16,20 40,32 16,44" stroke="#C6FF00" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
      <svg viewBox="0 0 64 64" style="width: 12px; height: 12px;"><polyline points="16,20 40,32 16,44" stroke="#C6FF00" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
      <svg viewBox="0 0 64 64" style="width: 12px; height: 12px;"><polyline points="16,20 40,32 16,44" stroke="#C6FF00" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
    </span>
  `;

  if (contactForm && formStatus && submitBtn) {
    // Uložíme původní obsah tlačítka (např. "Odeslat zprávu")
    const originalBtnContent = submitBtn.innerHTML;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.innerHTML = loaderSvg + ' <span>Odesílám...</span>';
      formStatus.className = 'hidden text-sm font-medium p-3 rounded';

      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
          formStatus.textContent = 'Zpráva byla úspěšně odeslána. Brzy se ozveme!';
          formStatus.classList.remove('hidden');
          formStatus.classList.add('bg-green-50', 'text-green-700', 'border', 'border-green-200');
          contactForm.reset();
        }, function(error) {
          formStatus.textContent = 'Odeslání se nezdařilo. Kontaktujte nás prosím přímo na info@sebit.cz';
          formStatus.classList.remove('hidden');
          formStatus.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200');
          console.error('EmailJS error:', error);
        })
        .finally(function() {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
        });
    });
  }

  // ── Sticky CTA (mobile) ────────────────────────────────────────────
  const stickyCta = document.getElementById('sticky-cta');
  if (stickyCta) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        stickyCta.style.opacity = '1';
        stickyCta.style.pointerEvents = 'auto';
      } else {
        stickyCta.style.opacity = '0';
        stickyCta.style.pointerEvents = 'none';
      }
    });
  }

  // ── Dynamic "Reference" nav link on Solutions pages ─────────────────
  const refSection = document.getElementById('reference');
  if (refSection) {
    const desktopNav = document.querySelector('nav ul.sebit-nav');
    if (desktopNav) {
      const li = document.createElement('li');
      li.innerHTML = '<a href="#reference" class="sebit-nav-link">Reference</a>';
      const kontaktLi = Array.from(desktopNav.querySelectorAll('a')).find(a => a.href.includes('#kontakt'));
      if (kontaktLi) desktopNav.insertBefore(li, kontaktLi.parentElement);
    }
  }

});
