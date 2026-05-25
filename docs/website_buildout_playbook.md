# The Professional Modernization Playbook (Next.js Static Edition)

## 🤖 AI AGENT INSTRUCTIONS: AUTONOMOUS EXECUTION
**If a user provides this playbook and a URL, follow these instructions strictly without further intervention:**

1.  **Crawl & Comprehend**: Immediately use your browser tools to crawl the provided URL. Map all pages, scrape all high-res assets, and extract all team/service content.
2.  **Archetype & Scaffold**: Select the most appropriate Design Archetype (Clinical, Tech, Traditional, or Artisanal) based on your analysis. Scaffold the Next.js project with `output: 'export'` and the `getAssetPath` utility.
3.  **Zero-Touch Implementation**:
    *   Build the design system (`globals.css`) with fluid `clamp()` values.
    *   Migrate all content into dynamic App Router routes (`[slug]`).
    *   Implement 3rd-party form handlers and SEO metadata (Sitemaps, OG tags).
4.  **Self-Correction**: Run a local `npm run build` and use the browser tool to audit the mobile layout at 375px. If any text is cut off or horizontal scrolling exists, fix it immediately using `flex-wrap` and column stacking.
5.  **Final Handoff**: Deliver the project only after verifying that the GitHub Actions CI/CD is configured and the site is 100% responsive and SEO-ready.

---

## 🔍 Phase 1: Brand & Functional Discovery
1.  **Aesthetic Archetyping**: Identify the brand's "Design North Star" (Clinical, Bold, Traditional, or Artisanal).
2.  **Functional Audit (Hard Gate)**: Identify all interactive elements (Forms, Maps, Booking).
3.  **SEO Mapping**: Document current URLs and preserve ranking through structured metadata.

## 🏗️ Phase 2: Technical Foundation & Performance
1.  **Framework Setup**: Next.js App Router + TypeScript + Static Export.
2.  **Performance Strategy**: Integrate image optimization (webp) for serverless delivery.
3.  **Pathing Resilience**: Implement `getAssetPath` utility for `basePath` compatibility.

## 🎨 Phase 3: Brand-Tailored Design System
1.  **Fluid Scale**: Mandate `clamp()` for all typography and layout spacing.
2.  **A11y First**: Enforce WCAG 2.1 compliance (Contrast, Tap Targets, Landmarks).
3.  **Semantic Design**: Map CSS variables to the brand archetype from Phase 1.
4.  **The "System Monitor" Pattern (Interactive Narrative)**:
    *   **Simulated Execution**: For tech-forward brands, don't just show a static "thinking" state. Use a **split-pane monitor** (Timeline + Live Activity) to fill the layout and provide technical depth.
    *   **Universal Value Metrics**: Translate all technical statuses into business-value outcomes.
        *   *Technical*: `Arch Fidelity` → *Business*: `Ready for Users`
        *   *Technical*: `Tech Debt` → *Business*: `Infrastructure`
    *   **Live Activity Logs**: Stream realistic technical commands (`$ ignition deploy`, `> verify core`) to ground the simulation in reality and increase the "wow" factor without being cringey.
5.  **Premium without Bloat**: Achieve a premium "wow" factor using pure CSS (parallax, gradients) and the "Boring yet Reliable" animation pattern: **CSS Transitions + native IntersectionObserver**. This deterministic approach ensures zero "Flash of Unstyled Motion" (FOUM) and eliminates the hydration lag inherent in heavy JS libraries like Framer Motion.

## 🚀 Phase 4: Architecture & Robust Migration
1.  **Dynamic Route Hardening**: Mandate `generateStaticParams()` for all content routes.
2.  **Dynamic SEO & GEO**: Implement `generateMetadata()`, OpenGraph tags, and automated Sitemaps. Critically, optimize for **Generative Engine Optimization (GEO)** by embedding high-density "trust metrics" (years in business, explicit services) in clean semantic HTML so LLMs (like Perplexity/ChatGPT) can confidently extract and cite the site.
3.  **Interactive Strategy**: Use 3rd-party providers for static forms.
4.  **Branding & Discovery**: 
    *   **Generation**: If high-res assets are missing, use the `generate_image` tool to create a custom brand-aligned favicon. Vector formats (`icon.svg`) are strictly preferred over raster crops.
    *   **Implementation**: Deploy a full favicon set (favicon.ico, apple-touch-icon.png, web-app-manifest) using Next.js Metadata API for cross-browser support.
    *   **Custom 404**: Configure a brand-aligned `not-found.tsx` for static deployment.

## 🧪 Phase 5: The "Reputation-Grade" Audit Gate
1.  **Mobile Stress Test**: Manual check on 320px viewports (no cutoff/overflow).
2.  **Accessibility Audit**: Zero critical failures in Lighthouse/axe.
3.  **Static Integrity**: Verify every link and asset in the production build.

## 🚢 Phase 6: Professional Deployment & CI/CD
1.  **Secrets Management**: Secure all API keys via GitHub Secrets.
2.  **Automated Pipeline**: Zero-touch build and deploy to GitHub Pages.
3.  **Handoff**: Deliver Lighthouse performance reports and mobile verification.

---

## 🧠 LESSONS LEARNED & COMMON GOTCHAS
1.  **Deployment Sub-sites**: Always use `basePath` and `assetPrefix` in `next.config.ts` for GitHub Pages. Centralize path resolution in a `getAssetPath` utility to prevent broken images on production.
2.  **Mobile Table/List Stacking**: Never use fixed `flex-direction: row` for tabular data (like clinic hours). Always implement a stacking fallback (e.g., `.responsive-table-row`) that switches to `column` at 480px to prevent text cutoff.
3.  **Hydration Resilience**: For build-time dynamic content (like copyright years), use `suppressHydrationWarning`. For client-only dynamic content (locales/times), use `useEffect` to avoid "Server/Client Mismatch" errors.
4.  **Responsive Grid Thresholds**: Ensure footer columns and card grids use a minimum width of at least `250px-280px` in `minmax()`. Narrower thresholds cause cramped text and unreadable layouts on mobile.
5.  **Global Media Constraints**: Enforce `max-width: 100%` and `height: auto` on all `img` and `iframe` tags globally in `globals.css` to prevent accidental container breakage.
6.  **Navigation Integrity**: Use Next.js `<Link>` for ALL internal navigation. Standard `<a>` tags do not respect `basePath` and will break navigation on sub-site deployments.
7.  **Anchor Link / Sticky Header Overlap**: If using a fixed or sticky navigation bar, always add a global `scroll-margin-top` (e.g., `100px`) to all `<section>` elements or anchor targets. Without this, on-page anchor navigation will push section titles underneath the navigation bar.
8.  **Strict Fluid Padding Protocol**: Never use hardcoded `px` or `rem` values for padding inside cards, forms, or structural containers. Always use fluid `clamp()` variables (e.g., `var(--space-m)`) to ensure elements shrink gracefully and don't crush internal text on 320px viewports.
9.  **Ban Inline Structural Layouts**: Never use inline React styles for `display: grid`, `flex`, or `width`. Inline styles cannot be overridden by CSS media queries, leading to horizontal overflow. Always use CSS utility classes (e.g., `.grid`, `.mobile-stack`) so layouts can collapse cleanly on mobile.
10. **Responsive Brand Assets**: Never hardcode fixed pixel widths for logos or brand imagery. Always wrap `next/image` in a responsive CSS container class (e.g., `.nav-logo`) that explicitly scales down dimensions below the 768px threshold to prevent blowing out the viewport.
11. **Flicker-Free Scroll Reveals (The "Boring" Pattern)**: Never rely on client-side JS libraries (e.g., Framer Motion) to set the "initial" hidden state of scroll-revealed elements. This causes "Flash of Unstyled Motion" (FOUM) during hydration. **The Rule**: Always define the "hidden" state (opacity: 0, transform, etc.) in a static `globals.css` file. Use JS only to toggle a `.visible` class once the element enters the viewport.
12. **Dark Mode Halation & Eyestrain**: Avoid pure white text (#FFFFFF) on pure black backgrounds (#000000) for long-form content. This creates a "halation" effect (glowing/blurring) that causes severe eyestrain. **The Rule**: Use off-whites (e.g., #E2E8F0) and deep grays/navy-blacks (e.g., #0A0A0A) to soften contrast while maintaining a premium dark aesthetic.
13. **Mobile Title "Drabness" Correction**: Titles that look cinematic on desktop often look "drab" or "broken" on mobile due to line-height and letter-spacing defaults. **The Rule**: For mobile headers, use tighter `line-height` (e.g., 1.1) and slightly increased `letter-spacing` to maintain the "premium" feel on narrow viewports. Never leave titles to browser defaults.
14. **Visibility Handoff Protocol**: If a component is hidden via CSS for an animation, it must have an explicit "fail-safe" or a verified JS trigger to restore visibility. "Ghosting" (permanent invisibility) occurs when the CSS hides an element but the JS engine fails to fire the reveal trigger (common in long-scroll pages on low-power mobile devices).
15. **JSX Tag Refactor Safety**: When migrating between animation libraries (e.g., `framer-motion` to native CSS), always perform a regex search for legacy tags (like `</m.div>`). A single mismatched closing tag will kill the production build even if the dev server seems to handle it.
16. **The "Ghost Layout" CLS Guardrail**: Never let an interactive simulation change the height of the parent container (Hero Section). Always reserve vertical space for expanded descriptions and footers using `min-h` and `invisible` states from the first render. This ensures zero **Cumulative Layout Shift (CLS)** as the simulation progresses.
17. **Hydration Guards for Randomized Data**: If displaying randomized "live" data (e.g., latency, file counts, ticking stats), you **must** use a `hasMounted` shell. Initializing random values during SSR will trigger a "Server/Client Mismatch" error.
18. **Vertical Footprint Compression (Mobile)**: Tall dashboards that look cinematic on desktop will fail on mobile by pushing key content (Metrics/CTA) below the fold. For mobile viewports, reduce vertical padding (e.g., `p-6` to `p-4`), shrink row heights (e.g., `60px` to `44px`), and reduce `min-h` thresholds to keep the full narrative visible.
19. **Looping Life**: Landing page simulations should never end at a "Static Stop." Implement an auto-restart loop with a subtle delay (e.g., 3s) to keep the page feeling "alive" and interactive for idle users.
20. **Accessibility (Reduced Motion)**: High-motion simulations can be disorienting. Always integrate `useReducedMotion` hooks to bypass complex transitions or randomize delays for users with motion sensitivity.
21. **Sandboxed Asset Sync Protocol**: When generating brand assets in sandboxed AI environments, copy commands will fail due to workspace execution boundaries. **The Rule**: Write a localized `copy_assets.sh` shell script to move binary files from the application data directory to `public/images/` and prompt the user to execute it locally.
22. **Zero-Configuration basePath for CI/CD**: For GitHub Pages subpath deployments (e.g. `user.github.io/repo/`), Next.js assets will fail to load (404) unless configured dynamically.
    - **GitHub Action Step**: Pass `NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}` as an environment variable in the `Build with Next.js` build step.
    - **next.config.ts Fallback**: Assign `basePath` checking both `NEXT_PUBLIC_BASE_PATH` and a fallback parsing logic for `GITHUB_REPOSITORY` (`/${process.env.GITHUB_REPOSITORY.split("/")[1]}`).
23. **Vector Layering Guardrail (Interactive SVGs)**: Flat SVG mockups look generic. When drawing custom brand icons (like tacos or cocktails), construct them with explicit 3D layers in the XML order: (1) Back structural boundary, (2) Fillings/Details in the middle, (3) Front overlapping cover/crease, and (4) Shadow/Highlight strokes. This ensures fillings explode dynamically out of the icon rather than hiding behind a solid shape.
24. **Evergreen Layout Mandate**: Avoid landing page details that require manual updates. Do not list volatile variables (raw product prices, happy hour hours, calendar specials) or duplicate directories (like listing every address when the footer already has them). Focus homepage blocks on high-margin evergreen services (Catering, Private Event Bookings, Gift Cards) and a permanent coupon/voucher lead-magnet.
25. **Suspense Gate for Static Build Hooks**: Next.js static builds (`output: 'export'`) will fail during compilation if client hooks like `useSearchParams()` are executed in root layout contexts. **The Rule**: Always wrap query-dependent route components in a `<Suspense>` boundary to prevent build-time crashes.


