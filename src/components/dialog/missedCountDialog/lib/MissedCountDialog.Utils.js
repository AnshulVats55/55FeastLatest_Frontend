import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateToBeChecked } from "../../../../common/CommonData";
import { handleMemberCountBooking } from "../../../../bookingMethods/BookingMethods";
import { setCustomSnackbar } from "../../../../store/slices/SnackbarSlice";
import snackbarMessages from "../../../../Constants";

const MissedCountDialogUtils = () => {
  const { email } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const dispatch = useDispatch();

  const [isBooked, setIsBooked] = useState(false);
  const [isLoaderRequired, setIsLoaderRequired] = useState(false);

  const handleMealBooking = async (memberEmail, dateToBeChecked, email) => {
    setIsLoaderRequired(true);
    const response = await handleMemberCountBooking({
      email: memberEmail,
      date: dateToBeChecked,
      bookedBy: email,
    });
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
    } else if (response?.response?.data?.status === snackbarMessages.FAILURE) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: response?.response?.data?.message,
        })
      );
      setIsLoaderRequired(false);
    }
  };

  return {
    email,
    dateToBeChecked,
    handleMealBooking,
    isBooked,
    isLoaderRequired,
  };
};

export default MissedCountDialogUtils;
