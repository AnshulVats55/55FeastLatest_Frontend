/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { handleFormattedDate } from "../../common/CommonData";
import { getReversedDate } from "../../invitationMethods/InvitationMethods";
import { useDispatch, useSelector } from "react-redux";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import snackbarMessages from "../../Constants";
import { setPrebookDates } from "../../store/slices/PrebookDatesSlice";
import { handleCancelMealBooking } from "../../bookingMethods/BookingMethods";
import { getPrebookDates } from "../../store/slices/FetchPrebookDatesSlice";

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
      return getReversedDate(dateToBeChecked);
    }
  };

  const handleDateSelection = async (dateToBeChecked) => {
    // console.log("date to be checked", dateToBeChecked);
    const isBookingOpen = checkPrebookingAvailabilty(dateToBeChecked);
    // console.log("isbookingopen", isBookingOpen);
    if (isBookingOpen === true) {
      setIsSelected(!isSelected);
      dispatch(setPrebookDates(currentFormattedDate));
    } else if (isBookingOpen === false) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "Bookings closed for today !",
        })
      );
    } else {
      setIsSelected(!isSelected);
      dispatch(setPrebookDates(isBookingOpen)); //isBookingOpen is a date in this case
    }
  };

  const handlePrebookCancellation = async (dateToBeChecked) => {
    const prebookData = {
      email: memberData.email,
      date: getReversedDate(dateToBeChecked),
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
          response?.response?.data?.status === snackbarMessages.FAILURE
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
        setIsSelected(false);
        dispatch(getPrebookDates([]));
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
    handlePrebookCancellation,
  };
};

export default ChipUtils;
