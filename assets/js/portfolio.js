/* Class lists (class-XXX.html), the class at a glance (home page) and student
   portfolios (student.html?id=...), including editing them.

   - Rosters: classes.js (all classes) and students.js (class 202 + its content).
   - Saved edits live online (Supabase, see config.js). A saved portfolio
     replaces what students.js / media.js say about that student.
   - Portfolio pages are Arabic only. */
(() => {
  'use strict';
  const { T, esc, icon, onLang, gallery, mediaItems } = window.Site;
  const STUDENTS = window.STUDENTS || [];
  const CLASSES = (window.CLASSES || [{ id: '202', grade: 11, students: null }])
    .map((c) => ({ ...c, students: c.students || STUDENTS }));
  const GRADE = { 10: { ar: 'الصف الأول الثانوي', en: 'Grade 10' }, 11: { ar: 'الصف الثاني الثانوي', en: 'Grade 11' }, 12: { ar: 'الصف الثالث الثانوي', en: 'Grade 12' } };
  const classOf = (id) => CLASSES.find((c) => c.students.some((s) => s.id === id));
  const classById = (cid) => CLASSES.find((c) => c.id === cid) || CLASSES.find((c) => c.id === '202');

  /* ---------- online storage ---------- */
  const CFG = window.ATHAR_DB || {};
  const BASE = String(CFG.url || '').replace(/\/+$/, '');
  const ONLINE = !!(BASE && CFG.key);
  // legacy anon keys are JWTs and also go in Authorization; new publishable keys go in apikey only
  const headers = { apikey: CFG.key, 'Content-Type': 'application/json', ...(/^eyJ/.test(CFG.key || '') ? { Authorization: `Bearer ${CFG.key}` } : {}) };
  const get = (path) => fetch(`${BASE}/rest/v1/${path}`, { headers, cache: 'no-store' })
    .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); });
  // Every edit function answers { ok: true, ... } or { ok: false, error: '...' }.
  const rpc = (fn, body) => fetch(`${BASE}/rest/v1/rpc/${fn}`, { method: 'POST', headers, body: JSON.stringify(body) })
    .then((r) => (r.ok ? r.json() : { ok: false, error: 'network' }))
    .catch(() => ({ ok: false, error: 'network' }));

  const saved = {}; // student id -> saved portfolio data
  const savedReady = ONLINE
    ? get('portfolios?select=id,data').then((list) => list.forEach((r) => { saved[r.id] = r.data; })).catch(() => {})
    : Promise.resolve();

  /* ---------- content ---------- */
  // One Arabic-only shape for every portfolio:
  // { bio, quote, stats: [{ value, label }], achievements: [{ text, year }],
  //   interests: [{ text, ic }], pictures: [{ src | media, thumb, w, h, caption, cat }], cats: [{ id, label }] }
  const ar = (v) => (v == null ? '' : typeof v === 'object' ? String(v.ar ?? '') : String(v));
  function fromStatic(s) {
    return {
      bio: ar(s.bio),
      quote: ar(s.quote),
      stats: (s.stats || []).map((st) => ({ value: ar(st.v) + (st.suffix || ''), label: ar(st) })),
      achievements: (s.achievements || []).map((a) => ({ text: ar(a), year: ar(a.year) })),
      interests: (s.interests || []).map((t) => ({ text: ar(t), ic: t.ic || '' })),
      pictures: mediaItems(s.id, s.captions || {}).map((it) => ({
        src: it.src, thumb: it.thumb, w: it.w, h: it.h,
        caption: ar(it.cap) + (it.sub ? ` — ${ar(it.sub)}` : ''),
        ...(it.cat ? { cat: it.cat } : {}),
      })),
      cats: (s.cats || []).map((c) => ({ id: c.id, label: ar(c) })),
    };
  }
  const content = (s) => saved[s.id] || fromStatic(s);
  const hasContent = (d) => !!(d && (d.bio || d.quote || (d.stats || []).length || (d.achievements || []).length
    || (d.interests || []).length || (d.pictures || []).length));
  const hasPortfolio = (s) => hasContent(content(s));
  const href = (s) => s.href || `student.html?id=${encodeURIComponent(s.id)}`;
  const name = (s) => T({ ar: s.ar, en: s.en });
  const chev = (dir) => icon(dir === 'prev' ? 'chevronL' : 'chevronR', 'flip-rtl');
  const isWord = (v) => /[^\d.,%+\s]/.test(v); // "الثاني" is set smaller than a number like 1584

  /* ---------- class list: one card per student ---------- */
  function roster(el) {
    const list = classById(el.dataset.roster || '202').students;
    const render = () => {
      el.innerHTML = `<ol class="roster">${list.map((s, i) => {
        const has = hasPortfolio(s);
        const cls = `st${has ? '' : ' st--off'}${s.featured ? ' st--me' : ''}`;
        // a raised card with the green band already says "open me"; only the exceptions get a label
        const state = s.featured
          ? `<span class="chip chip--glass">${T({ ar: 'معدّ الموقع', en: 'Built this site' })}</span>`
          : has ? '' : T({ ar: 'لم يُرفع بعد', en: 'Nothing uploaded yet' });
        return `<li><a class="${cls}" href="${href(s)}">
          <span class="st__no">${i + 1}</span>
          <span class="st__name">${esc(name(s))}</span>
          ${state ? `<span class="st__go">${state}</span>` : ''}
        </a></li>`;
      }).join('')}</ol>`;
    };
    render();
    onLang(render);
    savedReady.then(render);
  }

  /* ---------- the class at a glance: a square per student ---------- */
  function viz(el) {
    const render = () => {
      let k = 0;
      el.innerHTML = classById(el.dataset.viz || '202').students
        .map((s) => (hasPortfolio(s) ? `<i class="on${s.featured ? ' me' : ''}" style="--k: ${k++}"></i>` : '<i></i>')).join('');
    };
    render();
    savedReady.then(render);
  }

  const counts = () => {
    document.querySelectorAll('[data-count-students]').forEach((e) => { e.textContent = classById(e.dataset.countStudents).students.length; });
    document.querySelectorAll('[data-count-portfolios]').forEach((e) => { e.textContent = classById(e.dataset.countPortfolios).students.filter(hasPortfolio).length; });
  };

  /* ---------- one student ---------- */
  function student(el) {
    const id = new URLSearchParams(location.search).get('id');
    const cls = classOf(id);
    const list = cls ? cls.students : [];
    const i = list.findIndex((s) => s.id === id);
    const s = list[i];
    if (s && s.href) { location.replace(s.href); return; }
    if (s) el.dataset.accent = s.accent || 'emerald';
    const media = {}; // uploaded picture id -> data: URL
    let edit = null; // { pw, d, dirty } while editing

    const picSrc = (p) => (p.media ? media[p.media] || '' : p.src);

    function view() {
      if (!s) {
        document.title = 'الطالب غير موجود | منصة أثر';
        el.innerHTML = headHTML() + noticeHTML('لم يُعثر على الطالب', 'تأكد من الرابط، أو اختر الطالب من كشف شعبته.', 'index.html#grades', 'العودة إلى المراحل الدراسية');
        return;
      }
      document.title = `${s.ar} | ملف الإنجاز | منصة أثر`;
      const d = content(s);
      el.innerHTML = headHTML(d) + (hasContent(d) ? bodyHTML(d)
        : noticeHTML('لم يرفع الطالب أي شيء بعد', 'عندما يضيف الطالب إنجازاته وشهاداته ستظهر هنا.', `class-${cls.id}.html`, `العودة إلى كشف الشعبة ${cls.id}`)) + pagerHTML();
      fillGallery(d);
      el.querySelector('[data-edit]')?.addEventListener('click', askPassword);
    }

    function fillGallery(d) {
      const g = el.querySelector('[data-gallery]');
      if (!g) return;
      const items = d.pictures.filter(picSrc).map((p, n) => ({
        src: picSrc(p), thumb: p.thumb || picSrc(p), w: p.w || 4, h: p.h || 3, type: 'image',
        cap: { ar: p.caption || `صورة ${n + 1}` }, cat: p.cat || null,
      }));
      const cats = (d.cats || []).length && items.some((it) => it.cat) ? d.cats.map((c) => ({ id: c.id, ar: c.label })) : null;
      if (items.length) gallery(g, items, cats, { watchLang: false });
    }

    const crumbsHTML = () => `<nav class="crumbs" aria-label="مسار التصفح">
        <a href="index.html">الرئيسية</a>${chev()}
        ${cls ? `<a href="grade-${cls.grade}.html">${GRADE[cls.grade].ar}</a>${chev()}<a href="class-${cls.id}.html">الشعبة ${cls.id}</a>` : '<span aria-current="page">ملف الإنجاز</span>'}
      </nav>`;

    function headHTML(d) {
      return `<div class="head pf-head"><div class="container head__in">
        ${crumbsHTML()}
        <h1 class="head__title rise">${s ? esc(s.ar) : 'ملف الإنجاز'}</h1>
        ${s ? `<p class="head__sub rise" style="--i: 1">${GRADE[cls.grade].ar}، الشعبة ${cls.id}</p>
        ${!edit && d.stats.length ? `<div class="pf-stats rise" style="--i: 2">${d.stats.map((st) => `<p class="pf-stat"><b${isWord(st.value) ? ' class="is-word"' : ''}>${esc(st.value)}</b><span>${esc(st.label)}</span></p>`).join('')}</div>` : ''}` : ''}
      </div>
      ${s && !edit ? `<button class="edit-btn" type="button" data-edit>${icon('pen')}<span>تعديل</span></button>` : ''}
      </div>`;
    }

    function bodyHTML(d) {
      const blocks = [];
      if (d.bio || d.quote) {
        blocks.push(`<div class="pf-block reveal">
          ${d.bio ? `<p class="pf-bio">${esc(d.bio)}</p>` : ''}
          ${d.quote ? `<blockquote class="pf-quote">«${esc(d.quote)}»</blockquote>` : ''}</div>`);
      }
      if (d.pictures.length) blocks.push('<div class="pf-block"><h2 class="h3">الشهادات والصور</h2><div data-gallery></div></div>');
      if (d.achievements.length) {
        blocks.push(`<div class="pf-block"><h2 class="h3">الإنجازات</h2>
          <ul class="ach-list">${d.achievements.map((a) => `<li class="ach"><span class="ach__text">${esc(a.text)}</span>${a.year ? `<span class="ach__year">${esc(a.year)}</span>` : ''}</li>`).join('')}</ul></div>`);
      }
      if (d.interests.length) {
        blocks.push(`<div class="pf-block"><h2 class="h3">الاهتمامات</h2>
          <ul class="tags">${d.interests.map((t) => `<li class="tag">${icon(t.ic || 'star')}${esc(t.text)}</li>`).join('')}</ul></div>`);
      }
      return `<section class="section"><div class="container pf-body">${blocks.join('')}</div></section>`;
    }

    function noticeHTML(title, text, back, backText) {
      return `<section class="section"><div class="container">
        <div class="notice" role="status">
          <span class="chip chip--off">${icon('clock')}لا يوجد محتوى بعد</span>
          <h2 class="h3">${esc(title)}</h2>
          <p>${esc(text)}</p>
          <div class="actions"><a class="btn btn--line" href="${back}">${esc(backText)}</a></div>
        </div>
      </div></section>`;
    }

    function pagerHTML() {
      if (i < 0) return '';
      const prev = list[(i - 1 + list.length) % list.length];
      const next = list[(i + 1) % list.length];
      return `<section class="section" style="padding-top: 0"><div class="container">
        <nav class="pager" aria-label="التنقل بين الطلاب">
          <a href="${href(prev)}"><small>${chev('prev')}الطالب السابق</small><b>${esc(prev.ar)}</b></a>
          <a class="pager__all" href="class-${cls.id}.html"><small>${icon('users')}</small><b>كشف الشعبة</b></a>
          <a class="pager__next" href="${href(next)}"><small>الطالب التالي${chev()}</small><b>${esc(next.ar)}</b></a>
        </nav>
      </div></section>`;
    }

    /* ----- password ----- */
    const ERR = {
      bad_password: 'كلمة المرور غير صحيحة.',
      locked: 'محاولات كثيرة خاطئة. حاول مرة أخرى بعد ربع ساعة.',
      invalid: 'تعذّر الحفظ: بعض البيانات غير صالحة.',
      too_big: 'المحتوى أو الصورة أكبر من المسموح.',
      too_many: 'وصلت إلى الحد الأعلى لعدد الصور.',
      network: 'تعذّر الاتصال. تأكد من الإنترنت وحاول مرة أخرى.',
    };
    const errText = (r) => ERR[r && r.error] || ERR.network;

    let dlg;
    function askPassword() {
      if (!dlg) {
        document.body.insertAdjacentHTML('beforeend', `<dialog class="pw-dialog" aria-labelledby="pw-title">
          <form class="pw-form" novalidate>
            <h2 class="h3" id="pw-title">تعديل ملف الإنجاز</h2>
            <label class="fld"><span>كلمة المرور</span>
              <input type="password" name="pw" autocomplete="current-password" dir="ltr" required></label>
            <p class="pw-hint">إذا لم تكن تعرف كلمة المرور أو نسيتها، تواصل مع حسن الشخص.</p>
            <p class="pw-err" role="alert"></p>
            <div class="pw-actions">
              <button class="btn btn--deep" type="submit">دخول</button>
              <button class="btn btn--line" type="button" data-close>إلغاء</button>
            </div>
          </form></dialog>`);
        dlg = document.body.lastElementChild;
        const form = dlg.querySelector('form');
        const err = dlg.querySelector('.pw-err');
        const btn = form.querySelector('[type=submit]');
        dlg.querySelector('[data-close]').addEventListener('click', () => dlg.close());
        dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); }); // click on the backdrop
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const pw = form.pw.value;
          if (!ONLINE) { err.textContent = 'خدمة الحفظ غير مفعّلة بعد.'; return; }
          if (!pw) { err.textContent = 'اكتب كلمة المرور.'; return; }
          btn.disabled = true; err.textContent = '';
          const r = await rpc('athar_check', { p_id: s.id, p_pw: pw });
          btn.disabled = false;
          if (!r.ok) { err.textContent = errText(r); return; }
          dlg.close();
          startEdit(pw);
        });
      }
      dlg.querySelector('form').reset();
      dlg.querySelector('.pw-err').textContent = '';
      dlg.showModal();
    }

    /* ----- editor ----- */
    function startEdit(pw) {
      const d = structuredClone(content(s));
      ['stats', 'achievements', 'interests', 'pictures', 'cats'].forEach((k) => { d[k] = d[k] || []; });
      edit = { pw, d, dirty: false };
      editor();
      window.scrollTo({ top: 0 });
    }
    window.addEventListener('beforeunload', (e) => { if (edit && edit.dirty) e.preventDefault(); });

    const rowBtn = (act, n, label, ic) => `<button class="ed-icon" type="button" data-act="${act}" data-n="${n}" aria-label="${label}" title="${label}">${icon(ic)}</button>`;
    const moveBtns = (list, k, n) => `${n > 0 ? rowBtn(`up-${k}`, n, 'نقل للأعلى', 'up') : ''}${rowBtn(`del-${k}`, n, 'حذف', 'close')}`;

    function editor() {
      const { d } = edit;
      el.innerHTML = headHTML(d) + `<section class="section"><div class="container">
        <form class="ed" novalidate>
          <p class="ed-lead">أنت الآن تعدّل ملف إنجازك. اضغط «حفظ التغييرات» في الأسفل عند الانتهاء.</p>

          <fieldset class="ed-card"><legend class="h3">نبذة</legend>
            <label class="fld"><span>نبذة قصيرة عنك</span><textarea name="bio" rows="3" maxlength="600" data-k="bio">${esc(d.bio || '')}</textarea></label>
            <label class="fld"><span>عبارة أو طموح (اختياري)</span><textarea name="quote" rows="2" maxlength="300" data-k="quote">${esc(d.quote || '')}</textarea></label>
          </fieldset>

          <fieldset class="ed-card"><legend class="h3">أرقام بارزة</legend>
            <p class="ed-help">مثل درجة مقياس موهبة أو المعدل. تظهر بخط كبير أعلى الصفحة.</p>
            ${d.stats.map((st, n) => `<div class="ed-row ed-row--stat">
              <label class="fld"><span>الرقم</span><input data-k="stats.${n}.value" value="${esc(st.value)}" maxlength="20"></label>
              <label class="fld"><span>الوصف</span><input data-k="stats.${n}.label" value="${esc(st.label)}" maxlength="80"></label>
              <div class="ed-tools">${moveBtns(d.stats, 'stats', n)}</div></div>`).join('')}
            <button class="btn btn--line ed-add" type="button" data-act="add-stats">${icon('plus')}إضافة رقم</button>
          </fieldset>

          <fieldset class="ed-card"><legend class="h3">الإنجازات</legend>
            ${d.achievements.map((a, n) => `<div class="ed-row ed-row--ach">
              <label class="fld"><span>الإنجاز ${n + 1}</span><textarea rows="2" data-k="achievements.${n}.text" maxlength="400">${esc(a.text)}</textarea></label>
              <label class="fld"><span>السنة (اختياري)</span><input data-k="achievements.${n}.year" value="${esc(a.year || '')}" maxlength="20"></label>
              <div class="ed-tools">${moveBtns(d.achievements, 'achievements', n)}</div></div>`).join('')}
            <button class="btn btn--line ed-add" type="button" data-act="add-achievements">${icon('plus')}إضافة إنجاز</button>
          </fieldset>

          <fieldset class="ed-card"><legend class="h3">الاهتمامات</legend>
            ${d.interests.map((t, n) => `<div class="ed-row ed-row--int">
              <label class="fld"><span>اهتمام ${n + 1}</span><input data-k="interests.${n}.text" value="${esc(t.text)}" maxlength="60"></label>
              <div class="ed-tools">${moveBtns(d.interests, 'interests', n)}</div></div>`).join('')}
            <button class="btn btn--line ed-add" type="button" data-act="add-interests">${icon('plus')}إضافة اهتمام</button>
          </fieldset>

          <fieldset class="ed-card"><legend class="h3">الشهادات والصور</legend>
            <p class="ed-help">صور فقط (JPG أو PNG). تُصغَّر الصورة تلقائياً قبل الرفع.</p>
            <div class="ed-pics">${d.pictures.map((p, n) => `<div class="ed-pic">
              <span class="ed-pic__img" style="--ar:${p.w || 4} / ${p.h || 3}">${picSrc(p) ? `<img src="${esc(p.thumb || picSrc(p))}" alt="">` : ''}</span>
              <label class="fld"><span>وصف الصورة</span><input data-k="pictures.${n}.caption" value="${esc(p.caption || '')}" maxlength="160"></label>
              <div class="ed-tools">${moveBtns(d.pictures, 'pictures', n)}</div></div>`).join('')}</div>
            <label class="btn btn--line ed-add ed-file">${icon('plus')}إضافة صور<input type="file" accept="image/*" multiple data-upload></label>
            <p class="ed-status" data-up-status role="status"></p>
          </fieldset>

          <fieldset class="ed-card"><legend class="h3">كلمة المرور</legend>
            <p class="ed-help">تتغير فوراً عند الضغط على الزر، ولا تحتاج إلى «حفظ التغييرات».</p>
            <div class="ed-row ed-row--pw">
              <label class="fld"><span>كلمة المرور الجديدة</span><input type="password" name="pw1" autocomplete="new-password" dir="ltr" minlength="6" maxlength="64"></label>
              <label class="fld"><span>أعد كتابتها</span><input type="password" name="pw2" autocomplete="new-password" dir="ltr" maxlength="64"></label>
            </div>
            <button class="btn btn--line" type="button" data-act="password">تغيير كلمة المرور</button>
            <p class="ed-status" data-pw-status role="status"></p>
          </fieldset>

          <div class="ed-bar">
            <button class="btn btn--deep" type="submit">حفظ التغييرات</button>
            <button class="btn btn--line" type="button" data-act="cancel">إلغاء</button>
            <p class="ed-status" data-save-status role="status"></p>
          </div>
        </form>
      </div></section>`;

      const form = el.querySelector('.ed');
      form.addEventListener('input', (e) => {
        const k = e.target.dataset.k;
        if (!k) return;
        const path = k.split('.');
        const last = path.pop();
        path.reduce((o, p) => o[p], d)[last] = e.target.value;
        edit.dirty = true;
      });
      form.addEventListener('click', (e) => {
        const b = e.target.closest('[data-act]');
        if (!b) return;
        const [act, k] = b.dataset.act.split('-');
        const n = +b.dataset.n;
        if (act === 'add') {
          d[k].push(k === 'stats' ? { value: '', label: '' } : k === 'achievements' ? { text: '', year: '' } : { text: '', ic: '' });
          rerender(`[data-k^="${k}.${d[k].length - 1}."]`);
        } else if (act === 'del') {
          if (k === 'pictures' && !confirm('حذف هذه الصورة؟')) return;
          d[k].splice(n, 1); rerender();
        } else if (act === 'up') {
          [d[k][n - 1], d[k][n]] = [d[k][n], d[k][n - 1]]; rerender();
        } else if (act === 'cancel') {
          if (edit.dirty && !confirm('تجاهل التغييرات غير المحفوظة؟')) return;
          edit = null; view();
        } else if (act === 'password') changePassword(form);
        if (act === 'add' || act === 'del' || act === 'up') edit.dirty = true;
      });
      form.querySelector('[data-upload]').addEventListener('change', (e) => upload([...e.target.files]));
      form.addEventListener('submit', (e) => { e.preventDefault(); save(form); });
    }

    // re-draw the editor in place, keeping the scroll position
    function rerender(focusSel) {
      const y = window.scrollY;
      editor();
      window.scrollTo({ top: y, behavior: 'instant' });
      if (focusSel) el.querySelector(focusSel)?.focus();
    }

    // shrink to at most 1600px on the long side, JPEG ~0.82
    async function shrink(file) {
      const bmp = await createImageBitmap(file);
      const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
      const w = Math.round(bmp.width * scale);
      const h = Math.round(bmp.height * scale);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); // transparent PNGs get a white page, not black
      ctx.drawImage(bmp, 0, 0, w, h);
      bmp.close?.();
      return { url: c.toDataURL('image/jpeg', 0.82), w, h };
    }

    async function upload(files) {
      const status = el.querySelector('[data-up-status]');
      let failed = 0;
      for (const [n, file] of files.entries()) {
        status.textContent = `جارٍ رفع الصورة ${n + 1} من ${files.length}…`;
        let img;
        try { img = await shrink(file); } catch { failed++; continue; } // e.g. HEIC on a browser that can't read it
        const r = await rpc('athar_upload', { p_id: s.id, p_pw: edit.pw, p_mime: 'image/jpeg', p_b64: img.url.split(',')[1] });
        if (!r.ok) { status.textContent = errText(r); return; }
        media[r.id] = img.url;
        edit.d.pictures.push({ media: r.id, w: img.w, h: img.h, caption: '' });
        edit.dirty = true;
        rerender();
      }
      el.querySelector('[data-up-status]').textContent = failed
        ? `تعذّرت قراءة ${failed} من الملفات. جرّب صورة بصيغة JPG أو PNG.`
        : 'تم رفع الصور. اكتب وصفاً لكل صورة ثم احفظ التغييرات.';
    }

    async function changePassword(form) {
      const status = el.querySelector('[data-pw-status]');
      const a = form.pw1.value;
      if (a.length < 6) { status.textContent = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.'; return; }
      if (a !== form.pw2.value) { status.textContent = 'كلمتا المرور غير متطابقتين.'; return; }
      status.textContent = 'جارٍ التغيير…';
      const r = await rpc('athar_set_password', { p_id: s.id, p_pw: edit.pw, p_new: a });
      if (!r.ok) { status.textContent = errText(r); return; }
      edit.pw = a;
      form.pw1.value = ''; form.pw2.value = '';
      status.textContent = 'تم تغيير كلمة المرور.';
    }

    async function save(form) {
      const status = el.querySelector('[data-save-status]');
      const btn = form.querySelector('[type=submit]');
      const { d } = edit;
      const trim = (v) => String(v || '').trim();
      const clean = {
        ...d,
        bio: trim(d.bio),
        quote: trim(d.quote),
        stats: d.stats.map((x) => ({ value: trim(x.value), label: trim(x.label) })).filter((x) => x.value || x.label),
        achievements: d.achievements.map((x) => ({ text: trim(x.text), year: trim(x.year) })).filter((x) => x.text),
        interests: d.interests.map((x) => ({ ...x, text: trim(x.text) })).filter((x) => x.text),
        pictures: d.pictures.map((x) => ({ ...x, caption: trim(x.caption) })),
      };
      btn.disabled = true;
      status.textContent = 'جارٍ الحفظ…';
      const r = await rpc('athar_save', { p_id: s.id, p_pw: edit.pw, p_data: clean });
      btn.disabled = false;
      if (!r.ok) { status.textContent = errText(r); return; }
      saved[s.id] = clean;
      edit = null;
      view();
      window.scrollTo({ top: 0 });
      toast('تم حفظ ملف الإنجاز.');
    }

    function toast(text) {
      const t = document.createElement('p');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      t.textContent = text;
      document.body.append(t);
      setTimeout(() => t.remove(), 3200);
    }

    if (!ONLINE || !s) { view(); return; }
    // draw once the saved version is known (or after 4s), so the page doesn't change under the reader
    Promise.race([savedReady, new Promise((r) => { setTimeout(r, 4000); })]).then(async () => {
      view();
      if (!(saved[s.id]?.pictures || []).some((p) => p.media)) return;
      try {
        (await get(`media?select=id,mime,data&student_id=eq.${encodeURIComponent(s.id)}`))
          .forEach((m) => { media[m.id] = `data:${m.mime};base64,${m.data}`; });
      } catch { return; } // pictures stay hidden; text still shows
      if (!edit) fillGallery(content(s));
    });
  }

  document.querySelectorAll('[data-roster]').forEach(roster);
  document.querySelectorAll('[data-viz]').forEach(viz);
  document.querySelectorAll('[data-student]').forEach(student);
  counts();
  onLang(counts); // the language switch rewrites text, so put the numbers back
  savedReady.then(counts);

  window.Portfolio = { hasPortfolio, href, STUDENTS, CLASSES };
})();
