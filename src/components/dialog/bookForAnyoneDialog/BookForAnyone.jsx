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
    setMyBuddies,
    memberData,
    date,
    handleMemberSearch,
    checkMealBookingAvailability,
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

  useEffect(() => {
    const handleAllMembers = async () => {
      const response = await getMyBuddies(myData.email);
      if (response?.data?.status === "success") {
        setMyBuddies(response?.data?.data);
        setIsDataLoaded(true);
      }
    };

    handleAllMembers();
  }, []);

  const filteredUsers = myBuddies?.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm)
  );

  const handleBookForBuddy = async (buddyData) => {
    //handles meal booking for buddies
    const isBookingAllowed = checkMealBookingAvailability();
    if (isBookingAllowed) {
      const response = await bookMealForBuddy(buddyData);
      return response;
    }
  };

  console.log("children at book for anyone dialog", children);

  return (
    <div>
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
            <TextField
              type="search"
              placeholder="Search for any member..."
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
                      indexNumber={index + 1}
                      memberName={member.fullName}
                      memberEmail={member.email}
                      memberId={memberId}
                      animationDuration={animationDuration}
                      children={children}
                      isDataLoaded={isDataLoaded}
                      isDashboard={false}
                      isEmailChopRequired={true}
                      isActionButtonRequired={true}
                      isStatusCheckRequired={true}
                      isButtonDisableRequired={false}
                      handleAction={() => {
                        const response = handleBookForBuddy({
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
              memberData?.map((member, index) => {
                return (
                  <Skeleton
                    animation="wave"
                    sx={{ minWidth: "100% !important" }}
                  >
                    <InviteMemberCard
                      indexNumber={index + 1}
                      memberName={member.memberName}
                      memberEmail={member.memberEmail}
                      animationDuration={animationDuration}
                      children={children}
                      isDataLoaded={isDataLoaded}
                      isDashboard={true}
                      isEmailChopRequired={true}
                      isActionButtonRequired={true}
                      isStatusCheckRequired={true}
                      isButtonDisableRequired={false}
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
    </div>
  );
};

export default BookForAnyone;