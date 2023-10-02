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
  TextField,
  Typography,
  Skeleton,
  Box,
} from "@mui/material";
import { getBookForBuddyDialogStyles } from "./BookForBuddy.Styles";
import InviteMemberCard from "../../card/InviteMemberCard";
import BookForBuddyUtils from "./BookForBuddy.Utils";

const BookForBuddyDialog = ({ open, scroll, handleClose, children }) => {
  const { classes } = getBookForBuddyDialogStyles();
  const {
    email,
    animationDuration,
    isDataLoaded,
    memberData,
    date,
    handleMemberSearch,
    descriptionElementRef,
    filteredUsers,
    handleBookForBuddy,
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
            <TextField
              type="search"
              placeholder="Search for your buddy..."
              variant="outlined"
              multiline
              className={classes.root}
              inputProps={{ className: classes.input }}
              onChange={handleMemberSearch}
            />
            {isDataLoaded ? (
              filteredUsers?.length > 0 ? (
                filteredUsers?.map((member, index) => {
                  const memberId = member._id;
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
                      handleAction={() => {
                        console.log("FUNCTION TRIGGERED");
                        const response = handleBookForBuddy({
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
              memberData?.map((member, index) => {
                return (
                  <Skeleton
                    animation="wave"
                    sx={{ minWidth: "100% !important" }}
                  >
                    <InviteMemberCard
                      key={index}
                      indexNumber={index + 1}
                      memberName={member.memberName}
                      memberEmail={member.memberEmail}
                      animationDuration={animationDuration}
                      children="Book"
                      isDataLoaded={isDataLoaded}
                      isButtonRequired={true}
                      isEmailChopRequired={true}
                    />
                  </Skeleton>
                );
              })
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.getDialogActionStyles}>
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

export default BookForBuddyDialog;
