import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    include: ["**/__tests__/**/*.(test).[jt]sx"],
    globals: true,
    environment: "happy-dom",
    mockReset: true,
    setupFiles: ["./__tests__/setup.ts"],
  },
})
