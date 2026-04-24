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

  // ── "Zjistit více" expandable sections ──────────────────────────────
  document.querySelectorAll('.more-btn').forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      // Remove all existing expanded sections
      document.querySelectorAll('.more-info').forEach(el => el.remove());
      const text = this.dataset.text;
      if (!text) {
        console.warn("Atribut data-text nebyl nalezen u tlačítka!");
        return;
      }

      let parentElement;
      if (window.innerWidth < 768) {
        parentElement = this.parentElement;
      } else {
        parentElement = this.closest('.service-card') || this.closest('section');
      }

      if (!parentElement) {
        console.error("Nepodařilo se najít rodičovský element.");
        return;
      }

      const extraSection = document.createElement('section');
      extraSection.className = "py-20 bg-white more-info";
      extraSection.style.display = "block";
      extraSection.style.opacity = "1";
      extraSection.innerHTML = `
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <p>${text}</p>
          </div>
        </div>
      `;
      parentElement.insertAdjacentElement('afterend', extraSection);

      if (window.innerWidth < 768) {
        extraSection.scrollIntoView({ behavior: 'smooth' });
      }

      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    });
  });

  // ── EmailJS contact form ────────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Odesílám...';
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
          submitBtn.textContent = 'Odeslat zprávu';
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
    const desktopNav = document.querySelector('nav ul.flex');
    if (desktopNav) {
      const li = document.createElement('li');
      li.innerHTML = '<a href="#reference" class="text-gray-800 font-medium hover:text-sebit-navy pb-1 border-b-2 border-transparent hover:border-sebit-lime transition">Reference</a>';
      const kontaktLi = Array.from(desktopNav.querySelectorAll('a')).find(a => a.href.includes('#kontakt'));
      if (kontaktLi) desktopNav.insertBefore(li, kontaktLi.parentElement);
    }
  }

});
