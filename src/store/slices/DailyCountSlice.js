import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

const DailyCountSlice = createSlice({
  name: "DailyCountSlice",
  initialState: initialState,
  reducers: {
    getDailyCount: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { getDailyCount } = DailyCountSlice.actions;
export default DailyCountSlice;
