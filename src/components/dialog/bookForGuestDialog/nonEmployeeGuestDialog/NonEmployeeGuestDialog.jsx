/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import {
  Box,
  Tooltip,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import NonEmployeeGuestDialogUtils from "./NonEmployeeGuestDialog.Utils";
import {
  NonEmployeeGuestDialogStyles,
  getCommonButtonCustomStyles,
} from "./NonEmployeeGuestDialog.Styles";
import CommonButton from "../../../button/CommonButton";
import Loader from "../../../loader/Loader";
import { DashboardCardTwoStyles } from "../../../card/dashboardCardTwo/DashboardCardTwo.Styles";

const NonEmployeeGuestDialog = ({
  nonEmployeeDialogOpen,
  nonEmployeeDialogScroll,
  handleNonEmployeeDialogClose,
}) => {
  const { setNonEmployeeGuests, handleBookForGuests } =
    NonEmployeeGuestDialogUtils();
  const {
    getDialogTitleStyles,
    getDialogContentStyles,
    getDialogContentTextStyles,
    getDialogActionStyles,
    getCloseButtonStyles,
    getSliderStyles,
  } = NonEmployeeGuestDialogStyles;
  const { buttonStyles } = DashboardCardTwoStyles;

  return (
    <div>
      <Dialog
        open={nonEmployeeDialogOpen}
        onClose={handleNonEmployeeDialogClose}
        scroll={nonEmployeeDialogScroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={getDialogTitleStyles}>
          Book for Non-employee guests
        </DialogTitle>
        <DialogContent
          dividers={scroll === "paper"}
          sx={getDialogContentStyles}
        >
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
            sx={getDialogContentTextStyles}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                "@media screen and (max-width: 532px)": {
                  fontSize: "0.9rem",
                },
              }}
            >
              Booking a meal for outsider guests is as simple as booking for
              yourself. Try now !
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Slider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={0}
                max={50}
                onChange={(event) => {
                  setNonEmployeeGuests(event?.target?.value);
                }}
                sx={getSliderStyles}
              />
              <CommonButton
                children="Book"
                isLoaderRequired={false}
                type=""
                isDisabled={false}
                customStyles={buttonStyles}
                onClick={handleBookForGuests}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={getDialogActionStyles}>
          <Button
            onClick={handleNonEmployeeDialogClose}
            sx={getCloseButtonStyles}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NonEmployeeGuestDialog;
