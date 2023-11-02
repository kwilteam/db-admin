import { configureStore } from "@reduxjs/toolkit"
import databaseReducer from "./database"
import ideReducer from "../utils/kwil/ide"
import globalReducer from "./global"

export const store = configureStore({
  reducer: {
    global: globalReducer,
    database: databaseReducer,
    ide: ideReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
