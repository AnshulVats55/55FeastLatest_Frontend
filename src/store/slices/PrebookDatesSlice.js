import { createSlice } from "@reduxjs/toolkit";

const prebookDates = [];

const PrebookDateSlice = createSlice({
  name: "PrebookDateSlice",
  initialState: prebookDates,
  reducers: {
    setPrebookDates: (state, action) => {
      if (state.indexOf(action.payload) < 0) {
        //if action.payload is not present in the array
        state.push(action.payload);
        return state;
      } else {
        //if action.payload is already present
        let remainingDates = [];
        remainingDates = state.filter((date) => {
          return date !== action.payload;
        });
        return (state = remainingDates);
      }
    },

    removeAllDates: (state, action) => {
      return (state = []);
    },
  },
});

export const { setPrebookDates, removeAllDates } = PrebookDateSlice.actions;
export default PrebookDateSlice;
