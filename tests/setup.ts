import '@testing-library/jest-dom';

// Mock ResizeObserver for Radix UI components
(globalThis as typeof globalThis & { ResizeObserver: unknown }).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

