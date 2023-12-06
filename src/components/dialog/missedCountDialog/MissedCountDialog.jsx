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
  Grid,
} from "@mui/material";
// import CommonButton from "../../button/CommonButton";
// import { dateToBeChecked } from "../../../common/CommonData";
import DailyCountCard from "../../card/DailyCountCard/DailyCountCard";

const MissedCountDialog = ({
  open,
  scroll,
  handleClose,
  regularizationData,
}) => {
  const { email, dateToBeChecked, handleMealBooking, isBooked } =
    MissedCountDialogUtils();
  const {
    getDialogTitleStyles,
    getDialogContentStyles,
    getDialogContentTextStyles,
    getDialogActionStyles,
    getButtonStyles,
  } = NonEmployeeGuestDialogStyles;

  console.log("RR", regularizationData);

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
            <Grid container sx={{ width: "100%", background: "" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  columnGap: "1rem",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "wheat",
                }}
              >
                {regularizationData?.map((data, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sx={{ background: "pink", width: "100%" }}
                    >
                      <DailyCountCard
                        id={index + 1}
                        memberName={data?.name}
                        memberEmail={data?.email}
                        type="action"
                        actionToBePerformed={() =>
                          handleMealBooking(data?.email, dateToBeChecked, email)
                        }
                      />
                    </Grid>
                  );
                })}
              </Box>
            </Grid>
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
