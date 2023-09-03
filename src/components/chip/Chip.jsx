/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { getChipStyles, getDateChipStyles } from "./Chip.Styles";
import { Typography, Stack, Chip, CircularProgress, Box } from "@mui/material";
import ChipUtils from "./Chip.Utils";

const DateChip = ({ dayName, dateValue }) => {
  const { classes } = getChipStyles();
  const { dateChipStyles } = getDateChipStyles;
  const {
    isSelected,
    handleDateSelection,
    isAlreadyBooked,
    handlePrebookCancellation,
    isLoaderRequired,
  } = ChipUtils(dateValue);

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
