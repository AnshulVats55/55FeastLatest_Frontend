/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFormattedDate, getNextDate } from "../../common/CommonData";
import {
  handleMemberCountBooking,
  handleCancelMealBooking,
  handleMemberBookingStatus,
} from "../../bookingMethods/BookingMethods";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import { getPrebookDates } from "../../store/slices/FetchPrebookDatesSlice";
import { removeAllDates } from "../../store/slices/PrebookDatesSlice";
import snackbarMessages from "../../Constants";

const BookMealUtils = () => {
  const dispatch = useDispatch();
  const memberData = useSelector((state) => {
    return state.memberDataReducer;
  });
  console.log("member emai", memberData.email);

  const [bookForBuddyOpen, setBookForBuddyOpen] = useState(false);
  const [prebookOpen, setPrebookOpen] = useState(false);
  const [bookForBuddyScroll, setBookForBuddyScroll] = useState("paper");
  const [prebookScroll, setPrebookScroll] = useState("paper");
  const [isStatusFetched, setIsStatusFetched] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [allBookedDates, setAllBookedDates] = useState([]);
  const [isLoaderRequired, setIsLoaderRequired] = useState(false);

  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);

  const mealBookingData = {
    //here 12PM will be updated to 17PM
    email: memberData.email,
    date:
      new Date().getHours() >= 18 && new Date().getHours() <= 23
        ? nextDateFormatted
        : formattedDate,
  };

  const myData = {
    //here 12PM will be updated to 17PM
    email: memberData.email,
    date:
      new Date().getHours() >= 18 && new Date().getHours() <= 23
        ? nextDateFormatted
        : formattedDate,
  };

  useEffect(() => {
    dispatch(removeAllDates());
  }, []);

  useEffect(() => {
    //checks if a meal is already booked for a member
    const getMemberBookingStatus = async () => {
      const response = await handleMemberBookingStatus(memberData.email);
      console.log("Response of booking status API", response);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setIsStatusFetched(true);
        const allBookingDates = response?.data?.data;
        setAllBookedDates(allBookingDates);
        dispatch(getPrebookDates(allBookingDates));
        if (
          allBookingDates?.indexOf(formattedDate) > -1 ||
          allBookingDates?.indexOf(nextDateFormatted) > -1
        ) {
          setIsBooked(true);
        } else {
          setIsBooked(false);
        }
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        setIsStatusFetched(true);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: snackbarMessages.MEMBER_MEAL_STATUS,
          })
        );
      }
    };
    getMemberBookingStatus();
  }, [isBooked]);

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
    //handles checking timings for meal bookings
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDay();
    const currentHour = currentDateTime.getHours();

    if (currentDay === 0) {
      if (currentHour >= 18 && currentHour <= 23) {
        //booking allowed from 5PM(Sunday) to 9AM(Monday)
        setIsBookingOpen(true);
        return true;
      } else {
        setIsBookingOpen(false);
        handleBookingNotifications("Bookings will open at 5PM !");
        return false;
      }
    } else if (currentDay >= 1 && currentDay <= 4) {
      if (currentHour >= 0 && currentHour <= 8) {
        //booking allowed from 7PM to 9AM the next day
        setIsBookingOpen(true);
        return true;
      } else if (currentHour >= 18 && currentHour <= 23) {
        setIsBookingOpen(true);
        return true;
      } else {
        setIsBookingOpen(false);
        handleBookingNotifications("Bookings closed for today !");
        return false;
      }
    } else if (currentDay === 5) {
      if (currentHour >= 0 && currentHour <= 8) {
        //booking allowed from 12AM(Friday) to 9AM(Friday)
        setIsBookingOpen(true);
        return true;
      } else {
        setIsBookingOpen(false);
        handleBookingNotifications("Bookings closed for today !");
        return false;
      }
    } else {
      setIsBookingOpen(false);
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
      const response = await handleMemberCountBooking(mealBookingData);
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

  const handleMealCancellation = async () => {
    setIsLoaderRequired(true);
    const response = await handleCancelMealBooking(myData);
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
    } else if (response?.response?.data?.status === snackbarMessages.FAILURE) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.MEMBER_MEAL_CANCELLATION_FAILURE,
        })
      );
      setIsLoaderRequired(false);
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
  };
};

export default BookMealUtils;
