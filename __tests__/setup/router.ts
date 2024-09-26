import { vi } from "vitest"

const mockedRouterPush = vi.fn()
const useRouter = vi.fn(() => ({ push: mockedRouterPush }))

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation")
  return {
    ...actual,
    useRouter,
  }
})
