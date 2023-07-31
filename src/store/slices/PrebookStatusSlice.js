import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAlreadyBooked: false,
};

const PrebookStatusSlice = createSlice({
  name: "PrebookStatusSlice",
  initialState: initialState,
  reducers: {
    getPrebookStatus(state, action) {
      state.isAlreadyBooked = action.payload;
    },
  },
});

export const { getPrebookStatus } = PrebookStatusSlice.actions;
export default PrebookStatusSlice;
