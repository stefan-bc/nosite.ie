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

  // --- Browser animation (hero) ---
  var browserIcons = {
    paw:      '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="4" cy="8" r="2"/><circle cx="6.5" cy="15" r="2"/><path d="M12 15c-2-2.5-4-3.5-3.5-6s3-3 4.5-1 3 4.5 1 7.5z"/>',
    shield:   '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    map:      '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
    star:     '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    clock:    '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    zap:      '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    euro:     '<path d="M4 10h12M4 14h12M19.5 8.5A7.5 7.5 0 1 0 19.5 15.5"/>',
    check:    '<circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>'
  };

  function illusDog(c, cl) {
    return '<rect width="120" height="140" fill="' + cl + '"/>' +
      '<g transform="translate(15,15) scale(0.55)" fill="' + c + '">' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M122.15 121.06L120.79 125.92L68.46 94.16L68.02 80.16C68.02 80.16 79.08 88 83.56 91.56C84.639 92.3103 85.4448 93.3909 85.8561 94.6391C86.2673 95.8873 86.2617 97.2353 85.84 98.48L109.46 113.26L113.31 97.5L118.52 103.98L125.95 104.22L127.84 107.89H135.19C135.19 117.38 131.81 121.24 122.15 121.06ZM61.76 94.79L75.51 147.12C75.51 147.12 67.9 150.52 65.64 144.12C63.55 138.21 53.16 111.12 53.16 111.12L49 113C49 113 40.22 137.32 37.43 144.19C34.56 151.25 27.32 146.84 27.32 146.84L40.68 96.54L40.1 83.09L34.8 84.43L31.61 102.24C31.61 102.24 23.54 103.29 24.02 96.71C24.51 89.97 25.34 77.12 25.34 77.12L42.9 66.61C55.31 65.95 63.61 69.61 62.65 83.14C62.37 87.05 61.76 94.79 61.76 94.79ZM42.08 54.18C40.67 42.94 58.88 40.7 58.88 53.33C58.88 66.12 43.44 65 42.08 54.18ZM90.83 116.78L93.03 122.23L102.76 119.96L119.49 130.54L115.9 143.38C117.03 143.38 118.27 145.18 118.27 147.48H107.73L107.31 136.36L95.76 135.84L90.55 143.4C91.489 143.553 92.3326 144.063 92.9046 144.823C93.4767 145.584 93.7329 146.535 93.62 147.48H80L87.74 116.84L90.83 116.78Z"/>' +
      '</g>';
  }

  function illusScissors(c, cl) {
    return '<rect width="120" height="140" fill="' + cl + '"/>' +
      '<g transform="translate(18,10) scale(0.52)" fill="' + c + '">' +
      '<path d="M129.7,31.6H92.7c-6.6-0.1-6.4,9.8,0,9.8h36.9v4.9H92.9c-6.7,0-6.5,9.8,0,9.8h36.8v4.9v0.2H92.9c-6.7,0-6.5,9.9,0,9.9h36.8v4.9H92.9c-6.6,0-6.5,9.8,0,9.8h36.8v4.9H92.9c-6.6,0-6.6,9.9,0,9.8h36.8v5H92.9c-6.6-0.1-6.6,9.8,0,9.8h36.8v4.9H92.9c-6.6,0-6.6,9.8,0,9.8h36.8v4.9H92.9c-6.6,0-6.5,9.9,0,9.9h36.8v95.5c-0.1,14.6,22.2,14.4,22.2,0V16.9c0-6.6-5.5-15-14.6-15L92.7,1.8c-6.6,0.1-6.4,9.9,0,9.9h36.9v4.9H92.7c-6.6,0-6.4,9.9,0,9.8h36.9V31.6L129.7,31.6z"/>' +
      '<path d="M87,224.6c-1.3,8.1,1.5,22.6,7.2,27.9c6,5.5,13.1-1.5,10.2-7.2c-3-5.6-6.7-8.7-3.6-22.1L87,224.6L87,224.6z"/>' +
      '<path d="M75.2,177.5v-65.1L62.9,5.3c-0.4-2.9-2.1-3.6-3.8-3.6c-1.6,0-3.4,0.6-3.7,3.6l-12,107.1v65.1c-22.7-11.8-39.7,6.6-39.8,23.3c0.1,14.9,11.1,27.2,26.8,27.2c15.7-0.1,26.4-13.8,26.4-27.2v-65.4h5v65.4c0,15.5,12.6,27,26,27c16.9,0,27.6-11.9,27.6-26.9C115.5,184,97.9,165.7,75.2,177.5z M30.1,214.4c-7.4,0-13.3-6-13.4-13.4c0.1-7.3,6-13.3,13.4-13.3c7.4,0,13.4,5.9,13.4,13.3C43.5,208.4,37.5,214.4,30.1,214.4z M88.9,214.4c-7.3,0-13.3-6-13.3-13.4c0-7.3,5.9-13.3,13.3-13.3c7.4,0,13.4,5.9,13.4,13.3C102.3,208.4,96.4,214.4,88.9,214.4z"/>' +
      '</g>';
  }

  function illusWrench(c, cl) {
    return '<rect width="120" height="140" fill="' + cl + '"/>' +
      '<g transform="translate(12,22) scale(1.9)" fill="' + c + '">' +
      '<path d="M45.971 44.396c0-1.994-3.638-7.567-3.638-7.567s-3.693 5.573-3.693 7.567c0 1.99 1.642 3.604 3.666 3.604 2.023 0 3.665-1.614 3.665-3.604zm-26.305-31.225h-7.331v-7.227h1.999v-3.944h-13.334v3.944h2v11.17c0 2.904 2.388 5.257 5.333 5.257h11.333v1.972h4.001v-13.142h-4.001v1.97zm27.332 16.428v-11.17c0-2.903-2.387-5.257-5.329-5.257h-11.335v-1.97h-4.001v13.143h4.001v-1.973h7.332v7.227h-1.997v3.944h13.331v-3.944h-2.002z"/>' +
      '</g>';
  }

  var bizSites = [
    {
      url: 'dublinsdoghandler.ie', logo: 'Dublin Dog Handler', tabTitle: 'Dublin Dog Handler', cta: 'Book now',
      color: '#7c6fe0', light: '#f0eeff',
      badge: 'Available Mon\u2013Fri', l1: "Dublin's best", l2: 'dog handler.',
      sub: 'Fully insured \xb7 5\u2605 on Google \xb7 All Dublin areas', btn: 'Book a session',
      proof: [['200+','happy dogs'],['5.0\u2605','avg rating'],['6 yrs','experience'],['Insured','covered']],
      cards: [
        { icon:'paw',   tag:'Daily',    tagBg:'#f0eeff', tagC:'#7c6fe0', iBg:'#f0eeff', iC:'#7c6fe0', title:'Dog walking',    body:'Morning & afternoon slots.' },
        { icon:'shield',tag:'Certified',tagBg:'#e8f8f0', tagC:'#1e9e6a', iBg:'#e8f8f0', iC:'#1e9e6a', title:'Trained handler', body:'Certified, insured, trusted.' },
        { icon:'map',   tag:'D1\u2013D15',tagBg:'#f3f3f5', tagC:'#888',  iBg:'#f3f3f5', iC:'#999',    title:'Dublin-wide',    body:'North & southside covered.' }
      ],
      iC: '#7c6fe0', iL: '#ede9ff', illus: illusDog,
      favStroke: '#7c6fe0', favPath: 'paw'
    },
    {
      url: 'cuttingedgebarbers.ie', logo: 'Cutting Edge', tabTitle: 'Cutting Edge Barbers', cta: 'Book a cut',
      color: '#d95f5f', light: '#fff0f0',
      badge: 'Walk-ins welcome', l1: "Dublin's sharpest", l2: 'barber shop.',
      sub: 'Phibsborough \xb7 Est. 2011 \xb7 Open 7 days a week', btn: 'Book now',
      proof: [['500+','5\u2605 reviews'],['\u20AC20','from'],['7 days','open'],['Est.','2011']],
      cards: [
        { icon:'scissors',tag:'Popular',  tagBg:'#fff0f0', tagC:'#d95f5f', iBg:'#fff0f0', iC:'#d95f5f', title:'Classic cut',    body:'Fades, tapers & trims.' },
        { icon:'star',    tag:'#1 rated', tagBg:'#fffbe6', tagC:'#c49a00', iBg:'#fffbe6', iC:'#c49a00', title:'Top rated',      body:'Best barber in Phibsborough.' },
        { icon:'clock',   tag:'Late hrs', tagBg:'#f3f3f5', tagC:'#888',    iBg:'#f3f3f5', iC:'#999',    title:'Open late',      body:'Mon\u2013Sat until 8pm.' }
      ],
      iC: '#d95f5f', iL: '#ffe8e8', illus: illusScissors,
      favStroke: '#d95f5f', favPath: 'scissors'
    },
    {
      url: 'bestplumbing.ie', logo: 'Best Plumbing', tabTitle: 'Best Plumbing Dublin', cta: 'Get a quote',
      color: '#2e8fd4', light: '#e8f4ff',
      badge: '24/7 emergency callouts', l1: "Dublin's most trusted", l2: 'plumber.',
      sub: 'All Dublin areas \xb7 Fixed prices \xb7 No call-out fee', btn: 'Call now',
      proof: [['24/7','callouts'],['\u20AC0','call-out fee'],['10 yrs','trusted'],['Fixed','pricing']],
      cards: [
        { icon:'zap',   tag:'Fast',   tagBg:'#e8f4ff', tagC:'#2e8fd4', iBg:'#e8f4ff', iC:'#2e8fd4', title:'Quick response', body:'Same-day slots available.' },
        { icon:'check', tag:'RGI',    tagBg:'#e8f8f0', tagC:'#1e9e6a', iBg:'#e8f8f0', iC:'#1e9e6a', title:'Certified',      body:'RGI registered & insured.' },
        { icon:'euro',  tag:'Fixed',  tagBg:'#f3f3f5', tagC:'#888',    iBg:'#f3f3f5', iC:'#999',    title:'Fixed pricing',  body:'No hidden charges ever.' }
      ],
      iC: '#2e8fd4', iL: '#daeeff', illus: illusWrench,
      favStroke: '#2e8fd4', favPath: 'zap'
    }
  ];

  var bizIdx = 0;

  function browserType(b) {
    var l1 = document.getElementById('h-l1');
    var l2 = document.getElementById('h-l2');
    if (!l1 || !l2) return;
    l1.textContent = '';
    l2.innerHTML = '';
    var i = 0;
    var go1 = function () {
      if (i <= b.l1.length) { l1.textContent = b.l1.slice(0, i++); setTimeout(go1, 46); }
      else {
        l2.innerHTML = '<span id="h-l2t"></span>';
        var j = 0;
        var go2 = function () {
          var el = document.getElementById('h-l2t');
          if (!el) return;
          if (j <= b.l2.length) { el.textContent = b.l2.slice(0, j++); setTimeout(go2, 52); }
        };
        go2();
      }
    };
    setTimeout(go1, 220);
  }

  function browserPaint(b, anim) {
    var page = document.getElementById('page');
    var bar = document.getElementById('omni-bar');
    if (!page || !bar) return;

    if (anim) {
      page.classList.add('out');
      bar.style.background = b.color;
      bar.style.transition = 'width 0.35s ease';
      bar.style.width = '0%';
      setTimeout(function () { bar.style.width = '65%'; }, 30);
      setTimeout(function () { bar.style.width = '88%'; }, 280);
    }

    var apply = function () {
      document.getElementById('omni-url').textContent = b.url;
      document.getElementById('tab-title').textContent = b.tabTitle;
      document.getElementById('tab-fav').innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="' + b.favStroke + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + browserIcons[b.favPath] + '</svg>';
      document.getElementById('s-logo').textContent = b.logo;
      var cta = document.getElementById('s-cta'); cta.textContent = b.cta; cta.style.background = b.color;
      var badge = document.getElementById('s-badge'); badge.style.background = b.light; badge.style.color = b.color;
      document.getElementById('s-badge-txt').textContent = b.badge;
      document.getElementById('s-sub').textContent = b.sub;
      var btn = document.getElementById('s-btn'); btn.textContent = b.btn; btn.style.background = b.color;
      document.getElementById('s-illus-bg').style.background = b.iL;
      document.getElementById('s-illus-svg').innerHTML = b.illus(b.iC, b.iL);
      b.proof.forEach(function (p, i) {
        document.getElementById('pv' + i).textContent = p[0];
        document.getElementById('pv' + i).style.color = b.color;
        document.getElementById('pt' + i).textContent = p[1];
      });
      document.getElementById('s-cards').innerHTML = b.cards.map(function (c) {
        return '<div class="s-card"><div class="s-card-top"><div class="s-icon" style="background:' + c.iBg + '"><svg viewBox="0 0 24 24" fill="none" stroke="' + c.iC + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + browserIcons[c.icon] + '</svg></div><div class="s-tag" style="background:' + c.tagBg + ';color:' + c.tagC + '">' + c.tag + '</div></div><div class="s-card-title">' + c.title + '</div><div class="s-card-body">' + c.body + '</div></div>';
      }).join('');

      if (anim) {
        page.classList.remove('out');
        setTimeout(function () {
          bar.style.width = '100%';
          setTimeout(function () {
            bar.style.transition = 'none';
            bar.style.width = '0%';
            setTimeout(function () { bar.style.transition = 'width 0.35s ease'; }, 80);
          }, 360);
        }, 30);
      }

      browserType(b);
    };

    anim ? setTimeout(apply, 400) : apply();
  }

  if (document.querySelector('.browser')) {
    browserPaint(bizSites[0], false);
    setInterval(function () {
      bizIdx = (bizIdx + 1) % bizSites.length;
      browserPaint(bizSites[bizIdx], true);
    }, 7000);
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
