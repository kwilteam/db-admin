import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { mockStore } from "../../mocks/mock-store"
import "@testing-library/jest-dom"
import Pagination from "@/components/DatabaseItem/Table/Pagination"
import PaginationButton from "@/components/DatabaseItem/Pagination/PaginationButton"
import PaginationPage from "@/components/DatabaseItem/Pagination/PaginationPage"
import PaginationPerPage from "@/components/DatabaseItem/Pagination/PaginationPerPage"

const store = mockStore({
  database: {
    tableQueryParams: {
      pagination: {
        currentPage: 1,
        perPage: 10,
      },
    },
  },
})

describe("Pagination Components", () => {
  describe("Pagination", () => {
    it("renders without crashing", () => {
      render(
        <Provider store={store}>
          <Pagination
            dbid="1"
            table="users"
            totalCount={100}
            isLoading={false}
          />
        </Provider>,
      )
      expect(screen.getByText(/Page/)).toBeInTheDocument()
    })
  })

  describe("PaginationButton", () => {
    it("renders next button", () => {
      render(
        <PaginationButton
          perPage={10}
          currentPage={1}
          setPagination={() => {}}
          totalPages={10}
          type="next"
        />,
      )
      const nextButton = screen.getByTestId("pagination-button-next")
      expect(nextButton).toBeInTheDocument()
    })

    it("renders prev button", () => {
      render(
        <PaginationButton
          perPage={10}
          currentPage={2}
          setPagination={() => {}}
          totalPages={10}
          type="prev"
        />,
      )
      const prevButton = screen.getByTestId("pagination-button-prev")
      expect(prevButton).toBeInTheDocument()
    })
  })

  describe("PaginationPage", () => {
    it("renders current page selection", () => {
      render(
        <PaginationPage
          perPage={10}
          currentPage={1}
          totalPages={10}
          setPagination={() => {}}
        />,
      )
      expect(screen.getByText(/Page/)).toBeInTheDocument()
    })
  })

  describe("PaginationPerPage", () => {
    it("renders per page selection", () => {
      render(<PaginationPerPage perPage={10} setPagination={() => {}} />)
      expect(screen.getByRole("combobox")).toBeInTheDocument()
    })
  })
})
