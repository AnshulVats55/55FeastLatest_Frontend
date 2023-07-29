/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { getChipStyles, getDateChipStyles } from "./Chip.Styles";
import { Typography, Stack, Chip } from "@mui/material";
import ChipUtils from "./Chip.Utils";

const DateChip = ({ dayName, dateValue }) => {
  const { classes } = getChipStyles();
  const {
    isSelected,
    setIsSelected,
    handleDateSelection,
    isAlreadyBooked,
    getPrebookingStatus,
  } = ChipUtils();
  const { dateChipStyles } = getDateChipStyles;

  useEffect(() => {
    getPrebookingStatus(dateValue);
  }, []);

  return (
    <Stack className={classes.getChipContStyles}>
      <Chip
        label={dayName}
        onClick={() => {
          handleDateSelection(dateValue);
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
