# Nerrylle's Engineering Portfolio

A cute, blue, interactive portfolio for a Computer Engineering student, built to be hosted for free on **GitHub Pages**. It's plain HTML, CSS, and JavaScript: no build step, no framework, nothing to install.

The thesis, the **Smart Bi-Directional Philippine Currency Exchanger for Bills and Coins**, is the centerpiece. It's presented as a 10-chapter case study with a clickable transaction walkthrough, a system map, an animated side view of the bill dispenser, and a design log.

---

## What's in the folder

```
portfolio/
├── index.html              ← page structure (rarely needs editing)
├── .nojekyll               ← tells GitHub Pages to serve files as-is
├── README.md               ← this file
├── CHECKLIST.md            ← what info and photos are still needed
└── assets/
    ├── Pabalan_CV.pdf      ← public CV (no home address or phone)
    ├── css/style.css       ← all colors, fonts, and layout
    ├── js/content.js       ← ★ ALL YOUR TEXT AND DATA. Edit this one.
    ├── js/main.js          ← makes everything interactive
    └── img/
        ├── favicon.svg, favicon-32.png, apple-touch-icon.png
        ├── og-image.png    ← preview picture when the link is shared
        ├── gallery/        ← put thesis photos here
        └── projects/       ← put project photos here
```

---

## See it on your computer

**Easiest:** double-click `index.html`. It opens in your browser and everything works. (The fonts load from Google Fonts, so you need internet for the page to look exactly right.)

**Like a real server (optional):** if you have Python installed, open a terminal in the `portfolio` folder and run:

```
python -m http.server 8000
```

Then visit http://localhost:8000

---

## Customize it

Almost everything lives in **`assets/js/content.js`**. Open it in any text editor (VS Code, Notepad++, or even GitHub's own editor).

### The ✎ rule

Any text starting with `✎ ` shows on the site as a pink, dashed **"fill me in"** note, so you can see at a glance what's missing. Replace it with real information and delete the `✎`.

When you're ready to share the link, set this near the top of `content.js` to hide any notes you haven't filled in yet:

```js
settings: { showPlaceholderHints: false }
```

### Feature statuses

Each thesis feature has a status. Use one of:

| Status | Use it when |
|---|---|
| `"implemented"` | It's built and works |
| `"tested"` | It's built and you have test results |
| `"in-development"` | You're still building it |
| `"planned"` | Not started yet |
| `"to-confirm"` | You need to check what's true |

The filter buttons on the site appear automatically based on the statuses you use.

### Adding photos

1. Put the image in `assets/img/gallery/` (thesis) or `assets/img/projects/` (projects).
2. In `content.js`, set its path, e.g. `src: "assets/img/gallery/front.jpg"`.
3. Write a short, real `alt` description for screen readers.

**Keep photos small** so the site loads fast on mobile data: about **1600 px wide** and **under 400 KB**. [Squoosh](https://squoosh.app) is a free website that shrinks photos (choose WebP or MozJPEG). File names are case-sensitive on GitHub: `Front.JPG` and `front.jpg` are different files.

Your profile photo goes in `profile.photo`. Until then, the polaroid shows your initials.

### Adding a project

Copy one `{ ... }` block in the `projects` list, paste it below, and change the text. Categories can be `"hardware"`, `"cad"`, `"embedded"`, `"software"`, or `"networking"`. Filter buttons appear only for categories you actually use. Delete the `placeholder: true` project once you have real ones.

### Adding a real UI screenshot to the walkthrough

In `thesis.flows`, add `img: "assets/img/gallery/ui-step1.png"` to any step and the kiosk screen will show your screenshot instead of the illustration.

### Changing colors

All colors are named variables at the top of `assets/css/style.css` (`--accent`, `--pink`, `--powder`, and so on). Change a value once and it updates everywhere. Night-mode colors are in the two blocks right below.

---

## Publish on GitHub Pages (free)

You don't need to know Git. This uses the GitHub website only.

### 1. Make a GitHub account
Go to https://github.com and sign up. Your username becomes part of your link, so pick something professional (e.g. `nerrylle-pabalan`).

### 2. Create a repository
1. Click **+** (top right) → **New repository**.
2. Name it. You have two choices:
   - **`yourusername.github.io`** → your site will be at `https://yourusername.github.io` *(recommended, shortest link)*
   - **any name**, like `portfolio` → your site will be at `https://yourusername.github.io/portfolio`
3. Set it to **Public**. Click **Create repository**.

### 3. Upload the files
1. On the new repository page, click **uploading an existing file**.
2. Open the `portfolio` folder on your computer, select **everything inside it** (`index.html`, the `assets` folder, `README.md`, `CHECKLIST.md`, `.nojekyll`) and drag it into the browser.
   - `.nojekyll` is a hidden file. On a Mac press `Cmd + Shift + .` in Finder to see it; on Windows turn on *View → Hidden items*. If it doesn't upload, the site still works.
   - Make sure `index.html` ends up at the **top level** of the repository, not inside a `portfolio` subfolder.
3. Click **Commit changes**.

### 4. Turn on Pages
1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, pick **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)**. Click **Save**.
4. Wait 1–3 minutes and refresh. Your link appears at the top of that page: **"Your site is live at …"**

### 5. Finish the sharing preview
Open `index.html` on GitHub (click it, then the pencil ✏️ icon) and fill in the two full links so LinkedIn and Messenger show your preview picture:

```html
<meta property="og:image" content="https://yourusername.github.io/assets/img/og-image.png">
<meta property="og:url" content="https://yourusername.github.io/">
```

(If your repository isn't named `yourusername.github.io`, add `/portfolio` or your repo name after `.github.io`.)

### Updating later
Edit any file on GitHub (pencil icon) → **Commit changes**. The site updates by itself in a minute or two. To add photos, open the folder on GitHub → **Add file → Upload files**.

### If you prefer Git
```bash
git init
git add .
git commit -m "First version of my portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```
Then do step 4 above.

---

## Sharing your link

- Put it in your CV header next to your email.
- Add it to LinkedIn under **Contact info → Website** and in your **Featured** section.
- Add it to your email signature and your OJT cover letters.
- Paste it into Messenger once to check the preview picture shows up.

---

## Good to know

**Contact form.** GitHub Pages only hosts files; it can't send email. The "write me a note" form opens the visitor's own email app with the message filled in. Nothing is stored or sent by the site. If you ever want messages delivered straight to your inbox, a free service like [Formspree](https://formspree.io) can do it, but it's optional and means trusting a third party with messages.

**Privacy.** Your phone number and home address are intentionally **not** on the site. If you link a CV PDF, make a version without your home address and phone number first, because anyone on the internet can open it.

**Accessibility.** Everything works with a keyboard (Tab, Enter, arrow keys in tabs and the photo viewer). Animations turn off automatically for people who have "reduce motion" set on their device. Night mode follows the device setting and can be switched with the moon/sun button.

**Browsers.** Works in current Chrome, Edge, Firefox, and Safari, desktop and mobile.
