import { useState, useEffect } from "react";

const MealBookingTimerUtils = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const checkMealBookingAvailability = () => {
    //handles checking timings for meal bookings
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDay();
    const currentHour = currentDateTime.getHours();

    if (currentDay === 0) {
      if (currentHour >= 18 && currentHour <= 23) {
        //booking allowed from 6PM(Sunday) to 9AM(Monday)
        setIsBookingOpen(true);
      } else {
        setIsBookingOpen(false);
      }
    } else if (currentDay >= 1 && currentDay <= 4) {
      if (currentHour >= 0 && currentHour <= 8) {
        //booking allowed from 6PM to 9AM the next day
        setIsBookingOpen(true);
      } else if (currentHour >= 18 && currentHour <= 23) {
        setIsBookingOpen(true);
      } else {
        setIsBookingOpen(false);
      }
    } else if (currentDay === 5) {
      if (currentHour >= 0 && currentHour <= 8) {
        //booking allowed from 12AM(Friday) to 9AM(Friday)
        setIsBookingOpen(true);
      } else {
        setIsBookingOpen(false);
      }
    } else {
      setIsBookingOpen(false);
    }
  };

  useEffect(() => {
    checkMealBookingAvailability();
  }, [isBookingOpen]);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const currentDay = now.getDay(); //2
      let targetTime;
      const temp = new Date(); //
      if (currentDay >= 1 && currentDay <= 4) {
        //from monday to thursday
        if (now.getHours() >= 0 && now.getHours() < 9) {
          //from 12AM to 9AM
          temp.setHours(9, 0, 0, 0);
          targetTime = temp - now;
          setTimeRemaining(formatTime(targetTime));
        } else if (now.getHours() >= 9 && now.getHours() < 18) {
          //from 9AM to 6PM
          temp.setHours(18, 0, 0, 0);
          targetTime = temp - now;
          setTimeRemaining(formatTime(targetTime));
        } else if (now.getHours() >= 18 && now.getHours() <= 23) {
          //from 6PM to 9AM, the next day
          temp.setHours(33, 0, 0, 0);
          targetTime = temp - now;
          setTimeRemaining(formatTime(targetTime));
        }
      } else if (currentDay === 5) {
        //for friday
        if (now.getHours() >= 0 && now.getHours() < 9) {
          //from 12AM to 9AM
          temp.setHours(9, 0, 0, 0);
          targetTime = temp - now;
          setTimeRemaining(formatTime(targetTime));
        } else if (now.getHours() >= 9) {
          //greater than 9AM
          temp.setDate(now.getDate() + 2);
          temp.setHours(18, 0, 0, 0);
          targetTime = temp - now;
          setTimeRemaining(formatTime(targetTime));
        }
      } else if (currentDay === 6) {
        //for saturday
        if (now.getHours() >= 0) {
          temp.setDate(now.getDate() + 1);
          temp.setHours(18, 0, 0, 0);
          targetTime = temp - now;
          setTimeRemaining(formatTime(targetTime));
        }
      } else if (currentDay === 0) {
        //for sunday
        if (now.getHours() >= 0 && now.getHours() < 18) {//from 12AM to 6PM
          temp.setHours(18, 0, 0, 0);
          targetTime = temp - now;
          setTimeRemaining(formatTime(targetTime));
        } else if (now.getHours() >= 18 && now.getHours() <= 23) {//from 6PM to 12AM
          temp.setHours(33, 0, 0, 0);
          targetTime = temp - now;
          setTimeRemaining(formatTime(targetTime));
        }
      }
    };

    const formatTime = (milliseconds) => {
      const hours = Math.floor(milliseconds / 3600000);
      const minutes = Math.floor((milliseconds % 3600000) / 60000);
      const seconds = Math.floor((milliseconds % 60000) / 1000);

      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    calculateTimeRemaining();
    const timerInterval = setInterval(calculateTimeRemaining, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return {
    timeRemaining,
    isBookingOpen,
  };
};

export default MealBookingTimerUtils;
