# WebNexa — Next Static Website Update

## Included
- Existing WebNexa logo and founder image preserved.
- KLU-inspired red, white and gold palette tokens.
- Enquiry form markup targeting FormSubmit at admin.webnexa@gmail.com.
- SEO descriptions, Open Graph/Twitter metadata and basic Organization JSON-LD.
- Team profile placeholders in about.html.
- Existing portfolio concepts retained and filterable by category.
- Meeting booking placeholder; no booking provider is configured in this package.
- Cloudflare Pages-compatible static HTML/CSS/JavaScript.

## Before publishing
1. Deploy the repository to Cloudflare Pages (framework preset: None; build command: blank; output directory: repository root).
2. Replace `https://YOUR-CLOUDFLARE-PAGES-DOMAIN` in `sitemap.xml` and `robots.txt` with the final HTTPS domain.
3. In `site.js`, replace `BOOKING_URL_HERE` with a public Calendly or Cal.com booking URL once created. No booking URL is configured now.
4. Vishal Kocherla's card lists Founder, Chief Operating Officer (COO), and Web Strategy Lead. The team section contains exactly two profiles: Vishal Kocherla and Shaik Ayaz Dadavali. Both portraits appear in the team cards; the separate founder section and unused placeholder card have been removed.
5. Check `work.html` and keep concept labels until projects are verified and ready to represent publicly.
6. FormSubmit email activation is not verified. Submit a real test enquiry and complete any activation email sent by FormSubmit before relying on delivery.
7. Check the final website on mobile and desktop, test the form, test the booking link after configuration, and inspect all page links.
8. Add the final domain to Google Search Console and submit `/sitemap.xml`.

## Static-only boundaries
There is no database, admin dashboard, custom server, or internal booking engine. Team and portfolio edits require updating files and redeploying. FormSubmit handles form delivery externally; Calendly/Cal.com handles scheduling externally after setup.

## Files updated
- `index.html`
- `services.html`
- `work.html`
- `about.html`
- `contact.html`
- `style.css`
- `site.js`
- `robots.txt`
- `sitemap.xml`
- `README-WEBNEXA.md`

The logo, favicon and founder image are included unchanged.


Team portrait asset: `shaik-ayaz-dadavali.png` (supplied image).


## Premium showcase update
- Portfolio page now contains 108 searchable and filterable illustrative project concepts.
- Categories: digital experiences, brand identity, and community platforms.
- The entries are explicitly labelled as concepts and are not claims of completed client projects.
- Search/filter runs in the browser; no database or backend is required.
- Replace concepts with real case studies, screenshots, outcomes and client approvals as real work becomes available.


## Client tools added
- Project cost estimator in `services.html#project-estimator`. Uses client-side illustrative price ranges only; confirm real pricing before launch.
- Searchable FAQ section in `services.html#faq`.
- Four concept case studies in `case-studies.html`; each is explicitly labelled as hypothetical, not completed client work.
- Floating WhatsApp contact button on pages. Before launch, replace `WHATSAPP_NUMBER_HERE` in `site.js` with WebNexa's approved international phone number using digits only. Until then it routes to the contact page and does not open WhatsApp.
- Estimator selection is passed into the contact message via URL query parameter. No database is used.


## Portfolio readability and timeline update
- Corrected portfolio concept cards to use dark readable text on white cards over a warm-white background.
- Portfolio header now presents a 12-month project-direction showcase; it explicitly says the 108 entries are illustrative concepts, not verified completed work during that period.


## Ongoing projects section
- Added a final portfolio section titled "More projects are in the pipeline."
- Includes six future exploration areas and an enquiry call-to-action.
- The copy explicitly describes these as planned directions, not confirmed active client projects.
- Update the cards when actual projects are approved or genuinely underway.


## Motion and interaction upgrade
- Scroll-triggered reveal animations for `.reveal` elements.
- Animated hero entrance, floating visual elements and pulse indicator where those elements exist.
- Reading progress bar, back-to-top button and sticky-header shadow on scroll.
- Subtle card hover lifts, gold spotlight hover effect and animated CTA buttons.
- Respects the visitor's reduced-motion accessibility preference.
- Built with CSS and vanilla JavaScript; no library or database required.


## Super experience visual upgrade
- Ambient animated color glows in hero areas.
- Theme toggle (dark / light) on all six pages; choice is stored locally in the visitor's browser.
- Improved hover depth and tile-ring transitions.
- Respects reduced-motion preferences.
