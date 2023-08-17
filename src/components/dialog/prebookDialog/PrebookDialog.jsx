/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
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
  CircularProgress,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import snackbarMessages from "../../../Constants";
import DateChip from "../../chip/Chip";
import PrebookUtils from "./Prebook.Utils";
import { removeAllDates } from "../../../store/slices/PrebookDatesSlice";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import { getPrebookDates } from "../../../store/slices/FetchPrebookDatesSlice";

const PrebookDialog = ({ open, scroll, handleClose }) => {
  const prebookedDates = useSelector((state) => {
    return state.prebookDatesReducer;
  });
  console.log("Prebook dates kept in store", prebookedDates);
  const { email } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const { classes } = getPrebookDialogStyles();
  const {
    openDatesForPrebook,
    handleMealPrebooking,
    isLoaderRequired,
    setIsLoaderRequired,
  } = PrebookUtils();

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

  const memberData = {
    email: email,
    bookedDates: prebookedDates,
  };

  const handlePrebooking = async (memberData) => {
    if (prebookedDates.length <= 0) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.SELECT_DATE,
        })
      );
    } else {
      setIsLoaderRequired(true);
      const response = await handleMealPrebooking(memberData);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        dispatch(removeAllDates());
        dispatch(getPrebookDates(response?.data?.data?.bookedDates));
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage: snackbarMessages.PREBOOKING_SUCCESSFULL,
          })
        );
        setIsLoaderRequired(false);
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: snackbarMessages.PREBOOKING_FAILURE,
          })
        );
        setIsLoaderRequired(false);
      }
    }
  };

  return (
    <Box>
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
            <Grid container spacing={0} className={classes.getGridContStyles}>
              {openDatesForPrebook?.map((day, index) => {
                return (
                  <Grid
                    item
                    lg={2.4}
                    md={2.4}
                    sm={2.4}
                    xs={6}
                    className={classes.getGridItemStyles}
                  >
                    <DateChip
                      key={index}
                      dayName={day.dayName}
                      dateValue={day.date}
                    />
                  </Grid>
                );
              })}
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
            Book&nbsp;
            {isLoaderRequired && (
              <CircularProgress size={15} thickness={4} color="inherit" />
            )}
          </Button>
          <Button
            onClick={handleClose}
            className={classes.getCloseButtonStyles}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrebookDialog;
