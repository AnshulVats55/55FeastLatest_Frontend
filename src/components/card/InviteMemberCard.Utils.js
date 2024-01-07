/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useDispatch } from "react-redux";
import snackbarMessages from "../../Constants";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import { useState } from "react";
import { handleFormattedDate, getNextDate } from "../../common/CommonData";
import { handleCancelMealBooking } from "../../bookingMethods/BookingMethods";
import { HandleLogoutOnSessionExpire } from "../../common/Logout";

const InviteMemberCardUtils = (isAlreadyBooked, memberEmail) => {
  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);
  const dateToBeChecked =
    new Date().getHours() >= 18 && new Date().getHours() <= 23
      ? nextDateFormatted
      : formattedDate;

  const memberDataToBeSent = {
    email: memberEmail,
    date: dateToBeChecked,
  };

  const dispatch = useDispatch();
  const { handleLogoutOnTokenExpire } = HandleLogoutOnSessionExpire();

  const [isLoaderRequired, setIsLoaderRequired] = useState(false);
  const [isMealBooked, setIsMealBooked] = useState(false);
  const [isTodaysMealBooked, setIsTodaysMealBooked] = useState(true);

  const handleMemberName = (memberName) => {
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
      if (response?.data?.status === snackbarMessages.SUCCESS) {
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
          setIsMealBooked(true);
          setIsTodaysMealBooked(true);
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
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        if (
          response?.response?.data?.message ===
          snackbarMessages.JWT_TOKEN_EXPIRED
        ) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: snackbarMessages.SESSION_EXPIRED,
            })
          );
          setTimeout(() => {
            handleLogoutOnTokenExpire();
          }, 1500);
        } else if (
          response?.response?.data?.message === "Internal server error"
        ) {
          setIsLoaderRequired(false);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.TRY_AGAIN,
            })
          );
        } else if (
          response?.response?.data?.message ===
          snackbarMessages.MEMBER_MEAL_ALREADY_BOOKED
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

  const handleMealCancellation = async (memberDataToBeSent) => {
    setIsLoaderRequired(true);
    const response = await handleCancelMealBooking(memberDataToBeSent);
    if (response?.data?.status === snackbarMessages.SUCCESS) {
      setIsMealBooked(false);
      setIsTodaysMealBooked(false);
      setIsLoaderRequired(false);
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.SUCCESS,
          snackbarMessage:
            snackbarMessages.MEMBER_MEAL_CANCELLATION_SUCCESSFULL,
        })
      );
    } else if (response?.response?.data?.status === snackbarMessages.FAILURE) {
      if (
        response?.response?.data?.message === snackbarMessages.JWT_TOKEN_EXPIRED
      ) {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.INFO,
            snackbarMessage: snackbarMessages.SESSION_EXPIRED,
          })
        );
        setTimeout(() => {
          handleLogoutOnTokenExpire();
        }, 1500);
      } else {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: snackbarMessages.MEMBER_MEAL_CANCELLATION_FAILURE,
          })
        );
      }
    }
    setIsLoaderRequired(false);
  };

  return {
    handleMemberName,
    handleMemberEmail,
    actionBeingPerformed,
    isLoaderRequired,
    isMealBooked,
    isTodaysMealBooked,
    handleMealCancellation,
    memberDataToBeSent,
  };
};

export default InviteMemberCardUtils;
