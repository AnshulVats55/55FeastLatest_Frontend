/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { handleFormattedDate, getNextDate } from "../../../common/CommonData";
import { useDispatch } from "react-redux";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import snackbarMessages from "../../../Constants";
import { useSelector } from "react-redux";

const BookForAnyoneUtils = () => {
  const myData = useSelector((state) => {
    return state.memberDataReducer;
  });
  const dispatch = useDispatch();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [myBuddies, setMyBuddies] = useState([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
    //handles member search
    setSearchTerm(event.target.value.toLowerCase());
  };

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
        //booking allowed from 6PM(Sunday) to 9AM(Monday) for admins
        setIsBookingOpen(true);
        return true;
      } else {
        setIsBookingOpen(false);
        handleBookingNotifications("Bookings not allowed on weekend !");
        return false;
      }
    } else if (currentDay >= 1 && currentDay <= 4) {
      if (currentHour >= 0 && currentHour <= 23) {
        //booking allowed from 12AM to 12AM the next day for admins
        setIsBookingOpen(true);
        return true;
        // } else if (currentHour >= 18 && currentHour <= 23) {
        //   setIsBookingOpen(true);
        //   return true;
        // } else {
        //   setIsBookingOpen(false);
        //   handleBookingNotifications("Bookings closed for today !");
        // return false;
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

  return {
    myData,
    isDataLoaded,
    setIsDataLoaded,
    searchTerm,
    setSearchTerm,
    myBuddies,
    setMyBuddies,
    memberData,
    date,
    handleMemberSearch,
    checkMealBookingAvailability,
  };
};

export default BookForAnyoneUtils;
