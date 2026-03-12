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

  // --- Close mobile menu on nav link click ---
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      document.getElementById('menu-toggle').checked = false;
    });
  });

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
          var wrapper = contactForm.parentNode;
          contactForm.remove();
          var walkin = wrapper.querySelector('.contact-walkin');
          if (walkin) walkin.remove();
          var msg = document.createElement('div');
          msg.className = 'form-message form-message-success';
          msg.textContent = 'Message sent. We\'ll be in touch shortly.';
          wrapper.appendChild(msg);
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
