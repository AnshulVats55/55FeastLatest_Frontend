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
      const currentDay = now.getDay();
      const currentHour = now.getHours();

      let openingHour = 0; //booking opening hour
      let closingHour = 0; //booking closing hour

      if (currentDay === 0) {
        // Sunday
        openingHour = 18; //6 PM
        closingHour = 9; //9 AM (next day)
      } else if (currentDay >= 1 && currentDay <= 4) {
        // Monday to Wednesday
        openingHour = 18; //6 PM
        closingHour = 9; //9 AM (next day)
      }
      // Friday (closingHour = 9 AM)
      else if (currentDay === 4 && currentHour < 9) {
        closingHour = 9;
      }

      const openingTime = new Date();
      openingTime.setHours(openingHour, 0, 0, 0);

      const closingTime = new Date();
      closingTime.setHours(closingHour, 0, 0, 0);

      if (now < openingTime) {
        // If the current time is before the opening time, calculating time until opening.
        const timeDiff = openingTime - now;
        setTimeRemaining(formatTime(timeDiff));
      } else if (now >= openingTime && now < closingTime) {
        // If the current time is within the booking window, calculating time until closing.
        const timeDiff = closingTime - now;
        setTimeRemaining(formatTime(timeDiff));
      } else {
        // Booking window is closed.
        setTimeRemaining("00:00:00");
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
