/* אפקטים ואינטראקטיביות לשאלות – נטען אחרי code.js
   לא משנה את לוגיקת השאלות או את התרגול, רק מאזין למה שקורה בדף. */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var quiz = $('quiz'), qText = $('qText'), fb = $('fb'), opts = $('opts');
  if (!quiz || !qText || !fb) return;

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var m = /מתוך\s*(\d+)/.exec($('prog').textContent);
  var total = m ? +m[1] : 12;
  var cur = 0, streak = 0, best = 0, pts = 0, sndOn = true, handled = false;

  /* ---------- שורת מצב: התקדמות, רצף, נקודות, צליל ---------- */
  var hud = el('div', 'hud'), steps = el('div', 'steps'), stats = el('div', 'stats');
  var stepEls = [];
  for (var i = 0; i < total; i++) { var s = el('span'); stepEls.push(s); steps.appendChild(s); }
  var sStreak = el('span', 'stat', '🔥 0'), sPts = el('span', 'stat', '⭐ 0');
  var snd = el('button', 'sndbtn', '🔊');
  snd.type = 'button'; snd.setAttribute('aria-label', 'הפעלה וכיבוי צלילים');
  snd.onclick = function () { sndOn = !sndOn; snd.textContent = sndOn ? '🔊' : '🔇'; if (sndOn) beep([660]); };
  stats.appendChild(sStreak); stats.appendChild(sPts); stats.appendChild(snd);
  hud.appendChild(steps); hud.appendChild(stats);
  quiz.insertBefore(hud, quiz.firstChild);

  function bump(node) {
    node.classList.remove('bump'); void node.offsetWidth; node.classList.add('bump');
  }
  function updateStats() {
    sStreak.textContent = '🔥 ' + streak; sPts.textContent = '⭐ ' + pts;
    window.quizPoints = pts;
  }

  /* ---------- צלילים קצרים ---------- */
  var ac;
  function beep(freqs) {
    if (!sndOn) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var t = ac.currentTime;
      freqs.forEach(function (f, i) {
        var o = ac.createOscillator(), g = ac.createGain(), st = t + i * 0.1;
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, st);
        g.gain.exponentialRampToValueAtTime(0.16, st + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, st + 0.26);
        o.connect(g); g.connect(ac.destination);
        o.start(st); o.stop(st + 0.3);
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
  function toast(msg, good) {
    var t = el('div', 'toast ' + (good ? 'good' : 'bad'), msg);
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
    toast(streak >= 3 ? '🔥 רצף של ' + streak + '!  +' + (10 + bonus)
                      : pick(['בול!', 'כל הכבוד!', 'מצוין!', 'דייקת!', 'יפה מאוד!']) + '  +10', true);
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

  /* qText נוצר ראשון כדי שהאיפוס יקדים את בדיקת התשובה */
  new MutationObserver(onNewQuestion)
    .observe(qText, { childList: true, characterData: true, subtree: true });
  new MutationObserver(function () {
    if (handled) return;
    if (fb.classList.contains('good')) { handled = true; good(); }
    else if (fb.classList.contains('bad')) { handled = true; bad(); }
  }).observe(fb, { attributes: true, attributeFilter: ['class'] });

  /* ---------- מסך סיום: מוסיף נקודות ורצף שיא ---------- */
  var end = $('end'), summary = $('summary'), added = false;
  if (end && summary) {
    new MutationObserver(function () {
      if (!end.classList.contains('hidden') && !added) {
        added = true;
        summary.textContent += '  ⭐ ' + pts + ' נקודות · 🔥 רצף שיא: ' + best;
      }
    }).observe(end, { attributes: true, attributeFilter: ['class'] });
  }

  onNewQuestion();
})();
