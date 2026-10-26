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
- Fill in `.env` (see **Contact form** below) so enquiries are delivered.

## Contact form
The form on `/contact` posts to `/api/contact`, a small Node server (`server/index.js`) that emails each
enquiry to `EMAIL_TO` with the visitor's address as Reply-To.

1. Copy `.env.example` to `.env` and fill in your SMTP settings (host, port, user, password).
   `.env` is ignored by git — never commit it or put credentials anywhere in `src/`.
2. Development — run these in two terminals:
   ```bash
   npm run server   # contact-form API on http://localhost:3001
   npm run dev      # website; /api requests are forwarded to the server
   ```
3. Production — on a host that supports Node.js:
   ```bash
   npm run build
   npm start        # serves the built site (dist/) and /api/contact
   ```
   Static-only hosts (plain Netlify or Vercel static hosting) cannot run this server.
