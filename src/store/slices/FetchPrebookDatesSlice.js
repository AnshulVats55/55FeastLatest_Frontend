import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

const FetchPrebookDatesSlice = createSlice({
  name: "FetchPrebookDatesSlice",
  initialState: initialState,
  reducers: {
    getPrebookDates: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { getPrebookDates } = FetchPrebookDatesSlice.actions;
export default FetchPrebookDatesSlice;
