import MissedCountDialogUtils from "./lib/MissedCountDialog.Utils";
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
import DailyCountCard from "../../card/DailyCountCard/DailyCountCard";
import { getReversedDate } from "../../../invitationMethods/InvitationMethods";
import CancelIcon from "@mui/icons-material/Cancel";

const MissedCountDialog = ({
  open,
  scroll,
  handleClose,
  regularizationData,
}) => {
  const {
    email,
    dateToBeChecked,
    handleMealBooking,
    isBooked,
    isLoaderRequired,
  } = MissedCountDialogUtils();
  const {
    getDialogTitleStyles,
    getDialogContentStyles,
    getDialogContentTextStyles,
    getDialogActionStyles,
    getButtonStyles,
    cancelIconStyles,
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
        <Box>
          <CancelIcon sx={cancelIconStyles} onClick={handleClose} />
        </Box>
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
                  background: "",
                }}
              >
                {regularizationData.length > 0 ? (
                  regularizationData?.map((data, index) => {
                    return (
                      <Grid item xs={12} sx={{ width: "100%" }} key={index}>
                        <DailyCountCard
                          id={index + 1}
                          memberName={data?.name}
                          memberEmail={data?.email}
                          type="action"
                          actionToBePerformed={() =>
                            handleMealBooking(
                              data?.email,
                              dateToBeChecked,
                              email
                            )
                          }
                          isLoaderRequired={isLoaderRequired}
                          isBooked={isBooked}
                        />
                      </Grid>
                    );
                  })
                ) : (
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginTop: "0.5rem",
                      "@media screen and (max-width: 532px)": {
                        fontSize: "0.9rem",
                      },
                    }}
                  >{`No member regularized his/her meal for ${getReversedDate(
                    dateToBeChecked
                  )}`}</Typography>
                )}
              </Box>
            </Grid>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions sx={getDialogActionStyles}>
          <Button onClick={handleClose} sx={getButtonStyles("close")}>
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
};

export default MissedCountDialog;
