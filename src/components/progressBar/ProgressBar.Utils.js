import { useState } from "react";

const ProgressBarUtils = () => {
  const [progress, setProgress] = useState(0);

  const handleProgressPercentage = (totalMembers, todaysCount) => {
    //handles progress percentage
    const progressPercentage = (todaysCount / totalMembers) * 100;
    console.log(progressPercentage);
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

  return {
    progress,
    setProgress,
    handleProgressPercentage,
  };
};

export default ProgressBarUtils;
