/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { getChipStyles, getDateChipStyles } from "./Chip.Styles";
import { Typography, Stack, Chip } from "@mui/material";
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
  } = ChipUtils();
  const { dateChipStyles } = getDateChipStyles;

  useEffect(() => {
    console.log("dateValue in useEffect", dateValue);
    //checks if date is already present in allBookedDates array
    if (prebookingDates?.indexOf(getReversedDate(dateValue)) > -1) {
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
