/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Skeleton,
  Box,
} from "@mui/material";
import { getBookForBuddyDialogStyles } from "./BookForBuddy.Styles";
import InviteMemberCard from "../../card/InviteMemberCard";
import BookForBuddyUtils from "./BookForBuddy.Utils";
import CancelIcon from "@mui/icons-material/Cancel";

const BookForBuddyDialog = ({ open, scroll, handleClose, children }) => {
  const { classes } = getBookForBuddyDialogStyles();
  const {
    email,
    animationDuration,
    isDataLoaded,
    date,
    descriptionElementRef,
    filteredUsers,
    handleBookForBuddy,
    todaysCount,
  } = BookForBuddyUtils(open);

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
        <Box>
          <CancelIcon
            className={classes.cancelIconStyles}
            onClick={handleClose}
          />
        </Box>
        <DialogTitle
          id="scroll-dialog-title"
          className={classes.getDialogTitleStyles}
        >
          Book for buddy
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
              Book a lunch count for your buddy and invite them to have lunch
              with you
            </Typography>
            {isDataLoaded ? (
              filteredUsers?.length > 0 ? (
                filteredUsers?.map((member, index) => {
                  const memberId = member._id;
                  const isMembersTodaysMealBooked = !!todaysCount?.find(
                    ({ email }) => member?.email === email
                  );
                  return (
                    <InviteMemberCard
                      key={index}
                      indexNumber={index + 1}
                      memberName={member.fullName}
                      memberEmail={member.email}
                      memberId={memberId}
                      animationDuration={animationDuration}
                      children={children}
                      isCancellationAllowed={false}
                      isDataLoaded={isDataLoaded}
                      isDashboard={false}
                      isEmailChopRequired={true}
                      isActionButtonRequired={true}
                      isStatusCheckRequired={true}
                      isButtonDisableRequired={true}
                      isAlreadyBooked={isMembersTodaysMealBooked}
                      handleAction={async () => {
                        const response = await handleBookForBuddy({
                          email: member?.email,
                          date: date,
                          bookedBy: email,
                        });
                        return response;
                      }}
                    />
                  );
                })
              ) : (
                <Typography
                  sx={{
                    marginTop: "2rem",
                    fontSize: "1rem",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  No buddy found with this name
                </Typography>
              )
            ) : (
              Array(6)
                .fill()
                .map((data, index) => {
                  return (
                    <Skeleton
                      key={index}
                      animation="wave"
                      variant="rounded"
                      sx={{
                        width: "100%",
                        height: "3rem",
                        margin: "0.5rem 0 0.25rem",
                        background: "rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  );
                })
            )}
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions className={classes.getDialogActionStyles}>
          <Button
            onClick={handleClose}
            className={classes.getCloseButtonStyles}
          >
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
};

export default BookForBuddyDialog;
