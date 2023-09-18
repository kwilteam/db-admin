import { configureStore } from "@reduxjs/toolkit"
import databaseReducer from "./database"

export const store = configureStore({
  reducer: {
    database: databaseReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
