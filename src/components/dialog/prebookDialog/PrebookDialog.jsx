/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { getPrebookDialogStyles } from "./PrebookDialog.Styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { format, addDays, isWeekend } from "date-fns";
import {
  handleFormattedDate,
  // getLastDateOfCurrentMonth,
  // getNextDate,
} from "../../../common/CommonData";
import { getReversedDate } from "../../../invitationMethods/InvitationMethods";
import { useDispatch, useSelector } from "react-redux";
import snackbarMessages from "../../../Constants";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import DateChip from "../../chip/Chip";
import PrebookUtils from "./Prebook.Utils";
import { removeAllDates } from "../../../store/slices/PrebookDatesSlice";

const PrebookDialog = ({ open, scroll, handleClose }) => {
  const prebookedDates = useSelector((state) => {
    return state.prebookDatesReducer;
  });
  const { email } = useSelector((state) => {
    return state.memberDataReducer;
  });
  console.log("prebook dates from store", prebookedDates);

  const { classes } = getPrebookDialogStyles();
  const { openDatesForPrebook, handleMealPrebooking } = PrebookUtils();

  const dispatch = useDispatch();

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [rangeStartDate, setRangeStartDate] = useState("");
  const [rangeEndDate, setRangeEndDate] = useState("");

  const handleStartDatePicked = (event) => {
    const formattedDate = handleFormattedDate(event);
    const reversedDate = getReversedDate(formattedDate);
    setRangeStartDate(reversedDate);
  };

  const handleEndDatePicked = (event) => {
    const formattedDate = handleFormattedDate(event);
    const reversedDate = getReversedDate(formattedDate);
    setRangeEndDate(reversedDate);
  };

  const disableWeekends = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const memberData = {
    email: email,
    bookedDates: prebookedDates,
  };
  const handlePrebooking = async (memberData) => {
    console.log("Member data being sent", memberData);
    const response = await handleMealPrebooking(memberData);
    console.log("Response of prebooking API", response);
    if (response?.data?.status === snackbarMessages.SUCCESS) {
      dispatch(removeAllDates());
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.getDialogBoxStyles}
      >
        <DialogTitle
          id="scroll-dialog-title"
          className={classes.getDialogTitleStyles}
        >
          Pre-book your meal
        </DialogTitle>
        <DialogContent
          dividers={scroll === "paper"}
          className={classes.getDialogContentStyles}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className={classes.getDialogContentTextStyles}
          >
            <Typography
              sx={{
                fontSize: "1rem",
              }}
            >
              Pre-book your mouthwatering meals and enjoy a week full of
              culinary delights, conveniently delivered to your table
            </Typography>
            <Grid container spacing={1} className={classes.getGridContStyles}>
              <Grid item xs={12} className={classes.getGridItemStyles}>
                {openDatesForPrebook?.map((day, index) => {
                  return (
                    <DateChip
                      key={index}
                      dayName={day.dayName}
                      dateValue={day.date}
                    />
                  );
                })}
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.getDialogActionStyles}>
          <Button
            onClick={() => {
              handlePrebooking(memberData);
            }}
            className={classes.getCloseButtonStyles}
          >
            Book
          </Button>
          <Button
            onClick={handleClose}
            className={classes.getCloseButtonStyles}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PrebookDialog;
