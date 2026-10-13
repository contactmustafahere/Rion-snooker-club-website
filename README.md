# Rion Snooker Lounge website (React + Vite)

## Run locally
1. Extract the ZIP. 2. Install Node.js 18+ from nodejs.org. 3. In the folder run:
```
npm install
npm run dev      # local preview
npm run build    # production build into dist/
```
## Publish on GitHub Pages
1. Create a GitHub repo and upload ALL extracted files (including the hidden `.github` folder), on branch `main`.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. The included workflow builds and deploys on every push. Your site appears at `https://<user>.github.io/<repo>/`.
4. To update: edit files, commit, push; it redeploys automatically.

## Edit the site
- **Business details** (name, phone, address, Maps link, WhatsApp message, hours, rating, reviews, price note): `src/config.js`
- **Page text**: `src/App.jsx`. **Colors**: `:root` in `src/index.css`. **Logo**: text in `src/App.jsx` (`.logo`).
- **Rates**: set `priceNote` in `src/config.js` once confirmed; leave `''` to hide.
- **Photos**: copy images (WebP/JPG, under ~300 KB) into `public/images/`, then enter the filename in `images` in `src/config.js`. Empty = built-in green baize graphic.
- See `IMAGE_PROMPTS.md` for prompts to generate matching photos.

Notes: the clock shows the visitor's local time only; the rating is shown as supplied and links to Google Maps.
