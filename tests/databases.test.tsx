import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import Page from "../app/(dashboard)/page"

vi.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => children
})

vi.mock("next/font/google", () => {
  return {
    Inter: () => ({ className: "inter" }),
  }
})

test(`Dashboard`, async () => {
  render(await Page())
  expect(screen.getByText("Home")).toBeTruthy()
})
