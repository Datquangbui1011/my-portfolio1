import type { NextConfig } from "next";

// Ensure a minimal localStorage API exists on the server during dev.
// Some environments or tools may create a global `localStorage` object
// without the browser API methods (getItem/setItem), which causes
// Next dev overlay code to throw when it tries to call them during SSR.
// Provide a no-op, safe polyfill here so server-side code can call these
// methods without crashing. This is intentionally minimal and used only
// to avoid dev-time exceptions; it does nothing persistent.
if (typeof globalThis.localStorage === "undefined" || typeof (globalThis.localStorage as any).getItem !== "function") {
  (globalThis as any).localStorage = {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {},
    removeItem: (_key: string) => {},
  } as any;
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
