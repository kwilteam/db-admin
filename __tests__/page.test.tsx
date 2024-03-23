import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import DatabasesPage from "@/app/(dashboard)/databases/layout"
import { Provider } from "react-redux"
import { store } from "@/store"
import mockRouter from "next-router-mock"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

describe("Databases Page", () => {
  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <DatabasesPage />
      </Provider>,
      { wrapper: MemoryRouterProvider },
    )
    expect(screen.getByText("Databases")).toBeInTheDocument()
  })
})
