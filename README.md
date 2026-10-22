# Human Studio Labs — complete website (React + Vite)

All copy comes word for word from "Human Studio Labs — Complete website content structure".

## Run in VS Code
1. Install Node.js 18 or newer (https://nodejs.org).
2. Open this folder in VS Code and open the terminal (Ctrl + `).
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the link in the terminal (usually http://localhost:5173).

## Pages
| Address | Page |
|---|---|
| `/` | Home — sections 01–10 in the order of the content brief |
| `/solutions/medical-operating-systems` | Medical Operating Systems |
| `/solutions/medical-training` | Medical Training |
| `/solutions/medical-research` | Medical Research |
| `/solutions/medical-advisory` | Medical Advisory (patients + professionals) |
| `/about` | About, Vision, Mission, Philosophy, Innovation Model, Looking Forward |
| `/responsible-ai` | Responsible AI |
| `/partnerships` | Enterprise Solutions & Partnerships |
| `/contact` | Contact form (`/contact?area=Medical%20Research` pre-selects the area) |

## Where things are
```
src/
├── data/content.js      ← ALL text and image paths (edit here)
├── pages/               ← Home, Solution, About, ResponsibleAI, Partnerships, Contact
├── sections/Hero.jsx    ← homepage hero
├── components/
│   ├── Header.jsx       ← logo, menu, "Start a Conversation" button, mobile menu
│   ├── Footer.jsx
│   ├── Blocks.jsx       ← PageHero (inner pages) and CtaBand (closing band)
│   └── ui.jsx           ← Section, Head, Button, Media, Rows, Tiles, Prose, SideNote
└── styles.css           ← all styles; colours are variables at the top
public/images/           ← images (replace a file with the same name to swap it)
```

## Publishing
`npm run build` creates the `dist/` folder. The site uses page addresses (/about, /contact …),
so the host must send every address to `index.html`:
- Netlify: add a file `public/_redirects` containing `/*  /index.html  200`
- Vercel: works automatically for Vite projects
- Other hosts: set the "SPA fallback" / "rewrite all routes to index.html" option

## Before launch
- Replace the images in `public/images/` with licensed versions.
- Set the real email address in `BRAND.email` (`src/data/content.js`).
- The contact form currently opens the visitor's email app; connect it to a form service or backend if you want enquiries delivered automatically.
