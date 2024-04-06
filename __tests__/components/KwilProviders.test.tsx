import { beforeEach, describe, expect, it } from "vitest"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { mockStore } from "../mocks/mock-store"
import KwilProviders from "@/components/KwilProviders"
import { KwilProviderStatus } from "@/store/providers"

const mockProviders = [
  { name: "Provider 1", url: "http://provider1.com" },
  { name: "Provider 2", url: "http://provider2.com" },
]

const storeData = mockStore({
  providers: {
    providers: mockProviders,
  },
  global: {
    providerStatus: KwilProviderStatus.Online,
  },
})

describe("KwilProviders Component", () => {
  describe("when provider status is online", () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={storeData}>
            <KwilProviders activeProvider={"Provider 1"} />
          </Provider>,
        )
      })
    })

    it("shows online status indicator", () => {
      expect(screen.getByText(/Provider 1/)).toBeInTheDocument()
      const statusIndicator = screen.getByTestId("status-indicator")
      expect(statusIndicator).toHaveClass("bg-lime-500")
    })
  })

  describe("when provider status is offline", () => {
    beforeEach(async () => {
      storeData.dispatch({
        type: "global/setProviderStatus",
        payload: KwilProviderStatus.Offline,
      })
      await act(async () => {
        render(
          <Provider store={storeData}>
            <KwilProviders activeProvider={"Provider 1"} />
          </Provider>,
        )
      })
    })

    it("shows offline status indicator", () => {
      expect(screen.getByText(/Provider 1/)).toBeInTheDocument()
      const statusIndicator = screen.getByTestId("status-indicator")
      expect(statusIndicator).toHaveClass("bg-red-500")
    })
  })

  describe("when provider status is loading", () => {
    beforeEach(async () => {
      storeData.dispatch({
        type: "global/setProviderStatus",
        payload: KwilProviderStatus.Unknown,
      })
      await act(async () => {
        render(
          <Provider store={storeData}>
            <KwilProviders activeProvider={"Provider 1"} />
          </Provider>,
        )
      })
    })

    it("shows loading status indicator", () => {
      expect(screen.getByText(/Provider 1/)).toBeInTheDocument()
      const statusIndicator = screen.getByTestId("status-indicator")
      expect(statusIndicator).toHaveClass("animate-pulse bg-amber-500")
    })
  })
})
