/* ثانوية الجبر العلمية للموهوبين — shared script for every page.
   Header, signature and footer; the Arabic / English switch; gallery and
   picture viewer. Plain JavaScript, no libraries. The scroll scenes are
   plain CSS (site.css); this file only helps keyboard users through them.

   Translating text: write the Arabic in the HTML and the English in a
   data-en attribute:  <h2 data-en="Our grades">المراحل الدراسية</h2>
   (also data-en-alt for image alt text and data-en-aria for aria-label). */
(() => {
  'use strict';

  const html = document.documentElement;
  const KEY = 'aljabr.lang';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // portfolio pages (student.html) are Arabic only: no switch, stored choice ignored
  const arOnly = document.body.hasAttribute('data-ar-only');
  let lang = html.lang === 'en' && !arOnly ? 'en' : 'ar';
  const listeners = [];

  const T = (o) => (o == null ? '' : typeof o === 'object' ? (o[lang] ?? o.ar ?? '') : String(o));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- icons (24px line icons, one stroke weight) ---------- */
  const ICONS = {
    chevronR: '<path d="m9 6 6 6-6 6"/>',
    chevronL: '<path d="m15 6-6 6 6 6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    file: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    medal: '<circle cx="12" cy="15" r="5"/><path d="M8.5 11 6 3h4l2 4 2-4h4l-2.5 8"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
    sparkle: '<path d="M12 3c.6 4.2 2.2 5.8 6.4 6.4-4.2.6-5.8 2.2-6.4 6.4-.6-4.2-2.2-5.8-6.4-6.4C9.8 8.8 11.4 7.2 12 3z"/>',
    book: '<path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/>',
    graduation: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M12.5 15H17"/>',
    flow: '<rect x="3" y="3" width="7" height="6" rx="1.5"/><rect x="14" y="15" width="7" height="6" rx="1.5"/><path d="M6.5 9v3a3 3 0 0 0 3 3h4.5"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    robot: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9.5 16.5h5M2 12v3M22 12v3"/><circle cx="9" cy="12.5" r="1"/><circle cx="15" cy="12.5" r="1"/>',
    cube: '<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
    drone: '<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/><path d="m7 7 2 2M17 7l-2 2M7 17l2-2M17 17l-2-2"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3"/><path d="M7 15h10"/>',
    atom: '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
    sigma: '<path d="M18 4H6l6 8-6 8h12"/>',
    dna: '<path d="M7 3c0 6 10 6 10 12s-3 6-3 6M17 3c0 6-10 6-10 12s3 6 3 6M8.5 7h7M8.5 17h7"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14a6.5 6.5 0 0 1 3 6"/>',
    camera: '<path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/>',
    film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    ball: '<circle cx="12" cy="12" r="9"/><path d="m12 7 4 3-1.5 4.5h-5L8 10z"/>',
    run: '<circle cx="14.5" cy="4.5" r="2"/><path d="M7 21l3-6 3 2.5V22M6 12l3.5-4h5l2 4 3.5 1M10 15l-1.5-3"/>',
    pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    up: '<path d="m6 15 6-6 6 6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    flag: '<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
    chat: '<path d="M4 5h16v10H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1.1.9-2 2-2H17a4 4 0 0 0 4-4c0-4.4-4-7.5-9-7.5z"/>',
  };
  const icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.star}</svg>`;

  /* ---------- header, signature, footer ---------- */
  const NAV = [
    { id: 'home', href: 'index.html', ar: 'الرئيسية', en: 'Home' },
    { id: 'g10', href: 'grade-10.html', ar: 'الصف الأول', en: 'Grade 10' },
    { id: 'g11', href: 'grade-11.html', ar: 'الصف الثاني', en: 'Grade 11' },
    { id: 'g12', href: 'grade-12.html', ar: 'الصف الثالث', en: 'Grade 12' },
    { id: 'pf', href: 'index.html#grades', ar: 'ملفات الإنجاز', en: 'Portfolios' },
  ];

  const barHTML = (page) => `
    <div class="container bar">
      <a class="bar__home" href="index.html" aria-label="الرئيسية: منصة أثر" data-en-aria="Home: Athar Platform">
        <img class="bar__moe" src="assets/img/logos/moe-white.svg" width="54" height="42" alt="">
        <span class="bar__rule" aria-hidden="true"></span>
        <img class="bar__maw" src="assets/img/logos/mawhiba-white.svg" width="133" height="48" alt="">
      </a>
      <nav class="bar__nav" id="site-nav" aria-label="القائمة الرئيسية" data-en-aria="Main menu">
        ${NAV.map((n) => `<a href="${n.href}" data-en="${n.en}"${n.id === page ? ' aria-current="page"' : ''}>${n.ar}</a>`).join('')}
      </nav>
      ${arOnly ? '' : `<button class="pill-btn lang-btn" type="button" data-lang-toggle>${icon('globe')}<span></span></button>`}
      <button class="pill-btn menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="القائمة" data-en-aria="Menu">${icon('menu')}</button>
    </div>
    <span class="bar__progress" aria-hidden="true"></span>`;

  // The maker's signature (every page) and the supervisor's (home page only, below it).
  const signHTML = (isHome, isMaker) => `
    <div class="container sign__in">
      <p class="sign__role" data-en="Prepared &amp; developed by">بإعداد وتنفيذ</p>
      ${isMaker
        ? '<p class="sign__name" data-en="Hassan Hamzah Alshakhs">حسن حمزة الشخص</p>'
        : '<a class="sign__name" href="hassan.html" data-en="Hassan Hamzah Alshakhs">حسن حمزة الشخص</a>'}
      <p class="sign__meta" data-en="Grade 11 student, class 202">طالب بالصف الثاني الثانوي، الشعبة 202</p>
      ${isMaker ? '' : `<a class="btn btn--deep" href="hassan.html">${icon('file')}<span data-en="Site creator’s portfolio">ملف إنجاز معدّ الموقع</span></a>`}
      ${isHome ? `<div class="sign__sup">
        <p class="sign__role" data-en="Under the supervision of">بإشراف</p>
        <p class="sign__sup-name" data-en="Mr. Nabeel Algharash">الأستاذ نبيل الغراش</p>
      </div>` : ''}
    </div>`;

  const footerHTML = () => `
    <div class="container footer__top">
      <div class="footer__id">
        <img src="assets/img/logos/moe-white.svg" width="54" height="42" alt="وزارة التعليم" data-en-alt="Ministry of Education">
        <img class="is-wide" src="assets/img/logos/mawhiba-white.svg" width="133" height="48" alt="موهبة" data-en-alt="Mawhiba">
        <b data-en="Athar Platform · Al-Jabr Scientific Secondary School for the Gifted">منصة أثر · ثانوية الجبر العلمية للموهوبين</b>
      </div>
      <nav class="footer__nav" aria-label="الصفحات" data-en-aria="Pages">
        ${NAV.map((n) => `<a href="${n.href}" data-en="${n.en}">${n.ar}</a>`).join('')}
      </nav>
    </div>
    <div class="footer__bottom"><div class="container">
      <span>© <span data-year></span></span>
      <span data-en="Al-Ahsa, Kingdom of Saudi Arabia">الأحساء، المملكة العربية السعودية</span>
    </div></div>`;

  /* ---------- language ---------- */
  function applyLang(next) {
    lang = next;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-en]').forEach((el) => {
      if (el.dataset.ar === undefined) el.dataset.ar = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.ar;
    });
    document.querySelectorAll('[data-en-alt]').forEach((el) => {
      if (el.dataset.arAlt === undefined) el.dataset.arAlt = el.alt;
      el.alt = lang === 'en' ? el.dataset.enAlt : el.dataset.arAlt;
    });
    document.querySelectorAll('[data-en-aria]').forEach((el) => {
      if (el.dataset.arAria === undefined) el.dataset.arAria = el.getAttribute('aria-label') || '';
      el.setAttribute('aria-label', lang === 'en' ? el.dataset.enAria : el.dataset.arAria);
    });
    document.querySelectorAll('[data-lang-toggle]').forEach((b) => {
      const s = b.querySelector('span');
      s.textContent = lang === 'ar' ? 'English' : 'العربية';
      s.setAttribute('lang', lang === 'ar' ? 'en' : 'ar');
      b.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    });
    html.classList.remove('i18n-pending');
    listeners.forEach((fn) => fn(lang));
  }
  const onLang = (fn) => listeners.push(fn);

  // Runs fn once, the first time el scrolls into view.
  const onView = (el, fn, threshold = 0.35) => {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { fn(); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); fn(); } }, { threshold });
    io.observe(el);
  };

  /* ---------- picture viewer ----------
     Where the browser supports View Transitions, the picture grows out of the
     thumbnail that was clicked and shrinks back into it when closed. */
  let lb = null;
  let lbItems = [];
  let lbIndex = 0;
  let lbStart = 0;
  let lbOpener = null;
  const canMorph = () => !reduceMotion && typeof document.startViewTransition === 'function';

  function buildLightbox() {
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = `
      <div class="lb__top"><span class="lb__count num"></span>
        <div class="lb__tools">
          <a class="lb__btn lb__open" target="_blank" rel="noopener">${icon('external')}</a>
          <button class="lb__btn lb__close" type="button">${icon('close')}</button>
        </div></div>
      <div class="lb__stage">
        <button class="lb__btn lb__nav lb__prev" type="button">${icon('chevronL', 'flip-rtl')}</button>
        <img class="lb__img" alt="">
        <button class="lb__btn lb__nav lb__next" type="button">${icon('chevronR', 'flip-rtl')}</button>
      </div>
      <div class="lb__cap"><p></p></div>`;
    document.body.appendChild(lb);
    lb.querySelector('.lb__close').addEventListener('click', closeLightbox);
    lb.querySelector('.lb__prev').addEventListener('click', () => showItem(lbIndex - 1));
    lb.querySelector('.lb__next').addEventListener('click', () => showItem(lbIndex + 1));
    lb.querySelector('.lb__stage').addEventListener('click', (e) => { if (e.target.classList.contains('lb__stage')) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      // keyboard changes are instant: no animation on repeated key presses
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') showItem(lbIndex + (lang === 'ar' ? -1 : 1), { instant: true });
      else if (e.key === 'ArrowLeft') showItem(lbIndex + (lang === 'ar' ? 1 : -1), { instant: true });
    });
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) showItem(lbIndex + ((dx < 0) === (lang === 'en') ? 1 : -1));
    });
    window.addEventListener('resize', () => { if (lb.classList.contains('is-open')) fitImage(lbItems[lbIndex]); });
  }

  // Size the picture to fit the screen from its known dimensions, so it has
  // its final size even before the full-resolution file has loaded.
  function fitImage(it) {
    const img = lb.querySelector('.lb__img');
    const stage = lb.querySelector('.lb__stage');
    const sw = stage.clientWidth - (window.innerWidth > 640 ? 144 : 16);
    const sh = stage.clientHeight - 8;
    const k = Math.min(sw / it.w, sh / it.h, 1.5);
    img.style.width = `${Math.round(it.w * k)}px`;
    img.style.height = `${Math.round(it.h * k)}px`;
  }

  function showItem(i, { instant = false } = {}) {
    const n = lbItems.length;
    lbIndex = (i + n) % n;
    const it = lbItems[lbIndex];
    const img = lb.querySelector('.lb__img');
    fitImage(it);
    // A short dip in opacity marks the change of picture.
    if (!instant) {
      img.classList.add('is-swapping');
      requestAnimationFrame(() => requestAnimationFrame(() => img.classList.remove('is-swapping')));
    }
    // Show the (usually cached) thumbnail at once, then swap in the full file.
    img.src = it.thumb || it.src;
    img.alt = T(it.cap);
    const full = new Image();
    full.onload = () => { if (lbItems[lbIndex] === it) img.src = it.src; };
    full.src = it.src;

    lb.querySelector('.lb__count').textContent = T({ ar: `${lbIndex + 1} من ${n}`, en: `${lbIndex + 1} / ${n}` });
    lb.querySelector('.lb__cap p').innerHTML = esc(T(it.cap)) + (it.sub ? `<small>${esc(T(it.sub))}</small>` : '');
    const open = lb.querySelector('.lb__open');
    open.href = it.src;
    open.setAttribute('aria-label', T({ ar: 'فتح الصورة بالحجم الكامل', en: 'Open full size' }));
    lb.querySelector('.lb__close').setAttribute('aria-label', T({ ar: 'إغلاق', en: 'Close' }));
    lb.querySelector('.lb__prev').setAttribute('aria-label', T({ ar: 'السابق', en: 'Previous' }));
    lb.querySelector('.lb__next').setAttribute('aria-label', T({ ar: 'التالي', en: 'Next' }));
    lb.querySelectorAll('.lb__nav').forEach((b) => { b.hidden = n < 2; });
    [lbIndex + 1, lbIndex - 1].forEach((k) => { const p = lbItems[(k + n) % n]; if (p) new Image().src = p.src; });
  }

  const thumbOf = (el) => (el && (el.matches('img') ? el : el.querySelector('img'))) || null;
  const onScreen = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight && r.width > 0; };

  function openLightbox(items, index = 0, opener = null) {
    if (!items || !items.length) return;
    if (!lb) buildLightbox();
    lbItems = items;
    lbOpener = opener;
    lbStart = index;
    lb.setAttribute('aria-label', T({ ar: 'عارض الصور', en: 'Image viewer' }));
    const img = lb.querySelector('.lb__img');
    const thumb = thumbOf(opener);
    const show = () => {
      showItem(index, { instant: true });
      lb.classList.add('is-open');
      html.style.overflow = 'hidden';
      // keep Tab inside the viewer while it is open
      [...document.body.children].forEach((el) => { if (el !== lb) el.inert = true; });
      lb.querySelector('.lb__close').focus({ preventScroll: true });
    };
    if (canMorph() && thumb && onScreen(thumb)) {
      lb.classList.add('no-fade');
      thumb.style.viewTransitionName = 'lb-media';
      const vt = document.startViewTransition(async () => {
        thumb.style.viewTransitionName = '';
        img.style.viewTransitionName = 'lb-media';
        show();
        // let the picture paint before the browser takes the "after" snapshot
        await Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 160))]);
      });
      vt.finished.finally(() => { img.style.viewTransitionName = ''; lb.classList.remove('no-fade'); });
    } else {
      show();
    }
  }

  function closeLightbox() {
    // the page must be focusable again before focus returns to the opener below
    [...document.body.children].forEach((el) => { el.inert = false; });
    const img = lb.querySelector('.lb__img');
    const thumb = lbIndex === lbStart ? thumbOf(lbOpener) : null;
    const hide = () => {
      lb.classList.remove('is-open');
      html.style.overflow = '';
      [...document.body.children].forEach((el) => { el.inert = false; });
    };
    if (canMorph() && thumb && onScreen(thumb)) {
      lb.classList.add('no-fade');
      img.style.viewTransitionName = 'lb-media';
      const vt = document.startViewTransition(() => {
        img.style.viewTransitionName = '';
        thumb.style.viewTransitionName = 'lb-media';
        hide();
      });
      vt.finished.finally(() => { thumb.style.viewTransitionName = ''; lb.classList.remove('no-fade'); });
    } else {
      hide();
    }
    if (lbOpener) lbOpener.focus({ preventScroll: true });
  }

  /* ---------- media from tools/build-media.ps1 ---------- */
  const loose = (k) => String(k).normalize('NFC').replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();

  // Turns a student's generated media list into gallery items, adding captions.
  // captions: { "<file name inside the student's folder>": { ar, en, cat, sub } }
  function mediaItems(slug, captions = {}) {
    const list = (window.MEDIA && window.MEDIA[slug]) || [];
    const map = new Map(Object.entries(captions).map(([k, v]) => [loose(k), v]));
    const out = [];
    list.forEach((m, n) => {
      const c = map.get(loose(m.key)) || {};
      const fallback = /[؀-ۿ]/.test(m.key)
        ? { ar: m.key.replace(/^.*\//, '').replace(/\.[^.]+$/, '').trim(), en: m.type === 'pdf' ? `Document ${n + 1}` : `Photo ${n + 1}` }
        : { ar: m.type === 'pdf' ? `مستند ${n + 1}` : `صورة ${n + 1}`, en: m.type === 'pdf' ? `Document ${n + 1}` : `Photo ${n + 1}` };
      m.pages.forEach((p, i) => out.push({
        ...p,
        type: m.type,
        key: m.key,
        cat: c.cat || null,
        cap: c.ar ? { ar: c.ar, en: c.en || c.ar } : fallback,
        sub: m.pages.length > 1 ? { ar: `صفحة ${i + 1} من ${m.pages.length}`, en: `Page ${i + 1} of ${m.pages.length}` } : (c.sub || null),
      }));
    });
    return out;
  }

  /* ---------- gallery ---------- */
  // cats: optional [{ id, ar, en }] -> filter buttons.
  // watchLang: false when the caller already re-renders on language change.
  // Captions show in the picture viewer, not under the thumbnails.
  function gallery(el, items, cats = null, { watchLang = true } = {}) {
    let current = 'all';
    const render = () => {
      const list = current === 'all' ? items : items.filter((i) => i.cat === current);
      const filters = cats ? `<div class="g-filters" role="group" aria-label="${esc(T({ ar: 'تصنيف الصور', en: 'Filter pictures' }))}">${[{ id: 'all', ar: 'الكل', en: 'All' }, ...cats].map((c) => {
        const n = c.id === 'all' ? items.length : items.filter((i) => i.cat === c.id).length;
        return n ? `<button type="button" class="g-filter${c.id === current ? ' is-on' : ''}" data-cat="${c.id}" aria-pressed="${c.id === current}">${esc(T(c))}<span class="num">${n}</span></button>` : '';
      }).join('')}</div>` : '';
      el.innerHTML = `${filters}<div class="gallery">${list.map((it, i) => `
        <button type="button" class="g-item" data-i="${i}" style="--ar:${it.w} / ${it.h}">
          <img src="${it.thumb}" alt="${esc(T(it.cap))}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async">
        </button>`).join('')}</div>`;
      el.querySelectorAll('.g-filter').forEach((b) => b.addEventListener('click', () => { current = b.dataset.cat; render(); }));
      el.querySelectorAll('.g-item').forEach((b) => b.addEventListener('click', () => openLightbox(list, +b.dataset.i, b)));
    };
    render();
    if (watchLang) onLang(render);
  }

  /* ---------- page setup ---------- */
  const page = document.body.dataset.page || '';
  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.classList.add('site-header');
    header.insertAdjacentHTML('beforebegin', '<a class="skip-link" href="#main" data-en="Skip to content">تخطَّ إلى المحتوى</a>');
    header.innerHTML = barHTML(page);
  }
  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.classList.add('site-footer');
    const sign = document.createElement('section');
    sign.className = 'sign';
    sign.setAttribute('aria-label', 'إعداد الموقع');
    sign.dataset.enAria = 'Website credits';
    sign.innerHTML = signHTML(footer.dataset.siteFooter === 'home', footer.dataset.siteFooter === 'maker');
    footer.before(sign);
    footer.innerHTML = footerHTML();
  }

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-icon]').forEach((el) => { el.outerHTML = icon(el.dataset.icon, el.dataset.iconClass || ''); });

  applyLang(lang);

  document.querySelectorAll('[data-lang-toggle]').forEach((b) => b.addEventListener('click', () => {
    const next = lang === 'ar' ? 'en' : 'ar';
    try { localStorage.setItem(KEY, next); } catch (e) { /* private mode: still switch for this page */ }
    applyLang(next);
  }));

  if (header) {
    const btn = header.querySelector('.menu-btn');
    const nav = header.querySelector('#site-nav');
    const setMenu = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', (e) => { if (!header.contains(e.target)) setMenu(false); });
    window.matchMedia('(min-width: 1001px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* ---------- scroll scenes ----------
     Inside a pinned scene, what shows depends on how far the page is scrolled.
     Something reached with the Tab key could be hidden (a later beat) or off
     screen (a card in the moving reel), so scroll to where it is in view. */
  const sda = !!(window.CSS && CSS.supports && CSS.supports('(animation-timeline: view()) and (animation-range: entry)'));
  const scrollScene = (scene, p) => requestAnimationFrame(() => {
    const top = scene.getBoundingClientRect().top + window.scrollY;
    const start = top - (header ? header.offsetHeight : 0);
    const end = top + scene.offsetHeight - window.innerHeight;
    window.scrollTo({ top: start + p * Math.max(0, end - start), behavior: 'instant' });
  });
  if (sda) {
    // points where each beat is fully shown (match the beat ranges in site.css)
    const AT = { 2: [0.2, 0.8], 3: [0.12, 0.5, 0.88] };
    document.querySelectorAll('.scene--pin .beats').forEach((beats) => {
      const scene = beats.closest('.scene--pin');
      const kids = [...beats.children];
      beats.addEventListener('focusin', (e) => {
        const i = kids.indexOf(e.target.closest('.beat'));
        if (i >= 0 && AT[kids.length]) scrollScene(scene, AT[kids.length][i]);
      });
    });
  }
  if (sda && !reduceMotion) {
    document.querySelectorAll('.scene--reel').forEach((scene) => {
      const cards = [...scene.querySelectorAll('.reel__card')];
      scene.addEventListener('focusin', (e) => {
        const i = cards.indexOf(e.target.closest('.reel__card'));
        // matches "contain 4% 96%" in site.css
        if (i >= 0) scrollScene(scene, 0.04 + 0.92 * (cards.length > 1 ? i / (cards.length - 1) : 0));
      });
    });
  }

  window.Site = {
    get lang() { return lang; },
    T, esc, icon, onLang, onView, gallery, mediaItems, openLightbox, reduceMotion, sda,
  };
})();
