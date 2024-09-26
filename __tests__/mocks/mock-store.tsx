import { configureStore } from "@reduxjs/toolkit"
import databaseReducer from "@/store/database"
import globalReducer from "@/store/global"
import ideReducer from "@/store/ide"
import providersReducer from "@/store/providers"

export const mockStore = (preloadedState: Record<string, any>) => {
  return configureStore({
    reducer: {
      database: databaseReducer,
      global: globalReducer,
      ide: ideReducer,
      providers: providersReducer,
      // Add other reducers here
    },
    preloadedState,
  })
}
