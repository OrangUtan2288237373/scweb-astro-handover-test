/* ===================================================
   Bodywork Practice Demo
   Main JavaScript
   =================================================== */

(function () {
  'use strict';

  // -----------------------------------------------
  // Hamburger / Mobile Menu
  // -----------------------------------------------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.classList.toggle('is-open', !isOpen);
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // -----------------------------------------------
  // Nav scroll shadow
  // -----------------------------------------------
  const nav = document.querySelector('.site-nav');

  if (nav) {
    function handleNavScroll() {
      if (window.scrollY > 24) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run on load
  }

  // Bind prevention before enabling the demonstration controls.
  const demoForm = document.querySelector('.contact-form');
  if (demoForm) {
    demoForm.addEventListener('submit', function (event) {
      event.preventDefault();
      document.getElementById('demo-form-status').textContent = 'Demo only — your message has not been sent.';
    });
    demoForm.querySelector('fieldset').disabled = false;
  }

  // -----------------------------------------------
  // Subtle fade-in on scroll (sections)
  // Uses IntersectionObserver where available
  // -----------------------------------------------
  if ('IntersectionObserver' in window) {
    const style = document.createElement('style');
    style.textContent = `
      .fade-in {
        opacity: 0;
        transform: translateY(18px);
        transition: opacity 0.65s ease, transform 0.65s ease;
      }
      .fade-in.visible {
        opacity: 1;
        transform: none;
      }
    `;
    document.head.appendChild(style);

    const targets = document.querySelectorAll(
      '.split-content-col, .testimonial, .booking-cta h2, .booking-cta .cta-text, .booking-cta .btn'
    );

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach(function (el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

})();
