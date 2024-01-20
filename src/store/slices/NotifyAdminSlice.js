import { createSlice } from "@reduxjs/toolkit";
import { all } from "axios";

const notifyAdmin = {
  notificationStatus: [],
};

const NotifyAdminSlice = createSlice({
  name: "notifyAdminSlice",
  initialState: notifyAdmin,
  reducers: {
    setIsNotified(state, action) {
      const { payload } = action;
      state.notificationStatus?.map((data) => {
        if (data.notificationDate === payload.notificationDate) {
          data.isAdminNotified = payload.isAdminNotified;
        }
      });
    },

    setNotificationData: (state, action) => {
      const { payload } = action;
      state.notificationStatus.push(payload);
    },
  },
});

export const { setIsNotified, setNotificationData } = NotifyAdminSlice.actions;
export default NotifyAdminSlice;
