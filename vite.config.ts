// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
//
// **Self-hosted builds:** Without `nitro` here, `vite build` skips Nitro outside Lovable’s
// sandbox — deploy targets (e.g. Vercel) then have no SSR/server-fn bundle → 404 NOT_FOUND.
// We force Nitro on build. Preset: `NITRO_PRESET` if set; else `cloudflare-module` on
// Cloudflare Pages (`CF_PAGES=1`); else `vercel` when `VERCEL=1`; otherwise `cloudflare-module`.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const nitroPreset =
  process.env.NITRO_PRESET ||
  (process.env.CF_PAGES === "1"
    ? "cloudflare-module"
    : process.env.VERCEL === "1"
      ? "vercel"
      : "cloudflare-module");

export default defineConfig({
  nitro: {
    preset: nitroPreset,
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
