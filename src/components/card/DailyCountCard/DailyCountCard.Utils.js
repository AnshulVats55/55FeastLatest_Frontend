import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateToBeChecked } from "../../../common/CommonData";
import {
  handleMemberCountBooking,
  handleCancelMealBooking,
  handleMemberBookingStatus,
} from "../../../bookingMethods/BookingMethods";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import { getPrebookDates } from "../../../store/slices/FetchPrebookDatesSlice";
import { removeAllDates } from "../../../store/slices/PrebookDatesSlice";
import snackbarMessages from "../../../Constants";

const DailyCountCardUtils = () => {
  const { email } = useSelector((state) => {
    return state?.memberDataReducer;
  });

  const memberDataToBeUsed = {
    email: email,
    date: dateToBeChecked,
    bookedBy: memberData.email,
  };

  const checkMealBookingAvailability = () => {
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDay();
    const currentHour = currentDateTime.getHours();

    if (currentDay === 0) {
      if (currentHour >= 18 && currentHour <= 23) {
        return true;
      } else {
        return false;
      }
    } else if (currentDay >= 1 && currentDay <= 4) {
      if (currentHour >= 0 && currentHour <= 8) {
        return true;
      } else if (currentHour >= 18 && currentHour <= 23) {
        return true;
      } else {
        return false;
      }
    } else if (currentDay === 5) {
      if (currentHour >= 0 && currentHour <= 8) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleMealBooking = async () => {
    const isBookingAllowed = checkMealBookingAvailability();
    if (isBookingAllowed) {
      setIsLoaderRequired(true);
      const response = await handleMemberCountBooking(memberDataToBeUsed);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setIsBooked(true);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage: snackbarMessages.MEMBER_MEAL_BOOKING_SUCCESSFULL,
          })
        );
        setIsLoaderRequired(false);
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: snackbarMessages.MEMBER_MEAL_BOOKING_FAILURE,
          })
        );
        setIsLoaderRequired(false);
      }
    }
  };

  return {
    memberDataToBeUsed,
  };
};

export default DailyCountCardUtils;
