import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import snackbarMessages from "../../../Constants";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import { handleMemberBookingStatus } from "../../../bookingMethods/BookingMethods";
import { handleFormattedDate, getNextDate } from "../../../common/CommonData";

const BookForAnyoneCardUtils = () => {
  const formattedDate = handleFormattedDate(new Date());
  const dispatch = useDispatch();

  const [allDatesBooked, setAllDatesBooked] = useState([]);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);

  const handleMemberName = (memberName) => {
    //chops member name
    const finalName = memberName?.split(" ");
    if (finalName?.length === 1) {
      memberName = finalName[0];
    } else if (finalName?.length >= 2) {
      memberName = finalName[0] + " " + finalName[1];
    }
  };

  const handleMemberEmail = (isEmailChopRequired, memberEmail) => {
    //chops member email
    if (isEmailChopRequired) {
      if (memberEmail?.length > 24) {
        memberEmail = memberEmail.substring(0, 24) + "...";
      }
      return memberEmail;
    }
    return memberEmail;
  };

  const actionBeingPerformed = async (handleAction) => {
    try {
      const response = await handleAction();
      if (response?.data?.status === "success") {
        if (response?.data?.message === "Invited successfully") {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.SUCCESS,
              snackbarMessage: snackbarMessages.MEMBER_INVITATION_SUCCESSFULL,
            })
          );
        } else if (response?.data?.message === "Meal booked successfully") {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.SUCCESS,
              snackbarMessage: snackbarMessages.MEMBER_MEAL_BOOKING_SUCCESSFULL,
            })
          );
        } else if (response?.data?.message === "User deleted successfully") {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.SUCCESS,
              snackbarMessage: snackbarMessages.MEMBER_DELETED_SUCCESSFULL,
            })
          );
        }
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        if (response?.response?.data?.message === "Internal server error") {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.MEMBER_INVITATION_FAILURE,
            })
          );
        } else {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.MEMBER_MEAL_BOOKING_FAILURE,
            })
          );
        }
      }
      return response;
    } catch (error) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "Try again later !",
        })
      );
      return error;
    }
  };

  const getBookingStatusOfMember = async (memberEmail) => {
    const response = await handleMemberBookingStatus(memberEmail);
    if (response?.data?.status === snackbarMessages.SUCCESS) {
      setAllDatesBooked(response.data.data);
    }
  };
  return {
    formattedDate,
    allDatesBooked,
    isAlreadyBooked,
    setIsAlreadyBooked,
    handleMemberName,
    handleMemberEmail,
    actionBeingPerformed,
    getBookingStatusOfMember,
  };
};

export default BookForAnyoneCardUtils;
