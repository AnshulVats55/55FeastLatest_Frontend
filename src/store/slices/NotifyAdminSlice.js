import { createSlice } from "@reduxjs/toolkit";

const notifyAdmin = {
  isNotified: false,
};

const NotifyAdminSlice = createSlice({
  name: "notifyAdminSlice",
  initialState: notifyAdmin,
  reducers: {
    setIsNotified(state, action) {
      state.isNotified = action.payload;
    },
  },
});

export const { setIsNotified } = NotifyAdminSlice.actions;
export default NotifyAdminSlice;
