/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { handleFormattedDate } from "../../common/CommonData";
import { getReversedDate } from "../../invitationMethods/InvitationMethods";
import { useDispatch, useSelector } from "react-redux";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import snackbarMessages from "../../Constants";
// import { handleFormattedDate } from "../../common/CommonData";
import { setPrebookDates } from "../../store/slices/PrebookDatesSlice";
import {
  handleMemberBookingStatus,
  handleCancelMealBooking,
} from "../../bookingMethods/BookingMethods";

const ChipUtils = () => {
  const memberData = useSelector((state) => {
    return state.memberDataReducer;
  });

  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentFormattedDate = handleFormattedDate(currentDate);
  const currentReversedDate = getReversedDate(currentFormattedDate);

  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);

  const checkPrebookingAvailabilty = (dateToBeChecked) => {
    //checks availabilty for prebooking
    if (currentReversedDate === dateToBeChecked) {
      if (currentHours >= 0 && currentHours <= 8) {
        return true;
      } else {
        return false;
      }
    } else {
      return dateToBeChecked;
    }
  };

  const handleDateSelection = async (dateToBeChecked) => {
    console.log("date to be checked", dateToBeChecked);
    setIsSelected(!isSelected);
    const isBookingOpen = checkPrebookingAvailabilty(dateToBeChecked);
    console.log("isbookingopen", isBookingOpen);
    if (isBookingOpen === true) {
      // const currentDate = new Date();
      // const currentFormattedDate = handleFormattedDate(currentDate);
      // const currentReversedDate = getReversedDate(currentFormattedDate);
      dispatch(setPrebookDates(currentReversedDate));
    } else if (isBookingOpen === false) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "Bookings closed for today !",
        })
      );
    } else {
      dispatch(setPrebookDates(isBookingOpen)); //isBookingOpen is a date in this case
    }
  };

  const getPrebookingStatus = async (dateToBeChecked) => {
    const response = await handleMemberBookingStatus(memberData._id);
    console.log("Response of pre-booking status API------->>>>>>>>", response);
    const allBookedDates = response?.data?.data;
    if (response?.data?.status === snackbarMessages.SUCCESS) {
      if (allBookedDates.indexOf(dateToBeChecked) > -1) {
        setIsAlreadyBooked(true);
      }
    }
  };

  const handlePrebookCancellation = async (dateToBeChecked) => {
    const prebookData = {
      userId: memberData._id,
      date: dateToBeChecked,
    };
    if (currentReversedDate === dateToBeChecked) {
      if (currentHours >= 0 && currentHours <= 8 && isAlreadyBooked === true) {
        const response = await handleCancelMealBooking(prebookData);
        if (response?.data?.status === snackbarMessages.SUCCESS) {
          setIsAlreadyBooked(false);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.SUCCESS,
              snackbarMessage:
                snackbarMessages.PREBOOK_CANCELLATION_SUCCESSFULL,
            })
          );
        } else if (
          response?.response?.data?.status === snackbarMessages.ERROR
        ) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.PREBOOK_CANCELLATION_FAILURE,
            })
          );
        }
      } else {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: "Time limit exceeded !",
          })
        );
      }
    } else if (
      currentReversedDate !== dateToBeChecked &&
      isAlreadyBooked === true
    ) {
      const response = await handleCancelMealBooking(prebookData);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setIsAlreadyBooked(false);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage: snackbarMessages.PREBOOK_CANCELLATION_SUCCESSFULL,
          })
        );
      } else if (response?.response?.data?.status === snackbarMessages.ERROR) {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: snackbarMessages.PREBOOK_CANCELLATION_FAILURE,
          })
        );
      }
    }
  };

  return {
    isSelected,
    setIsSelected,
    handleDateSelection,
    isAlreadyBooked,
    setIsAlreadyBooked,
    getPrebookingStatus,
    handlePrebookCancellation,
  };
};

export default ChipUtils;
