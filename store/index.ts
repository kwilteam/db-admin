import { configureStore } from "@reduxjs/toolkit"
import databaseReducer from "./database"
import ideReducer from "./ide"
import globalReducer from "./global"
import extensionsReducer from "./extensions"
import providersReducer from "./providers"

export const store = configureStore({
  reducer: {
    global: globalReducer,
    database: databaseReducer,
    ide: ideReducer,
    extensions: extensionsReducer,
    providers: providersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
