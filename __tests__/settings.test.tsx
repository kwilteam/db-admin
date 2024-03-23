import { beforeEach, describe, expect, it, vi } from "vitest"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { mockStore } from "./mocks/mock-store"
import ProvidersTable from "@/components/Settings/Providers/Table"
import ProviderForm from "@/components/Settings/Providers/Form"

const storeData = mockStore({
  providers: {
    activeProvider: "Provider 1",
    providers: [
      { name: "Provider 1", url: "http://provider1.com", chainId: "1" },
      { name: "Provider 2", url: "http://provider2.com", chainId: "2" },
    ],
  },
})

describe("Providers Component", () => {
  describe("ProvidersTable Component", () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={storeData}>
            <ProvidersTable
              providers={storeData.getState().providers.providers || []}
              confirmDeleteProvider={() => {}}
            />
          </Provider>,
        )
      })
    })

    it("renders without crashing", () => {
      expect(screen.getByTestId("accounts-table")).toBeInTheDocument()
    })

    it("displays all providers", () => {
      expect(screen.getByText(/Provider 1/)).toBeInTheDocument()
      expect(screen.getByText(/Provider 2/)).toBeInTheDocument()
    })
  })

  describe("Form Component", () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={storeData}>
            <ProviderForm
              originalProviderName={undefined}
              provider={{
                name: "New Provider",
                url: "http://newprovider.com",
                chainId: "3",
              }} // Mock provider object
              setProvider={() => {}}
              connectNow={false}
              setConnectNow={() => {}}
              invalidFields={[]}
            />
          </Provider>,
        )
      })
    })

    it("renders without crashing", () => {
      expect(screen.getByTestId("providers-form")).toBeInTheDocument()
    })

    it("allows provider creation", async () => {
      const nameInput = await screen.findByTestId("provider-name-input")
      const urlInput = await screen.findByTestId("provider-url-input")
      const chainIdInput = await screen.findByTestId("provider-chainId-input")

      fireEvent.change(nameInput, { target: { value: "New Provider" } })
      fireEvent.change(urlInput, {
        target: { value: "http://newprovider.com" },
      })
      fireEvent.change(chainIdInput, { target: { value: "3" } })

      await waitFor(() => {
        expect(nameInput).toHaveValue("New Provider")
        expect(urlInput).toHaveValue("http://newprovider.com")
        expect(chainIdInput).toHaveValue("3")
      })
    })
  })
})
