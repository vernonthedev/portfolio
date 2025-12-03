import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    globals: true,
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: [
        "app/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "lib/**/*.{ts,tsx}",
      ],
      exclude: [
        "app/**/layout.tsx",
        "app/**/error.tsx",
        "app/**/not-found.tsx",
        "app/**/sitemap.ts",
        "app/api/**/*.ts",
        "components/admin/**/*.tsx",
        "lib/prisma.ts",
        "lib/auth.ts",
        "lib/utils.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
