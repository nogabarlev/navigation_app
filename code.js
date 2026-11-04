const $ = id => document.getElementById(id);

/* ---------- שאלות ----------
   כדי להשתמש בקובץ השאלות שלך: החליפי את QUESTIONS בפורמט:
   { text:'מה מוצג במפה?', image:'images/q1.png', options:['..','..','..','..'], correct:0, why:'הסבר' }
   (אם אין image, מצויר שרטוט קווי גובה לפי shape) */
const sv = i => `<svg viewBox="0 0 300 200" role="img" aria-label="מפה"><rect width="300" height="200" fill="#e6dcb8"/><g fill="none" stroke="#8a5a2b" stroke-width="1.6">${i}</g></svg>`;
const el = (cx, cy, n, rx, ry, st) => Array.from({length:n}, (_, i) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx-i*st}" ry="${ry*(rx-i*st)/rx}"/>`).join('');
const SHAPES = {
  hill:   () => sv(el(150,100,5,120,85,22)),
  ridge:  () => sv(el(150,100,5,145,48,28)),
  saddle: () => sv(el(78,100,4,66,66,15) + el(222,100,4,66,66,15) + '<ellipse cx="150" cy="100" rx="145" ry="85"/>'),
  valley: () => sv([60,105,150,195].map(y => `<path d="M0 ${y} Q150 ${y-70} 300 ${y}"/>`).join('') + '<path d="M150 0V200" stroke="#4f8da0" stroke-width="2.5"/>')
};
const OPT = [['hill','גבעה'],['ridge','רכס'],['saddle','אוכף'],['valley','עמק (ואדי)']];
const WHY = {
  hill:'קווי הגובה סגורים, והגובה עולה ככל שנכנסים פנימה – זו גבעה.',
  ridge:'קווי הגובה מוארכים והגובה עולה לאורך קו אחד – זה רכס.',
  saddle:'שתי גבעות עם מעבר נמוך ביניהן, שמוקף בקו גובה משותף – זה אוכף.',
  valley:'קווי הגובה מתעקלים לכיוון הגובה סביב ערוץ נחל – זה עמק.'
};
const QUESTIONS = ['saddle','hill','valley','ridge'].map(k => ({
  shape:k, text:'איזו צורת קרקע מוצגת במפה?',
  options:OPT.map(o => o[1]), correct:OPT.findIndex(o => o[0] === k), why:WHY[k]
}));

let qi = 0, qScore = 0;
function showQ() {
  const q = QUESTIONS[qi];
  $('prog').textContent = `שאלה ${qi+1} מתוך ${QUESTIONS.length}`;
  $('qText').textContent = q.text;
  $('qImg').innerHTML = q.image ? `<img src="${q.image}" alt="מפה">` : SHAPES[q.shape]();
  $('opts').innerHTML = '';
  $('fb').classList.add('hidden'); $('qNext').classList.add('hidden');
  q.options.forEach((t, i) => {
    const b = document.createElement('button');
    b.className = 'opt'; b.textContent = t;
    b.onclick = () => answerQ(i);
    $('opts').appendChild(b);
  });
}
function answerQ(i) {
  const q = QUESTIONS[qi], bs = $('opts').children, ok = i === q.correct;
  [...bs].forEach(b => b.disabled = true);
  bs[q.correct].classList.add('ok');
  if (!ok) bs[i].classList.add('no'); else qScore++;
  $('fb').className = 'fb ' + (ok ? 'good' : 'bad');
  $('fb').textContent = (ok ? 'נכון! ' : `לא נכון. התשובה הנכונה: ${q.options[q.correct]}. `) + q.why;
  $('qNext').classList.remove('hidden');
}
$('qNext').onclick = () => {
  if (++qi < QUESTIONS.length) return showQ();
  $('quiz').classList.add('hidden'); $('practice').classList.remove('hidden'); startRound();
};

/* ---------- תרגול: מד קואורדינטות ---------- */
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
  $('summary').textContent = `שאלות: ${qScore} מתוך ${QUESTIONS.length}. תרגול: ${pScore} מתוך ${ROUNDS}.`;
};

if ($('quiz')) showQ();