const $ = id => document.getElementById(id);

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
    { t: 'איזו צורה טופוגרפית מסומנת בעיגול האדום?', type: 'mc', img: 'media/q8.jpg',
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
  var COLORS = ['#6fa3ad', '#a8442f', '#8c8a5a', '#4b5534', '#c28a2c', '#7a5c8f', '#3f7f5a', '#b5651d'];

  var checkBtn = $('qCheck');
  if (!checkBtn) {
    checkBtn = h('button', 'btn hidden', 'בדיקה');
    checkBtn.id = 'qCheck';
    $('qNext').parentNode.insertBefore(checkBtn, $('qNext'));
  }
  checkBtn.onclick = function () { if (checkFn) checkFn(); };
  $('qNext').onclick = function () { idx++; render(); };
  window.addEventListener('resize', function () { if (redraw) redraw(); });

  function showFb(ok, msg) {
    var fb = $('fb');
    fb.className = 'fb ' + (ok ? 'good' : 'bad');
    fb.textContent = msg;
    checkBtn.classList.add('hidden');
    var nx = $('qNext');
    nx.textContent = idx === Q.length - 1 ? 'סיום' : 'המשך';
    nx.classList.remove('hidden');
    if (ok) score++;
  }

  function render() {
    if (idx >= Q.length) return finish();
    var q = Q[idx];
    checkFn = null; redraw = null;
    $('prog').textContent = 'שאלה ' + (idx + 1) + ' מתוך ' + Q.length;
    $('qText').textContent = (idx + 1) + ') ' + q.t;
    var qi = $('qImg'); qi.innerHTML = '';
    if (q.img) qi.appendChild(image(q.img, 'תמונה לשאלה ' + (idx + 1)));
    var opts = $('opts'); opts.innerHTML = ''; opts.className = 'opts';
    $('fb').className = 'fb hidden';
    $('qNext').classList.add('hidden');
    checkBtn.classList.add('hidden');
    if (q.type === 'mc') renderMC(q);
    else if (q.type === 'match') renderMatch(q);
    else renderSort(q);
  }

  /* ---------- בחירה מרובה ---------- */
  function renderMC(q) {
    var btns = [];
    q.opts.forEach(function (txt, i) {
      var b = h('button', 'opt', txt);
      if (q.ltr) { b.dir = 'ltr'; b.style.textAlign = 'center'; }
      b.onclick = function () {
        btns.forEach(function (x) { x.disabled = true; });
        var ok = i === q.ans;
        b.classList.add(ok ? 'ok' : 'no');
        if (!ok) btns[q.ans].classList.add('ok');
        var msg = ok ? 'נכון! ' : 'לא נכון. התשובה הנכונה: ' + q.opts[q.ans] + '\n';
        if (!ok && q.explain) msg += '\n' + q.explain;
        showFb(ok, msg.trim());
      };
      btns.push(b);
      $('opts').appendChild(b);
    });
  }

  /* ---------- התאמה עם קווים ---------- */
  function renderMatch(q) {
    var opts = $('opts'); opts.className = 'm-wrap';
    var n = q.pairs.length;
    var rOrder = shuffle(q.pairs.map(function (_, i) { return i; }));
    var wrap = h('div', 'match');
    var colL = h('div', 'mcol'), colR = h('div', 'mcol');
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'mlines');
    wrap.appendChild(colL); wrap.appendChild(colR); wrap.appendChild(svg);
    opts.appendChild(wrap);

    var L = [], R = [], links = {}, sel = null, done = false, result = {};

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
    refresh();

    checkFn = function () {
      if (Object.keys(links).length < n) return;
      done = true;
      var wrong = [];
      for (var i = 0; i < n; i++) {
        result[i] = rOrder[links[i]] === i;
        L[i].classList.add(result[i] ? 'ok' : 'no');
        R[links[i]].classList.add(result[i] ? 'ok' : 'no');
        if (!result[i]) wrong.push(q.pairs[i].l + '  ←  ' + q.pairs[i].r);
      }
      draw();
      var ok = wrong.length === 0;
      showFb(ok, ok ? 'נכון! כל ההתאמות מדויקות.'
                    : 'יש טעויות (באדום). ההתאמות הנכונות של הפריטים השגויים:\n' + wrong.join('\n'));
    };
  }

  /* ---------- טבלת יתרונות / חסרונות + מחסן מילים ---------- */
  function renderSort(q) {
    var opts = $('opts'); opts.className = 'm-wrap';
    var items = shuffle(q.items);
    var place = items.map(function () { return null; });   // null = במחסן, 0 = יתרונות, 1 = חסרונות
    var sel = null, done = false;

    var tbl = h('table', 'sorttbl');
    var thead = h('thead'), trh = h('tr');
    trh.appendChild(h('th', null, 'יתרונות'));
    trh.appendChild(h('th', null, 'חסרונות'));
    thead.appendChild(trh); tbl.appendChild(thead);
    var tb = h('tbody'), tr = h('tr');
    var cells = [h('td', 'drop'), h('td', 'drop')];
    cells.forEach(function (c) { tr.appendChild(c); });
    tb.appendChild(tr); tbl.appendChild(tb);

    var bankWrap = h('div', 'bankwrap');
    bankWrap.appendChild(h('div', 'banktitle', 'מחסן מילים'));
    var bank = h('div', 'bank');
    bankWrap.appendChild(bank);
    opts.appendChild(tbl); opts.appendChild(bankWrap);

    var chips = items.map(function (it, i) {
      var c = h('button', 'chip', it.t);
      c.draggable = true;
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
    cells.forEach(function (c, col) {
      c.onclick = function (e) { if (e.target === c) put(col); };
      c.ondragover = function (e) { e.preventDefault(); };
      c.ondrop = function (e) { e.preventDefault(); put(col); };
    });
    bank.ondragover = function (e) { e.preventDefault(); };
    bank.ondrop = function (e) { e.preventDefault(); put(null); };

    function refresh() {
      cells.forEach(function (c) { c.innerHTML = ''; c.classList.toggle('armed', sel !== null && !done); });
      bank.innerHTML = '';
      chips.forEach(function (c, i) {
        c.classList.toggle('sel', sel === i);
        (place[i] === null ? bank : cells[place[i]]).appendChild(c);
      });
      checkBtn.disabled = place.some(function (p) { return p === null; });
      checkBtn.classList.remove('hidden');
    }
    refresh();

    checkFn = function () {
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
      cells.forEach(function (c) { c.classList.remove('armed'); });
      var ok = !wrong.length;
      showFb(ok, ok ? 'נכון! כל הפרטים במקום הנכון.' : 'יש טעויות (באדום). המיקום הנכון:\n' + wrong.join('\n'));
    };
  }

  /* ---------- סיום החלק הראשון ---------- */
  function finish() {
    window.quizScore = score; window.quizTotal = Q.length;
    if (typeof window.onQuizDone === 'function') return window.onQuizDone(score, Q.length);
    $('quiz').classList.add('hidden');
    $('practice').classList.remove('hidden');
    $('prog').textContent = '';
  }

  render();
})();

/* =====================================================
   חלק ב: תרגול – מד קואורדינטות (ללא שינוי)
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
  $('summary').textContent = `שאלות: ${window.quizScore} מתוך ${window.quizTotal}. תרגול: ${pScore} מתוך ${ROUNDS}.`;
};

/* מעבר מהשאלות לתרגול: כאן מתחיל התרגול (זה מה שהיה חסר) */
window.onQuizDone = () => {
  $('quiz').classList.add('hidden');
  $('practice').classList.remove('hidden');
  rnd = 0; pScore = 0;
  startRound();
};
