/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";

export const textStyle = {
  fontFamily: "Poppins, sans-serif !important",
};

const ProgressBarUtils = (todaysCount, totalMembers) => {
  const [progress, setProgress] = useState(0);

  const handleProgressPercentage = () => {
    //handles progress percentage
    const progressPercentage = (todaysCount / totalMembers) * 100;
    setProgress(0);

    let currentValue = 0;
    const increment = progressPercentage / 100;
    const interval = setInterval(() => {
      currentValue += increment;
      const roundedValue = Math.round(currentValue);
      if (roundedValue >= progressPercentage) {
        setProgress(progressPercentage);
        clearInterval(interval);
      } else {
        setProgress(roundedValue);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  };

  useEffect(() => {
    if (todaysCount > 0) {
      handleProgressPercentage(totalMembers, todaysCount);
    }
  }, [todaysCount, totalMembers]);

  return {
    progress,
    setProgress,
  };
};

export default ProgressBarUtils;
