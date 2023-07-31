/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { getChipStyles, getDateChipStyles } from "./Chip.Styles";
import { Typography, Stack, Chip } from "@mui/material";
import ChipUtils from "./Chip.Utils";
import { useSelector } from "react-redux";

const DateChip = ({ dayName, dateValue, allBookedDates }) => {
  console.log("datevalue", dateValue);
  const bookingStatus = useSelector((state) => {
    return state.prebookStatusReducer;
  });
  console.log("booking status from store", bookingStatus);

  const prebookingDates = useSelector((state) => {
    return state.FetchPrebookDatesReducer;
  });
  console.log("prebooking dates from store------->>>>>>>>>", prebookingDates);
  const { classes } = getChipStyles();
  const {
    isSelected,
    setIsSelected,
    handleDateSelection,
    isAlreadyBooked,
    setIsAlreadyBooked,
    getPrebookingStatus,
    handlePrebookCancellation,
  } = ChipUtils();
  const { dateChipStyles } = getDateChipStyles;

  useEffect(() => {
    //checks if date is already present in allBookedDates array
    // prebookingDates?.map((date) => {
    //   if (dateValue === date) {
    //     setIsAlreadyBooked(true);
    //   }
    // });
    if (prebookingDates.indexOf(dateValue) > -1) {
      setIsAlreadyBooked(true);
    }
  }, [prebookingDates]);

  return (
    <Stack className={classes.getChipContStyles}>
      <Chip
        label={dayName}
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
