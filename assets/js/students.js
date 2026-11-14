/* Class 202 — roster and portfolio content (Arabic + English).

   - The order below is the class list order.
   - A student with no bio / achievements / pictures shows "not available yet".
   - Pictures come from stdnts/<folder>/ through tools/build-media.ps1;
     "captions" match them by file name (the path inside the student's folder).
   - accent gives each portfolio a slightly different color:
     teal | emerald | sapphire | amber | violet | copper
     (the old "pattern" field is no longer used and can be left or removed)   */

window.STUDENTS = [
  { id: 'alqasim-alkhudair', ar: 'القاسم بن محمد الخضير', en: 'Alqasim Mohammed Alkhudair' },

  {
    id: 'almuntadher-almunsif', ar: 'المنتظر بن عدنان بن المنصف', en: 'Almuntadher Adnan Almunsif',
    accent: 'sapphire', pattern: 'petal',
    bio: {
      ar: 'طالب في الصف الثاني الثانوي، شعبة 202، وأحب مساعدة زملائي.',
      en: 'A Grade 11 student in class 202 who loves helping his classmates.',
    },
    stats: [
      { v: '1584', ar: 'درجة مقياس موهبة', en: 'Mawhiba test score' },
      { v: { ar: 'الثاني', en: '2nd' }, ar: 'المركز على مستوى الأحساء', en: 'Place across Al-Ahsa' },
    ],
    achievements: [
      { ic: 'sparkle', ar: 'حاصل على درجة 1584 في مقياس موهبة للقدرات العقلية المتعددة.', en: 'Scored 1584 on the Mawhiba Multiple Cognitive Abilities Test.' },
      { ic: 'shield', ar: 'المركز الثاني في مسابقة «فضاؤنا السيبراني آمن» على مستوى الأحساء.', en: 'Second place in the “Our Cyberspace Is Safe” competition across Al-Ahsa.' },
    ],
  },

  {
    id: 'amjad-albukhaitan', ar: 'أمجد بن منتظر البخيتان', en: 'Amjad Muntadher Albukhaitan',
    accent: 'violet', pattern: 'diamond',
    achievements: [
      { ic: 'code', ar: 'المشاركة في «مسابقة المدن والمحافظات» بأولمبياد «نسمو»، تخصص المعلوماتية.', en: 'Took part in the NSMO Cities & Governorates round, in Informatics.', year: '2026' },
    ],
    captions: {
      'Mawhiba hub - بوابة موهبة.pdf': { ar: 'شهادة مشاركة في أولمبياد «نسمو» — المعلوماتية 2026', en: 'NSMO participation certificate — Informatics, 2026' },
    },
  },

  { id: 'jasim-alhamoud', ar: 'جاسم بن محمد الحمود', en: 'Jasim Mohammed Alhamoud' },
  { id: 'jawad-alhassan', ar: 'جواد باقر الحسن', en: 'Jawad Baqir Alhassan' },

  {
    id: 'hassan-alsaad', ar: 'حسن بن عبدالله بن السعد', en: 'Hassan Abdullah Alsaad',
    accent: 'emerald', pattern: 'cross',
    achievements: [
      { ic: 'atom', ar: 'المشاركة في أولمبياد العلوم والرياضيات الوطني «نسمو».', en: 'Took part in the National Science and Mathematics Olympiad (NSMO).' },
    ],
  },

  { id: 'hassan-alshakhs', ar: 'حسن حمزة الشخص', en: 'Hassan Hamzah Alshakhs', href: 'hassan.html', featured: true },

  { id: 'hassan-almishal', ar: 'حسن محمد المشعل', en: 'Hassan Mohammed Almishal' },
  { id: 'hussain-ibnahmed', ar: 'حسين بن بسام ابن أحمد', en: 'Hussain Bassam Ibn Ahmed' },
  { id: 'hussain-almishal', ar: 'حسين محمد المشعل', en: 'Hussain Mohammed Almishal' },

  {
    id: 'sajjad-alqurain', ar: 'سجاد بن احمد بن القرين', en: 'Sajjad Ahmed Alqurain',
    accent: 'amber', pattern: 'star',
    bio: {
      ar: 'حصلت على الدرجة الكاملة في اختبار القدرات العامة، ووصلت إلى المرحلة الثالثة في «نسمو» بمسار الفيزياء.',
      en: 'I earned a perfect score on the General Aptitude Test and reached the third stage of NSMO in physics.',
    },
    stats: [
      { v: '100', ar: 'اختبار القدرات العامة', en: 'General Aptitude Test' },
      { v: { ar: 'الثالثة', en: '3rd' }, ar: 'مرحلة «نسمو» — الفيزياء', en: 'NSMO stage — Physics' },
      { v: '11', ar: 'مشاركة مع موهبة', en: 'Mawhiba programs & contests' },
    ],
    achievements: [
      { ic: 'star', ar: 'الدرجة الكاملة 100 في اختبار القدرات العامة للتخصصات العلمية، بعد 98 في محاولة سابقة.', en: 'A perfect 100 on the General Aptitude Test (scientific track), after an earlier 98.', year: '2026' },
      { ic: 'atom', ar: 'الوصول إلى المرحلة الثالثة في أولمبياد العلوم والرياضيات الوطني «نسمو» — مسار الفيزياء.', en: 'Reached the third stage of the National Science and Mathematics Olympiad (NSMO) — Physics.', year: '2026' },
      { ic: 'flask', ar: 'المشاركة في الأولمبياد الوطني للإبداع العلمي «إبداع».', en: 'Took part in the National Olympiad for Scientific Creativity (Ibdaa).' },
      { ic: 'graduation', ar: 'برنامج موهبة الإثرائي الأكاديمي (2023 و2024)، وبرنامج موهبة المتقدم في العلوم والرياضيات (2024).', en: 'Mawhiba Academic Enrichment Program (2023 & 2024) and the Mawhiba Advanced Program in Science & Mathematics (2024).' },
      { ic: 'book', ar: 'فصول موهبة (2026)، وبيراس موهبة (2025)، والدورات الأساسية (2022).', en: 'Mawhiba Classes (2026), Mawhiba Bairas (2025) and the Foundation Courses (2022).' },
      { ic: 'medal', ar: 'مسابقة موهوب (2021 و2022).', en: 'The Mawhoob competition (2021 & 2022).' },
    ],
    captions: {
      'WhatsApp Image 2026-11-04 at 10.49.10 AM.jpeg': { ar: 'سجل المشاركات في برامج موهبة ومسابقاتها', en: 'Record of Mawhiba programs and competitions' },
      'WhatsApp Image 2026-11-04 at 10.49.12 AM.jpeg': { ar: 'نتيجتا اختبار القدرات العامة للتخصصات العلمية: 98 ثم 100', en: 'General Aptitude Test (scientific) results: 98, then 100' },
    },
  },

  { id: 'abdullah-alruwaished', ar: 'عبد الله بن صالح بن سالم الرويشد', en: 'Abdullah Saleh Alruwaished' },

  {
    id: 'abdullah-alhaji', ar: 'عبدالله بن محمد بن الحاجي', en: 'Abdullah Mohammed Alhaji',
    accent: 'teal', pattern: 'diamond',
    bio: {
      ar: 'حصلت على خمس شهادات تدريبية في مجالات متنوعة، تبني مهاراتي وتعرّفني بالتخصصات الحديثة.',
      en: 'I earned five training certificates in different fields that build my skills and introduce me to modern specializations.',
    },
    quote: {
      ar: 'كل شهادة خطوة، وكل معرفة إنجاز، وكل تجربة بداية لفرصة جديدة.',
      en: 'Every certificate is a step, every piece of knowledge an achievement, and every experience the start of a new opportunity.',
    },
    stats: [{ v: '5', ar: 'شهادات تدريبية', en: 'Training certificates' }],
    achievements: [
      { ic: 'target', ar: '«اكتشف مسارك»: التعرف على القدرات والميول وتحديد التوجهات المستقبلية.', en: '“Discover Your Path”: identifying abilities, interests and future directions.' },
      { ic: 'graduation', ar: '«طريقك إلى الجامعة»: استكشاف المسار الأكاديمي والاستعداد للمرحلة الجامعية.', en: '“Your Way to University”: exploring the academic path and preparing for university.' },
      { ic: 'shield', ar: '«دليلك إلى الأمن السيبراني»: التعرف على مفاهيم الأمن الرقمي وأهميته.', en: '“Your Guide to Cybersecurity”: understanding digital security and why it matters.' },
      { ic: 'cpu', ar: '«دليلك نحو الذكاء الاصطناعي»: الاطلاع على التقنيات الحديثة وتطبيقاتها المستقبلية.', en: '“Your Guide to AI”: exploring modern technologies and their future applications.' },
      { ic: 'heart', ar: '«دليلك إلى القطاع غير الربحي»: التعرف على دوره في التنمية المجتمعية وصناعة الأثر.', en: '“Your Guide to the Non-Profit Sector”: its role in community development and impact.' },
    ],
    captions: {
      'WhatsApp Image 2026-11-07 at 8.17.47 PM.jpeg': { ar: 'ملف الإنجاز — خمس شهادات تدريبية في مسارات متنوعة (1448هـ)', en: 'Achievement sheet — five training certificates across diverse tracks (1448 AH)' },
    },
  },

  {
    id: 'abdulhadi-albader', ar: 'عبدالهادي بن علي بن البدر', en: 'Abdulhadi Ali Albader',
    accent: 'copper', pattern: 'cross',
    stats: [
      { v: '14', ar: 'دورة من «اكتشف مسارك»', en: '“Discover Your Path” courses' },
      { v: '5', ar: 'مسابقات علمية', en: 'Science competitions' },
    ],
    achievements: [
      { ic: 'target', ar: 'إنجاز 14 دورة من دورات «اكتشف مسارك».', en: 'Completed 14 “Discover Your Path” courses.' },
      { ic: 'flask', ar: 'المشاركة في مسابقة المسار البحثي.', en: 'Took part in the Research Track competition.' },
      { ic: 'chart', ar: 'المشاركة في مسابقة المعرفة الإحصائية.', en: 'Took part in the Statistical Knowledge competition.' },
      { ic: 'robot', ar: 'المشاركة في أولمبياد الروبوتات.', en: 'Took part in the Robotics Olympiad.' },
      { ic: 'sigma', ar: 'المشاركة في مسابقة كانجارو للرياضيات.', en: 'Took part in the Kangaroo Mathematics competition.' },
      { ic: 'atom', ar: 'المشاركة في اختبار «نسمو» للفيزياء.', en: 'Sat the NSMO Physics test.' },
    ],
  },

  {
    id: 'ali-alghanim', ar: 'علي بن محمد الغانم', en: 'Ali Mohammed Alghanim',
    accent: 'sapphire', pattern: 'petal',
    bio: {
      ar: 'طالب في ثانوية الجبر العلمية للموهوبين، شعبة 202. من هواياتي التصوير والمونتاج وكرة القدم.',
      en: 'A student at Al-Jabr Scientific Secondary School for the Gifted, class 202. My hobbies are photography, video editing and football.',
    },
    interests: [
      { ic: 'camera', ar: 'التصوير', en: 'Photography' },
      { ic: 'film', ar: 'المونتاج', en: 'Video editing' },
      { ic: 'ball', ar: 'كرة القدم', en: 'Football' },
    ],
    achievements: [
      { ic: 'dna', ar: 'شكر وتقدير للتفوق والتميز في مادة الأحياء — الفصل الدراسي الأول 1447هـ (الصف الأول الثانوي).', en: 'Recognized for excellence in Biology — first semester 1447 AH (Grade 10).' },
      { ic: 'book', ar: 'إتمام دورة «مهارتي في اجتياز اختبار القدرات» — مركز المداد للتدريب (20 ساعة تدريبية).', en: 'Completed the “My Skills for the Aptitude Test” course — Al-Midad Training Center (20 training hours).', year: '2026' },
      { ic: 'flag', ar: 'شكر وتقدير للمشاركة الفاعلة في الاحتفاء باليوم الوطني الـ95.', en: 'Thanked for active participation in the 95th National Day celebration.' },
      { ic: 'film', ar: 'شكر للمشاركة الفعالة في النشاط المدرسي «الفن السابع».', en: 'Thanked for active participation in the school activity “The Seventh Art”.' },
    ],
    captions: {
      'Ali .pdf': { ar: 'شهادة حضور دورة «مهارتي في اجتياز اختبار القدرات» — 20 ساعة', en: 'Course certificate: “My Skills for the Aptitude Test” — 20 hours' },
      'WhatsApp Scan 2026-11-04 at 12.43.36.pdf': { ar: 'شكر وتقدير — المشاركة في الاحتفاء باليوم الوطني الـ95', en: 'Appreciation — 95th National Day celebration' },
      'WhatsApp Scan 2026-11-04 at 12.46.14.pdf': { ar: 'شكر وتقدير — التفوق في مادة الأحياء (1447هـ)', en: 'Appreciation — excellence in Biology (1447 AH)' },
      'WhatsApp Scan 2026-11-04 at 12.57.36.pdf': { ar: 'شهادة شكر — المشاركة في نشاط «الفن السابع»', en: 'Thanks — “The Seventh Art” school activity' },
    },
  },

  { id: 'ali-almubarak', ar: 'علي بن مصطفى المبارك', en: 'Ali Mustafa Almubarak' },

  {
    id: 'ali-alowaishi', ar: 'علي حسين العويشي', en: 'Ali Hussain Alowayshi',
    accent: 'emerald', pattern: 'star',
    bio: {
      ar: 'شغوف باكتشاف الجديد وتطوير نفسي. أحب كرة القدم والجري، وأهتم بالتصوير والتصميم وصناعة المحتوى.',
      en: 'I love discovering new things and developing myself. I play football and run, and I am into photography, design and content creation.',
    },
    interests: [
      { ic: 'ball', ar: 'كرة القدم', en: 'Football' },
      { ic: 'run', ar: 'الجري', en: 'Running' },
      { ic: 'camera', ar: 'التصوير', en: 'Photography' },
      { ic: 'palette', ar: 'التصميم', en: 'Design' },
      { ic: 'film', ar: 'صناعة المحتوى والمونتاج', en: 'Content & editing' },
      { ic: 'book', ar: 'القراءة', en: 'Reading' },
    ],
    stats: [
      { v: '1574', ar: 'مقياس موهبة — تصنيف «موهوب»', en: 'Mawhiba test — “Gifted” band' },
      { v: { ar: 'الفرق الوطنية', en: 'National teams' }, ar: 'مرحلة «نسمو» — الفيزياء', en: 'NSMO stage — Physics' },
      { v: '3', ar: 'ميداليات جري', en: 'Running medals' },
    ],
    achievements: [
      { ic: 'sparkle', ar: 'درجة 1574 من 2000 في مقياس موهبة للقدرات العقلية المتعددة ضمن تصنيف «موهوب» (الصف الأول الثانوي).', en: 'Scored 1574/2000 on the Mawhiba Multiple Cognitive Abilities Test — classified “Gifted” (Grade 10).', year: '2026' },
      { ic: 'atom', ar: 'اجتياز «مسابقة المدن والمحافظات» ثم «مسابقة إدارات التعليم» في أولمبياد «نسمو» — الفيزياء.', en: 'Passed the Cities & Governorates round, then the Education Departments round of NSMO — Physics.', year: '2026' },
      { ic: 'trophy', ar: 'المشاركة في «مسابقة الفرق الوطنية» ضمن أولمبياد «نسمو» — الفيزياء.', en: 'Competed in the National Teams round of NSMO — Physics.', year: '2026' },
      { ic: 'sigma', ar: 'إتمام المشاركة في كانجارو موهبة.', en: 'Completed Kangaroo Mawhiba.', year: '2026' },
      { ic: 'cpu', ar: 'المدرسة الصيفية للذكاء الاصطناعي — مركز الذكاء الاصطناعي بجامعة الملك خالد (10 – 15 أغسطس 2025).', en: 'Summer School for Artificial Intelligence — King Khalid University Center for AI (10–15 Aug 2025).', year: '2025' },
      { ic: 'medal', ar: 'ميداليات سباقات جري: 1 كم و6 كم و6.5 كم، منها سباق «AHSA RUN 2025».', en: 'Running medals: 1 km, 6 km and 6.5 km, including AHSA RUN 2025.' },
    ],
    captions: {
      '1561508.pdf': { ar: 'مقياس موهبة: 1574 من 2000 — تصنيف «موهوب»', en: 'Mawhiba test: 1574 / 2000 — “Gifted” band' },
      '3259758.pdf': { ar: 'شهادة إتمام مشاركة — كانجارو موهبة 2026', en: 'Participation certificate — Kangaroo Mawhiba 2026' },
      '3318793.pdf': { ar: '«نسمو»: اجتياز مسابقة المدن والمحافظات — الفيزياء', en: 'NSMO: passed the Cities & Governorates round — Physics' },
      '3384423.pdf': { ar: '«نسمو»: اجتياز مسابقة إدارات التعليم — الفيزياء', en: 'NSMO: passed the Education Departments round — Physics' },
      '3399780.pdf': { ar: '«نسمو»: المشاركة في مسابقة الفرق الوطنية — الفيزياء', en: 'NSMO: National Teams round — Physics' },
      'WhatsApp Image 2026-11-04 at 12.28.03 PM.jpeg': { ar: 'المدرسة الصيفية للذكاء الاصطناعي — جامعة الملك خالد', en: 'AI Summer School — King Khalid University' },
      'WhatsApp Image 2026-11-04 at 12.49.30 PM.jpeg': { ar: 'ميداليات سباقات الجري: 1 كم، 6 كم، 6.5 كم', en: 'Running medals: 1 km, 6 km, 6.5 km' },
    },
  },

  { id: 'faisal-bumozah', ar: 'فيصل بن بدر بن بوموزه', en: 'Faisal Bader Bumozah' },
  { id: 'kadhim-alhawdar', ar: 'كاظم بن هاني بن الهودار', en: 'Kadhim Hani Alhawdar' },

  {
    id: 'laith-aldandan', ar: 'ليث بن خالد بن الدندن', en: 'Laith Khalid Aldandan',
    accent: 'violet', pattern: 'diamond',
    bio: {
      ar: 'أحب التعلم والتنافس، وأحب الفيزياء والرياضيات، وأفضّل الرياضيات؛ لذا أبحث دائمًا عن مسابقاتها.',
      en: 'I love learning and competing. I like physics and mathematics, but I prefer mathematics, so I always look for math competitions.',
    },
    interests: [
      { ic: 'sigma', ar: 'الرياضيات', en: 'Mathematics' },
      { ic: 'atom', ar: 'الفيزياء', en: 'Physics' },
      { ic: 'trophy', ar: 'المسابقات', en: 'Competitions' },
    ],
    achievements: [
      { ic: 'trophy', ar: 'شكر وتقدير من تعليم الأحساء لمشاركته المتميزة في أولمبياد «نسمو».', en: 'Appreciation from Al-Ahsa Education for his outstanding part in NSMO.', year: '2026' },
      { ic: 'flask', ar: 'برنامج «التخطيط لتصميم المشروع العلمي في أولمبياد إبداع 2023».', en: 'Program: “Planning a Scientific Project for the Ibdaa 2023 Olympiad”.', year: '2022' },
      { ic: 'users', ar: 'برنامج «المنتج الفكري في برامج رعاية الموهوبين».', en: 'Program: “Intellectual Output in Gifted-Care Programs”.', year: '2022' },
      { ic: 'chart', ar: 'برنامج «قياس الأثر التدريبي في برامج الموهوبين».', en: 'Program: “Measuring Training Impact in Gifted Programs”.', year: '2022' },
      { ic: 'heart', ar: 'لقاء «بصحة نفسية متوازنة.. نواجه الأزمات ونبني المستقبل».', en: 'Session: “Balanced Mental Health — Facing Crises, Building the Future”.', year: '2025' },
    ],
    captions: {
      'WhatsApp Image 2026-11-07 at 8.21.14 PM.jpeg': { ar: 'شكر وتقدير للمشاركة المتميزة في أولمبياد «نسمو» (2026)', en: 'Appreciation for outstanding participation in NSMO (2026)' },
      'WhatsApp Image 2026-11-07 at 8.21.14 PM (1).jpeg': { ar: 'شهادة حضور: «بصحة نفسية متوازنة.. نواجه الأزمات ونبني المستقبل» (2025)', en: 'Attendance: “Balanced Mental Health — Facing Crises, Building the Future” (2025)' },
      'WhatsApp Image 2026-11-07 at 8.21.14 PM (2).jpeg': { ar: 'شهادة حضور: «قياس الأثر التدريبي في برامج الموهوبين» (2022)', en: 'Attendance: “Measuring Training Impact in Gifted Programs” (2022)' },
      'WhatsApp Image 2026-11-07 at 8.21.14 PM (3).jpeg': { ar: 'شهادة حضور: «التخطيط لتصميم المشروع العلمي في أولمبياد إبداع 2023» (2022)', en: 'Attendance: “Planning a Scientific Project for Ibdaa 2023” (2022)' },
      'WhatsApp Image 2026-11-07 at 8.21.14 PM (4).jpeg': { ar: 'شهادة حضور: «المنتج الفكري في برامج رعاية الموهوبين» (2022)', en: 'Attendance: “Intellectual Output in Gifted-Care Programs” (2022)' },
    },
  },

  { id: 'majed-alzowaid', ar: 'ماجد بن يحي الزويد', en: 'Majed Yahya Alzowaid' },
  { id: 'mohammed-baqir-alhassan', ar: 'محمد باقر الحسن', en: 'Mohammed Baqir Alhassan' },

  {
    id: 'mohammed-almutailiq', ar: 'محمد بن عبدالله بن المطيليق', en: 'Mohammed Abdullah Almutailiq',
    accent: 'amber', pattern: 'petal',
    bio: {
      ar: 'شاركت في برامج ومسابقات عديدة مثل «نسمو» و«كانجارو»؛ وُفّقت في بعضها، وتعلّمت من بعضها الآخر.',
      en: 'I have entered many programs and competitions such as NSMO and Kangaroo, succeeding in some and learning from the others.',
    },
    interests: [
      { ic: 'headphones', ar: 'الاستماع', en: 'Listening' },
      { ic: 'search', ar: 'البحث', en: 'Research' },
      { ic: 'book', ar: 'الاطلاع', en: 'Reading' },
      { ic: 'chat', ar: 'المحاورة', en: 'Dialogue & debate' },
    ],
    achievements: [
      { ic: 'atom', ar: 'المشاركة في أولمبياد العلوم والرياضيات الوطني «نسمو» ومسابقة كانجارو.', en: 'Took part in NSMO and the Kangaroo competition.' },
      { ic: 'globe', ar: 'شهادة معتمدة في دورة للغة الإنجليزية.', en: 'An accredited certificate from an English-language course.' },
      { ic: 'award', ar: 'العديد من شهادات الشكر والتقدير على مدار مسيرته الدراسية.', en: 'Many certificates of thanks and appreciation throughout his school years.' },
    ],
  },

  { id: 'mohammed-aleisa', ar: 'محمد بن علي العيسي', en: 'Mohammed Ali Aleisa' },
  { id: 'mohammed-alali', ar: 'محمد عقيل العلي', en: 'Mohammed Aqeel Alali' },

  {
    id: 'mohammed-alhaji', ar: 'محمد علي الحاجي', en: 'Mohammed Ali Alhaji',
    accent: 'emerald', pattern: 'cross',
    bio: {
      ar: 'أحب التعلم وتطوير مهاراتي، والرياضة جزء كبير من حياتي، وأسعى إلى التميز في دراستي ورياضتي.',
      en: 'I love learning and building my skills. Sport is a big part of my life, and I aim to excel in both my studies and my sport.',
    },
    interests: [
      { ic: 'ball', ar: 'كرة القدم', en: 'Football' },
      { ic: 'target', ar: 'تنس الطاولة', en: 'Table tennis' },
      { ic: 'users', ar: 'كرة الطائرة', en: 'Volleyball' },
    ],
  },

  {
    id: 'mohammed-almuslim', ar: 'محمد علي المسلم', en: 'Mohammed Ali Almuslim',
    accent: 'copper', pattern: 'star',
    bio: {
      ar: 'أهتم بالعلوم والتكنولوجيا والاختراعات، وأحب اكتساب المعرفة، وشاركت في دورات طوّرت مهاراتي.',
      en: 'I am interested in science, technology and inventions. I love learning, and the courses I have taken sharpened my skills.',
    },
    quote: { ar: 'أطمح إلى تحقيق إنجازات مميزة، وأن أصبح مهندسًا ناجحًا في المستقبل.', en: 'I aim for outstanding achievements — and to become a successful engineer.' },
    interests: [
      { ic: 'flask', ar: 'العلوم', en: 'Science' },
      { ic: 'cpu', ar: 'التكنولوجيا', en: 'Technology' },
      { ic: 'sparkle', ar: 'الاختراعات', en: 'Inventions' },
      { ic: 'cube', ar: 'الهندسة', en: 'Engineering' },
    ],
    stats: [{ v: '1553', ar: 'درجة مقياس موهبة', en: 'Mawhiba test score' }],
    achievements: [
      { ic: 'sparkle', ar: 'حصل على درجة 1553 في مقياس موهبة.', en: 'Scored 1553 on the Mawhiba test.' },
      { ic: 'book', ar: 'المشاركة في العديد من الدورات داخل المدرسة وخارجها.', en: 'Took many courses inside and outside school.' },
      { ic: 'heart', ar: 'المشاركة في العديد من الأعمال التطوعية.', en: 'Took part in many volunteer activities.' },
    ],
  },

  {
    id: 'maitham-alshehabi', ar: 'ميثم بن جميل الشهابي', en: 'Maitham Jamil Alshahabi',
    accent: 'sapphire', pattern: 'cross',
    bio: {
      ar: 'شغوف بالهندسة والتقنية، وخاصة الطائرات المسيّرة والروبوتات وإنترنت الأشياء. أصمم المسيّرات وأبرمج Arduino لأحوّل الأفكار إلى حلول.',
      en: 'I am passionate about engineering and technology, especially drones, robotics and the Internet of Things. I design drones and program Arduino to turn ideas into real solutions.',
    },
    interests: [
      { ic: 'drone', ar: 'الطائرات المسيّرة', en: 'Drones' },
      { ic: 'robot', ar: 'الروبوتات الذكية', en: 'Smart robotics' },
      { ic: 'cpu', ar: 'إنترنت الأشياء', en: 'Internet of Things' },
      { ic: 'code', ar: 'برمجة Arduino', en: 'Arduino programming' },
      { ic: 'sparkle', ar: 'الذكاء الاصطناعي', en: 'Artificial intelligence' },
    ],
    stats: [
      { v: '100', ar: 'اختبار القدرات العامة', en: 'General Aptitude Test' },
      { v: '100', suffix: '%', ar: 'معدل الفصل الأول — أول ثانوي', en: 'Grade 10 first-semester average' },
      { v: '1589', ar: 'مقياس موهبة (2025)', en: 'Mawhiba test (2025)' },
      { v: '277', ar: 'ساعة عمل تطوعي', en: 'Volunteer hours' },
    ],
    achievements: [
      { ic: 'star', ar: 'الدرجة الكاملة 100 في اختبار القدرات العامة للتخصصات العلمية.', en: 'A perfect 100 on the General Aptitude Test (scientific track).', year: '2026' },
      { ic: 'trophy', ar: 'المركز الأول على مستوى صفه بتقدير «ممتاز مرتفع» ومعدل 100% — الفصل الأول من الصف الأول الثانوي.', en: 'Ranked first in his grade with an “Excellent (High)” rating and a 100% average — Grade 10, first semester.', year: { ar: '1447هـ', en: '1447 AH' } },
      { ic: 'flask', ar: 'برنامج أرامكو السعودية الصيفي الإثرائي 2026 — 60 ساعة (19 يوليو – 6 أغسطس).', en: 'Saudi Aramco 2026 Summer Enrichment Program — 60 hours (19 Jul – 6 Aug).', year: '2026' },
      { ic: 'cpu', ar: 'اجتياز دورة «مبادئ الذكاء الاصطناعي» من سدايا ضمن مبادرة «مليون سعودي للذكاء الاصطناعي».', en: 'Passed “Fundamentals of AI” by SDAIA, part of the One Million Saudis in AI initiative.', year: '2026' },
      { ic: 'sparkle', ar: 'درجة 1589 في مقياس موهبة (الثالث المتوسط)، وتجاوز 1500 درجة منذ الصف الخامس الابتدائي.', en: 'Scored 1589 on the Mawhiba test (Grade 9), passing 1,500 as early as Grade 5.', year: '2025' },
      { ic: 'heart', ar: '277 ساعة عمل تطوعي موثقة من المركز الوطني لتنمية القطاع غير الربحي.', en: '277 volunteer hours certified by the National Center for Non-Profit Sector Development.' },
      { ic: 'globe', ar: 'شهادة تقدير لتحقيقه أعلى درجة في اختبار اللغة الإنجليزية.', en: 'Certificate of appreciation for the top score in the English language exam.' },
      { ic: 'medal', ar: 'المركز الخامس على مستوى المرحلة المتوسطة في مسابقة التجارب العلمية.', en: 'Fifth place (intermediate level) in the Science Experiments competition.', year: { ar: '1445هـ', en: '1445 AH' } },
      { ic: 'book', ar: 'المركز الرابع في مسابقة مكتب التعليم بشمال الأحساء لحفظ القرآن الكريم وتلاوته.', en: 'Fourth place in the North Al-Ahsa education office Quran memorization & recitation contest.', year: { ar: '1444هـ', en: '1444 AH' } },
      { ic: 'code', ar: 'مدرّب للطلاب في فعالية «ساعة البرمجة».', en: 'Student trainer for the “Hour of Code” event.', year: { ar: '1445هـ', en: '1445 AH' } },
      { ic: 'graduation', ar: 'مشاركات متعددة مع موهبة: بيراس (2021 – 2023)، كانجارو موهبة 2024، موهوب 2022، الدورات الأساسية 2022 (96 ساعة).', en: 'Many Mawhiba programs: Bairas (2021–2023), Kangaroo Mawhiba 2024, Mawhoob 2022, Foundation Courses 2022 (96 hours).' },
    ],
    cats: [
      { id: 'mawhiba', ar: 'موهبة', en: 'Mawhiba' },
      { id: 'academic', ar: 'التفوق الدراسي', en: 'Academic excellence' },
      { id: 'programs', ar: 'البرامج والدورات', en: 'Programs & courses' },
      { id: 'contests', ar: 'المسابقات', en: 'Competitions' },
      { id: 'activities', ar: 'الأنشطة والتطوع', en: 'Activities & volunteering' },
    ],
    captions: {
      'img20261104_19040728.pdf': { cat: 'academic', ar: 'شكر للتفوق والتميز وسمو الأخلاق — الثاني الثانوي، الفصل الأول 1448هـ', en: 'Thanks for excellence and character — Grade 11, first semester 1448 AH' },
      'img20261104_19090112.pdf': { cat: 'academic', ar: 'تهنئة بالمركز الأول على مستوى الصف وتقدير «ممتاز مرتفع» (1447هـ)', en: 'Congratulations: first in his grade, “Excellent (High)” (1447 AH)' },
      'participation-certificate-#.pdf': { cat: 'activities', ar: 'شهادة عمل تطوعي — 277 ساعة', en: 'Volunteering certificate — 277 hours' },
      'WhatsApp Image 2026-11-04 at 6.45.55 PM (1).jpeg': { cat: 'mawhiba', ar: 'إتمام المشاركة في بيراس موهبة 2021', en: 'Completed Mawhiba Bairas 2021' },
      'WhatsApp Image 2026-11-04 at 6.45.55 PM.jpeg': { cat: 'mawhiba', ar: 'ملف المشاركات في مكان موهبة (Mawhiba Hub)', en: 'Participation record on Mawhiba Hub' },
      'WhatsApp Image 2026-11-04 at 6.45.56 PM.jpeg': { cat: 'mawhiba', ar: 'إتمام المشاركة في بيراس موهبة 2023', en: 'Completed Mawhiba Bairas 2023' },
      'WhatsApp Image 2026-11-04 at 6.45.57 PM (1).jpeg': { cat: 'mawhiba', ar: 'الدورات الأساسية في موهبة 2022 — 96 ساعة', en: 'Mawhiba Foundation Courses 2022 — 96 hours' },
      'WhatsApp Image 2026-11-04 at 6.45.57 PM.jpeg': { cat: 'mawhiba', ar: 'مقياس موهبة: 1589 من 2000 (الثالث المتوسط، 2025)', en: 'Mawhiba test: 1589 / 2000 (Grade 9, 2025)' },
      'WhatsApp Image 2026-11-04 at 6.45.58 PM (1).jpeg': { cat: 'mawhiba', ar: 'تكريم لاجتياز مقياس موهبة بأكثر من 1500 درجة (الخامس الابتدائي)', en: 'Honored for passing the Mawhiba test with 1,500+ (Grade 5)' },
      'WhatsApp Image 2026-11-04 at 6.45.58 PM (2).jpeg': { cat: 'mawhiba', ar: 'إتمام المشاركة في بيراس موهبة 2022', en: 'Completed Mawhiba Bairas 2022' },
      'WhatsApp Image 2026-11-04 at 6.45.58 PM.jpeg': { cat: 'mawhiba', ar: 'إتمام المشاركة في كانجارو موهبة 2024', en: 'Completed Kangaroo Mawhiba 2024' },
      'WhatsApp Image 2026-11-04 at 6.46.00 PM (1).jpeg': { cat: 'activities', ar: 'شكر وتقدير لجهوده ودوره البارز في الإذاعة المدرسية', en: 'Appreciation for his role in the school radio' },
      'WhatsApp Image 2026-11-04 at 6.46.00 PM.jpeg': { cat: 'programs', ar: 'إتمام برنامج «قيادتي» — لجنة السلامة المرورية بالمنطقة الشرقية', en: '“Qiyadati” program — Eastern Province Traffic Safety Council' },
      'WhatsApp Image 2026-11-04 at 6.46.01 PM (1).jpeg': { cat: 'programs', ar: 'شهادة إتمام — «أجيال ريالي» للوعي المالي', en: 'Completion — “Ajyal Riyali” financial literacy' },
      'WhatsApp Image 2026-11-04 at 6.46.01 PM.jpeg': { cat: 'activities', ar: 'شكر وتقدير — مدرسة الحليلة المتوسطة', en: 'Appreciation — Al-Hulaila Intermediate School' },
      'WhatsApp Image 2026-11-04 at 6.46.02 PM (1).jpeg': { cat: 'activities', ar: 'شكر للمشاركة في معرض التربية الفنية (1444هـ)', en: 'Thanks for taking part in the Art Education exhibition (1444 AH)' },
      'WhatsApp Image 2026-11-04 at 6.46.02 PM.jpeg': { cat: 'programs', ar: 'حضور البرنامج التدريبي «ريالي للوعي المالي» — 4 ساعات', en: 'Training: “Riyali” financial awareness — 4 hours' },
      'WhatsApp Image 2026-11-04 at 6.46.03 PM (1).jpeg': { cat: 'programs', ar: 'ورشة دعم المشاريع في معرض الأولمبياد الوطني للإبداع العلمي «إبداع 2025»', en: 'Project-support workshop — Ibdaa 2025 National Olympiad exhibition' },
      'WhatsApp Image 2026-11-04 at 6.46.03 PM.jpeg': { cat: 'programs', ar: 'ورشة عمل «مدرستي تبرمج»', en: 'Workshop: “Madrasati Tabarmaj” (My School Codes)' },
      'WhatsApp Image 2026-11-04 at 6.46.04 PM (1).jpeg': { cat: 'programs', ar: 'الورشة التدريبية «خطوات تصميم الابتكار»', en: 'Workshop: “Steps of Innovation Design”' },
      'WhatsApp Image 2026-11-04 at 6.46.04 PM.jpeg': { cat: 'activities', ar: 'شكر وتقدير كمدرب للطلاب في فعالية «ساعة البرمجة» (1445هـ)', en: 'Thanks as a student trainer for the “Hour of Code” (1445 AH)' },
      'WhatsApp Image 2026-11-04 at 6.46.05 PM (1).jpeg': { cat: 'activities', ar: 'حضور فعاليات يوم التأسيس (1444هـ)', en: 'Founding Day events (1444 AH)' },
      'WhatsApp Image 2026-11-04 at 6.46.05 PM.jpeg': { cat: 'programs', ar: 'البرنامج التدريبي «أنواع الموهوبين واحتياجاتهم في الأسرة والمدرسة»', en: 'Training: “Types of Gifted Students and Their Needs”' },
      'WhatsApp Image 2026-11-04 at 6.46.06 PM (1).jpeg': { cat: 'contests', ar: 'تهنئة بالمركز الخامس في مسابقة التجارب العلمية — المرحلة المتوسطة (1445هـ)', en: 'Fifth place — Science Experiments competition, intermediate level (1445 AH)' },
      'WhatsApp Image 2026-11-04 at 6.46.06 PM.jpeg': { cat: 'contests', ar: 'المركز الرابع في مسابقة حفظ القرآن الكريم وتلاوته — مكتب تعليم شمال الأحساء', en: 'Fourth place — Quran memorization & recitation, North Al-Ahsa' },
      'WhatsApp Image 2026-11-04 at 6.46.07 PM (1).jpeg': { cat: 'academic', ar: 'شكر لتميزه في الحضور وتفاعله مع البرامج المدرسية', en: 'Thanks for outstanding attendance and engagement' },
      'WhatsApp Image 2026-11-04 at 6.46.07 PM.jpeg': { cat: 'activities', ar: 'شكر للمشاركة في برنامج المعرض العلمي والابتكارات', en: 'Thanks for taking part in the Science Fair & Innovations program' },
      'WhatsApp Image 2026-11-04 at 6.46.08 PM (1).jpeg': { cat: 'activities', ar: 'شكر للمشاركة المتميزة في الإذاعة المدرسية (1442هـ)', en: 'Thanks for outstanding work in the school radio (1442 AH)' },
      'WhatsApp Image 2026-11-04 at 6.46.08 PM.jpeg': { cat: 'programs', ar: 'المشاركة المتميزة في دورة مهارات تنمية الذات (1442هـ)', en: 'Self-development skills course (1442 AH)' },
      'WhatsApp Image 2026-11-04 at 6.46.09 PM.jpeg': { cat: 'contests', ar: 'المشاركة في مسابقة «نادر» الإلكترونية — اليوم الوطني 91', en: '“Nadir” online competition — 91st National Day' },
      'WhatsApp Image 2026-11-04 at 6.46.10 PM (1).jpeg': { cat: 'academic', ar: 'شهادة تفوق — الثالث المتوسط، الفصل الثاني 1446هـ', en: 'Excellence — Grade 9, second semester 1446 AH' },
      'WhatsApp Image 2026-11-04 at 6.46.10 PM.jpeg': { cat: 'academic', ar: 'شهادة شكر للتفوق والإبداع في مادة التربية الفنية', en: 'Thanks for excellence and creativity in Art Education' },
      'WhatsApp Image 2026-11-04 at 6.46.11 PM (1).jpeg': { cat: 'academic', ar: 'شهادة تفوق — الثاني المتوسط (1444/1445هـ)', en: 'Excellence — Grade 8 (1444/1445 AH)' },
      'WhatsApp Image 2026-11-04 at 6.46.11 PM.jpeg': { cat: 'academic', ar: 'شهادة شكر للتفوق الدراسي وسمو الأخلاق — الثالث المتوسط', en: 'Thanks for academic excellence and character — Grade 9' },
      'WhatsApp Image 2026-11-04 at 6.46.12 PM (1).jpeg': { cat: 'academic', ar: 'شهادة تفوق — الثالث المتوسط', en: 'Excellence — Grade 9' },
      'WhatsApp Image 2026-11-04 at 6.46.12 PM.jpeg': { cat: 'academic', ar: 'شهادة تفوق في جميع المواد — الفصل الأول 1446هـ', en: 'Excellence in all subjects — first semester 1446 AH' },
      'WhatsApp Image 2026-11-04 at 6.46.13 PM (1).jpeg': { cat: 'academic', ar: 'شهادة تفوق في جميع المواد الدراسية', en: 'Excellence in all subjects' },
      'WhatsApp Image 2026-11-04 at 6.46.13 PM.jpeg': { cat: 'academic', ar: 'شهادة تفوق — الثاني المتوسط (1444/1445هـ)', en: 'Excellence — Grade 8 (1444/1445 AH)' },
      'تفوق ماادة الانكليزي.pdf': { cat: 'academic', ar: 'شهادة تقدير لتحقيق أعلى درجة في اختبار اللغة الإنجليزية', en: 'Appreciation: top score in the English language exam' },
      'تفوق مادة الاحياء اول ثانوي.pdf': { cat: 'academic', ar: 'شكر للتفوق في مادة الأحياء — الأول الثانوي (1447هـ)', en: 'Thanks for excellence in Biology — Grade 10 (1447 AH)' },
      'تقرير نتيجة موهبة للاختبار السنوي.pdf': { cat: 'mawhiba', ar: 'تقرير نتيجة اختبارات موهبة السنوي (2025–2026)', en: 'Mawhiba annual test report (2025–2026)' },
      'تكريم تفوق القدرات.pdf': { cat: 'activities', ar: 'شهادة شكر للمشاركة في النشاط المدرسي «الفن السابع»', en: 'Thanks for taking part in “The Seventh Art” school activity' },
      'شهادة ارامكو.pdf': { cat: 'programs', ar: 'برنامج أرامكو السعودية الصيفي الإثرائي 2026 — 60 ساعة', en: 'Saudi Aramco 2026 Summer Enrichment Program — 60 hours' },
      'شهادة اول ثانوي فصل اول.pdf': { cat: 'academic', ar: 'نتيجة الفصل الأول — الأول الثانوي: معدل 100% وتقدير «ممتاز مرتفع»', en: 'Grade 10, first semester: 100% average, “Excellent (High)”' },
      'شهادة سدايا.pdf': { cat: 'programs', ar: 'سدايا: اجتياز دورة «مبادئ الذكاء الاصطناعي» (2026)', en: 'SDAIA: “Fundamentals of AI” certificate (2026)' },
      'شهادة مشاركة في اليوم الوطني 1446.pdf': { cat: 'activities', ar: 'شكر للمشاركة الفاعلة في الاحتفاء باليوم الوطني الـ95', en: 'Thanks for active participation in the 95th National Day' },
      'شهادة مشاركة في معرض ابداع المدرسي.pdf': { cat: 'activities', ar: 'شكر للمشاركة المميزة في معرض المشاريع البحثية والمبتكرات العلمية (1447هـ)', en: 'Thanks for a standout entry in the research projects & innovations exhibition (1447 AH)' },
      'قدرات.pdf': { cat: 'academic', ar: 'نتيجة اختبار القدرات العامة للتخصصات العلمية: 100', en: 'General Aptitude Test (scientific) result: 100' },
      'ملتقى الحوار الطلابي.pdf': { cat: 'activities', ar: 'شكر وتقدير للمشاركة في ملتقى الحوار الطلابي', en: 'Appreciation for taking part in the Student Dialogue Forum' },
    },
  },
];
