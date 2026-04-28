import { test as base } from '@playwright/test';

// Extend this type as you add page objects
type Fixtures = Record<string, never>;

export const test = base.extend<Fixtures>({});
export { expect } from '@playwright/test';