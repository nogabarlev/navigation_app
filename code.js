const $ = id => document.getElementById(id);

/* =====================================================
   לוגו -> חזרה לעמוד הפתיחה (גיבוי למקרה שה-HTML לא עודכן)
   ===================================================== */
(function () {
  var logo = document.querySelector('.top img');
  if (logo && !logo.closest('a')) {
    var a = document.createElement('a');
    a.href = 'index.html';
    a.className = 'logo-link';
    a.setAttribute('aria-label', 'חזרה לעמוד הפתיחה');
    logo.parentNode.insertBefore(a, logo);
    a.appendChild(logo);
  }
})();

/* =====================================================
   לומדת ניווטים – חלק א: 12 שאלות
   תמונות: שמרו בתיקיית media בשמות שמופיעים בשדות img.
   כל עוד תמונה לא קיימת, יוצג מקום מסומן בקו מקווקו.
   ===================================================== */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var $ = function (id) { return document.getElementById(id); };
  function h(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function image(src, label, small, cb) {
    var box = h('div', 'q-img');
    var im = new Image();
    im.alt = label || '';
    im.onload = function () { if (cb) cb(); };
    im.onerror = function () {
      box.innerHTML = '';
      box.appendChild(h('div', 'ph' + (small ? ' small' : ''), '' + src));
      if (cb) cb();
    };
    im.src = src;
    box.appendChild(im);
    return box;
  }

  /* ---------------- השאלות ---------------- */
  var MAP_OPTS = ['מפה טופוגרפית', 'מפה גאוגרפית', 'מפה קוד', 'מפת תצ״א'];

  var Q = [
    { t: 'איזה סוג מפה זו המפה המוצגת לפניכם?', type: 'mc', img: 'media/q1.jpg', opts: MAP_OPTS, ans: 0 },
    { t: 'איזה סוג מפה זו המפה המוצגת לפניכם?', type: 'mc', img: 'media/q2.jpg', opts: MAP_OPTS, ans: 3 },
    { t: 'מה שם המשבצת?', type: 'mc', img: 'media/q3.jpg', ltr: true,
      opts: ['202/571', '571/202', '572/203', '571/203'], ans: 1 },
    { t: 'התאימו בין המעלות לכיווני השמיים:', type: 'match', img: 'media/q4.jpg', ltr: true,
      pairs: [
        { l: '0°', r: 'צפון' }, { l: '45°', r: 'צפון מזרח' }, { l: '90°', r: 'מזרח' },
        { l: '135°', r: 'דרום מזרח' }, { l: '180°', r: 'דרום' }, { l: '225°', r: 'דרום מערב' },
        { l: '270°', r: 'מערב' }, { l: '315°', r: 'צפון מערב' }
      ] },
    { t: 'מה מהציור הבא הוא תבליט ומה תכסית?', type: 'mc', img: 'media/q5.jpg',
      opts: ['העליון הוא תכסית והתחתון הוא תבליט', 'העליון הוא תבליט והתחתון הוא תכסית'], ans: 0,
      explain: 'תכסית – זה כל מה "שמכסה" את השטח. פרטים מלאכותיים וטבעיים שנמצאים על פני השטח: אנטנה, מיוערת, בדואייה, כביש.\n\n' +
               'תבליט – צורת פני השטח, בלטים ושקעים היוצרים את תצורות הנוף ושיפועי הקרקע: רכסים, ערוצים, כיפות.' },
    { t: 'מי אני? אני שיא גובה מקומי, ממני יש 4 כיווני ירידה.', type: 'mc',
      opts: ['שלוחה', 'נחל', 'כיפה', 'אוכף'], ans: 2 },
    { t: 'מי אני? יש לי 3 כיווני ירידה וכיוון עלייה 1.', type: 'mc',
      opts: ['כיפה', 'אוכף', 'נחל', 'שלוחה'], ans: 3 },
    { t: 'איזו צורה טופוגרפית מסומנת בחצים הירוקים והאדומים בין הקו הכחול?', type: 'mc', img: 'media/q8.jpg',
      opts: ['אוכף', 'נחל', 'כיפה', 'שלוחה'], ans: 0 },
    { t: 'התאימו בין הסימון לבין המשמעות (לחצו על סימון ואז על המשמעות):', type: 'match',
      pairs: [
        { img: 'media/sign-1.jpg', l: 'סימון 1', r: 'נקודת ציון (נ.צ.)' },
        { img: 'media/sign-2.jpg', l: 'סימון 2', r: 'נקודת התחלה (נ.ה.)' },
        { img: 'media/sign-3.jpg', l: 'סימון 3', r: 'נקודת סוף (נ.ס.)' },
        { img: 'media/sign-4.jpg', l: 'סימון 4', r: 'נקודת ביניים (נ.ב.)' },
        { img: 'media/sign-5.jpg', l: 'סימון 5', r: 'מעבר חובה (מ.ח.)' }
      ] },
    { t: 'מהו אזימוט?', type: 'mc',
      opts: ['הזווית הנוצרת בין הדרום לבין הנקודה אליה אנו מסתכלים.',
             'הזווית הנוצרת בין הצפון לבין הנקודה אליה אנו מסתכלים.',
             'הזווית הנוצרת בין המזרח לבין הנקודה אליה אנו מסתכלים.',
             'הזווית הנוצרת בין המערב לבין הנקודה אליה אנו מסתכלים.'], ans: 1 },
    { t: 'התאימו בין הקריאה בקשר לבין המשמעות:', type: 'match',
      pairs: [
        { l: 'בלגיה', r: 'הגעה לנ.ב.' },
        { l: 'אנגליה', r: 'יציאה מהחפ״ק לניווט' },
        { l: 'גרמניה', r: 'יציאה מהנ.ב. לכיוון הנ.ס.' },
        { l: 'תאילנד', r: 'הגעה לנ.ס.' }
      ] },
    { t: 'השלימו את הטבלה – יתרונות וחסרונות בניתוח תצ״א. גררו (או לחצו על מילה ואז על העמודה) כל פרט מהמחסן אל העמודה הנכונה:', type: 'sort',
      items: [
        { t: 'תכסית ברורה ועדכנית', a: 0 }, { t: 'ירידה לפרטים הקטנים ואפיונם', a: 0 }, { t: 'גוונים', a: 0 },
        { t: 'אין הפרשי גבהים', a: 1 }, { t: 'קשה לקרוא טופוגרפיה', a: 1 },
        { t: 'פרטים זמניים', a: 1 }, { t: 'לא נוחה לשימוש בשטח נרחב', a: 1 }
      ] }
  ];

  /* ---------------- מצב ---------------- */
  var idx = 0, score = 0, checkFn = null, redraw = null;
  var results = [], saved = [];
  var COLORS = ['#6fa3ad', '#a8442f', '#8c8a5a', '#4b5534', '#c28a2c', '#7a5c8f', '#3f7f5a', '#b5651d'];

  var checkBtn = $('qCheck');
  if (!checkBtn) {
    checkBtn = h('button', 'btn hidden', 'בדיקה');
    checkBtn.id = 'qCheck';
    $('qNext').parentNode.insertBefore(checkBtn, $('qNext'));
  }
  var backBtn = $('qBack');
  if (!backBtn) {
    backBtn = h('button', 'btn ghost hidden', 'הקודמת');
    backBtn.id = 'qBack';
    $('qNext').parentNode.insertBefore(backBtn, $('qNext').parentNode.firstChild);
  }
  checkBtn.onclick = function () { if (checkFn) checkFn(); };
  $('qNext').onclick = function () { idx++; render(); };
  backBtn.onclick = function () { if (idx > 0) { idx--; render(); } };
  window.addEventListener('resize', function () { if (redraw) redraw(); });

  function showFb(ok, msg, state, replay) {
    var fb = $('fb');
    fb.className = 'fb ' + (ok ? 'good' : 'bad');
    if (replay) fb.setAttribute('data-replay', '1');
    fb.textContent = msg;
    checkBtn.classList.add('hidden');
    var nx = $('qNext');
    nx.textContent = idx === Q.length - 1 ? 'סיום' : 'המשך';
    nx.classList.remove('hidden');
    if (!replay) { results[idx] = ok; saved[idx] = { ok: ok, msg: msg, state: state }; }
  }

  function render() {
    if (idx >= Q.length) return finish();
    var q = Q[idx], sv = saved[idx];
    checkFn = null; redraw = null;
    $('prog').textContent = 'שאלה ' + (idx + 1) + ' מתוך ' + Q.length;
    $('qText').textContent = (idx + 1) + ') ' + q.t;
    var qi = $('qImg'); qi.innerHTML = '';
    if (q.img) qi.appendChild(image(q.img, 'תמונה לשאלה ' + (idx + 1)));
    var opts = $('opts'); opts.innerHTML = ''; opts.className = 'opts';
    var fb = $('fb'); fb.className = 'fb hidden'; fb.removeAttribute('data-replay');
    $('qNext').classList.add('hidden');
    backBtn.classList.toggle('hidden', idx === 0);
    checkBtn.classList.add('hidden');
    if (q.type === 'mc') renderMC(q, sv);
    else if (q.type === 'match') renderMatch(q, sv);
    else renderSort(q, sv);
  }

  /* ---------- בחירה מרובה ---------- */
  function renderMC(q, sv) {
    var btns = [];
    function answer(i, replay) {
      btns.forEach(function (x) { x.disabled = true; });
      var ok = i === q.ans;
      btns[i].classList.add(ok ? 'ok' : 'no');
      if (!ok) btns[q.ans].classList.add('ok');
      var msg = ok ? 'נכון! ' : 'לא נכון. התשובה הנכונה: ' + q.opts[q.ans] + '\n';
      if (!ok && q.explain) msg += '\n' + q.explain;
      showFb(ok, msg.trim(), { i: i }, replay);
    }
    q.opts.forEach(function (txt, i) {
      var b = h('button', 'opt', txt);
      if (q.ltr) { b.dir = 'ltr'; b.style.textAlign = 'center'; }
      b.onclick = function () { answer(i, false); };
      btns.push(b);
      $('opts').appendChild(b);
    });
    if (sv) answer(sv.state.i, true);
  }

  /* ---------- התאמה עם קווים ---------- */
  function renderMatch(q, sv) {
    var opts = $('opts'); opts.className = 'm-wrap';
    var n = q.pairs.length;
    var rOrder = sv ? sv.state.rOrder : shuffle(q.pairs.map(function (_, i) { return i; }));
    var wrap = h('div', 'match');
    var colL = h('div', 'mcol'), colR = h('div', 'mcol');
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'mlines');
    wrap.appendChild(colL); wrap.appendChild(colR); wrap.appendChild(svg);
    opts.appendChild(wrap);

    var L = [], R = [], links = {}, sel = null, done = false, result = {};
    if (sv) Object.keys(sv.state.links).forEach(function (k) { links[k] = sv.state.links[k]; });

    q.pairs.forEach(function (p, i) {
      var b = h('button', 'mitem');
      if (p.img) b.appendChild(image(p.img, p.l, true, function () { draw(); }));
      else { b.textContent = p.l; if (q.ltr) { b.dir = 'ltr'; b.style.textAlign = 'center'; } }
      b.onclick = function () {
        if (done) return;
        if (links[i] !== undefined) { delete links[i]; sel = i; }
        else sel = sel === i ? null : i;
        refresh();
      };
      L.push(b); colL.appendChild(b);
    });
    rOrder.forEach(function (pi, pos) {
      var b = h('button', 'mitem', q.pairs[pi].r);
      b.onclick = function () {
        if (done) return;
        if (sel !== null) {
          Object.keys(links).forEach(function (k) { if (links[k] === pos) delete links[k]; });
          links[sel] = pos; sel = null;
        } else {
          Object.keys(links).forEach(function (k) { if (links[k] === pos) delete links[k]; });
        }
        refresh();
      };
      R.push(b); colR.appendChild(b);
    });

    function draw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var box = wrap.getBoundingClientRect();
      svg.setAttribute('width', box.width); svg.setAttribute('height', box.height);
      Object.keys(links).forEach(function (i) {
        var a = L[i].getBoundingClientRect(), b = R[links[i]].getBoundingClientRect();
        var ay = a.top + a.height / 2 - box.top, by = b.top + b.height / 2 - box.top, ax, bx;
        if (a.left + a.width / 2 > b.left + b.width / 2) { ax = a.left - box.left; bx = b.right - box.left; }
        else { ax = a.right - box.left; bx = b.left - box.left; }
        var ln = document.createElementNS(NS, 'line');
        ln.setAttribute('x1', ax); ln.setAttribute('y1', ay);
        ln.setAttribute('x2', bx); ln.setAttribute('y2', by);
        var col = done ? (result[i] ? '#5d7a2f' : '#a8442f') : COLORS[i % COLORS.length];
        ln.setAttribute('stroke', col); ln.setAttribute('stroke-width', 4);
        ln.setAttribute('stroke-linecap', 'round');
        svg.appendChild(ln);
      });
    }
    redraw = draw;

    function refresh() {
      L.forEach(function (b, i) {
        b.classList.toggle('sel', sel === i);
        b.classList.toggle('linked', links[i] !== undefined);
      });
      var used = {};
      Object.keys(links).forEach(function (k) { used[links[k]] = true; });
      R.forEach(function (b, p) { b.classList.toggle('linked', !!used[p]); });
      draw();
      checkBtn.disabled = Object.keys(links).length < n;
      checkBtn.classList.remove('hidden');
    }

    function grade(replay) {
      if (Object.keys(links).length < n) return;
      done = true;
      var wrong = [], snap = {};
      Object.keys(links).forEach(function (k) { snap[k] = links[k]; });
      for (var i = 0; i < n; i++) {
        result[i] = rOrder[links[i]] === i;
        L[i].classList.add(result[i] ? 'ok' : 'no');
        R[links[i]].classList.add(result[i] ? 'ok' : 'no');
        if (!result[i]) wrong.push(q.pairs[i].l + '  ←  ' + q.pairs[i].r);
      }
      draw();
      var ok = wrong.length === 0;
      showFb(ok, ok ? 'נכון! כל ההתאמות מדויקות.'
                    : 'יש טעויות (באדום). ההתאמות הנכונות של הפריטים השגויים:\n' + wrong.join('\n'),
             { rOrder: rOrder, links: snap }, replay);
    }

    refresh();
    checkFn = function () { grade(false); };
    if (sv) grade(true);
  }

  /* ---------- טבלת יתרונות / חסרונות + מחסן מילים (מותאם לטלפון) ---------- */
  function renderSort(q, sv) {
    var opts = $('opts'); opts.className = 'm-wrap';
    var items = sv ? sv.state.items : shuffle(q.items);
    var place = sv ? sv.state.place.slice() : items.map(function () { return null; });   // null = במחסן, 0 = יתרונות, 1 = חסרונות
    var sel = null, done = false;
    var touch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

    var wrap = h('div', 'sortwrap');
    wrap.appendChild(h('p', 'sorthint', 'לחצו על מילה מהמחסן ואז על העמודה הנכונה (במחשב אפשר גם לגרור). לחיצה על מילה שבטבלה מחזירה אותה למחסן.'));

    var grid = h('div', 'sortgrid');
    var cols = [], zones = [];
    ['יתרונות', 'חסרונות'].forEach(function (name, col) {
      var c = h('div', 'scol');
      c.appendChild(h('div', 'scolh', name));
      var z = h('div', 'drop');
      c.appendChild(z);
      grid.appendChild(c); cols.push(c); zones.push(z);
    });

    var bankWrap = h('div', 'bankwrap');
    bankWrap.appendChild(h('div', 'banktitle', 'מחסן מילים'));
    var bank = h('div', 'bank');
    bankWrap.appendChild(bank);

    wrap.appendChild(grid); wrap.appendChild(bankWrap);
    opts.appendChild(wrap);

    var chips = items.map(function (it, i) {
      var c = h('button', 'chip', it.t);
      c.type = 'button';
      c.draggable = !touch;
      c.onclick = function () {
        if (done) return;
        if (place[i] !== null) { place[i] = null; sel = null; }   // החזרה למחסן
        else sel = (sel === i) ? null : i;
        refresh();
      };
      c.ondragstart = function (e) {
        if (done) { e.preventDefault(); return; }
        sel = i;
        try { e.dataTransfer.setData('text/plain', String(i)); } catch (x) {}
      };
      return c;
    });

    function put(col) {
      if (done || sel === null) return;
      place[sel] = col; sel = null; refresh();
    }
    cols.forEach(function (c, col) {
      c.onclick = function (e) {
        if (e.target.closest && e.target.closest('.chip')) return;
        put(col);
      };
      c.ondragover = function (e) { e.preventDefault(); };
      c.ondrop = function (e) { e.preventDefault(); put(col); };
    });
    bank.ondragover = function (e) { e.preventDefault(); };
    bank.ondrop = function (e) { e.preventDefault(); put(null); };

    function refresh() {
      zones.forEach(function (z) { z.innerHTML = ''; });
      cols.forEach(function (c) { c.classList.toggle('armed', sel !== null && !done); });
      bank.innerHTML = '';
      chips.forEach(function (c, i) {
        c.classList.toggle('sel', sel === i);
        (place[i] === null ? bank : zones[place[i]]).appendChild(c);
      });
      checkBtn.disabled = place.some(function (p) { return p === null; });
      checkBtn.classList.remove('hidden');
    }

    function grade(replay) {
      if (place.some(function (p) { return p === null; })) return;
      done = true;
      var wrong = [];
      items.forEach(function (it, i) {
        var ok = place[i] === it.a;
        chips[i].classList.remove('sel');
        chips[i].classList.add(ok ? 'ok' : 'no');
        chips[i].draggable = false;
        if (!ok) wrong.push(it.t + ' – ' + (it.a === 0 ? 'יתרון' : 'חסרון'));
      });
      cols.forEach(function (c) { c.classList.remove('armed'); });
      var ok = !wrong.length;
      showFb(ok, ok ? 'נכון! כל הפרטים במקום הנכון.' : 'יש טעויות (באדום). המיקום הנכון:\n' + wrong.join('\n'),
             { items: items, place: place.slice() }, replay);
    }

    refresh();
    checkFn = function () { grade(false); };
    if (sv) grade(true);
  }

  /* ---------- סיום החלק הראשון ---------- */
  function finish() {
    score = results.filter(Boolean).length;
    window.quizScore = score; window.quizTotal = Q.length;
    if (typeof window.onQuizDone === 'function') return window.onQuizDone(score, Q.length);
    $('quiz').classList.add('hidden');
    $('practice').classList.remove('hidden');
    $('prog').textContent = '';
  }

  render();
})();

/* =====================================================
   אפקטים ואייקונים לשאלות
   ===================================================== */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var quiz = $('quiz'), qText = $('qText'), fb = $('fb'), opts = $('opts');
  if (!quiz || !qText || !fb) return;

  /* עיצוב האייקונים */
  var st = document.createElement('style');
  st.textContent =
    '.ic{width:1.1em;height:1.1em;flex:none;display:block}' +
    '.ic.flame{color:#ff8a3d;fill:none}' +
    '.ic.star{color:#f2c14e;fill:none}' +
    '.stat{display:inline-flex;align-items:center;gap:.4rem}' +
    '.stat .n{font-weight:700;min-width:1ch;text-align:center}' +
    '.sndbtn{display:inline-grid;place-items:center;color:var(--olive);padding:0}' +
    '.sndbtn .ic{width:20px;height:20px}' +
    '.toast{display:inline-flex;align-items:center;gap:.45rem}' +
    '.toast .ic{width:1.2em;height:1.2em}';
  document.head.appendChild(st);

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  /* ---------- אייקונים (SVG) ---------- */
  var ICONS = {
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    volOn: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    volOff: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/>'
  };
  function icon(name, cls) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('class', 'ic ' + (cls || name));
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('fill', 'none');
    s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '2');
    s.setAttribute('stroke-linecap', 'round');
    s.setAttribute('stroke-linejoin', 'round');
    s.innerHTML = ICONS[name];
    return s;
  }
  function stat(name) {
    var wrap = el('span', 'stat'), n = el('b', 'n', '0');
    wrap.appendChild(icon(name)); wrap.appendChild(n);
    wrap.num = n;
    return wrap;
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var m = /מתוך\s*(\d+)/.exec($('prog').textContent);
  var total = m ? +m[1] : 12;
  var cur = 0, streak = 0, best = 0, pts = 0, sndOn = true, handled = false;

  /* ---------- שורת מצב: התקדמות, רצף, נקודות, צליל ---------- */
  var hud = el('div', 'hud'), steps = el('div', 'steps'), stats = el('div', 'stats');
  var stepEls = [];
  for (var i = 0; i < total; i++) { var s = el('span'); stepEls.push(s); steps.appendChild(s); }
  var sStreak = stat('flame'), sPts = stat('star');
  var snd = el('button', 'sndbtn');
  snd.type = 'button'; snd.setAttribute('aria-label', 'הפעלה וכיבוי צלילים');
  function setSndIcon() { snd.innerHTML = ''; snd.appendChild(icon(sndOn ? 'volOn' : 'volOff', 'snd')); }
  setSndIcon();
  snd.onclick = function () { sndOn = !sndOn; setSndIcon(); if (sndOn) beep([660]); };
  stats.appendChild(sStreak); stats.appendChild(sPts); stats.appendChild(snd);
  hud.appendChild(steps); hud.appendChild(stats);
  quiz.insertBefore(hud, quiz.firstChild);

  function bump(node) {
    node.classList.remove('bump'); void node.offsetWidth; node.classList.add('bump');
  }
  function updateStats() {
    sStreak.num.textContent = streak; sPts.num.textContent = pts;
    window.quizPoints = pts; window.quizBest = best;
  }

  /* ---------- צלילים קצרים ---------- */
  var ac;
  function getAC() {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === 'suspended') ac.resume();
    } catch (e) {}
    return ac;
  }
  ['pointerdown', 'touchstart', 'keydown'].forEach(function (ev) {
    document.addEventListener(ev, getAC, { once: true, passive: true });
  });

  function beep(freqs) {
    if (!sndOn) return;
    try {
      var ctx = getAC();
      if (!ctx) return;
      var t = ctx.currentTime;
      freqs.forEach(function (f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain(), at = t + i * 0.1;
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(0.16, at + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, at + 0.26);
        o.connect(g); g.connect(ctx.destination);
        o.start(at); o.stop(at + 0.3);
      });
    } catch (e) {}
  }

  /* ---------- קונפטי והודעה צפה ---------- */
  function confetti(n) {
    if (reduce) return;
    var cols = ['#a8442f', '#6fa3ad', '#e0c98a', '#5d7a2f', '#8c8a5a', '#f6f2e2'];
    for (var i = 0; i < n; i++) {
      var c = el('i', 'cf');
      c.style.left = '50%';
      c.style.top = fb.offsetTop + 'px';
      c.style.background = cols[i % cols.length];
      c.style.setProperty('--dx', ((Math.random() - 0.5) * 420) + 'px');
      c.style.setProperty('--dy', (-(90 + Math.random() * 200)) + 'px');
      c.style.setProperty('--rot', ((Math.random() - 0.5) * 900) + 'deg');
      c.style.animationDelay = (Math.random() * 0.12) + 's';
      c.addEventListener('animationend', function () { this.remove(); });
      quiz.appendChild(c);
    }
  }
  function toast(msg, good, iconName) {
    var t = el('div', 'toast ' + (good ? 'good' : 'bad'));
    if (iconName) t.appendChild(icon(iconName));
    t.appendChild(el('span', null, msg));
    t.addEventListener('animationend', function () { t.remove(); });
    quiz.appendChild(t);
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function flash(cls, ms) {
    quiz.classList.remove(cls); void quiz.offsetWidth; quiz.classList.add(cls);
    setTimeout(function () { quiz.classList.remove(cls); }, ms);
  }

  /* ---------- תשובה נכונה / שגויה ---------- */
  function good() {
    streak++; if (streak > best) best = streak;
    var bonus = streak >= 3 ? 5 : 0;
    pts += 10 + bonus;
    updateStats(); bump(sPts); bump(sStreak);
    if (stepEls[cur - 1]) stepEls[cur - 1].classList.add('ok');
    confetti(streak >= 3 ? 38 : 22);
    if (streak >= 3) toast('רצף של ' + streak + '!  +' + (10 + bonus), true, 'flame');
    else toast(pick(['בול!', 'כל הכבוד!', 'מצוין!', 'דייקת!', 'יפה מאוד!']) + '  +10', true);
    beep([523, 659, 784]);
    flash('glow', 800);
  }
  function bad() {
    streak = 0; updateStats();
    if (stepEls[cur - 1]) stepEls[cur - 1].classList.add('no');
    toast(pick(['כמעט!', 'לא נורא, ממשיכים', 'שווה לזכור את זה']), false);
    beep([240, 190]);
    flash('shake', 500);
  }

  /* ---------- שאלה חדשה ---------- */
  function onNewQuestion() {
    handled = false;
    var mm = /^\s*(\d+)\)/.exec(qText.textContent);
    cur = mm ? +mm[1] : cur + 1;
    stepEls.forEach(function (s, i) { s.classList.toggle('cur', i === cur - 1); });
    flash('enter', 500);
    var letters = 'אבגדהוזח';
    Array.prototype.forEach.call(opts.children, function (b, i) {
      if (b.classList.contains('opt') && opts.classList.contains('opts')) b.setAttribute('data-letter', letters[i] || '');
    });
  }

  new MutationObserver(onNewQuestion)
    .observe(qText, { childList: true, characterData: true, subtree: true });
  new MutationObserver(function () {
    if (handled || fb.hasAttribute('data-replay')) return;
    if (fb.classList.contains('good')) { handled = true; good(); }
    else if (fb.classList.contains('bad')) { handled = true; bad(); }
  }).observe(fb, { attributes: true, attributeFilter: ['class'] });

  onNewQuestion();
})();

/* =====================================================
   חלק ב: תרגול – מד קואורדינטות + מסך סיום
   ===================================================== */
const R = 130, TOL = 5, ROUNDS = 5, NS = 'http://www.w3.org/2000/svg';
const map = $('map');
let rnd = 0, pScore = 0, A, B, g, s, done;
const rand = (a, b) => a + Math.random() * (b - a);
const diff = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
const azim = (p, q) => (Math.atan2(q.x - p.x, -(q.y - p.y)) * 180 / Math.PI + 360) % 360;

function gaugeSvg() {
  let t = `<circle r="${R}" fill="rgba(246,242,226,.62)" stroke="#262c1f" stroke-width="2"/>`;
  for (let a = 0; a < 360; a += 5) {
    const r = a * Math.PI / 180, sn = Math.sin(r), c = Math.cos(r), big = a % 30 === 0;
    const l = big ? 16 : a % 10 === 0 ? 11 : 6;
    t += `<line x1="${(R-l)*sn}" y1="${-(R-l)*c}" x2="${R*sn}" y2="${-R*c}" stroke="#262c1f" stroke-width="${big?1.6:1}"/>`;
    if (big) t += `<text x="${(R-29)*sn}" y="${-(R-29)*c+4}" text-anchor="middle" font-size="13" font-weight="700" fill="#262c1f">${a}</text>`;
  }
  return t + '<path d="M-12 0H12M0 -12V12" stroke="#a8442f" stroke-width="1.5"/><circle r="3" fill="none" stroke="#a8442f"/>';
}
function buildMap() {
  let bg = '', grid = '';
  for (let i = 0; i < 3; i++) {
    const cx = rand(80,520), cy = rand(80,520), rx = rand(70,130), ry = rand(50,100);
    for (let k = 0; k < 4; k++) bg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx-k*rx/4.5}" ry="${ry-k*ry/4.5}"/>`;
  }
  bg += `<path d="M${rand(0,600)} 0 C${rand(0,600)} 200 ${rand(0,600)} 400 ${rand(0,600)} 600" stroke="#6fa3ad" stroke-width="4" fill="none" opacity=".8"/>`;
  for (let i = 100; i < 600; i += 100) grid += `<path d="M${i} 0V600M0 ${i}H600"/><text x="${i+4}" y="14">${40+i/100}</text><text x="4" y="${i-4}">${70-i/100}</text>`;
  map.innerHTML = `<rect width="600" height="600" fill="#e6dcb8"/>
    <g fill="none" stroke="#a98a5a" stroke-width="1.4" opacity=".75">${bg}</g>
    <g stroke="#4b5534" stroke-width=".8" opacity=".5" font-size="11" fill="#4b5534">${grid}</g>
    <g font-size="22" font-weight="800" fill="#262c1f" style="paint-order:stroke" stroke="#f6f2e2" stroke-width="4">
      <circle cx="${A.x}" cy="${A.y}" r="5"/><text x="${A.x+9}" y="${A.y-9}">A</text>
      <circle cx="${B.x}" cy="${B.y}" r="5"/><text x="${B.x+9}" y="${B.y-9}">B</text></g>
    <line id="str" stroke="#a8442f" stroke-width="2.2" visibility="hidden"/>
    <circle id="mark" r="5" fill="#a8442f" stroke="#fff" stroke-width="1.5" visibility="hidden"/>
    <g id="gauge">${gaugeSvg()}</g>`;
}
function draw() {
  $('gauge').setAttribute('transform', `translate(${g.x} ${g.y})`);
  const L = $('str'), M = $('mark');
  $('hintOut').textContent = '';
  if (!s) { L.setAttribute('visibility','hidden'); M.setAttribute('visibility','hidden'); return; }
  const dx = s.x - g.x, dy = s.y - g.y, d = Math.hypot(dx, dy) || 1;
  L.setAttribute('x1', g.x); L.setAttribute('y1', g.y); L.setAttribute('x2', s.x); L.setAttribute('y2', s.y);
  M.setAttribute('cx', g.x + R*dx/d); M.setAttribute('cy', g.y + R*dy/d);
  L.setAttribute('visibility','visible'); M.setAttribute('visibility', d > R ? 'visible' : 'hidden');
  if ($('live').checked) $('hintOut').textContent = `קריאה: ${Math.round(azim(g, s))}°`;
  $('step').textContent = d > R ? 'החוט מתוח. קראו על המד את המספר שבו החוט פוגע בשנתות, והקלידו אותו.' : 'גרור את המד כך שהמרכז שלו על נקודה A, ואז געו במפה ליד נקודה B כדי למתוח את החוט.';
}
function pt(e) {
  const p = map.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
  return p.matrixTransform(map.getScreenCTM().inverse());
}
let mode, off;
map.addEventListener('pointerdown', e => {
  if (done) return;
  const p = pt(e);
  mode = Math.hypot(p.x - g.x, p.y - g.y) < R ? 'g' : 's';
  off = { x: p.x - g.x, y: p.y - g.y };
  map.setPointerCapture(e.pointerId); move(e);
});
map.addEventListener('pointermove', move);
map.addEventListener('pointerup', () => mode = null);
function move(e) {
  if (!mode) return;
  const p = pt(e);
  if (mode === 'g') g = { x: Math.min(600, Math.max(0, p.x - off.x)), y: Math.min(600, Math.max(0, p.y - off.y)) };
  else s = { x: Math.min(600, Math.max(0, p.x)), y: Math.min(600, Math.max(0, p.y)) };
  draw();
}
$('live').onchange = draw;

function startRound() {
  done = false; s = null; g = { x: R + 10, y: 600 - R - 10 };
  $('prog').textContent = `תרגול ${rnd+1} מתוך ${ROUNDS}`;
  do {
    A = { x: rand(130,470), y: rand(130,470) };
    const a = rand(0, 2*Math.PI), d = rand(210, 290);
    B = { x: A.x + d*Math.sin(a), y: A.y - d*Math.cos(a) };
  } while (B.x < 40 || B.x > 560 || B.y < 40 || B.y > 560);
  buildMap(); draw();
  $('ans').value = ''; $('pfb').classList.add('hidden'); $('pNext').classList.add('hidden');
  $('check').classList.remove('hidden');
}
function say(msg, good) { $('pfb').className = 'fb ' + (good ? 'good' : 'bad'); $('pfb').textContent = msg; }
$('check').onclick = () => {
  const truth = azim(A, B), val = parseFloat($('ans').value);
  if (Math.hypot(g.x - A.x, g.y - A.y) > 14) return say('מרכז המד צריך להיות בדיוק על נקודה A. גררו אותו שוב.', false);
  if (!s || diff(azim(g, s), truth) > 4) return say('החוט צריך לעבור דרך נקודה B. מתחו אותו שוב.', false);
  if (isNaN(val)) return say('הקלידו את הזווית שקראתם על המד.', false);
  done = true; $('check').classList.add('hidden');
  const ok = diff(val, truth) <= TOL;
  if (ok) pScore++;
  say(ok ? `נכון! הזווית מ-A ל-B היא בערך ${Math.round(truth)}°.` : `הקריאה לא מדויקת. הזווית הנכונה היא כ-${Math.round(truth)}°. שימו לב לשנתות: כל שנתה קטנה היא 5°, והארוכה יותר 10°.`, ok);
  $('pNext').classList.remove('hidden');
};
$('pNext').onclick = () => {
  if (++rnd < ROUNDS) return startRound();
  $('practice').classList.add('hidden'); $('end').classList.remove('hidden'); $('prog').textContent = '';
  showEnd();
};

function endIconSvg(name) {
    const icons = {
        trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v3a4 4 0 0 0 4 4M17 6h3v3a4 4 0 0 1-4 4"/>',

        compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',

        map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',

        tent: '<path d="m3 20 9-16 9 16H3Z"/><path d="m12 4 2 16M8 20l4-7 4 7"/>',

        clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h3"/>',

        target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',

        star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',

        flame: '<path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-5-10-1 3-3 4-3 7-2-1-3-3-3-5-2 3-3 5-3 8a7 7 0 0 0 7 7Z"/><path d="M12 22a3 3 0 0 0 3-3c0-2-2-3-3-5-1 2-3 3-3 5a3 3 0 0 0 3 3Z"/>'
    };

    return `
        <svg class="ei ${name}"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="1.8"
             stroke-linecap="round"
             stroke-linejoin="round"
             aria-hidden="true">
            ${icons[name]}
        </svg>
    `;
}


function showEnd() {
    const qs = window.quizScore || 0;
    const qt = window.quizTotal || 12;
    const pts = window.quizPoints || 0;
    const best = window.quizBest || 0;

    const pct = Math.round((qs + pScore) / (qt + ROUNDS) * 100);

    const ranks = [
        [90, 'trophy', 'מצוין! אתם נווטים אלופים', 'שליטה מרשימה בחומר. מוכנים לשטח!'],
        [70, 'compass', 'כל הכבוד! אתם בדרך הנכונה', 'עוד קצת דיוק ואתם שם.'],
        [50, 'map', 'התחלה טובה', 'שווה לחזור על הנושאים שטעיתם בהם.'],
        [0, 'tent', 'כדאי לעבור שוב על החומר', 'אין בעיה, נסו שוב ותשתפרו מהר.']
    ];

    const r = ranks.find(x => pct >= x[0]);

    $('endMedal').innerHTML = endIconSvg(r[1]);
    $('endTitle').textContent = r[2];
    $('endSub').textContent = r[3];

    const cards = [
        ['clipboard', qs, 'מתוך ' + qt + ' שאלות'],
        ['target', pScore, 'מתוך ' + ROUNDS + ' תרגולים'],
        ['star', pts, 'נקודות'],
        ['flame', best, 'רצף שיא']
    ];

    const grid = $('endGrid');
    grid.innerHTML = '';

    cards.forEach((c, i) => {
        const d = document.createElement('div');

        d.className = 'stat-card';
        d.style.setProperty('--d', (0.3 + i * 0.15) + 's');

        d.innerHTML = `
            <div class="e">${endIconSvg(c[0])}</div>
            <div class="v">0</div>
            <div class="l">${c[2]}</div>
        `;

        grid.appendChild(d);
        countUp(d.querySelector('.v'), c[1], 1200);
    });

    const reduce = window.matchMedia &&
        matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fg = $('ringFg');
    fg.style.strokeDashoffset = 327;

    setTimeout(() => {
        fg.style.strokeDashoffset = 327 * (1 - pct / 100);
    }, 80);

    countUp($('ringNum'), pct, 1400);

    if (pct >= 50 && !reduce) {
        setTimeout(() => burst(pct >= 90 ? 70 : 40), 400);
    }
}

function countUp(el, to, ms) {
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !to) { el.textContent = to; return; }
  const t0 = performance.now();
  (function f(t) {
    const p = Math.min(1, (t - t0) / ms);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}

function burst(n) {
  const end = $('end'), m = $('endMedal');
  const cols = ['#a8442f', '#6fa3ad', '#e0c98a', '#5d7a2f', '#8c8a5a', '#c28a2c'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('i');
    c.className = 'ecf';
    c.style.left = (m.offsetLeft + m.offsetWidth / 2) + 'px';
    c.style.top = (m.offsetTop + m.offsetHeight / 2) + 'px';
    c.style.background = cols[i % cols.length];
    c.style.setProperty('--dx', ((Math.random() - 0.5) * 420) + 'px');
    c.style.setProperty('--dy', (-120 + Math.random() * 380) + 'px');
    c.style.setProperty('--rot', ((Math.random() - 0.5) * 900) + 'deg');
    c.addEventListener('animationend', () => c.remove());
    end.appendChild(c);
  }
}
const celebrate = () => {
  const m = $('endMedal');
  m.classList.remove('wiggle'); void m.offsetWidth; m.classList.add('wiggle');
  burst(36);
};
if ($('endMedal')) {
  $('endMedal').onclick = celebrate;
  $('endMedal').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') celebrate(); };
}
if ($('again')) $('again').onclick = () => location.reload();

/* מעבר מהשאלות לתרגול */
window.onQuizDone = () => {
  $('quiz').classList.add('hidden');
  $('practice').classList.remove('hidden');
  rnd = 0; pScore = 0;
  startRound();
};
