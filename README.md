# ثانوية الجبر للموهوبين — school website

Open `index.html` in any browser (double-click works). No build step, no server needed.
Every page has an Arabic / English button; the choice is remembered.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: the school in a few full-screen scenes, grades, class 202 |
| `grade-10.html`, `grade-12.html`, `class-201.html` | "Not complete yet" pages |
| `grade-11.html` | Classes 201 and 202 |
| `class-202.html` | Class list: every name opens that student's portfolio |
| `student.html?id=…` | One template for every class 202 portfolio |
| `hassan.html` | Hassan Hamzah Alshakhs' portfolio |

Text for the portfolios (bio, achievements, picture captions, both languages) lives in
`assets/js/students.js`. Shared design: `assets/css/site.css`. Header, signature, footer
and the language switch: `assets/js/site.js`.

## The look

- Colors come from the two supervising bodies' logos: the Ministry of Education's dark green
  `#09403e` and Mawhiba's indigo `#211964`. They are set once at the top of `site.css`.
- One font: IBM Plex Sans Arabic.
- The pictures are the students' real certificates.
- Pages are told one screen at a time. While you scroll, a "scene" stays on screen and its
  content changes (a number counts up, a certificate grows, the strip of certificates slides).
  This is plain CSS (scroll-driven animations), no library. Browsers without it (Firefox
  today) show the same content as normal sections. With "reduce motion" switched on, the
  scenes only fade.

## Adding or updating a student's files

1. Put the pictures / PDFs in `stdnts/<student folder>/`.
2. New folder? Add it to `"folders"` in `tools/media-config.json` with the student's `id` from `students.js`.
3. Run:

   ```
   powershell -ExecutionPolicy Bypass -File tools\build-media.ps1
   ```

   This turns photos and PDF pages into web pictures in `assets/media/`, and blacks out
   ID numbers, phone numbers and e-mails it can read (Windows OCR). Sideways scans can be
   turned with `"rotate"` and anything it misses can be covered with `"redact"` in
   `tools/media-config.json`.
4. Write the student's bio, achievements and captions in `assets/js/students.js`. Keep bios to
   one or two lines.
5. **Look at every new picture before publishing**: automatic hiding can miss things.

## Publishing

The site is live at https://alieneverything.github.io/talented/ (GitHub Pages, served from
the `main` branch of `AlienEverything/talented`). To publish a change:

   ```
   git add -A
   git commit -m "Say what changed"
   git push
   ```

The live site updates about a minute later.

Never upload **`stdnts/` or `tools/`**. `stdnts/` holds the original files, which show
national ID numbers, phone numbers and an e-mail address. `.gitignore` keeps both out of git.
