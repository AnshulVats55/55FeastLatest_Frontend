/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { getBookForAnyoneStyles } from "./BookForAnyone.Styles";
import BookForAnyoneUtils from "./BookForAnyone.Utils";
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
import InviteMemberCard from "../../card/InviteMemberCard";
import {
  getMyBuddies,
  bookMealForBuddy,
} from "../../../bookingMethods/BookingMethods";

const BookForAnyone = ({ open, scroll, handleClose, children }) => {
  const { classes } = getBookForAnyoneStyles();
  const {
    myData,
    isDataLoaded,
    setIsDataLoaded,
    searchTerm,
    myBuddies,
    memberData,
    date,
    handleMemberSearch,
    checkMealBookingAvailability,
    todaysCount,
  } = BookForAnyoneUtils();

  let animationDuration = 0.4;

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const filteredUsers = myBuddies?.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm)
  );

  const handleBookForAnyone = async (buddyData) => {
    const isBookingAllowed = checkMealBookingAvailability();
    if (isBookingAllowed) {
      const response = await bookMealForBuddy(buddyData);
      return response;
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
          Book for anyone
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
              Book a lunch count for any member and help them to avail lunch
              without a miss
            </Typography>
            {/* <TextField
              type="search"
              placeholder="Search for any member..."
              variant="outlined"
              multiline
              className={classes.root}
              inputProps={{ className: classes.input }}
              onChange={handleMemberSearch}
            /> */}
            {isDataLoaded ? (
              filteredUsers?.length > 0 ? (
                filteredUsers?.map((member, index) => {
                  const memberId = member._id;
                  let isMembersTodaysMealBooked = !!todaysCount.find(
                    ({ email }) => member?.email === email
                  );
                  return (
                    <InviteMemberCard
                      indexNumber={index + 1}
                      memberName={member.fullName}
                      memberEmail={member.email}
                      memberId={memberId}
                      animationDuration={animationDuration}
                      children={children}
                      isCancellationAllowed={true}
                      isDataLoaded={isDataLoaded}
                      isDashboard={false}
                      isEmailChopRequired={true}
                      isActionButtonRequired={true}
                      isStatusCheckRequired={true}
                      isButtonDisableRequired={false}
                      isAlreadyBooked={isMembersTodaysMealBooked}
                      handleAction={() => {
                        const response = handleBookForAnyone({
                          email: member.email,
                          date: date,
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
                      variant="rectangular"
                      animation="wave"
                      key={index}
                      className={classes.skeletonStyles}
                    ></Skeleton>
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

export default BookForAnyone;
