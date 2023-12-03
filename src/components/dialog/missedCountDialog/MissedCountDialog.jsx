import MissedCountDialogUtils from "./lib/MissedCountDialog.Utils";
// import { getMissedCountDialogStyles } from "./MissedCountDialog.Styles";
import { NonEmployeeGuestDialogStyles } from "../bookForGuestDialog/nonEmployeeGuestDialog/NonEmployeeGuestDialog.Styles";
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
import CommonButton from "../../button/CommonButton";
import { dateToBeChecked } from "../../../common/CommonData";

const MissedCountDialog = ({ open, scroll, handleClose }) => {
  const {} = MissedCountDialogUtils();
  // const {} = getMissedCountDialogStyles;
  const {
    getDialogTitleStyles,
    getDialogContentStyles,
    getDialogContentTextStyles,
    getDialogActionStyles,
    getButtonStyles,
  } = NonEmployeeGuestDialogStyles;

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={getDialogTitleStyles}>
          Regularize meal
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
              Regularize meal for members who missed to book it within the
              specified window
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
              <CommonButton
                children="Book"
                isLoaderRequired={false}
                type="button"
                isDisabled={false}
                customStyles={getButtonStyles("book")}
                onClick={() => {
                  alert("clicked");
                }}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={getDialogActionStyles}>
          <Button onClick={handleClose} sx={getButtonStyles("close")}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MissedCountDialog;
