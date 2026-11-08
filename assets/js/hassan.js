/* Hassan Hamzah Alshakhs — portfolio page: every certificate opens in the
   picture viewer. The scroll scenes are CSS (site.css, hassan.css). Needs site.js. */
(() => {
  'use strict';
  const { mediaItems, openLightbox, onLang } = window.Site;

  // data-lb="n" on a button opens picture n of this list
  const CAPTIONS = {
    'gri/gri.PDF': { ar: 'شهادة إتمام برنامج موهبة الإثرائي البحثي، كاكست، يوليو 2026', en: 'Certificate of completion, Mawhiba Research Enrichment Program, KACST, July 2026' },
    'ibda3/شهادة المشاركة في معرض إبداع بالمدينة المنورة.jpg': { ar: 'شهادة شكر وتقدير، معرض «إبداع 2026» بالمدينة المنورة', en: 'Certificate of appreciation, Ibdaa 2026 exhibition, Madinah' },
    'ibda3/صورة جماعية من معرض إبداع مع زملائي ومدير المدرسة (أنا الممسك بيد المدير اليمنى).jpg': { ar: 'مع زملائي ومدير المدرسة في معرض «إبداع»، وأنا الممسك بيد المدير اليمنى', en: 'With my classmates and our principal at Ibdaa; I am holding the principal’s right hand' },
    'step/نتيجة اختبار STEP - 84%.png': { ar: 'نتيجة اختبار STEP بدرجة 84 (تعادل 503 في التوفل)', en: 'STEP result: 84 (TOEFL equivalent 503)' },
    'اختبار موهبة القياسي/نتيجة اختبار موهبة القياسي - 1655 نقطة.jpg': { ar: 'شهادة مقياس موهبة للقدرات العقلية المتعددة: 1655 من 2000، باللغة الإنجليزية', en: 'Mawhiba Multiple Cognitive Abilities Test: 1655 out of 2000, taken in English' },
    'موهوب أحياء/شهادة اختبار موهوب في مادة الأحياء.jpg': { ar: 'شهادة إتمام المشاركة في مسابقة «موهوب» 2024', en: 'Participation certificate, Mawhoob 2024' },
  };
  const items = mediaItems('hassan-alshakhs', CAPTIONS);
  document.querySelectorAll('[data-lb]').forEach((b) => b.addEventListener('click', () => openLightbox(items, +b.dataset.lb, b)));

  // the name in the other language keeps the right lang attribute
  const alt = document.querySelector('.hz-alt');
  if (alt) {
    const setLang = (l) => { alt.lang = l === 'ar' ? 'en' : 'ar'; };
    setLang(window.Site.lang);
    onLang(setLang);
  }
})();
