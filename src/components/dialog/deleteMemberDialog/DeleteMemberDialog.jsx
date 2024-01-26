/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
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
import InviteMemberCard from "../../card/InviteMemberCard";
import { DeleteMemberDialogStyles } from "./DeleteMemberDialog.Styles";
import DeleteMemberDialogUtils from "./DeleteMemberDialog.Utils";
import CancelIcon from "@mui/icons-material/Cancel";

const DeleteMemberDialog = ({
  open,
  scroll,
  handleClose,
  children,
  placeholder,
}) => {
  const {
    getDialogTitleStyles,
    getDialogContentStyles,
    getDialogContentTextStyles,
    root,
    getCloseButtonStyles,
    skeletonStyles,
    cancelIconStyles,
  } = DeleteMemberDialogStyles;
  const {
    isDataLoaded,
    animationDuration,
    descriptionElementRef,
    filteredUsers,
    handleMemberSearch,
    handleDeleteExistingMember,
  } = DeleteMemberDialogUtils(open);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Box>
          <CancelIcon style={cancelIconStyles} onClick={handleClose} />
        </Box>
        <DialogTitle id="scroll-dialog-title" sx={getDialogTitleStyles}>
          Delete Members
        </DialogTitle>
        <DialogContent
          dividers={scroll === "paper"}
          sx={getDialogContentStyles}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
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
              Deleting an existing member is an easy-peasy task you can do now
              with a click!
            </Typography>
            <TextField
              type="search"
              placeholder={placeholder}
              variant="outlined"
              multiline
              sx={root}
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
                      handleAction={async () => {
                        const response = await handleDeleteExistingMember(
                          member.email
                        );
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
                  No member found...
                </Typography>
              )
            ) : (
              Array(6)
                .fill()
                .map((data, index) => {
                  return (
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      key={index}
                      sx={skeletonStyles}
                    ></Skeleton>
                  );
                })
            )}
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} sx={getCloseButtonStyles}>
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default DeleteMemberDialog;
