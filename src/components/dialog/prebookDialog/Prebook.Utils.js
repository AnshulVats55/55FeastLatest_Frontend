/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useEffect, useState, useRef } from "react";
import { addDays, isWeekend } from "date-fns";
import {
  handleFormattedDate,
  getNextDate,
} from "../../../common/CommonData.js";
import { getReversedDate } from "../../../invitationMethods/InvitationMethods";
import axios from "axios";
import BASE_URL from "../../../api/baseUrl/BaseUrl";
import MEMBER_TOKEN from "../../../api/memberToken/MemberToken";
import { useDispatch, useSelector } from "react-redux";
import { removeAllDates } from "../../../store/slices/PrebookDatesSlice";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import snackbarMessages from "../../../Constants";
import { getPrebookDates } from "../../../store/slices/FetchPrebookDatesSlice";

const PrebookUtils = (open, handleClose) => {
  const prebookedDates = useSelector((state) => {
    return state.prebookDatesReducer;
  });

  const { email } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const memberData = {
    email: email,
    dates: prebookedDates,
    bookedBy: email,
  };

  const dispatch = useDispatch();
  const todaysDate = new Date();
  if (new Date().getHours() >= 18 && new Date().getHours() <= 23) {
    todaysDate.setDate(new Date().getDate() + 1);
  }
  const [openDatesForPrebook, setOpenDatesForPrebook] = useState([]);
  const [isLoaderRequired, setIsLoaderRequired] = useState(false);

  const getDaysNameFromDate = (date) => {
    //gives day name according to date
    const day = new Date(date).getDay();
    switch (day) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "Invalid date";
    }
  };

  const getNextWorkingDays = (startDate, count) => {
    //give 5 days name and dates including current day, excluding weekends
    const workingDays = [];
    let currentDate = startDate;

    while (workingDays.length < count) {
      if (!isWeekend(currentDate)) {
        //Checking if the current date is a weekend or not
        const formattedDate = handleFormattedDate(currentDate);
        const reversedDate = getReversedDate(formattedDate);
        workingDays.push({
          dayName: getDaysNameFromDate(currentDate),
          date: reversedDate,
        });
      }
      currentDate = addDays(currentDate, 1); //Adding 1 day to the current date (going to next date)
    }
    return workingDays;
  };

  useEffect(() => {
    const allowedDaysForPrebooking = getNextWorkingDays(todaysDate, 5);
    setOpenDatesForPrebook(allowedDaysForPrebooking);
  }, []);

  const handleMealPrebooking = async (memberData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/bookmeal/multiple`,
        memberData,
        {
          headers: {
            Authorization: `Bearer ${MEMBER_TOKEN}`,
            "Content-Type": "application/json",
            referrerPolicy: "no-referrer",
            mode: "no-mode",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handlePrebooking = async (memberData) => {
    if (prebookedDates.length <= 0) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.SELECT_DATE,
        })
      );
    } else {
      setIsLoaderRequired(true);
      const response = await handleMealPrebooking(memberData);
      console.log("RESP OF PRE-BOOKING API", response);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        dispatch(removeAllDates());
        const allPreBookedDates = response?.data?.data?.bookedDates?.map(
          (bookedData) => {
            return bookedData?.date;
          }
        );
        console.log("ALL PREBOOKED DATES", allPreBookedDates);
        dispatch(getPrebookDates(allPreBookedDates));
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage: snackbarMessages.PREBOOKING_SUCCESSFULL,
          })
        );
        setIsLoaderRequired(false);
      } else if (response?.data?.status === snackbarMessages.FAILURE) {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: response?.message,
          })
        );
        setIsLoaderRequired(false);
      }
    }
  };

  const handlePrebookDialogClose = () => {
    if (prebookedDates?.length > 0 && prebookedDates?.length === 1) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "You've selected a date !",
        })
      );
    } else if (prebookedDates?.length > 0 && prebookedDates?.length > 1) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "You've selected some dates !",
        })
      );
    } else if (prebookedDates?.length <= 0) {
      handleClose();
    }
  };

  return {
    openDatesForPrebook,
    isLoaderRequired,
    descriptionElementRef,
    memberData,
    handlePrebooking,
    handlePrebookDialogClose,
  };
};

export default PrebookUtils;
