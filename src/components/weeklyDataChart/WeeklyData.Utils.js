/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLastFiveDaysCount,
  getReversedDate,
} from "../../invitationMethods/InvitationMethods";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import snackbarMessages from "../../Constants";

const WeeklyDataUtils = () => {
  const { location } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const dispatch = useDispatch();
  const [lastFiveDaysCount, setLastFiveDaysCount] = useState([]);
  const [lastFiveDaysDate, setLastFiveDaysDate] = useState([]);

  const handleLastFiveDaysCount = async () => {
    //handles last five days count
    const response = await getLastFiveDaysCount(location);
    if (response?.data?.status === snackbarMessages.SUCCESS) {
      const fiveDaysCount = [],
        fiveDaysName = [],
        fiveDaysDate = [];
      response?.data?.data.map((count) => {
        fiveDaysCount.push(count.count);
        fiveDaysName.push(count.day);
        fiveDaysDate.push(getReversedDate(count.date));
      });
      setLastFiveDaysCount(fiveDaysCount);
      setLastFiveDaysDate(fiveDaysDate);
    } else if (response?.response?.data?.status === snackbarMessages.FAILURE) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.DATA_FETCHED_FAILURE,
        })
      );
    }
  };

  useEffect(() => {
    handleLastFiveDaysCount();
  }, []);

  return {
    lastFiveDaysCount,
    lastFiveDaysDate,
  };
};

export default WeeklyDataUtils;
