/**
 * Vitest Setup File
 * Global test configuration and utilities
 */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/vue';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Extend expect with custom matchers if needed
// expect.extend({...});
