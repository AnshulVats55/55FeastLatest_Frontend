/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFormattedDate,
  getNextDate,
  dateToBeChecked,
} from "../../common/CommonData";
import {
  handleMemberCountBooking,
  handleCancelMealBooking,
  handleMemberBookingStatus,
  notifyAdmin,
} from "../../bookingMethods/BookingMethods";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import { getPrebookDates } from "../../store/slices/FetchPrebookDatesSlice";
import { removeAllDates } from "../../store/slices/PrebookDatesSlice";
import {
  setIsNotified,
  setNotificationData,
} from "../../store/slices/NotifyAdminSlice.js";
import snackbarMessages from "../../Constants";
import { HandleLogoutOnSessionExpire } from "../../common/Logout";

const BookMealUtils = () => {
  const dispatch = useDispatch();
  const memberData = useSelector((state) => {
    return state.memberDataReducer;
  });
  const { notificationStatus } = useSelector((state) => {
    return state.NotifyAdminReducer;
  });
  const prebookTooltip =
    "Meal cancellation restrictions don't apply to pre-booking for upcoming days !";
  const bookForBuddyTooltip =
    "You can't cancel your buddy's meal even if you booked it !";
  const mealBookingTooltip = "You can cancel your meal only till 10AM !";

  const { handleLogoutOnTokenExpire } = HandleLogoutOnSessionExpire();

  const [bookForBuddyOpen, setBookForBuddyOpen] = useState(false);
  const [prebookOpen, setPrebookOpen] = useState(false);
  const [bookForBuddyScroll, setBookForBuddyScroll] = useState("paper");
  const [prebookScroll, setPrebookScroll] = useState("paper");
  const [isStatusFetched, setIsStatusFetched] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [allBookedDates, setAllBookedDates] = useState([]);
  const [isLoaderRequired, setIsLoaderRequired] = useState(false);
  const [isMealCancellationOpen, setIsMealCancellationOpen] = useState(false);
  const [isNotificationAllowed, setIsNotificationAllowed] = useState(false);
  const [isAdminAlreadyNotified, setIsAdminAlreadyNotified] = useState(false);
  const [isOverlayRequired, setIsOverlayRequired] = useState(false);

  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);

  const dateToBeUsed =
    new Date().getHours() >= 18 && new Date().getHours() <= 23
      ? nextDateFormatted
      : formattedDate;

  const memberDataToBeUsed = {
    email: memberData?.email,
    date: dateToBeUsed,
    bookedBy: memberData.email,
  };

  useEffect(() => {
    dispatch(removeAllDates());
  }, []);

  useEffect(() => {
    //checks if a meal is already booked for a member
    const getMemberBookingStatus = async () => {
      const response = await handleMemberBookingStatus(memberData.email);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setIsStatusFetched(true);
        if (response?.data?.message === snackbarMessages.BOOK_YOUR_FIRST_MEAL) {
          setIsStatusFetched(true);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: response.data.message,
            })
          );
        } else {
          const allBookingDates = response?.data?.data.map((data) => {
            return data?.date;
          });
          setAllBookedDates(allBookingDates);
          dispatch(getPrebookDates(allBookingDates));
          if (allBookingDates?.indexOf(dateToBeUsed) > -1) {
            setIsBooked(true);
          } else {
            setIsBooked(false);
          }
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
          response?.response?.data?.message === snackbarMessages.USER_NOT_VALID
        ) {
          setIsStatusFetched(true);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: snackbarMessages.BOOK_YOUR_FIRST_MEAL,
            })
          );
        } else {
          setIsStatusFetched(true);
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
  }, [isBooked]);

  useEffect(() => {
    const isAdminNotifiedToday = notificationStatus?.filter(
      (data) => data?.notificationDate === dateToBeChecked
    );
    if (isAdminNotifiedToday?.length === 0) {
      //means admin is not notified for that date
      dispatch(
        setNotificationData({
          isAdminNotified: false,
          notificationDate: dateToBeChecked,
        })
      );
    }
  }, [dateToBeChecked]);

  useEffect(() => {
    const todaysNotificationData = notificationStatus?.filter(
      (data) => data?.notificationDate === dateToBeChecked
    );
    setIsAdminAlreadyNotified(todaysNotificationData[0]?.isAdminNotified);
  }, [dateToBeChecked]);

  const handleBookingNotifications = (notificationMessage) => {
    //dispatches notifications based on response
    dispatch(
      setCustomSnackbar({
        snackbarOpen: true,
        snackbarType: snackbarMessages.ERROR,
        snackbarMessage: notificationMessage,
      })
    );
  };

  const checkMealBookingAvailability = () => {
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDay();
    const currentHour = currentDateTime.getHours();

    if (currentDay === 0) {
      if (currentHour >= 18 && currentHour <= 23) {
        //booking allowed from 5PM(Sunday) to 9AM(Monday)
        return true;
      } else {
        handleBookingNotifications("Bookings open at 6PM !");
        return false;
      }
    } else if (currentDay >= 1 && currentDay <= 4) {
      if (currentHour >= 0 && currentHour <= 8) {
        //booking allowed from 7PM to 9AM the next day
        return true;
      } else if (currentHour >= 18 && currentHour <= 23) {
        return true;
      } else {
        handleBookingNotifications("Bookings open at 6PM !");
        return false;
      }
    } else if (currentDay === 5) {
      if (currentHour >= 0 && currentHour <= 8) {
        //booking allowed from 12AM(Friday) to 9AM(Friday)
        return true;
      } else {
        handleBookingNotifications("Bookings closed for today !");
        return false;
      }
    } else {
      handleBookingNotifications("Bookings not allowed on weekend !");
      return false;
    }
  };

  const handleBookForBuddyOpen = (scrollType) => () => {
    setBookForBuddyOpen(true);
    setBookForBuddyScroll(scrollType);
  };

  const handleBookForBuddyClose = () => {
    setBookForBuddyOpen(false);
  };

  const handlePrebookOpen = (scrollType) => () => {
    setPrebookOpen(true);
    setPrebookScroll(scrollType);
  };

  const handlePrebookClose = () => {
    setPrebookOpen(false);
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
        } else {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.MEMBER_MEAL_BOOKING_FAILURE,
            })
          );
        }
        setIsLoaderRequired(false);
      }
    }
  };

  const checkMealCancellationAvailability = () => {
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
      if (currentHour >= 0 && currentHour < 10) {
        //cancellation allowed from 12AM to 10AM the next day
        return true;
      } else if (currentHour >= 18 && currentHour <= 23) {
        return true;
      } else {
        handleBookingNotifications("Can't cancel after 10AM !");
        return false;
      }
    } else if (currentDay === 5) {
      if (currentHour >= 0 && currentHour < 10) {
        //cancellation allowed from 12AM(Friday) to 10AM(Friday)
        return true;
      } else {
        handleBookingNotifications("Can't cancel after 10AM !");
        return false;
      }
    }
  };

  const handleMealCancellation = async () => {
    const isCancellationAllowed = checkMealCancellationAvailability();
    if (isCancellationAllowed) {
      setIsLoaderRequired(true);
      const response = await handleCancelMealBooking(memberDataToBeUsed);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setIsBooked(false);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage:
              snackbarMessages.MEMBER_MEAL_CANCELLATION_SUCCESSFULL,
          })
        );
        setIsLoaderRequired(false);
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
        } else {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage:
                snackbarMessages.MEMBER_MEAL_CANCELLATION_FAILURE,
            })
          );
        }
        setIsLoaderRequired(false);
      }
    }
  };

  const checkNotifyAdminAvailability = () => {
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDay();
    const currentHour = currentDateTime.getHours();
    if (currentDay >= 1 && currentDay <= 5) {
      if (currentHour > 8 && currentHour < 10) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    const isNotifyAdminAllowed = checkNotifyAdminAvailability();
    setIsNotificationAllowed(isNotifyAdminAllowed);
  }, []);

  const handleNotifyAdmin = async () => {
    if (isNotificationAllowed) {
      setIsOverlayRequired(true);
      const response = await notifyAdmin(
        memberDataToBeUsed,
        memberData?.location
      );
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setIsOverlayRequired(false);
        dispatch(
          setIsNotified({
            isAdminNotified: true,
            notificationDate: dateToBeChecked,
          })
        );
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage: response.data.message,
          })
        );
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        setIsOverlayRequired(false);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: response.response.data.message,
          })
        );
      } else {
        setIsOverlayRequired(false);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: "Please try again !",
          })
        );
      }
    }
  };

  return {
    bookForBuddyOpen,
    prebookOpen,
    bookForBuddyScroll,
    prebookScroll,
    isBooked,
    isLoaderRequired,
    handleBookForBuddyOpen,
    handleBookForBuddyClose,
    handlePrebookOpen,
    handlePrebookClose,
    handleMealBooking,
    handleMealCancellation,
    isStatusFetched,
    prebookTooltip,
    bookForBuddyTooltip,
    mealBookingTooltip,
    handleNotifyAdmin,
    isAdminAlreadyNotified,
    isNotificationAllowed,
    isOverlayRequired,
  };
};

export default BookMealUtils;
