import { beforeEach, describe, expect, it } from "vitest"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { mockStore } from "../mocks/mock-store"
import UserAccount from "@/components/UserAccount"

const mockActiveAccount = "0x1234567890abcdef1234567890abcdef12345678"

const storeData = mockStore({
  global: {
    activeAccount: mockActiveAccount,
  },
})

describe("UserAccount Component", () => {
  describe("when the user is not connected", () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={storeData}>
            <UserAccount activeAccount={undefined} />
          </Provider>,
        )
      })
    })

    it("renders connect button", () => {
      expect(screen.getByText(/Connect/)).toBeInTheDocument()
    })
  })

  describe("when the user is connected", () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={storeData}>
            <UserAccount activeAccount={mockActiveAccount} />
          </Provider>,
        )
      })
    })

    it("shows abbreviated account address", () => {
      const abbreviatedAccount =
        mockActiveAccount.slice(0, 5) + "..." + mockActiveAccount.slice(-5)
      expect(screen.getByText(abbreviatedAccount)).toBeInTheDocument()
    })
  })
})
