/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import {
  Box,
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
import { getInvitationDialogStyles } from "./InvitationDialog.Styles";
import InviteMemberCard from "../card/InviteMemberCard";
import { getNonInvitedMembers } from "../../api/invitationMethods/InvitationMethods";
import { useDispatch, useSelector } from "react-redux";
import { handleInviteMembers } from "../../invitationMethods/InvitationMethods";
import { setTotalMembers } from "../../store/slices/TotalMembersSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { HandleLogoutOnSessionExpire } from "../../common/Logout";
import snackbarMessages from "../../Constants";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import { handleSort } from "../../common/CommonData";

const InvitationDialog = ({ open, scroll, handleClose, children }) => {
  const adminData = useSelector((state) => {
    return state.memberDataReducer;
  });

  const { classes } = getInvitationDialogStyles();
  const dispatch = useDispatch();
  const { handleLogoutOnTokenExpire } = HandleLogoutOnSessionExpire();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notInvited, setNotInvited] = useState([]);
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
    const handleGetNonInvitedMembers = async () => {
      const response = await getNonInvitedMembers(
        adminData.email,
        adminData.location
      );
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setNotInvited(handleSort(response?.data?.data));
        setIsDataLoaded(true);
        dispatch(setTotalMembers(response.data.data.length));
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        if (
          response?.response?.data?.message ===
          snackbarMessages.JWT_TOKEN_EXPIRED
        ) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: snackbarMessages.SESSION_EXPIRED,
            })
          );
          setTimeout(() => {
            handleLogoutOnTokenExpire();
          }, 1500);
        }
      }
    };

    handleGetNonInvitedMembers();
  }, []);

  const handleMemberSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = notInvited?.filter((member) =>
    member?.fullName?.toLowerCase().includes(searchTerm)
  );

  const handleInviteNewMember = async (memberEmail) => {
    const response = await handleInviteMembers(memberEmail);
    return response;
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
          Invite Members
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
                "@media screen and (max-width: 532px)": {
                  fontSize: "0.9rem",
                },
              }}
            >
              Invite new members and help them automate their Lunch Count
              process
            </Typography>
            <TextField
              type="search"
              placeholder="Search members to invite"
              variant="outlined"
              multiline
              className={classes.root}
              onChange={handleMemberSearch}
            />
            {isDataLoaded ? (
              filteredUsers?.length > 0 ? (
                filteredUsers?.map((member, index) => {
                  return (
                    <InviteMemberCard
                      indexNumber={index + 1}
                      memberName={member.fullName}
                      memberEmail={member.email}
                      animationDuration={animationDuration}
                      children={children}
                      isDataLoaded={isDataLoaded}
                      isDashboard={false}
                      isEmailChopRequired={true}
                      isActionButtonRequired={true}
                      isStatusCheckRequired={false}
                      handleAction={() => {
                        const response = handleInviteNewMember(member.email);
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
                  No member found with this name...
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

export default InvitationDialog;
