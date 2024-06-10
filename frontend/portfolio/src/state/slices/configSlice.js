import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  collapsed: false,
  active: "dashboard",
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setMode: (state, action) => {
      // state.mode = state.mode === "light" ? "dark" : "light";
      state.mode = action.payload;
    },
    toggleCollapsed: (state, action) => {
      state.collapsed = !state.collapsed;
    },
    setActive(state, action) {
      state.active = action.payload;
    }
  },
});

export const { setMode, toggleCollapsed, setActive } = configSlice.actions;
export default configSlice.reducer;