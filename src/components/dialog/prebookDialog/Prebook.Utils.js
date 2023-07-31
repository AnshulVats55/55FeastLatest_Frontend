/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { format, addDays, isWeekend } from "date-fns";
import { handleFormattedDate } from "../../../common/CommonData";
import { getReversedDate } from "../../../invitationMethods/InvitationMethods";
import axios from "axios";
import BASE_URL from "../../../api/baseUrl/BaseUrl";
import MEMBER_TOKEN from "../../../api/memberToken/MemberToken";
import { useDispatch } from "react-redux";
import snackbarMessages from "../../../Constants";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";

const PrebookUtils = () => {
  const dispatch = useDispatch();
  const todaysDate = new Date();
  const [openDatesForPrebook, setOpenDatesForPrebook] = useState([]);

  const getDaysNameFromDate = (date) => {
    //gives day name according to current date
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
        // console.log("Formatted date", formattedDate);
        const reversedDate = getReversedDate(formattedDate);
        // console.log("Reversed date", reversedDate);
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

  return {
    openDatesForPrebook,
    handleMealPrebooking,
  };
};

export default PrebookUtils;
