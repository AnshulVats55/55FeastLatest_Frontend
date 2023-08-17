/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import { getChipStyles, getDateChipStyles } from "./Chip.Styles";
import { Typography, Stack, Chip, CircularProgress, Box } from "@mui/material";
import ChipUtils from "./Chip.Utils";
import { useSelector } from "react-redux";
import { getReversedDate } from "../../invitationMethods/InvitationMethods";

const DateChip = ({ dayName, dateValue }) => {
  const prebookingDates = useSelector((state) => {
    return state.FetchPrebookDatesReducer;
  });

  const { classes } = getChipStyles();
  const {
    isSelected,
    handleDateSelection,
    isAlreadyBooked,
    setIsAlreadyBooked,
    handlePrebookCancellation,
    isLoaderRequired,
  } = ChipUtils();
  const { dateChipStyles } = getDateChipStyles;

  useEffect(() => {
    console.log("dateValue in useEffect", dateValue);
    //checking if date is already present in allBookedDates array
    if (prebookingDates?.indexOf(getReversedDate(dateValue)) > -1) {
      setIsAlreadyBooked(true);
    }
  }, [prebookingDates]);

  return (
    <Stack className={classes.getChipContStyles}>
      <Chip
        label={
          isLoaderRequired ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {dayName}
              <CircularProgress
                size={11}
                thickness={4}
                color="inherit"
                sx={{ margin: "0 0.5rem" }}
              />
            </Box>
          ) : (
            dayName
          )
        }
        onClick={() => {
          isAlreadyBooked
            ? handlePrebookCancellation(dateValue)
            : handleDateSelection(dateValue);
        }}
        sx={dateChipStyles(isSelected, isAlreadyBooked)}
      />
      <Typography variant="caption" className={classes.getTypographyOneStyles}>
        {dateValue}
      </Typography>
    </Stack>
  );
};

export default DateChip;
