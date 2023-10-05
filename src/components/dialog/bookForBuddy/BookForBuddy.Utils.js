/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect, useRef } from "react";
import {
  handleFormattedDate,
  getNextDate,
} from "../../../common/CommonData.js";
import {
  getMyBuddies,
  bookMealForBuddy,
  handleMemberCountByDate,
  getCountsByDate,
} from "../../../bookingMethods/BookingMethods";
import { useDispatch, useSelector } from "react-redux";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import snackbarMessages from "../../../Constants";

const BookForBuddyUtils = ({ open }) => {
  const myData = useSelector((state) => {
    return state.memberDataReducer;
  });

  const dispatch = useDispatch();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [myBuddies, setMyBuddies] = useState([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [todaysCount, setTodaysCount] = useState([]);

  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);

  const date =
    new Date().getHours() >= 18 && new Date().getHours() <= 23
      ? nextDateFormatted
      : formattedDate;

  let animationDuration = 0.4;

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    const handleMyBuddies = async () => {
      const response = await getMyBuddies(myData.email, myData.location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setMyBuddies(response?.data?.data);
        setIsDataLoaded(true);
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        console.log("Error");
      }
    };

    handleMyBuddies();
  }, []);

  useEffect(() => {
    const handleGetCountsByDate = async () => {
      const response = await getCountsByDate(date, myData?.location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setTodaysCount(response?.data?.data);
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: "Error fetching buddies !",
          })
        );
      }
    };

    handleGetCountsByDate();
  }, []);

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
        //booking allowed from 5PM(Sunday) to 9AM(Monday)
        setIsBookingOpen(true);
        return true;
      } else {
        setIsBookingOpen(false);
        handleBookingNotifications("Bookings open at 6PM !");
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
        handleBookingNotifications("Bookings open at 6PM !");
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

  const filteredUsers = myBuddies?.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm)
  );

  const handleBookForBuddy = async (buddyData) => {
    //handles meal booking for buddies
    const isBookingAllowed = checkMealBookingAvailability();
    if (isBookingAllowed) {
      const response = await bookMealForBuddy(buddyData);
      return response;
    }
  };

  return {
    animationDuration,
    isDataLoaded,
    setSearchTerm,
    memberData,
    date,
    handleMemberSearch,
    descriptionElementRef,
    filteredUsers,
    handleBookForBuddy,
    todaysCount,
  };
};

export default BookForBuddyUtils;
