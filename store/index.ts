import { configureStore } from "@reduxjs/toolkit"
import databaseReducer from "./database"
import ideReducer from "./ide"

export const store = configureStore({
  reducer: {
    database: databaseReducer,
    ide: ideReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
