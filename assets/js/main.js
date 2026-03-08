(function () {
  'use strict';

  // --- Nav scroll effect ---
  var nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- Hamburger menu ---
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function closeMenu() {
      navLinks.classList.remove('mobile-open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    function openMenu() {
      navLinks.classList.add('mobile-open');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    hamburger.addEventListener('click', function () {
      if (navLinks.classList.contains('mobile-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
        closeMenu();
      }
    });
  }

  // --- Contact form (Formspree) ---
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          contactForm.reset();
          btn.textContent = 'Sent!';
          btn.classList.add('form-success');
          showMessage('Thanks. We\'ll be in touch within one business day.', 'success');
          setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.classList.remove('form-success');
          }, 4000);
        } else {
          showMessage('Something went wrong. Please try again or call us.', 'error');
          btn.textContent = originalText;
          btn.disabled = false;
        }
      }).catch(function () {
        showMessage('Something went wrong. Please try again or call us.', 'error');
        btn.textContent = originalText;
        btn.disabled = false;
      });
    });
  }

  function showMessage(text, type) {
    var existing = document.querySelector('.form-message');
    if (existing) existing.remove();
    var msg = document.createElement('div');
    msg.className = 'form-message form-message-' + type;
    msg.textContent = text;
    contactForm.parentNode.insertBefore(msg, contactForm.nextSibling);
    setTimeout(function () { msg.remove(); }, 6000);
  }

})();
