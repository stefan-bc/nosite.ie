(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // --- Navbar scroll effect ---
    var navbar = document.querySelector('.site-header .navbar');
    if (navbar) {
      function checkScroll() {
        if (window.pageYOffset > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      window.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
    }

    // --- Smooth scroll ---
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
        var bsCollapse = document.querySelector('.navbar-collapse.show');
        if (bsCollapse && typeof bootstrap !== 'undefined') {
          var instance = bootstrap.Collapse.getInstance(bsCollapse) || new bootstrap.Collapse(bsCollapse, { toggle: false });
          instance.hide();
        }
      });
    });

    // Also handle CTA links that point to sections
    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

    // --- Active nav link tracking ---
    var sections = document.querySelectorAll('section[id]');
    function updateActiveLink() {
      var scrollPos = window.pageYOffset + 120;
      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // --- Accordion ---
    var Accordion = {
      openAccordion: function (toggle, content) {
        if (content.children.length) {
          toggle.classList.add('is-open');
          content.style.height = content.children[0].offsetHeight + 'px';
        }
      },
      closeAccordion: function (toggle, content) {
        toggle.classList.remove('is-open');
        content.style.height = '0';
      },
      init: function (el) {
        var self = this;
        var isFirstExpanded = el.classList.contains('is-first-expanded');
        var isToggle = el.classList.contains('is-toggle');
        var allToggles = el.getElementsByClassName('accordion-head');
        var allContents = el.getElementsByClassName('accordion-body');

        for (var i = 0; i < allToggles.length; i++) {
          (function (idx) {
            var toggle = allToggles[idx];
            var content = allContents[idx];

            toggle.addEventListener('click', function () {
              if (!isToggle) {
                for (var a = 0; a < allContents.length; a++) {
                  self.closeAccordion(allToggles[a], allContents[a]);
                }
                self.openAccordion(toggle, content);
              } else {
                if (toggle.classList.contains('is-open')) {
                  self.closeAccordion(toggle, content);
                } else {
                  self.openAccordion(toggle, content);
                }
              }
            });

            if (idx === 0 && isFirstExpanded) {
              self.openAccordion(toggle, content);
            }
          })(i);
        }
      }
    };

    document.querySelectorAll('.accordions').forEach(function (el) {
      Accordion.init(el);
    });

    // --- Typewriter (starts after reveal) ---
    var typewriterEl = document.getElementById('typewriter');
    var typewriterStarted = false;

    function startTypewriter() {
      if (typewriterStarted || !typewriterEl) return;
      typewriterStarted = true;
      var text = "Let's put you on the map.";
      var i = 0;
      setTimeout(function () {
        var interval = setInterval(function () {
          typewriterEl.textContent = text.slice(0, i + 1);
          i++;
          if (i >= text.length) {
            clearInterval(interval);
            typewriterEl.classList.add('done');
          }
        }, 60);
      }, 400);
    }

    // --- Scroll reveal ---
    // --- Contact form (Formspree) ---
    function showFormMessage(text, type) {
      var existing = document.querySelector('.form-message');
      if (existing) existing.remove();
      var msg = document.createElement('div');
      msg.className = 'form-message form-message-' + type;
      msg.textContent = text;
      var form = document.getElementById('contact-form');
      form.parentNode.insertBefore(msg, form.nextSibling);
      setTimeout(function () { msg.classList.add('visible'); }, 10);
      setTimeout(function () {
        msg.classList.remove('visible');
        setTimeout(function () { msg.remove(); }, 400);
      }, 6000);
    }

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
            btn.textContent = 'Message sent!';
            btn.classList.add('form-success');
            showFormMessage('Thanks! We\'ll be in touch within one business day.', 'success');
            setTimeout(function () {
              btn.textContent = originalText;
              btn.disabled = false;
              btn.classList.remove('form-success');
            }, 4000);
          } else {
            showFormMessage('Something went wrong. Please try again or email us directly.', 'error');
            btn.textContent = originalText;
            btn.disabled = false;
          }
        }).catch(function () {
          showFormMessage('Something went wrong. Please try again or email us directly.', 'error');
          btn.textContent = originalText;
          btn.disabled = false;
        });
      });
    }

    var revealElements = document.querySelectorAll('[data-reveal]');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
          // Start typewriter when the hero text column is revealed
          if (typewriterEl && entry.target.contains(typewriterEl)) {
            startTypewriter();
          }
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(function (el) { revealObserver.observe(el); });

  });
})();
