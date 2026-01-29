import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "index";

// Define a type for the slice state
export interface IPage2State {
  initTip: boolean;
}

// Define the initial state using that type
const initialState: IPage2State = {
  initTip: false,
};

export const page2Slice = createSlice({
  name: "page2",
  initialState,
  reducers: {
    executed: (state) => {
      state.initTip = true;
    },
    updateState: (state, action: PayloadAction<boolean>) => {
      state.initTip = action.payload;
    },
  },
});

export const { executed, updateState } = page2Slice.actions;

export const selectPage2 = (state: RootState) => state.page2;

export default page2Slice.reducer;
