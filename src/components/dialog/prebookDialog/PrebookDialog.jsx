/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
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
import DateChip from "../../chip/Chip";
import PrebookUtils from "./Prebook.Utils";

const PrebookDialog = ({ open, scroll, handleClose }) => {
  const { classes } = getPrebookDialogStyles();
  const {
    openDatesForPrebook,
    isLoaderRequired,
    descriptionElementRef,
    memberData,
    handlePrebooking,
    handlePrebookDialogClose,
  } = PrebookUtils(open, handleClose);

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handlePrebookDialogClose}
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
            onClick={() => {
              handlePrebookDialogClose();
            }}
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
