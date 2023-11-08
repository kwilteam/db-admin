import { configureStore } from "@reduxjs/toolkit"
import databaseReducer from "./database"
import ideReducer from "./ide"
import globalReducer from "./global"
import extensionsReducer from "./extensions"

export const store = configureStore({
  reducer: {
    global: globalReducer,
    database: databaseReducer,
    ide: ideReducer,
    extensions: extensionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
