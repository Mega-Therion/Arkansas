# Spec: `design-reference` — Natural State Design System Page

## Objective

Add a user-facing design-system reference page that explains the actual Natural State visual tokens and reusable UI components, including the truthful treatment of USGS observations, status, accessibility, and motion. Render authored Markdown as a navigable page rather than leaving the design guidance only in a project file. Success means `/design-system` displays the approved token/component guide and can be reached from dashboard navigation.

## Commands

- Development: `pnpm dev`
- Production/type build: `pnpm build`
- Preview build: `pnpm preview`
- Keep `public/manus-routes.json` synchronized with `/` and `/design-system`.

## Content and behavior

- Provide a `docs/design-system.md` source with the Natural State brand essence, design principles, token roles and examples, component roles, interaction/motion principles, accessibility/focus/contrast notes, and data-provenance conventions.
- Markdown content is first-party and version-controlled. Render its GFM headings, paragraphs, lists, tables, links, and fenced code through a Markdown parser. Sanitize generated HTML before insertion into the DOM; permit safe semantic elements only and block executable scripts/unsafe URL schemes.
- Display a table of contents or heading navigation where useful, readable heading hierarchy, visible links, and responsive code/table containers.
- Link to the guide from the dashboard with an ordinary keyboard-accessible anchor. Direct navigation and browser back/forward must work at `/design-system`.
- Keep every example implementation-backed; clearly label illustrative palettes/examples and never use test or mock values as live data claims.

## Tech stack and dependencies

React 18, TypeScript, Vite, Tailwind. Add `marked` for GFM parsing and `dompurify` for output sanitization; do not add a second component library or router solely for this page. Consume Markdown from a local bundled file, not arbitrary user input or a remote URL.

## Project structure

- `docs/design-system.md`: first-party Markdown source.
- `src/pages/DesignSystemPage.tsx`: accessible reference-page layout and rendering.
- `src/lib/markdown.ts`: Markdown parse and HTML sanitization boundary.
- `src/App.tsx`: route selection and navigation link.
- `public/manus-routes.json`: route declarations for `/` and `/design-system`.
- Existing `src/styles/design-tokens.css`, `src/styles/global.css`, `src/styles/components.css`, `tailwind.config.cjs`, and `src/components/`: implementation source of truth for examples.

## Code style

Keep Markdown parsing/sanitization separate from page presentation. Treat parser output as untrusted even though the current bundled file is first-party. Do not pass unsanitized `marked` output into `dangerouslySetInnerHTML`; use DOMPurify with an explicit safe URI policy. Use semantic `main`, `nav`, headings, `pre`, `code`, and table markup.

## Testing strategy

- Unit-test the renderer with a script tag, event-handler attribute, `javascript:` link, ordinary HTTPS link, code fence, table, and GFM heading to verify safe markup and expected rendered structures.
- Component checks verify accessible page title, navigation, stable heading hierarchy, and narrow-screen overflow behavior.
- Verify manifest JSON includes exactly the implemented page routes and run `pnpm build`.

## Boundaries

- **Always:** derive design guidance from current project tokens/components and the approved visual direction; sanitize HTML; provide accessible semantic reading order; update the route manifest.
- **Ask first:** add editable token tools, design exports, user-generated/remote Markdown, new package or router not named here, or additional public content routes.
- **Never:** execute embedded Markdown HTML or use parser output unsanitized; present aspirational component states as implemented if the code does not support them.

## Success criteria

1. The design reference is accessible at `/design-system` through a working dashboard link and browser history.
2. Authored Markdown renders tables, lists, code fences, links, and headings as readable styled HTML.
3. Sanitization blocks script execution, unsafe URL schemes, and inline event handlers while preserving safe guide content.
4. Documented tokens and behaviors correspond to existing application source, including USGS data status/provenance conventions.
5. `/manus-routes.json` declares the homepage and design-system page, and `pnpm build` succeeds.

## Open questions

None. The current DESIGN.md and user-approved data scope establish the content source; the exact Markdown guide is implementation content.
