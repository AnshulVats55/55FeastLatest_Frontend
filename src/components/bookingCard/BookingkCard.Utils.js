/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";

const BookingkCardUtils = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleDataLoading = () => {
    setTimeout(() => {
      setIsDataLoaded(true);
    }, 1500);
  };

  useEffect(() => {
    handleDataLoading();
  }, [isDataLoaded]);

  return {
    isDataLoaded,
  };
};

export default BookingkCardUtils;
