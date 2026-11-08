/* Class 202 student list (class-202.html), the class at a glance (home page)
   and student portfolios (student.html?id=...).
   Content lives in students.js; pictures in media.js. */
(() => {
  'use strict';
  const { T, esc, icon, onLang, gallery, mediaItems } = window.Site;
  const STUDENTS = window.STUDENTS || [];

  const hasPortfolio = (s) => !!(s.bio || s.achievements || s.interests || (window.MEDIA && (window.MEDIA[s.id] || []).length));
  const href = (s) => s.href || `student.html?id=${encodeURIComponent(s.id)}`;
  const name = (s) => T({ ar: s.ar, en: s.en });
  const available = STUDENTS.filter(hasPortfolio).length;
  const chev = (dir) => icon(dir === 'prev' ? 'chevronL' : 'chevronR', 'flip-rtl');
  const isWord = (v) => /[^\d.,%+\s]/.test(v); // "الثاني" is set smaller than a number like 1584

  /* ---------- class list: one card per student ---------- */
  function roster(el) {
    const render = () => {
      el.innerHTML = `<ol class="roster">${STUDENTS.map((s, i) => {
        const has = hasPortfolio(s);
        const cls = `st${has ? '' : ' st--off'}${s.featured ? ' st--me' : ''}`;
        // a raised, colored card already says "open me"; only the exceptions get a label
        const state = s.featured
          ? `<span class="chip chip--glass">${T({ ar: 'معدّ الموقع', en: 'Built this site' })}</span>`
          : has ? '' : T({ ar: 'غير متاح حالياً', en: 'Not available yet' });
        return `<li><a class="${cls}" href="${href(s)}" data-accent="${s.accent || 'emerald'}">
          <span class="st__no">${i + 1}</span>
          <span class="st__name">${esc(name(s))}</span>
          ${state ? `<span class="st__go">${state}</span>` : ''}
        </a></li>`;
      }).join('')}</ol>`;
    };
    render();
    onLang(render);
  }

  /* ---------- the class at a glance: a square per student ---------- */
  function viz(el) {
    let k = 0;
    el.innerHTML = STUDENTS.map((s) => (hasPortfolio(s) ? `<i class="on${s.featured ? ' me' : ''}" style="--k: ${k++}"></i>` : '<i></i>')).join('');
  }

  /* ---------- one student ---------- */
  function student(el) {
    const id = new URLSearchParams(location.search).get('id');
    const i = STUDENTS.findIndex((s) => s.id === id);
    const s = STUDENTS[i];
    if (s && s.href) { location.replace(s.href); return; }
    if (s) el.dataset.accent = s.accent || 'emerald';

    const render = () => {
      if (!s) {
        document.title = T({ ar: 'الطالب غير موجود | ثانوية الجبر للموهوبين', en: 'Student not found | Al-Jabr Secondary School for the Gifted' });
        el.innerHTML = headHTML(null) + noticeHTML(
          { ar: 'لم يُعثر على الطالب', en: 'Student not found' },
          { ar: 'تأكد من الرابط، أو اختر الطالب من كشف الشعبة 202.', en: 'Check the link, or choose the student from the class 202 list.' },
        );
        return;
      }
      document.title = `${name(s)} | ${T({ ar: 'ملف الإنجاز', en: 'Achievement portfolio' })}`;
      const has = hasPortfolio(s);
      el.innerHTML = headHTML(s) + (has ? bodyHTML(s) : noticeHTML(
        { ar: 'ملف الإنجاز غير متاح حالياً', en: 'This portfolio is not available yet' },
        { ar: 'لم يُرفع ملف هذا الطالب بعد، وسيظهر هنا عند توفره.', en: 'It has not been added yet. It will appear here when it is ready.' },
      )) + pagerHTML(i);
      if (has) {
        const items = mediaItems(s.id, s.captions);
        const g = el.querySelector('[data-gallery]');
        if (g && items.length) gallery(g, items, s.cats || null, { watchLang: false });
      }
    };
    render();
    onLang(render);
  }

  const crumbsHTML = (s) => `<nav class="crumbs" aria-label="${T({ ar: 'مسار التصفح', en: 'Breadcrumb' })}">
      <a href="index.html">${T({ ar: 'الرئيسية', en: 'Home' })}</a>${chev()}
      <a href="grade-11.html">${T({ ar: 'الصف الثاني الثانوي', en: 'Grade 11' })}</a>${chev()}
      ${s ? `<a href="class-202.html">${T({ ar: 'الشعبة 202', en: 'Class 202' })}</a>`
    : `<span aria-current="page">${T({ ar: 'الشعبة 202', en: 'Class 202' })}</span>`}
    </nav>`;

  function headHTML(s) {
    const other = Site.lang === 'ar' ? 'en' : 'ar';
    return `<div class="head"><div class="container head__in">
      ${crumbsHTML(s)}
      <h1 class="head__title rise">${s ? esc(name(s)) : T({ ar: 'ملف الإنجاز', en: 'Achievement portfolio' })}</h1>
      ${s ? `<p class="pf-alt rise" style="--i: 1" lang="${other}">${esc(s[other])}</p>
      <p class="head__sub rise" style="--i: 1">${T({ ar: 'الصف الثاني الثانوي، الشعبة 202', en: 'Grade 11, class 202' })}</p>
      ${s.stats ? `<div class="pf-stats rise" style="--i: 2">${s.stats.map((st) => `<p class="pf-stat"><b${isWord(T(st.v)) ? ' class="is-word"' : ''}>${esc(T(st.v))}${st.suffix ? esc(st.suffix) : ''}</b><span>${esc(T(st))}</span></p>`).join('')}</div>` : ''}` : ''}
    </div></div>`;
  }

  function bodyHTML(s) {
    const blocks = [];
    if (s.bio || s.quote) {
      blocks.push(`<div class="pf-block reveal">
        ${s.bio ? `<p class="pf-bio">${esc(T(s.bio))}</p>` : ''}
        ${s.quote ? `<blockquote class="pf-quote">«${esc(T(s.quote))}»</blockquote>` : ''}</div>`);
    }
    if (window.MEDIA && (window.MEDIA[s.id] || []).length) {
      blocks.push(`<div class="pf-block"><h2 class="h3">${T({ ar: 'الشهادات والصور', en: 'Certificates & photos' })}</h2><div data-gallery></div></div>`);
    }
    if (s.achievements) {
      blocks.push(`<div class="pf-block"><h2 class="h3">${T({ ar: 'الإنجازات', en: 'Achievements' })}</h2>
        <ul class="ach-list">${s.achievements.map((a) => `<li class="ach"><span class="ach__text">${esc(T(a))}</span>${a.year ? `<span class="ach__year">${esc(T(a.year))}</span>` : ''}</li>`).join('')}</ul></div>`);
    }
    if (s.interests) {
      blocks.push(`<div class="pf-block"><h2 class="h3">${T({ ar: 'الاهتمامات', en: 'Interests' })}</h2>
        <ul class="tags">${s.interests.map((t) => `<li class="tag">${icon(t.ic)}${esc(T(t))}</li>`).join('')}</ul></div>`);
    }
    return `<section class="section"><div class="container pf-body">${blocks.join('')}</div></section>`;
  }

  function noticeHTML(title, text) {
    return `<section class="section"><div class="container">
      <div class="notice" role="status">
        <span class="chip chip--off">${icon('clock')}${T({ ar: 'غير متاح حالياً', en: 'Not available yet' })}</span>
        <h2 class="h3">${esc(T(title))}</h2>
        <p>${esc(T(text))}</p>
        <div class="actions"><a class="btn btn--line" href="class-202.html">${T({ ar: 'العودة إلى كشف الشعبة 202', en: 'Back to the class 202 list' })}</a></div>
      </div>
    </div></section>`;
  }

  function pagerHTML(i) {
    if (i < 0) return '';
    const prev = STUDENTS[(i - 1 + STUDENTS.length) % STUDENTS.length];
    const next = STUDENTS[(i + 1) % STUDENTS.length];
    return `<section class="section" style="padding-top: 0"><div class="container">
      <nav class="pager" aria-label="${T({ ar: 'التنقل بين الطلاب', en: 'Student navigation' })}">
        <a href="${href(prev)}"><small>${chev('prev')}${T({ ar: 'الطالب السابق', en: 'Previous' })}</small><b>${esc(name(prev))}</b></a>
        <a class="pager__all" href="class-202.html"><small>${icon('users')}</small><b>${T({ ar: 'كشف الشعبة', en: 'Class list' })}</b></a>
        <a class="pager__next" href="${href(next)}"><small>${T({ ar: 'الطالب التالي', en: 'Next' })}${chev()}</small><b>${esc(name(next))}</b></a>
      </nav>
    </div></section>`;
  }

  const counts = () => {
    document.querySelectorAll('[data-count-students]').forEach((e) => { e.textContent = STUDENTS.length; });
    document.querySelectorAll('[data-count-portfolios]').forEach((e) => { e.textContent = available; });
  };

  document.querySelectorAll('[data-roster]').forEach(roster);
  document.querySelectorAll('[data-viz]').forEach(viz);
  document.querySelectorAll('[data-student]').forEach(student);
  counts();
  onLang(counts); // the language switch rewrites text, so put the numbers back

  window.Portfolio = { hasPortfolio, href, STUDENTS };
})();
