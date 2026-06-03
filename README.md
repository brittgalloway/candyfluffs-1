# Candy Fluffs

An eCommerce website for illustrator [Candy Joy](https://www.candyfluffs.com), designed in Figma and built with modern web technologies. The site lets fans browse and purchase prints, charms, books, stickers, and more — alongside content for Candy Joy's original webtoon series, [Necahual](https://www.webtoons.com/en/canvas/necahual/list?title_no=216820).

![CandyFluffs Home page](https://github.com/user-attachments/assets/1607adca-3209-4353-819b-d2e7a8125571)

---

## Project History

The original site was built in 2021 with Gatsby by a team of three:

- [Doug](https://github.com/daleinen7) — Lead Developer
- [Stephanie](https://github.com/mlisdev) — Front-end Developer
- [Brittney](https://www.linkedin.com/in/brittneygalloway/) — Designer & Maintenance Developer

Since then, Brittney has been the sole maintainer. The site has been overhauled and migrated to **Next.js and TypeScript**, with ongoing improvements to performance, accessibility, and code quality.

---

## What's New

- **Migrated from Gatsby to Next.js 16** with TypeScript for improved performance and maintainability
- **Accessibility audit and overhaul** — keyboard navigation, ARIA attributes, semantic HTML throughout
- **Playwright test suite** with `@axe-core/playwright` for automated accessibility and E2E coverage
- **FontAwesome removed** — replaced with a custom inline SVG icon system (`icons.tsx`) for zero dependency, `currentColor` theming, and full TypeScript support
- **Popover API dropdown** for fandom filtering — no JavaScript state, native dismiss on Escape and click-outside
- **Code quality sweep** — eliminated `any` types, GraphQL injection vulnerabilities, and DOM manipulation anti-patterns
- **CI/CD pipeline** — GitHub Actions runs the full Playwright suite on every push; Netlify only deploys on green
- **CMS migration in progress** — transitioning from DatoCMS to Sanity.io for a more flexible content editing experience

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) |
| Language | TypeScript |
| Styling | SCSS Modules |
| CMS | DatoCMS (Sanity.io migration in progress) |
| Cart | [Snipcart v3](https://snipcart.com/) |
| Payments | Stripe |
| Email | Mailchimp |
| Deployment | [Netlify](https://netlify.com/) |
| Testing | [Playwright](https://playwright.dev/) + [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm) |
| Design | [Figma](https://www.figma.com/file/IndaqA3RP8qZew4yHcXYQI/candyFluffs?node-id=26%3A9) |

---

## Features

**Shop**
- Browse all products on the home page with pagination
- Filter by product type (Prints, Charms, Books, etc.) and fandom category
- Hover to preview product details on desktop, click for the full product page
- Sold-out products are marked and non-purchasable automatically via the Snipcart API

**Necahual**
- Dedicated page for Candy Joy's original mesoamerican magical girl webtoon
- Links to the Webtoons series, Patreon, Instagram, and X
- Necahual merchandise displayed separately

**Events**
- Conventions/Expos page listing live events where Candy Joy will be present

**Checkout**
- Snipcart v3 cart available on all pages
- Stripe payment processing
- Product variations (size, style, etc.) supported

**Footer & extras**
- Newsletter signup via Mailchimp
- Ko-fi support widget
- About, Contact, and Links pages

---
## Preview

![Product type gallery](https://github.com/user-attachments/assets/d1dbc4eb-803a-4829-851b-250b75fb0580)

![Product page](https://github.com/user-attachments/assets/e818cc53-064b-4287-813d-961075958561)
![Necahual Page](https://github.com/user-attachments/assets/0ab49f9b-1be6-47b9-a70e-2a6aabf17637)
![Page footer and pagination](https://github.com/user-attachments/assets/0b288079-b77b-476d-b3a3-bf6962fcc55e)

---
## Running Locally

```bash
npm install
npm run dev
```

Add the following to `.env.local`:

```
NEXT_PUBLIC_SNIPCART_APIKEY=
NEXT_PUBLIC_SITE_URL=
API_TOKEN=                        # DatoCMS read token
BASE64_ENCODED_SECRET_API_KEY=    # Snipcart secret (base64)
```

---

## Testing

```bash
# Install browsers (first time only)
npx playwright install --with-deps chromium

# Run all tests
npm test

# Open interactive UI
npm run test:ui

# Accessibility tests only
npm run test:a11y
```

Tests cover smoke checks, navigation, product flows, pagination, and full axe accessibility scans at desktop and mobile viewports. Third-party iframes (Ko-fi, Mailchimp) are excluded from axe scans since their markup is outside our control.

---

## License

[BSD Zero Clause License](https://github.com/brittgalloway/candyfluffs-1/blob/main/LICENSE)
