/* =====================================================================
   Portfolio behavior. You normally don't need to edit this file.
   All text and data lives in content.js.
   ===================================================================== */
(function () {
  'use strict';

  var D = window.PORTFOLIO;
  if (!D) { console.error('content.js did not load'); return; }

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduceMotion = motionQuery.matches;
  var PH = '✎'; // ✎

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function hasPh(v) { return typeof v === 'string' && v.indexOf(PH) !== -1; }
  function isPh(v) { return typeof v === 'string' && v.trim().indexOf(PH) === 0; }
  /* Text with an optional "✎ placeholder" part rendered as a dashed note. */
  function rich(v) {
    if (!hasPh(v)) return esc(v);
    var i = v.indexOf(PH);
    var before = v.slice(0, i).trim();
    var after = v.slice(i + 1).trim();
    return (before ? esc(before) + ' ' : '') + (after ? '<span class="ph">' + esc(after) + '</span>' : '');
  }

  /* ---------- icons (simple line icons, drawn for this site) ---------- */
  var ICONS = {
    bill: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>',
    coin: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.2"/>',
    coins: '<circle cx="9" cy="13" r="6"/><path d="M13.5 6.6A6 6 0 1 1 15 18.8"/><circle cx="9" cy="13" r="3"/>',
    scan: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><path d="M7 12h10"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12.4 2.8 2.8L16.4 9.5"/>',
    screen: '<rect x="3" y="4" width="18" height="12.5" rx="2"/><path d="M9 20.5h6M12 16.5v4"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.6"/><path d="M10.5 5.6h3M9.5 11h5M9.5 14h3.5"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2.2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3"/>',
    cpu: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h4M7 13.5h2.5"/><circle cx="16" cy="12" r="2"/><path d="M6 18v2.5M10 18v2.5M14 18v2.5M18 18v2.5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="6.6"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    camera: '<path d="M3.5 8.5h3.2L8.4 6h7.2l1.7 2.5h3.2V19h-17z"/><circle cx="12" cy="13.3" r="3.4"/>',
    sensor: '<path d="M4.5 11a7.5 7.5 0 0 1 15 0"/><path d="M8 11a4 4 0 0 1 8 0"/><circle cx="12" cy="12.5" r="1.6"/><path d="M12 14v6"/>',
    box: '<path d="M4 8 12 4l8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.2"/><path d="m3.6 6.3 8.4 6.6 8.4-6.6"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.6 4.5l-3.2 15"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2.2"/><path d="M9 7V5.2A1.2 1.2 0 0 1 10.2 4h3.6A1.2 1.2 0 0 1 15 5.2V7M3 12.5h18"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    shield: '<path d="M12 3 5 6v5.2c0 4.4 3 7.9 7 9.8 4-1.9 7-5.4 7-9.8V6z"/><path d="m9 12 2.2 2.2L15.2 10"/>',
    image: '<rect x="3" y="5" width="18" height="14" rx="2.2"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    cap: '<path d="m2.5 9.5 9.5-5 9.5 5-9.5 5z"/><path d="M6.5 11.6V16c1.6 1.6 3.4 2.4 5.5 2.4s3.9-.8 5.5-2.4v-4.4M21.5 9.5v5"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    heart: { fill: true, d: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>' },
    sparkle: { fill: true, d: '<path d="M12 3c.6 4.2 1.8 5.4 6 6-4.2.6-5.4 1.8-6 6-.6-4.2-1.8-5.4-6-6 4.2-.6 5.4-1.8 6-6z"/><circle cx="18.5" cy="18" r="1.5"/>' }
  };
  function icon(name, cls) {
    var def = ICONS[name] || ICONS.sparkle;
    var filled = typeof def === 'object';
    var body = filled ? def.d : def;
    return '<svg class="ic ' + (cls || '') + (filled ? ' ic-fill' : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + body + '</svg>';
  }
  function iconInSvg(name, x, y, size) {
    var def = ICONS[name] || ICONS.sparkle;
    var filled = typeof def === 'object';
    return '<svg x="' + x + '" y="' + y + '" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" class="ic' + (filled ? ' ic-fill' : '') + '" aria-hidden="true">' + (filled ? def.d : def) + '</svg>';
  }

  var STATUS = {
    'implemented':    'Implemented',
    'tested':         'Tested',
    'in-development': 'In development',
    'planned':        'Planned',
    'to-confirm':     'To confirm'
  };
  function statusChip(s) {
    return '<span class="status st-' + esc(s) + '">' + esc(STATUS[s] || s) + '</span>';
  }

  var showHints = !(D.settings && D.settings.showPlaceholderHints === false);
  if (!showHints) document.documentElement.classList.add('hide-ph');

  function placeholderImg(label) {
    return '<div class="ph-img">' + icon('image') + '<span class="hand">' + esc(label || 'photo coming soon') + '</span></div>';
  }

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  /* =================================================================
     PROFILE + HERO
     ================================================================= */
  function renderProfile() {
    var p = D.profile;
    $$('[data-bind]').forEach(function (el) {
      var k = el.getAttribute('data-bind');
      if (p[k] != null) el.textContent = p[k];
    });
    $('#open-to').innerHTML = p.openTo ? '<span class="pulse-dot" aria-hidden="true"></span>' + esc(p.openTo) : '';
    $('#year').textContent = new Date().getFullYear();

    var photo = $('#about-photo');
    if (p.photo) {
      photo.innerHTML = '<img src="' + esc(p.photo) + '" alt="Portrait of ' + esc(p.fullName) + '" loading="lazy">';
    } else {
      photo.innerHTML = '<div class="initials"><span>' + esc(p.initials) + '</span>' +
        icon('heart', 'i-h1') + icon('sparkle', 'i-s1') + icon('sparkle', 'i-s2') + '</div>';
    }
    $('#about-caption').textContent = p.photoCaption || '';
  }

  function initMascot() {
    var btn = $('#mascot'), bubble = $('#mascot-bubble');
    var lines = D.greetings && D.greetings.length ? D.greetings : ['Hi!'];
    var i = 0;
    bubble.textContent = lines[0];
    btn.addEventListener('click', function () {
      i = (i + 1) % lines.length;
      bubble.textContent = lines[i];
      bubble.classList.remove('bump'); void bubble.offsetWidth; bubble.classList.add('bump');
      btn.classList.remove('happy'); void btn.offsetWidth; btn.classList.add('happy');
    });
    btn.addEventListener('animationend', function (e) {
      if (e.target === btn) btn.classList.remove('happy');
    });

    // Eyes follow the pointer a little.
    var eyes = $('.m-eyes', btn);
    var hero = $('.hero');
    if (!reduceMotion && eyes && window.matchMedia('(pointer: fine)').matches) {
      hero.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        var dy = (e.clientY - (r.top + r.height * 0.35)) / r.height;
        dx = Math.max(-1, Math.min(1, dx)); dy = Math.max(-1, Math.min(1, dy));
        eyes.style.transform = 'translate(' + (dx * 5).toFixed(1) + 'px,' + (dy * 4).toFixed(1) + 'px)';
      });
      hero.addEventListener('pointerleave', function () { eyes.style.transform = ''; });
    }
  }

  /* =================================================================
     ABOUT
     ================================================================= */
  function renderAbout() {
    $('#about-text').innerHTML = (D.about || []).map(function (t) { return '<p>' + rich(t) + '</p>'; }).join('');
    $('#about-facts').innerHTML = (D.facts || []).map(function (f, i) {
      return '<li class="fact f' + (i % 4) + '"><span class="fact-label">' + esc(f.label) + '</span><span class="fact-value">' + rich(f.value) + '</span></li>';
    }).join('');
  }

  /* =================================================================
     THESIS
     ================================================================= */
  function renderThesisHead() {
    var t = D.thesis;
    $('[data-bind-thesis="title"]').textContent = t.title;
    $('[data-bind-thesis="lede"]').innerHTML = rich(t.lede);
    $('#thesis-meta').innerHTML = t.meta.map(function (m) { return '<li>' + rich(m) + '</li>'; }).join('');
  }

  function renderChapterNav() {
    var list = $('#chapter-list');
    list.innerHTML = $$('.chapter').map(function (ch, i) {
      var title = $('h3', ch).textContent;
      return '<li><a href="#' + ch.id + '" data-ch="' + ch.id + '"><span class="ch-i">' + (i + 1) + '</span><span>' + esc(title) + '</span></a></li>';
    }).join('');
  }

  function renderProblemSolution() {
    var t = D.thesis;
    $('#problem-text').innerHTML = t.problem.text.map(function (p) { return '<p>' + rich(p) + '</p>'; }).join('');
    $('#problem-notes').innerHTML = t.problem.notes.map(function (n, i) {
      return '<li class="sticky n' + (i % 4) + '"><span class="pin" aria-hidden="true"></span>' + rich(n) + '</li>';
    }).join('');
    $('#solution-text').innerHTML = t.solution.map(function (p) { return '<p>' + rich(p) + '</p>'; }).join('');
    $$('[data-icon]').forEach(function (el) { el.innerHTML = icon(el.getAttribute('data-icon')); });
  }

  /* ---------- How it works (interactive flow) ---------- */
  var flowState = { mode: 'billsToCoins', step: 0, timer: null };

  function kioskScreen(step, mode) {
    if (step.img) return '<img class="ks-img" src="' + esc(step.img) + '" alt="">';
    var html = '';
    switch (step.screen) {
      case 'choose':
        html = '<p class="ks-sub">How can I help?</p><div class="ks-choices">' +
          '<span class="ks-btn' + (mode === 'billsToCoins' ? ' on' : '') + '">Bills → Coins</span>' +
          '<span class="ks-btn' + (mode === 'coinsToBills' ? ' on' : '') + '">Coins → Bills</span></div>';
        break;
      case 'insert':
        html = '<div class="ks-icon ks-slide">' + icon(step.item === 'coins' ? 'coins' : 'bill') + '</div>' +
          '<p class="ks-sub">Insert your ' + (step.item === 'coins' ? 'coins' : 'bill') + '</p><div class="ks-slot"></div>';
        break;
      case 'scan':
        html = '<div class="ks-scan">' + icon('bill') + '<span class="ks-sweep"></span></div>' +
          '<p class="ks-sub">Recognizing…</p><p class="ks-big">₱100</p><p class="ks-ex">example</p>';
        break;
      case 'count':
        html = '<p class="ks-sub">Total inserted</p><p class="ks-big" id="ks-count">₱0</p>' +
          '<div class="ks-coinrow" id="ks-coinrow"></div><p class="ks-ex">example</p>';
        break;
      case 'confirm':
        html = '<p class="ks-sub">Exchange</p><p class="ks-big">₱100</p><p class="ks-sub">for ' +
          (step.direction === 'bill' ? 'one ₱100 bill' : 'coins') + '?</p>' +
          '<div class="ks-choices"><span class="ks-btn on">Confirm</span><span class="ks-btn">Cancel</span></div>';
        break;
      case 'dispense':
        html = '<div class="ks-drop">' + (step.item === 'coins'
            ? icon('coin', 'd1') + icon('coin', 'd2') + icon('coin', 'd3')
            : icon('bill', 'd1')) + '</div>' +
          '<p class="ks-sub">Please collect your ' + (step.item === 'coins' ? 'coins' : 'bill') + '</p>';
        break;
      case 'receipt':
        html = '<div class="ks-icon">' + icon('phone') + '</div><p class="ks-big ks-ok">Receipt sent ✓</p><p class="ks-sub">Thank you!</p>';
        break;
      default:
        html = '<p class="ks-sub">' + esc(step.title) + '</p>';
    }
    return html;
  }

  function runCounter() {
    var el = $('#ks-count'), row = $('#ks-coinrow');
    if (!el) return;
    var adds = [20, 20, 20, 20, 10, 5, 5], total = 0, i = 0;
    function tick() {
      total += adds[i];
      el.textContent = '₱' + total;
      row.insertAdjacentHTML('beforeend', '<span class="mini-coin">' + adds[i] + '</span>');
      i++;
      if (i >= adds.length) { clearInterval(flowState.timer); flowState.timer = null; }
    }
    if (reduceMotion) { while (i < adds.length) tick(); return; }
    flowState.timer = setInterval(tick, 380);
  }

  function renderFlow() {
    var flow = D.thesis.flows[flowState.mode];
    var steps = $('#flow-steps');
    steps.innerHTML = flow.map(function (s, i) {
      return '<li><button type="button" class="step-btn" data-step="' + i + '"' + (i === flowState.step ? ' aria-current="step"' : '') + '>' +
        '<span class="step-n">' + (i + 1) + '</span><span class="step-t">' + esc(s.title) + '</span></button></li>';
    }).join('');
    showStep(flowState.step, false);
  }

  function showStep(i, focus) {
    var flow = D.thesis.flows[flowState.mode];
    i = Math.max(0, Math.min(flow.length - 1, i));
    flowState.step = i;
    if (flowState.timer) { clearInterval(flowState.timer); flowState.timer = null; }
    var s = flow[i];
    $$('.step-btn').forEach(function (b, j) {
      if (j === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      b.classList.toggle('done', j < i);
    });
    var screen = $('#kiosk-screen');
    screen.innerHTML = '<div class="ks-inner">' + kioskScreen(s, flowState.mode) + '</div>';
    $('#flow-count').textContent = 'Step ' + (i + 1) + ' of ' + flow.length;
    $('#flow-title').textContent = s.title;
    $('#flow-desc').innerHTML = rich(s.desc);
    $('#flow-tech').innerHTML = icon('chip') + '<span>' + rich(s.tech) + '</span>';
    $('#flow-prev').disabled = i === 0;
    var next = $('#flow-next');
    next.textContent = i === flow.length - 1 ? 'Start over ↺' : 'Next step →';
    if (s.screen === 'count') runCounter();
    if (focus) { var b = $('.step-btn[data-step="' + i + '"]'); if (b) b.focus(); }
  }

  function initFlow() {
    $('#flow-note').innerHTML = rich(D.thesis.flows.note);
    var tabs = $$('.mode-tab');
    function selectTab(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      $('#flow-panel').setAttribute('aria-labelledby', tab.id);
      flowState.mode = tab.getAttribute('data-mode');
      flowState.step = 0;
      renderFlow();
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, idx) {
      t.addEventListener('click', function () { selectTab(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var n = (idx + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
          selectTab(tabs[n], true);
        }
      });
    });
    $('#flow-steps').addEventListener('click', function (e) {
      var b = e.target.closest('.step-btn');
      if (b) showStep(+b.getAttribute('data-step'));
    });
    $('#flow-prev').addEventListener('click', function () { showStep(flowState.step - 1); });
    $('#flow-next').addEventListener('click', function () {
      var len = D.thesis.flows[flowState.mode].length;
      showStep(flowState.step >= len - 1 ? 0 : flowState.step + 1);
    });
    renderFlow();
  }

  /* ---------- Hardware system map ---------- */
  function renderHardware() {
    var nodes = D.thesis.hardware;
    var W = 200, H = 70;
    var colX = { in: 30, mid: 350, out: 670 };
    var byId = {};
    nodes.forEach(function (n) { n._x = colX[n.col] != null ? colX[n.col] : n.x; n._y = n.y; byId[n.id] = n; });
    var maxY = Math.max.apply(null, nodes.map(function (n) { return n._y; })) + H + 20;

    var wires = D.thesis.wires.map(function (w) {
      var a = byId[w[0]], b = byId[w[1]];
      if (!a || !b) return '';
      var d, cls = 'wire', label = '';
      if (a.col === b.col) {
        var top = a._y < b._y ? a : b, bot = a._y < b._y ? b : a;
        var x = top._x + W / 2;
        d = 'M' + x + ' ' + (top._y + H) + ' V' + bot._y;
        cls += ' wire-bi';
        if (w[2]) label = '<text class="wire-label" x="' + (x + 10) + '" y="' + ((top._y + H + bot._y) / 2 + 4) + '">' + esc(w[2]) + '</text>';
      } else {
        var left = a._x < b._x ? a : b, right = a._x < b._x ? b : a;
        var sx = left._x + W, sy = left._y + H / 2, ex = right._x, ey = right._y + H / 2;
        d = 'M' + sx + ' ' + sy + ' C' + (sx + 60) + ' ' + sy + ',' + (ex - 60) + ' ' + ey + ',' + ex + ' ' + ey;
        if (left !== a) cls += ' wire-rev';
      }
      return '<path class="' + cls + '" data-a="' + a.id + '" data-b="' + b.id + '" d="' + d + '"/>' + label;
    }).join('');

    var nodeSvg = nodes.map(function (n) {
      var cls = 'hw-node' + (n.main ? ' main' : '') + (n.confirm ? ' confirm' : '');
      return '<g class="' + cls + '" data-id="' + n.id + '" tabindex="0" role="button" aria-label="' + esc(n.title + ', ' + n.sub) + '" transform="translate(' + n._x + ' ' + n._y + ')">' +
        '<rect class="hw-box" width="' + W + '" height="' + H + '" rx="18"/>' +
        '<circle class="hw-ic-bg" cx="34" cy="35" r="20"/>' +
        iconInSvg(n.icon, 22, 23, 24) +
        '<text class="hw-title" x="64" y="32">' + esc(n.title) + '</text>' +
        '<text class="hw-sub" x="64" y="51">' + esc(n.sub) + '</text>' +
        '</g>';
    }).join('');

    var cols = '<text class="hw-col" x="130" y="12">inputs</text><text class="hw-col" x="450" y="12">controllers</text><text class="hw-col" x="770" y="12">outputs</text>';

    $('#hw-diagram').innerHTML =
      '<svg class="hw-svg" viewBox="0 -8 900 ' + (maxY + 8) + '" role="group" aria-label="System map of the currency exchanger">' + cols + '<g class="wires">' + wires + '</g>' + nodeSvg + '</svg>';

    function select(id) {
      var n = byId[id]; if (!n) return;
      $$('.hw-node').forEach(function (g) {
        var on = g.getAttribute('data-id') === id;
        g.classList.toggle('active', on);
        g.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      $$('.wire').forEach(function (p) {
        p.classList.toggle('lit', p.getAttribute('data-a') === id || p.getAttribute('data-b') === id);
      });
      $('#hw-detail').innerHTML =
        '<div class="hw-d-icon">' + icon(n.icon) + '</div>' +
        '<div class="hw-d-body"><div class="hw-d-head"><h4>' + esc(n.title) + '</h4>' + statusChip(n.status) + '</div>' +
        '<p>' + rich(n.desc) + '</p>' +
        (n.link ? '<a class="text-link" href="' + esc(n.link) + '">See the design log ' + icon('arrow') + '</a>' : '') +
        '</div>';
    }
    $('#hw-diagram').addEventListener('click', function (e) {
      var g = e.target.closest('.hw-node'); if (g) select(g.getAttribute('data-id'));
    });
    $('#hw-diagram').addEventListener('keydown', function (e) {
      var g = e.target.closest('.hw-node');
      if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); select(g.getAttribute('data-id')); }
    });
    select('pi');
  }

  /* ---------- Software ---------- */
  function renderSoftware() {
    var s = D.thesis.software;
    $('#software-text').innerHTML = s.text.map(function (p) { return '<p>' + rich(p) + '</p>'; }).join('');
    $('#software-stack').innerHTML = s.stack.map(function (l) {
      return '<li class="stack-layer"><div class="stack-name">' + esc(l.layer) + '</div><div class="stack-tech">' + esc(l.tech) + '</div><p>' + rich(l.desc) + '</p></li>';
    }).join('');
  }

  /* ---------- Features + denominations ---------- */
  function renderFeatures() {
    var t = D.thesis, feats = t.features;
    $('#feature-grid').innerHTML = feats.map(function (f) {
      return '<li class="feature" data-status="' + esc(f.status) + '"><div class="feature-top">' + statusChip(f.status) + '</div>' +
        '<h4>' + esc(f.title) + '</h4><p>' + rich(f.desc) + '</p></li>';
    }).join('');

    var counts = {};
    feats.forEach(function (f) { counts[f.status] = (counts[f.status] || 0) + 1; });
    var chips = ['<button type="button" class="chip" aria-pressed="true" data-filter="all">All <span class="count">' + feats.length + '</span></button>'];
    Object.keys(STATUS).forEach(function (s) {
      if (counts[s]) chips.push('<button type="button" class="chip chip-' + s + '" aria-pressed="false" data-filter="' + s + '">' + STATUS[s] + ' <span class="count">' + counts[s] + '</span></button>');
    });
    var filter = $('#feature-filter');
    filter.innerHTML = chips.join('') + (t.featureNote ? '<p class="fine-print filter-note">' + rich(t.featureNote) + '</p>' : '');
    filter.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      var f = b.getAttribute('data-filter');
      $$('.chip', filter).forEach(function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
      $$('#feature-grid .feature').forEach(function (li) {
        li.hidden = !(f === 'all' || li.getAttribute('data-status') === f);
      });
    });

    var dn = t.denominations;
    function chip(d, kind) {
      var cls = d.supported === true ? 'yes' : d.supported === false ? 'no' : 'unknown';
      var lbl = d.supported === true ? 'supported' : d.supported === false ? 'not supported' : 'support to be confirmed';
      return '<li class="denom ' + kind + ' ' + cls + '" title="' + lbl + '"><span class="peso">₱</span>' + d.value.toLocaleString('en-PH') +
        '<span class="sr-only"> (' + lbl + ')</span></li>';
    }
    $('#denoms').innerHTML =
      '<h4>Philippine denominations</h4>' +
      '<div class="denom-row"><span class="denom-label">Bills</span><ul>' + dn.bills.map(function (d) { return chip(d, 'b'); }).join('') + '</ul></div>' +
      '<div class="denom-row"><span class="denom-label">Coins</span><ul>' + dn.coins.map(function (d) { return chip(d, 'c'); }).join('') + '</ul></div>' +
      (dn.note ? '<p class="fine-print">' + rich(dn.note) + '</p>' : '');
  }

  /* ---------- Process: side view, design log, gear spec ---------- */
  function sideViewSvg() {
    // Scale: 4 px per mm. Feed roller pair at x=150, bill plane at y=140.
    return '' +
      '<svg class="sv playing" id="sv-svg" viewBox="0 0 640 320" role="img" aria-labelledby="sv-title sv-desc">' +
      '<title id="sv-title">Side view of one bill dispenser module</title>' +
      '<desc id="sv-desc">A bill is pulled from the bottom of the stack by a kicker roller, passes through a pinch pair of feed rollers, and leaves through the exit past an IR sensor. Three spur gears behind the side plate link the kicker and the driven feed roller, 60 mm apart.</desc>' +
      // gears (behind)
      '<g class="sv-gears">' +
        '<circle class="sv-gear" cx="150" cy="184" r="60"/>' +
        '<circle class="sv-gear" cx="270" cy="190" r="60"/>' +
        '<circle class="sv-gear" cx="390" cy="196" r="60"/>' +
        '<g class="sv-spin cw"><circle class="sv-gear-hub" cx="270" cy="190" r="8"/><path class="sv-mark" d="M270 190 L270 136"/></g>' +
      '</g>' +
      // guide plate
      '<path class="sv-plate" d="M214 141 H338 M442 141 H612"/>' +
      // stack
      '<g class="sv-stack">' +
        '<rect x="330" y="104" width="264" height="4.5" rx="1.5"/>' +
        '<rect x="330" y="110" width="264" height="4.5" rx="1.5"/>' +
        '<rect x="330" y="116" width="264" height="4.5" rx="1.5"/>' +
        '<rect x="330" y="122" width="264" height="4.5" rx="1.5"/>' +
        '<rect x="330" y="128" width="264" height="4.5" rx="1.5"/>' +
      '</g>' +
      '<rect class="sv-bill-move" x="330" y="134.5" width="264" height="4.5" rx="1.5"/>' +
      // feed rollers
      '<g class="sv-spin cw"><circle class="sv-roller" cx="150" cy="98" r="44"/><path class="sv-mark" d="M150 98 L150 58"/><circle class="sv-hub" cx="150" cy="98" r="6"/></g>' +
      '<g class="sv-spin ccw"><circle class="sv-roller driven" cx="150" cy="184" r="44"/><path class="sv-mark" d="M150 184 L150 144"/><circle class="sv-hub" cx="150" cy="184" r="6"/></g>' +
      // kicker with rubber on one face
      '<g class="sv-spin ccw slow"><circle class="sv-roller kicker" cx="390" cy="196" r="56"/><path class="sv-rubber" d="M346 162 A56 56 0 0 1 434 162"/><circle class="sv-hub" cx="390" cy="196" r="7"/></g>' +
      // separation pad
      '<rect class="sv-pad" x="92" y="127" width="20" height="10" rx="2.5"/>' +
      // IR sensor
      '<rect class="sv-ir" x="62" y="102" width="14" height="14" rx="3"/>' +
      '<rect class="sv-ir" x="62" y="164" width="14" height="14" rx="3"/>' +
      '<path class="sv-beam" d="M69 116 V164"/>' +
      // exit arrow
      '<path class="sv-exit" d="M52 152 H18 M28 145 L18 152 L28 159"/>' +
      // labels
      '<text class="sv-label" x="462" y="94" text-anchor="middle">bill stack</text>' +
      '<text class="sv-label" x="560" y="158" text-anchor="middle">guide plate</text>' +
      '<text class="sv-label" x="69" y="92" text-anchor="middle">IR beam</text>' +
      '<text class="sv-label" x="102" y="206" text-anchor="end">pad</text>' +
      '<path class="sv-leader" d="M104 200 L102 138"/>' +
      '<text class="sv-label" x="34" y="176" text-anchor="middle">exit</text>' +
      '<text class="sv-label strong" x="150" y="272" text-anchor="middle">feed rollers</text>' +
      '<text class="sv-label" x="150" y="286" text-anchor="middle">Ø22, 21.5 apart</text>' +
      '<text class="sv-label strong" x="270" y="272" text-anchor="middle">idler gear</text>' +
      '<text class="sv-label" x="270" y="286" text-anchor="middle">Ø30 pitch</text>' +
      '<text class="sv-label strong" x="390" y="272" text-anchor="middle">kicker roller</text>' +
      '<text class="sv-label" x="390" y="286" text-anchor="middle">Ø28, rubber on one face</text>' +
      '<text class="sv-label" x="560" y="214" text-anchor="middle">gearmotor drives</text>' +
      '<text class="sv-label" x="560" y="228" text-anchor="middle">the kicker gear</text>' +
      '<path class="sv-leader" d="M500 218 H452"/>' +
      // dimension
      '<path class="sv-dim" d="M150 300 H390 M150 294 V306 M390 294 V306"/>' +
      '<text class="sv-label dim" x="270" y="316" text-anchor="middle">60 mm shaft to shaft</text>' +
      '</svg>';
  }

  function renderProcess() {
    var p = D.thesis.process;
    $('#process-text').innerHTML = p.text.map(function (t) { return '<p>' + rich(t) + '</p>'; }).join('');
    $('#side-view').innerHTML = sideViewSvg();
    $('#sv-caption').innerHTML = rich(p.sideViewCaption);

    var svg = $('#sv-svg'), btn = $('#sv-toggle');
    function setPlaying(on) {
      svg.classList.toggle('playing', on);
      btn.textContent = on ? 'Pause animation' : 'Play animation';
      btn.setAttribute('aria-pressed', on ? 'false' : 'true');
    }
    setPlaying(!reduceMotion);
    btn.addEventListener('click', function () { setPlaying(!svg.classList.contains('playing')); });

    $('#design-log').innerHTML = p.log.map(function (e) {
      return '<li class="log-entry"><div class="log-head"><span class="log-tag">' + esc(e.tag) + '</span><h4>' + esc(e.title) + '</h4></div>' +
        '<div class="log-cols"><div><p class="log-k">Problem</p><p>' + rich(e.problem) + '</p></div>' +
        '<div><p class="log-k">What we did</p><p>' + rich(e.decision) + '</p></div></div></li>';
    }).join('');

    $('#gear-spec').innerHTML = p.gearSpec.map(function (r) {
      return '<div><dt>' + esc(r[0]) + '</dt><dd>' + rich(r[1]) + '</dd></div>';
    }).join('');

    $('#lessons').innerHTML = '<h4>Lessons learned</h4><ul>' + p.lessons.map(function (l) {
      return '<li' + (isPh(l) ? ' class="ph-block"' : '') + '>' + rich(l) + '</li>';
    }).join('') + '</ul>';
    if (p.lessons.every(isPh)) $('#lessons').classList.add('ph-block');
  }

  /* ---------- Results ---------- */
  function renderResults() {
    var r = D.thesis.results;
    $('#results-intro').innerHTML = rich(r.intro);
    $('#metric-grid').innerHTML = r.metrics.map(function (m) {
      var ph = isPh(m.value);
      return '<li class="metric' + (ph ? ' empty' : '') + '"><p class="metric-v">' + (ph ? '—' : esc(m.value)) + '</p>' +
        '<p class="metric-l">' + esc(m.label) + '</p><p class="metric-h">' + rich(m.how) + '</p></li>';
    }).join('');
    $('#test-table tbody').innerHTML = r.tests.map(function (row) {
      return '<tr>' + row.map(function (c, i) {
        var cell = isPh(c) && c.trim() === PH ? '<span class="ph">add</span>' : rich(c);
        return i === 0 ? '<th scope="row">' + cell + '</th>' : '<td>' + cell + '</td>';
      }).join('') + '</tr>';
    }).join('');
    var fb = $('#feedback');
    fb.innerHTML = '<p>' + rich(r.feedback.quote) + '</p><footer>' + rich(r.feedback.who) + '</footer>';
    if (isPh(r.feedback.quote)) fb.classList.add('ph-block');
    if (r.tests.every(function (row) { return row.every(isPh); })) $('.table-scroll').classList.add('ph-block');
  }

  /* ---------- Gallery + lightbox ---------- */
  var lbState = { items: [], i: 0 };
  function renderGallery() {
    var items = D.thesis.gallery;
    $('#gallery').innerHTML = items.map(function (g, i) {
      var img = g.src ? '<img src="' + esc(g.src) + '" alt="' + esc(g.alt || g.caption) + '" loading="lazy">' : placeholderImg();
      return '<li><button type="button" class="g-item r' + (i % 3) + '" data-i="' + i + '" aria-label="Open photo: ' + esc(g.caption) + '">' +
        '<span class="tape" aria-hidden="true"></span><span class="g-frame">' + img + '</span>' +
        '<span class="g-cap hand">' + esc(g.caption) + '</span></button></li>';
    }).join('');
    $('#gallery').addEventListener('click', function (e) {
      var b = e.target.closest('.g-item'); if (b) openLightbox(items, +b.getAttribute('data-i'));
    });
  }
  function openLightbox(items, i) {
    lbState.items = items; lbState.i = i;
    drawLightbox();
    openDialog($('#lightbox'));
  }
  function drawLightbox() {
    var g = lbState.items[lbState.i];
    $('#lb-img').innerHTML = g.src ? '<img src="' + esc(g.src) + '" alt="' + esc(g.alt || g.caption) + '">' : placeholderImg('photo coming soon: ' + g.caption);
    $('#lb-caption').textContent = g.caption;
    $('#lb-count').textContent = (lbState.i + 1) + ' / ' + lbState.items.length;
  }
  function stepLightbox(d) {
    var n = lbState.items.length;
    lbState.i = (lbState.i + d + n) % n;
    drawLightbox();
  }

  /* ---------- Contributions ---------- */
  function renderContrib() {
    var c = D.thesis.contributions;
    var team = (c.team || []).map(function (m) {
      var ph = isPh(m.name);
      return '<li' + (ph ? ' class="ph-block"' : '') + '>' + icon('heart') + '<span>' + rich(m.name) + ' <span class="muted">· ' + rich(m.role) + '</span></span></li>';
    }).join('');
    $('#contrib').innerHTML =
      '<div class="contrib-role"><span class="role-badge">' + icon('sparkle') + esc(c.role) + '</span><p>' + rich(c.summary) + '</p></div>' +
      '<ul class="contrib-list">' + c.items.map(function (it) { return '<li>' + icon('check') + '<span>' + rich(it) + '</span></li>'; }).join('') + '</ul>' +
      '<div class="team"><h4>The team</h4><ul>' +
        '<li>' + icon('heart') + '<span>' + esc(D.profile.fullName) + ' <span class="muted">· ' + esc(c.role) + '</span></span></li>' + team +
        (c.adviser ? '<li' + (isPh(c.adviser) ? ' class="ph-block"' : '') + '>' + icon('cap') + '<span>' + rich(c.adviser) + '</span></li>' : '') +
      '</ul></div>';
  }

  /* =================================================================
     PROJECTS
     ================================================================= */
  var CAT = { hardware: 'Hardware', cad: 'CAD & Design', embedded: 'Embedded', software: 'Software', networking: 'Networking' };

  function renderProjects() {
    var projects = D.projects.filter(function (p) { return !(p.placeholder && !showHints); });
    var grid = $('#project-grid');
    grid.innerHTML = projects.map(function (p, i) {
      if (p.placeholder) {
        return '<li class="project placeholder ph-block" data-cats="">' +
          '<div class="project-art">' + icon(p.icon || 'sparkle') + '</div>' +
          '<div class="project-body"><h3>' + rich(p.title) + '</h3><p>' + rich(p.summary) + '</p></div></li>';
      }
      var art = p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">' : '<div class="art-pattern">' + icon(p.icon || 'sparkle') + '</div>';
      var tech = p.tech.slice(0, 3).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') +
        (p.tech.length > 3 ? '<li class="more">+' + (p.tech.length - 3) + '</li>' : '');
      return '<li class="project" data-cats="' + esc(p.categories.join(' ')) + '">' +
        '<div class="project-art">' + art + '</div>' +
        '<div class="project-body">' +
          '<p class="project-when">' + esc(p.when) + ' · ' + p.categories.map(function (c) { return esc(CAT[c] || c); }).join(', ') + '</p>' +
          '<h3>' + esc(p.title) + '</h3><p>' + rich(p.summary) + '</p>' +
          '<ul class="tech-chips">' + tech + '</ul>' +
          '<button type="button" class="btn btn-soft btn-sm project-open" data-i="' + D.projects.indexOf(p) + '">View details</button>' +
        '</div></li>';
    }).join('');

    // Filter chips only for categories that actually have projects.
    var used = {};
    projects.forEach(function (p) { (p.categories || []).forEach(function (c) { used[c] = (used[c] || 0) + 1; }); });
    var cats = Object.keys(CAT).filter(function (c) { return used[c]; });
    var filter = $('#project-filter');
    filter.innerHTML = '<button type="button" class="chip" aria-pressed="true" data-filter="all">All</button>' +
      cats.map(function (c) { return '<button type="button" class="chip" aria-pressed="false" data-filter="' + c + '">' + CAT[c] + ' <span class="count">' + used[c] + '</span></button>'; }).join('');
    filter.hidden = cats.length < 2;
    filter.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      var f = b.getAttribute('data-filter');
      $$('.chip', filter).forEach(function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
      $$('.project', grid).forEach(function (li) {
        var cs = (li.getAttribute('data-cats') || '').split(' ');
        li.hidden = !(f === 'all' || cs.indexOf(f) !== -1);
      });
    });

    grid.addEventListener('click', function (e) {
      var b = e.target.closest('.project-open'); if (b) openProject(D.projects[+b.getAttribute('data-i')], b);
    });
  }

  function listBlock(title, arr) {
    if (!arr || !arr.length) return '';
    var allPh = arr.every(isPh);
    return '<div class="pm-block' + (allPh ? ' ph-block' : '') + '"><h4>' + esc(title) + '</h4><ul>' + arr.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join('') + '</ul></div>';
  }

  function openProject(p) {
    var art = p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '">' : '<div class="art-pattern big">' + icon(p.icon || 'sparkle') + '</div>';
    var links = (p.links || []).filter(function (l) { return l.url; }).map(function (l) {
      var external = /^https?:/.test(l.url);
      return '<a class="btn btn-soft btn-sm" href="' + esc(l.url) + '"' + (external ? ' target="_blank" rel="noopener"' : ' data-internal') + '>' + esc(l.label) + (external ? ' ↗' : ' →') + '</a>';
    }).join('');
    $('#pm-body').innerHTML =
      '<div class="pm-art">' + art + '</div>' +
      '<p class="project-when">' + esc(p.when) + ' · ' + p.categories.map(function (c) { return esc(CAT[c] || c); }).join(', ') + '</p>' +
      '<h3 id="pm-title">' + esc(p.title) + '</h3>' +
      '<p class="pm-summary">' + rich(p.summary) + '</p>' +
      (p.details ? '<p>' + rich(p.details) + '</p>' : '') +
      (p.tech.length ? '<ul class="tech-chips">' + p.tech.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') +
      '<div class="pm-cols">' + listBlock('My contributions', p.contributions) + listBlock('What I learned', p.lessons) + '</div>' +
      (links ? '<div class="pm-links">' + links + '</div>' : '');
    openDialog($('#project-modal'));
  }

  /* =================================================================
     SKILLS + CERTS
     ================================================================= */
  function renderSkills() {
    var cats = D.skills;
    var tabs = $('#skill-tabs');
    tabs.innerHTML = cats.map(function (c, i) {
      return '<button type="button" role="tab" class="skill-tab" id="sk-tab-' + i + '" aria-controls="skill-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-i="' + i + '">' +
        icon(c.icon) + '<span>' + esc(c.category) + '</span><span class="count">' + c.items.length + '</span></button>';
    }).join('');

    function showCat(i, focus) {
      $$('.skill-tab', tabs).forEach(function (t, j) {
        t.setAttribute('aria-selected', j === i ? 'true' : 'false');
        t.tabIndex = j === i ? 0 : -1;
        if (j === i && focus) t.focus();
      });
      $('#skill-panel').setAttribute('aria-labelledby', 'sk-tab-' + i);
      var c = cats[i];
      $('#skill-pills').innerHTML = c.items.map(function (s, j) {
        return '<li><button type="button" class="skill-pill" aria-pressed="' + (j === 0) + '" data-j="' + j + '">' + esc(s.name) + '</button></li>';
      }).join('');
      showUsed(c, 0);
    }
    function showUsed(c, j) {
      var s = c.items[j];
      $$('.skill-pill').forEach(function (b, k) { b.setAttribute('aria-pressed', k === j ? 'true' : 'false'); });
      $('#skill-used').innerHTML = '<p class="used-k hand">where I used it</p><p class="used-name">' + esc(s.name) + '</p><p>' + rich(s.used) + '</p>';
    }
    var current = 0;
    tabs.addEventListener('click', function (e) {
      var t = e.target.closest('.skill-tab'); if (!t) return;
      current = +t.getAttribute('data-i'); showCat(current);
    });
    tabs.addEventListener('keydown', function (e) {
      var keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      current = (current + keys[e.key] + cats.length) % cats.length;
      showCat(current, true);
    });
    $('#skill-pills').addEventListener('click', function (e) {
      var b = e.target.closest('.skill-pill'); if (b) showUsed(cats[current], +b.getAttribute('data-j'));
    });
    showCat(0);

    $('#cert-grid').innerHTML = D.certifications.map(function (c) {
      return '<li class="cert"><span class="cert-seal">' + icon('sparkle') + '</span><div><p class="cert-name">' + esc(c.name) + '</p>' +
        '<p class="cert-issuer">' + esc(c.issuer) + '</p><p class="cert-date">' + rich(c.date) + '</p>' +
        (c.url ? '<a class="text-link" href="' + esc(c.url) + '" target="_blank" rel="noopener">Verify ↗</a>' : '') + '</div></li>';
    }).join('');
  }

  /* =================================================================
     JOURNEY
     ================================================================= */
  function renderJourney() {
    var e = D.education;
    $('#edu-card').innerHTML =
      '<div class="edu-top">' + icon('cap') + '<div><p class="edu-school">' + esc(e.school) + '</p><p class="edu-program">' + esc(e.program) + '</p>' +
      '<p class="edu-meta">' + esc(e.years) + ' · ' + esc(e.location) + '</p></div></div>' +
      '<p class="edu-k">Relevant coursework</p><ul class="course-chips">' + e.coursework.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>';

    var KIND = { school: 'cap', thesis: 'gear', cert: 'sparkle', goal: 'flag' };
    $('#timeline').innerHTML = D.journey.map(function (j) {
      return '<li class="tl-item k-' + esc(j.kind) + '"><span class="tl-dot">' + icon(KIND[j.kind] || 'heart') + '</span>' +
        '<div class="tl-card"><p class="tl-date">' + rich(j.date) + '</p><h3>' + esc(j.title) + '</h3><p>' + rich(j.text) + '</p></div></li>';
    }).join('');
  }

  /* =================================================================
     CONTACT
     ================================================================= */
  function renderContact() {
    var c = D.contact;
    $('#contact-text').innerHTML = rich(c.intro);
    $('#email-text').innerHTML = icon('mail') + '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>';
    $('#link-list').innerHTML = c.links.map(function (l) {
      if (l.url) {
        var external = /^https?:/.test(l.url);
        return '<li><a class="link-card" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + icon(l.icon) + '<span>' + esc(l.label) + '</span>' + (external ? '<span aria-hidden="true">↗</span>' : '') + '</a></li>';
      }
      return '<li class="ph-block"><span class="link-card soon">' + icon(l.icon) + '<span>' + esc(l.label) + '</span><span class="ph">link coming soon</span></span></li>';
    }).join('');

    $('#copy-email').addEventListener('click', function () {
      var email = c.email;
      function fallback() {
        var a = $('#email-text a');
        var range = document.createRange(); range.selectNodeContents(a);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
        toast('Email selected. Press Ctrl+C (or ⌘C) to copy.');
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(function () { toast('Email copied ♡'); }, fallback);
        } else { fallback(); }
      } catch (err) { fallback(); }
    });

    $('#note-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#note-name').value.trim(), msg = $('#note-msg').value.trim();
      var status = $('#form-status');
      $('#note-name').setAttribute('aria-invalid', name ? 'false' : 'true');
      $('#note-msg').setAttribute('aria-invalid', msg ? 'false' : 'true');
      if (!name || !msg) {
        status.className = 'form-status err';
        status.textContent = 'Please add your name and a message first.';
        (name ? $('#note-msg') : $('#note-name')).focus();
        return;
      }
      var subject = 'Hello from your portfolio (' + name + ')';
      var href = 'mailto:' + c.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(msg + '\n\n— ' + name);
      status.className = 'form-status ok';
      status.textContent = 'Opening your email app… If nothing opens, copy my email above and send it from your inbox.';
      window.location.href = href;
    });
  }

  /* =================================================================
     DIALOGS
     ================================================================= */
  var lastFocus = null;
  function openDialog(d) {
    lastFocus = document.activeElement;
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    document.documentElement.classList.add('modal-open');
    var close = $('[data-close]', d); if (close) close.focus();
  }
  function closeDialog(d) {
    if (typeof d.close === 'function') d.close(); else d.removeAttribute('open');
  }
  function initDialogs() {
    $$('dialog.modal').forEach(function (d) {
      d.addEventListener('click', function (e) {
        if (e.target === d) closeDialog(d);                 // click on backdrop
        if (e.target.closest('[data-close]')) closeDialog(d);
        var a = e.target.closest('a[data-internal]');
        if (a) closeDialog(d);                               // let the anchor scroll after closing
      });
      d.addEventListener('close', function () {
        document.documentElement.classList.remove('modal-open');
        if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
      });
    });
    $('#lb-prev').addEventListener('click', function () { stepLightbox(-1); });
    $('#lb-next').addEventListener('click', function () { stepLightbox(1); });
    $('#lightbox').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });
  }

  /* =================================================================
     NAV, THEME, SCROLL
     ================================================================= */
  function initNav() {
    var header = $('.site-header'), btn = $('#menu-toggle');
    function setOpen(open) {
      header.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    btn.addEventListener('click', function () { setOpen(!header.classList.contains('menu-open')); });
    $$('#nav-links a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('menu-open')) { setOpen(false); btn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (header.classList.contains('menu-open') && !header.contains(e.target)) setOpen(false);
    });

    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
      $('#to-top').classList.toggle('show', window.scrollY > 700);
    }, { passive: true });

    $('#to-top').addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      $('.brand').focus({ preventScroll: true });
    });

    if (!('IntersectionObserver' in window)) return;

    // Highlight the current section in the top nav.
    var links = {};
    $$('#nav-links a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) {
          var on = k === en.target.id;
          links[k].classList.toggle('active', on);
          if (on) links[k].setAttribute('aria-current', 'true'); else links[k].removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section').forEach(function (s) { spy.observe(s); });

    // Highlight the current thesis chapter.
    var chLinks = {};
    $$('#chapter-list a').forEach(function (a) { chLinks[a.getAttribute('data-ch')] = a; });
    var chSpy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(chLinks).forEach(function (k) {
          chLinks[k].classList.toggle('active', k === en.target.id);
        });
        var active = chLinks[en.target.id];
        // Keep the active chapter visible in the horizontal mobile chapter bar.
        var bar = $('.chapter-nav ol');
        if (active && bar && bar.scrollWidth > bar.clientWidth) {
          bar.scrollTo({ left: active.parentNode.offsetLeft - 16, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    $$('.chapter').forEach(function (c) { chSpy.observe(c); });
  }

  function initTheme() {
    var root = document.documentElement, btn = $('#theme-toggle');
    var dark = window.matchMedia('(prefers-color-scheme: dark)');
    function effective() { return root.getAttribute('data-theme') || (dark.matches ? 'dark' : 'light'); }
    function label() {
      var isDark = effective() === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to day mode' : 'Switch to night mode');
      btn.title = isDark ? 'Day mode' : 'Night mode';
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', isDark ? '#0F1A33' : '#CDE2F8');
    }
    btn.addEventListener('click', function () {
      var next = effective() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('nf-theme', next); } catch (e) {}
      label();
    });
    if (dark.addEventListener) dark.addEventListener('change', label);
    label();
  }

  function initReveal() {
    var targets = $$('.section-title, .eyebrow, .reveal, .chapter, .project, .cert, .tl-item, .edu-card, .contact-card, .skills-layout');
    if (!('IntersectionObserver' in window) || reduceMotion) return;
    targets.forEach(function (t) { t.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px 12% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* =================================================================
     BOOT
     ================================================================= */
  function boot() {
    var steps = [
      renderProfile, initMascot, renderAbout,
      renderThesisHead, renderChapterNav, renderProblemSolution, initFlow,
      renderHardware, renderSoftware, renderFeatures, renderProcess,
      renderResults, renderGallery, renderContrib,
      renderProjects, renderSkills, renderJourney, renderContact,
      initDialogs, initNav, initTheme, initReveal
    ];
    steps.forEach(function (fn) {
      try { fn(); } catch (err) { console.error('[portfolio] ' + fn.name + ' failed:', err); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
