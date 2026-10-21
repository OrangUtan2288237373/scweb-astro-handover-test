# Bodywork Practice Demo — Astro source

Standalone SCWeb training demo, prepared locally for fresh deployment testing. This is not a live business: no appointments, payments or enquiries are possible. Existing Git history is retained. Hosting, client-account ownership, AI-maintenance and recovery workflow tests remain pending; this conversion does not verify historical account activity.

## Run locally

Use Node.js **24.22.0 (24 LTS)** and npm (verified with **11.8.0**). `.nvmrc` records the Node version; if using nvm, run `nvm install` and `nvm use` first. Astro **7.4.1** is pinned, with the full dependency graph in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open the address printed in the terminal (normally **http://127.0.0.1:4321/**). Astro 7 starts the local server in the background; stop it with `npm run dev:stop`. To inspect the actual static production output:

```sh
npm run build
npm run preview
```

Preview prints its own local address, using the next available port if needed. Stop it with `npm run preview:stop`. Build output is `dist/`. No database, server adapter, CMS or JavaScript UI framework is required.

## Edit and back up

- `src/pages/*.astro`: all eight pages, including privacy and thank-you. Routes are `/`, `/the-work/`, `/bowen/`, `/about/`, `/testimonials/`, `/book/`, `/privacy/` and `/thank-you/`. Use these routes, not `.html` links.
- `src/data/practice.js`: demo contact details, navigation, introductory and ongoing session prices, deposit and opening hours. The booking description also reads its price here. The introductory session, ongoing session and deposit are separate values.
- `src/layouts/SiteLayout.astro` and `src/components/`: shared metadata, training banner, navigation and footer. The thank-you page retains its compact footer.
- `public/images/`: original photographs; preserve descriptive alternative text in the pages. `public/css/style.css`: shared styling. Booking-specific styling remains in `src/pages/book.astro`.
- `public/js/main.js`: mobile navigation, scroll effects and local-only demonstration form behaviour.
- `public/robots.txt` and `public/favicon.svg`: public static files.

Edit source, then rebuild. `dist/` is generated and overwritten; do not edit it. A complete portable source backup includes `src/`, `public/`, `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `.nvmrc`, `netlify.toml`, `.gitignore`, `README.md` and `AGENTS.md`. Git metadata is useful for preserving history but is not required to build. Do not back up installed `node_modules/`, generated `dist/`, `.astro/`, secrets or local tool state as source.

## Demo safeguards and privacy

Every page retains the exact training banner and `noindex, follow`. Crawling remains allowed in `robots.txt`; no sitemap is generated. Noindex is not access control.

The form has no processing destination, and its fieldset is disabled in source. JavaScript binds submission prevention before enabling the demo controls; submissions only display **“Demo only — your message has not been sent.”** Without JavaScript the form remains disabled. Production CSP retains `form-action 'none'; connect-src 'none'; frame-src 'none'`. Bookings, payments, messaging and video playback remain disabled. No analytics, tracking scripts, storage or live contact links are added.

Development only: CSP permits same-origin connections plus `ws://127.0.0.1:*` and `ws://localhost:*` for Astro/Vite hot reload. Development and preview bind to loopback by default. Production builds use `connect-src 'none'`; they do not contain this exception. Astro's development toolbar is disabled. The development client makes local hot-reload connections; use production preview when checking production privacy behaviour.

Google Fonts remains the only external appearance resource, contacting `fonts.googleapis.com` and `fonts.gstatic.com`; it requires a network connection for those typefaces and otherwise falls back to local fonts. Building does not fetch these fonts. The privacy page explains Google requests and local server logs; review it before hosting or changing behaviour.

## Generic future hosting settings

Build command: `npm run build` (after dependency installation). Output directory: `dist`. Node version: `24.22.0`. `netlify.toml` supplies only generic settings and contains no account or site identifiers. Cloudflare Pages can also serve the static `dist` directory with these settings and a matching Node version; no adapter or functions are needed. Deploy at the domain root. Hosting must use a separate demo project. Pushing, creating remote repositories, connecting accounts, publishing and DNS changes require an explicit instruction.

## A3 redirect and response-header checks

Two host configuration files live in `public/` and are copied unchanged to the root of `dist/` by `npm run build`:

- `public/_redirects`: requesting `/a3-redirect-test/` should return **302** with a `Location` pointing to `/privacy/` on the same site. This deliberately unused test path has no page and is not linked from navigation. The temporary redirect avoids a permanent redirect for this test.
- `public/_headers`: requesting `/privacy/` directly should return **200** with **`X-SCWeb-A3-Test: static-config-ok`**. Header names are case-insensitive. This informational marker changes no security, caching, tracking or form behaviour.

The existing banner, noindex, crawl allowance, CSP, disabled enquiry behaviour and video/payment restrictions remain unchanged. The redirect target is the existing demo privacy page.

### Verify later on each hosting provider

Actual HTTP behaviour remains **unverified until tested on the hosting provider**. Astro's local preview may not apply these hosting-specific files; a local 404 or missing header does not establish whether the hosted rules work. Local verification only confirms the build includes the files.

After a separately authorised deployment, perform the following checks independently on Netlify and Cloudflare Pages. Use each provider's actual demo deployment URL (for example its `netlify.app` or `pages.dev` address). Build with `npm run build`, publish `dist`, and ensure `_redirects` and `_headers` are at that directory's root. No adapter or server function is needed for these static rules.

Set `DEMO_BASE` to the relevant HTTPS deployment origin, without a trailing slash, then run:

```sh
DEMO_BASE='https://replace-with-your-demo-deployment.example'
# Do not follow redirects: inspect the initial status and Location.
curl -sS -D - -o /dev/null "$DEMO_BASE/a3-redirect-test/"
# Inspect the destination response separately.
curl -sS -D - -o /dev/null "$DEMO_BASE/privacy/"
# Follow the redirect to confirm its final destination and successful response.
curl -sS -L -o /dev/null -w '%{http_code} %{url_effective}\n' "$DEMO_BASE/a3-redirect-test/"
```

Expect 302 and a relative or absolute same-site Location ending in `/privacy/` for the first request; 200 and the custom header for the second; and 200 at the same site's `/privacy/` for the third. Check the custom header on the destination response, not the redirect response. In browser developer tools, enable Preserve log in Network, visit the test path, and inspect both document requests. Confirm the privacy page still displays the training banner and contains noindex and the production CSP. Record the deployment URL, provider, statuses, Location and header value as the A3 evidence. If results differ, inspect that provider's deployment/rule diagnostics and any conflicting settings before marking the check passed.

Provider references: [Netlify redirects](https://docs.netlify.com/manage/routing/redirects/overview/), [Netlify headers](https://docs.netlify.com/manage/routing/headers/), [Cloudflare Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/) and [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/).

These rules are prepared for future hosting checks only; adding them does not authorise publishing, pushing or connecting services.

## Before making the source public

The original photographs, practitioner name, biography, qualifications, bodywork claims and attributed testimonials remain copied demonstration content. Existing labels, image descriptions and testimonial attributions are preserved. No standalone image/content licence or permission record was supplied in this project; confirm permission to redistribute photographs, personal details and quotations before publishing the source. No credentials, reviews or licence permissions have been invented. Review the retained health-related claims and example booking policies before any public use. Demo contact details use `example.invalid` and are not monitored.

## Local verification completed

Verified with Astro 7.4.1, Node 24.22.0 and npm 11.8.0:

- Production build generates all eight static pages. Chromium checks at 1440px and 390px covered every page, internal link, image, mobile menu, readable banner and horizontal overflow; screenshots were visually reviewed. Original page text (apart from whitespace), image descriptions, CSS, JavaScript and image files were retained.
- Every generated page has noindex and production CSP; robots.txt allows crawling. Browser checks confirmed CSP blocks native form submission, scripted fetch and frames. The JavaScript form produces the exact local feedback with zero submission requests; without JavaScript every field and the submit button remains disabled.
- Development hot reload connected successfully with its documented local exception.
- Temporarily changing the central introductory price from £55 to £59 changed exactly seven occurrences across six pages, including booking metadata. Ongoing £75 and deposit £25 stayed unchanged. Restoring £55 and rebuilding reproduced identical output.
- A separate temporary copy, excluding Git metadata, installed dependencies, caches and generated output, passed fresh `npm ci` and `npm run build` using an empty npm cache. Its generated output matched the working project's output byte for byte. Dependency installation reported no known vulnerabilities at verification time.

Browser checks used Chromium, not every browser or physical device. No remote repository, hosting account, deployment, DNS, client-ownership or recovery workflow was tested or changed. Nothing was pushed or published.
