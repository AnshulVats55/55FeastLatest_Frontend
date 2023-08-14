/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { getMealBookingStyles } from "./BookMeal.Styles";
import PrebookImage from "../../assets/prebook image.jpg";
import FriendImage from "../../assets/friends image.jpg";
import SoloImage from "../../assets/solo image.jpg";
import BookingCard from "../../components/bookingCard/BookingCard";
import BookForBuddyDialog from "../../components/dialog/bookForBuddy/BookForBuddy";
import PrebookDialog from "../../components/dialog/prebookDialog/PrebookDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  handleMemberCountBooking,
  handleCancelMealBooking,
  handleMemberBookingStatus,
} from "../../bookingMethods/BookingMethods";
import { handleFormattedDate, getNextDate } from "../../common/CommonData";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import { getPrebookDates } from "../../store/slices/FetchPrebookDatesSlice";
import snackbarMessages from "../../Constants";

const BookMeal = () => {
  const { classes } = getMealBookingStyles();

  const dispatch = useDispatch();
  const memberData = useSelector((state) => {
    return state.memberDataReducer;
  });
  console.log("member emai", memberData.email);

  const [bookForBuddyOpen, setBookForBuddyOpen] = useState(false);
  const [prebookOpen, setPrebookOpen] = useState(false);
  const [bookForBuddyScroll, setBookForBuddyScroll] = useState("paper");
  const [prebookScroll, setPrebookScroll] = useState("paper");
  const [isBooked, setIsBooked] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [allBookedDates, setAllBookedDates] = useState([]);
  const [isLoaderRequired, setIsLoaderRequired] = useState(false);

  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);

  const mealBookingData = {
    email: memberData.email,
    date:
      new Date().getHours() >= 12 && new Date().getHours() <= 23
        ? nextDateFormatted
        : formattedDate,
  };

  const myData = {
    email: memberData.email,
    date:
      new Date().getHours() >= 14 && new Date().getHours() <= 23
        ? nextDateFormatted
        : formattedDate,
  };

  useEffect(() => {
    //checks if a meal is already booked for a member
    const getMemberBookingStatus = async () => {
      const response = await handleMemberBookingStatus(memberData.email);
      console.log("Response of booking status API", response);
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
      if (currentHour >= 15 && currentHour <= 23) {
        //booking allowed from 5PM(Sunday) to 9AM(Monday)
        setIsBookingOpen(true);
        return true;
      } else {
        setIsBookingOpen(false);
        handleBookingNotifications("Bookings not allowed on weekend !");
        return false;
      }
    } else if (currentDay >= 1 && currentDay <= 4) {
      if (currentHour >= 0 && currentHour <= 8) {
        //booking allowed from 7PM to 9AM the next day
        setIsBookingOpen(true);
        return true;
      } else if (currentHour >= 15 && currentHour <= 23) {
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

  return (
    <Grid container className={classes.getGridContStyles}>
      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        className={classes.getGridItemStyles}
      >
        <BookingCard
          image={PrebookImage}
          heading="Have Frictionless Meals"
          caption="Pre-book your meal for a week and relax!"
          actionName="Pre-Book your meal"
          animationDuration={0.5}
          onClick={handlePrebookOpen("paper")}
          label="Most awaited"
          isLoaderRequired={false}
        />
        {prebookOpen ? (
          <PrebookDialog
            open={prebookOpen}
            scroll={prebookScroll}
            handleClose={handlePrebookClose}
            // allBookedDates={allBookedDates}
          />
        ) : (
          <></>
        )}
      </Grid>

      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        className={classes.getGridItemStyles}
      >
        <BookingCard
          image={FriendImage}
          heading="Spirit of Companionship"
          caption="Help your companions by booking their meal!"
          actionName="Book for buddy"
          animationDuration={0.6}
          onClick={handleBookForBuddyOpen("paper")}
          label="Try it out"
          isLoaderRequired={false}
        />
        {bookForBuddyOpen ? (
          <BookForBuddyDialog
            open={bookForBuddyOpen}
            scroll={bookForBuddyScroll}
            handleClose={handleBookForBuddyClose}
            children="Book"
          />
        ) : (
          <></>
        )}
      </Grid>

      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        className={classes.getGridItemStyles}
      >
        <BookingCard
          image={SoloImage}
          heading="Let’s Simplify Hunger"
          caption="Reserve your lunch spot now without a fuss!"
          actionName={isBooked ? "Cancel booking" : "Book your meal"}
          animationDuration={0.7}
          onClick={isBooked ? handleMealCancellation : handleMealBooking}
          isBooked={isBooked}
          label="Most used"
          isLoaderRequired={isLoaderRequired}
        />
      </Grid>
    </Grid>
  );
};

export default BookMeal;
