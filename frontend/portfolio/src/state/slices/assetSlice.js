import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  edit: {
    ticker: "",
    name: "",
    quantity: 0,
    price: 0,
    category: "",
  },
};

export const configSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    saveAssetDetails: (state, action) => {
      state.edit = { ...state.edit, ...action.payload};
    },
    setDefaultAssetDetails: (state) => {
      state.edit = initialState.edit;
    },
  },
});

export const { saveEditAsset, setDefaultEditAsset } = configSlice.actions;
export default configSlice.reducer;

