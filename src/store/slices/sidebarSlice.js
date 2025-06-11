import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isOpen: false,
  isCollapsed: false,
}

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen
    },
    closeSidebar: (state) => {
      state.isOpen = false
    },
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed
    },
  },
})

export const { toggleSidebar, closeSidebar, toggleCollapse } = sidebarSlice.actions
export default sidebarSlice.reducer
