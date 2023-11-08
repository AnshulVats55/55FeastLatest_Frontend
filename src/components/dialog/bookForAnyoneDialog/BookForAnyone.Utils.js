/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  handleFormattedDate,
  getNextDate,
} from "../../../common/CommonData.js";
import {
  getMyBuddies,
  getCountsByDate,
} from "../../../bookingMethods/BookingMethods.js";
import { useDispatch } from "react-redux";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import snackbarMessages from "../../../Constants";
import { useSelector } from "react-redux";
import { HandleLogoutOnSessionExpire } from "../../../common/Logout";

const BookForAnyoneUtils = () => {
  const myData = useSelector((state) => {
    return state.memberDataReducer;
  });

  const dispatch = useDispatch();
  const { handleLogoutOnTokenExpire } = HandleLogoutOnSessionExpire();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [myBuddies, setMyBuddies] = useState([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [todaysCount, setTodaysCount] = useState([]);

  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);

  const date =
    new Date().getHours() >= 0 && new Date().getHours() <= 17
      ? formattedDate
      : nextDateFormatted;

  const memberData = [
    //member's dummy data
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
  ];

  const handleMemberSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleBookingNotifications = (notificationMessage) => {
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
        //booking allowed from 6PM(Sunday) to 9AM(Monday) for admins
        setIsBookingOpen(true);
        return true;
      } else {
        setIsBookingOpen(false);
        handleBookingNotifications("Bookings open at 6PM !");
        return false;
      }
    } else if (currentDay >= 1 && currentDay <= 4) {
      if (currentHour >= 0 && currentHour <= 23) {
        //booking allowed from 12AM to 12AM the next day for admins
        setIsBookingOpen(true);
        return true;
      }
    } else if (currentDay === 5) {
      if (currentHour >= 0 && currentHour <= 17) {
        //booking allowed from 12AM(Friday) to 18PM(Friday) for admins
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

  useEffect(() => {
    const handleAllMembers = async () => {
      const response = await getMyBuddies(myData.email, myData.location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setMyBuddies(response?.data?.data);
        setIsDataLoaded(true);
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
              snackbarMessage: snackbarMessages.ERROR_FETCHING_MEMBERS,
            })
          );
        }
        setIsDataLoaded(true);
      }
    };

    handleAllMembers();
  }, []);

  useEffect(() => {
    const handleGetCountsByDate = async () => {
      const response = await getCountsByDate(date, myData?.location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setTodaysCount(response?.data?.data);
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
        }
      }
    };

    handleGetCountsByDate();
  }, []);

  return {
    myData,
    isDataLoaded,
    setIsDataLoaded,
    searchTerm,
    setSearchTerm,
    myBuddies,
    memberData,
    date,
    handleMemberSearch,
    checkMealBookingAvailability,
    todaysCount,
  };
};

export default BookForAnyoneUtils;
