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
