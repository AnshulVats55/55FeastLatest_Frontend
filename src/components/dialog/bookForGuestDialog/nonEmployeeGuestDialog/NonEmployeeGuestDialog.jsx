/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import Slider from "@mui/material/Slider";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import NonEmployeeGuestDialogUtils from "./NonEmployeeGuestDialog.Utils";
import { NonEmployeeGuestDialogStyles } from "./NonEmployeeGuestDialog.Styles";
import CommonButton from "../../../button/CommonButton";
import { dateToBeChecked } from "../../../../common/CommonData";
import { getReversedDate } from "../../../../invitationMethods/InvitationMethods";
import CancelIcon from "@mui/icons-material/Cancel";

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
    getButtonStyles,
    cancelIconStyles,
  } = NonEmployeeGuestDialogStyles;

  return (
    <Box>
      <Dialog
        open={nonEmployeeDialogOpen}
        onClose={handleNonEmployeeDialogClose}
        scroll={nonEmployeeDialogScroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Box>
          <CancelIcon
            sx={cancelIconStyles}
            onClick={handleNonEmployeeDialogClose}
          />
        </Box>
        <DialogTitle id="scroll-dialog-title" sx={getDialogTitleStyles}>
          Book for guests
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
                paddingBottom: "1rem",
              }}
            >
              Booking a meal for your guests is as simple as booking for
              yourself. Try now !
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                "@media screen and (max-width: 532px)": {
                  fontSize: "0.8rem",
                },
                fontWeight: 500,
                marginTop:"1rem",
              }}
            >
              {`You are booking for ${getReversedDate(dateToBeChecked)}`}
            </Typography>
            <Box
              sx={{
                display: "flex",
                columnGap: "1rem",
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
                customStyles={getButtonStyles("book")}
                onClick={handleBookForGuests}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={getDialogActionStyles}>
          <Button
            onClick={handleNonEmployeeDialogClose}
            sx={getButtonStyles("close")}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NonEmployeeGuestDialog;
