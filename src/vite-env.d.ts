/**
 * Vite Client Types
 *
 * This file provides TypeScript type definitions for Vite-specific features.
 * It enables type checking and autocompletion for:
 *
 * - import.meta.env - Environment variables and build mode information
 *   - import.meta.env.MODE (development, production, etc.)
 *   - import.meta.env.BASE_URL
 *   - import.meta.env.PROD
 *   - import.meta.env.DEV
 *   - Custom VITE_* environment variables
 *
 * - import.meta.hot - Hot Module Replacement (HMR) API for development
 *
 * - Asset imports - Proper types when importing images, CSS modules, JSON, etc.
 *
 * Without this file, TypeScript would not recognize these Vite-specific APIs
 * and would show type errors when using them in your code.
 *
 * @see https://vitejs.dev/guide/features.html#typescript
 * @see https://vitejs.dev/guide/env-and-mode.html
 */
/// <reference types="vite/client" />
