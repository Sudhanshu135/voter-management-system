import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import sidebarSlice from "./slices/sidebarSlice"
import votersSlice from "./slices/votersSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    sidebar: sidebarSlice,
    voters: votersSlice,
  },
})
