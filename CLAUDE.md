# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm test                   # Run all tests (headless)
npm run test:ui            # Open Playwright UI mode
npm run test:headed        # Run with visible browser
npm run test:debug         # Run with Playwright Inspector
npm run report             # Open last HTML report
npm run lint               # ESLint
npm run typecheck          # TypeScript type check

# Run a single test file
npx playwright test tests/example.spec.ts

# Run tests by name pattern
npx playwright test -g "has title"

# Run on a specific browser
npx playwright test --project=chromium

# Install browsers
npx playwright install
```

Set `BASE_URL` in a `.env` file (see `.env.example`) to target different environments.

## Architecture

```
src/
  pages/      # Page Object Model classes, all extend BasePage
  fixtures/   # Playwright fixture extensions (base.fixture.ts is the root)
  helpers/    # Stateless utilities (ApiHelper, etc.)
tests/        # Test specs — import test/expect from src/fixtures/base.fixture.ts
```

**Page Object Model**: Every page is a class in `src/pages/` that extends `BasePage`. Locators and actions live on the page class; assertions stay in the test.

**Fixtures**: `src/fixtures/base.fixture.ts` re-exports `test` and `expect` after extending them with page object instances. All test files import from this fixture, never directly from `@playwright/test`.

**Config**: `playwright.config.ts` runs chromium, firefox, and webkit in parallel. On CI (`CI=true`) retries are set to 2 and workers to 1. `BASE_URL` is read from the environment.

**Path aliases**: `@pages/*`, `@fixtures/*`, `@helpers/*` are mapped in `tsconfig.json`.
