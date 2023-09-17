import MealBookingTimerUtils from "./MealBookingTimer.Utils";
import { getMealBookingTimerStyles } from "./MealBookingTimer.Styles";
import { Box, Typography } from "@mui/material";

const MealBookingTimer = ({ isCountdownRequired }) => {
  const { timeRemaining, isBookingOpen } = MealBookingTimerUtils();
  const { classes } = getMealBookingTimerStyles();

  return (
    <Box className={classes.getTimerContStyles}>
      {isCountdownRequired ? (
        <Typography className={classes.getTimerStyles}>
          {isBookingOpen
            ? `Booking closes within: ${timeRemaining}`
            : `Booking starts within: ${timeRemaining}`}
        </Typography>
      ) : (
        <Typography className={classes.getTimerStyles}>
          Start Prebooking your meal now
        </Typography>
      )}
    </Box>
  );
};

export default MealBookingTimer;
