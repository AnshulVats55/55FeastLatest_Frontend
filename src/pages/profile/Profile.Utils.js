import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleMemberBookingStatus } from "../../bookingMethods/BookingMethods";
import snackbarMessages from "../../Constants";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import { useNavigate } from "react-router-dom";

const UserProfileUtils = () => {
  const { photo, gender, firstName, lastName, email } = useSelector((state) => {
    return state.memberDataReducer;
  });
  const memberName = firstName + " " + lastName;

  const [memberBookingData, setMemberBookingData] = useState([]);
  const [optionSelected, setOptionSelected] = useState("history");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/bookyourmeal");
  };

  useEffect(() => {
    const getMemberBookingStatus = async () => {
      const response = await handleMemberBookingStatus(email);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setIsDataLoaded(true);
        if (response?.data?.message === snackbarMessages.BOOK_YOUR_FIRST_MEAL) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: response.data.message,
            })
          );
        } else {
          const allBookingDates = response?.data?.data;
          setMemberBookingData(allBookingDates);
        }
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        setIsDataLoaded(true);
        if (
          response?.response?.data?.message === snackbarMessages.USER_NOT_VALID
        ) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: snackbarMessages.BOOK_YOUR_FIRST_MEAL,
            })
          );
        } else {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.MEMBER_MEAL_STATUS,
            })
          );
        }
      }
    };

    getMemberBookingStatus();
  }, []);

  const handleSwitchOption = (optionValue) => {
    setOptionSelected(optionValue);
  };

  return {
    photo,
    gender,
    memberName,
    memberBookingData,
    optionSelected,
    handleSwitchOption,
    isDataLoaded,
    handleNavigation,
  };
};

export default UserProfileUtils;
