# Final Project — Playwright Test Suite

## Test target
SauceDemo (https://www.saucedemo.com)

## Covered user journey
Login → product selection → cart → checkout

## Test cases

### Login (`login.spec.ts`)
- Valid user can log in and sees inventory page
- Locked user cannot log in and sees error message
- Wrong password shows error message
- Empty username shows validation error

### Inventory (`inventory.spec.ts`)
- Inventory page is visible after login
- Inventory shows 6 products
- Each product has name, price, and add-to-cart button

### Cart (`cart.spec.ts`)
- Cart badge not visible when no items added
- Add one product shows badge count of 1
- Add two products shows badge count of 2
- Cart shows added item
- Cart page shows name of added product
- Remove one product updates cart to 1 item
- Remove all products hides cart badge

### Checkout (`checkout.spec.ts`)
- Complete checkout flow shows success message (uses `test.step`: enter info → verify overview → finish → verify success)

### Sorting (`sorting.spec.ts`)
- User can select "Price (low to high)"
- Prices are displayed in ascending order after sorting

## Project structure
```
tests/
  pages/          — Page Object classes
    LoginPage.ts
    InventoryPage.ts
    CartPage.ts
    CheckoutPage.ts
  login.spec.ts
  inventory.spec.ts
  cart.spec.ts
  checkout.spec.ts
  sorting.spec.ts
test-data/
  users.ts        — credentials, product keys, product names, checkout inputs
playwright.config.ts
```

## How to run
```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## Notes
- No hard waits (`waitForTimeout`) used anywhere
- Semantic locators: `getByPlaceholder`, `getByRole` in page objects; `data-test` attributes for app-specific elements
- All test data (credentials, product keys, display names, checkout info) lives in `test-data/users.ts`, not in spec files
- Tests run in parallel across Chromium, Firefox, and WebKit
- Traces collected on first retry for failed tests

## Known limitations
- Covers only the primary happy path and selected edge cases
- Does not cover all possible error states or user roles
