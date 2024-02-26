import { useState } from "react";
import { bookForGuests } from "../../../../bookingMethods/BookingMethods";
import { useSelector, useDispatch } from "react-redux";
import { dateToBeChecked } from "../../../../common/CommonData";
import { setCustomSnackbar } from "../../../../store/slices/SnackbarSlice";
import snackbarMessages from "../../../../Constants";

const NonEmployeeGuestDialogUtils = () => {
  const dispatch = useDispatch();
  const { location } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const [nonEmployeeGuests, setNonEmployeeGuests] = useState(0);
  const [isLoaderRequired, setIsLoaderRequired] = useState(false);
  const guestData = {
    count: nonEmployeeGuests,
    dates: [dateToBeChecked],
  };

  const handleBookForGuests = async () => {
    if (nonEmployeeGuests <= 0) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "Please select guest(s) !",
        })
      );
    } else {
      setIsLoaderRequired(true);
      const response = await bookForGuests("nonEmployee", location, guestData);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage: response?.data?.message,
          })
        );
        setIsLoaderRequired(false);
      } else if (response?.data?.status === snackbarMessages.FAILURE) {
        setIsLoaderRequired(false);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: response?.data?.message,
          })
        );
      } else {
        setIsLoaderRequired(false);
      }
    }
  };

  return {
    setNonEmployeeGuests,
    handleBookForGuests,
    isLoaderRequired,
  };
};

export default NonEmployeeGuestDialogUtils;
