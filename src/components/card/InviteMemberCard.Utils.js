/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useDispatch } from "react-redux";
import snackbarMessages from "../../Constants";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import { useState } from "react";
import { handleMemberBookingStatus } from "../../bookingMethods/BookingMethods";
import { handleFormattedDate, getNextDate } from "../../common/CommonData";

const InviteMemberCardUtils = () => {
  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);

  const dateToBeChecked =
    new Date().getHours() >= 17 && new Date().getHours() <= 23
      ? nextDateFormatted
      : formattedDate;

  const dispatch = useDispatch();

  const [allDatesBooked, setAllDatesBooked] = useState([]);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
  const [isLoaderRequired, setIsLoaderRequired] = useState(false);

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
      setIsLoaderRequired(true);
      const response = await handleAction();
      console.log(
        "Response at invite member card is this -------------->",
        response
      );
      if (response?.data?.status === "success") {
        if (response?.data?.message === "Invited successfully") {
          setIsLoaderRequired(false);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.SUCCESS,
              snackbarMessage: snackbarMessages.MEMBER_INVITATION_SUCCESSFULL,
            })
          );
        } else if (response?.data?.message === "Meal booked successfully") {
          setIsAlreadyBooked(true);
          setIsLoaderRequired(false);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.SUCCESS,
              snackbarMessage: snackbarMessages.MEMBER_MEAL_BOOKING_SUCCESSFULL,
            })
          );
        } else if (response?.data?.message === "User deleted successfully") {
          setIsLoaderRequired(false);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.SUCCESS,
              snackbarMessage: snackbarMessages.MEMBER_DELETED_SUCCESSFULL,
            })
          );
        }
      } else if (response?.response?.data?.status === "failure") {
        if (response?.response?.data?.message === "Internal server error") {
          setIsLoaderRequired(false);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.TRY_AGAIN,
            })
          );
        } else if (
          response?.response?.data?.message === "Meal is already booked"
        ) {
          setIsLoaderRequired(false);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.MEMBER_MEAL_ALREADY_BOOKED,
            })
          );
        }
      }
      return response;
    } catch (error) {
      setIsLoaderRequired(false);
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
    console.log("res of getStatus at book for buddy", response);
    if (response?.data?.status === snackbarMessages.SUCCESS) {
      setAllDatesBooked(response.data.data);
    }
  };

  return {
    dateToBeChecked,
    allDatesBooked,
    isAlreadyBooked,
    setIsAlreadyBooked,
    handleMemberName,
    handleMemberEmail,
    actionBeingPerformed,
    getBookingStatusOfMember,
    isLoaderRequired,
    setIsLoaderRequired,
  };
};

export default InviteMemberCardUtils;
