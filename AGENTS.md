# Demo editing instructions

Work only in this standalone Bodywork Practice Demo project for Sam Clements Web.

- Preserve the exact training banner on every page and keep it readable without obscuring navigation.
- Preserve noindex on every HTML page and allow crawlers to read it. Do not restore a sitemap or original-business metadata.
- Preserve disabled enquiry behaviour: no processing service, requests, real contact links, bookings or payments. Keep the no-JavaScript controls disabled, the form-action/connect-src safeguards, and the exact local feedback “Demo only — your message has not been sent.”
- Make small requested changes. Leave unrelated content, imagery and styling alone. Keep copied testimonials labelled; never invent reviews.
- Keep the privacy explanation accurate when behaviour changes. Use clearly labelled demo contact details only.
- Keep secrets and local tool state out of version control.
- This demo must use its own repository and hosting project. Do not publish, push or connect services unless explicitly requested.
- Check affected pages, navigation and mobile layout after edits; check form safety with and without JavaScript when changing it.

## Astro maintenance

- Use Node 24.22.0 and `npm ci`; Astro is pinned in package.json and package-lock.json. Keep dependencies minimal and output fully static.
- Edit `src/pages/`, `src/components/`, `src/layouts/` and `src/data/practice.js`; edit static assets in `public/`. Never edit generated `dist/` or restore duplicate root HTML files.
- Update prices, demo details and opening hours centrally; check all references, including metadata. Preserve distinct introductory/ongoing/deposit values and existing image descriptions/attributions.
- Use slash routes (`/book/`, `/privacy/`), not legacy `.html` URLs.
- Run `npm run build` and `npm run preview`; inspect affected pages, images, navigation and desktop/mobile layout. Check form safety with and without JavaScript after relevant changes, and verify every built page retains noindex and production CSP.
- The local development CSP exception exists only for Astro/Vite hot reload. Never allow it into production: form-action, connect-src and frame-src must all be 'none'.
- Keep source, assets, config and lockfile portable. Exclude dependencies, generated output, caches, secrets and local tool state from version control.
- This is prepared for fresh deployment testing, not proof that hosting, account, AI-editing or recovery tests passed. Preserve Git history and pre-existing work. Wait for explicit instructions before pushing, publishing or connecting services.
