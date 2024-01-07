/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { Typography, Skeleton, Grid } from "@mui/material";
import InviteButton from "../inviteButton/InviteButton";
import {
  getInviteMemberCardStyles,
  getInviteButtonCustomStyles,
  getInviteMemberCardAnimation,
} from "./InviteMemberCard.Styles";
import { motion } from "framer-motion";
import InviteMemberCardUtils from "./InviteMemberCard.Utils";

const InviteMemberCard = ({
  indexNumber,
  memberName,
  memberEmail,
  memberId,
  children,
  isCancellationAllowed,
  animationDuration,
  isDataLoaded,
  handleAction,
  isDashboard,
  isEmailChopRequired,
  isActionButtonRequired,
  isStatusCheckRequired,
  isButtonDisableRequired,
  isAlreadyBooked,
}) => {
  const { classes } = getInviteMemberCardStyles();
  const {
    handleMemberName,
    handleMemberEmail,
    actionBeingPerformed,
    isLoaderRequired,
    isMealBooked,
    isTodaysMealBooked,
    handleMealCancellation,
    memberDataToBeSent,
    setIsTodaysMealBooked,
  } = InviteMemberCardUtils(isAlreadyBooked, memberEmail);
  const { customStyles } = getInviteButtonCustomStyles;
  const { initial, whileInView, transition } = getInviteMemberCardAnimation;

  let newMemberEmail = handleMemberEmail(isEmailChopRequired, memberEmail);
  handleMemberName();

  return (
    <>
      {isDataLoaded ? (
        <motion.div
          className={classes.getMemberCardStyles}
          key={indexNumber}
          initial={initial}
          whileInView={whileInView}
          transition={transition(animationDuration)}
        >
          <Grid container className={classes.getGridContStyles}>
            <Grid
              item
              lg={1}
              md={1}
              sm={1}
              xs={0}
              className={classes.getMemberNumberContStyles}
            >
              <Typography className={classes.getMemberNumberStyles}>
                {indexNumber}
              </Typography>
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={4}
              xs={isDashboard ? 5 : 9}
              className={classes.getMemberNameContStyles}
            >
              <Typography className={classes.getMemberNameStyles}>
                {memberName}
              </Typography>
            </Grid>
            <Grid
              item
              lg={5}
              md={5}
              sm={5}
              xs={isActionButtonRequired ? 0 : 7}
              className={classes.getMemberEmailContStyles}
              sx={{
                ...(isActionButtonRequired
                  ? {
                      "@media screen and (max-width: 599px)": {
                        display: "none",
                      },
                    }
                  : {
                      "@media screen and (max-width: 599px)": {
                        display: "flex",
                      },
                      "@media screen and (max-width: 470px)": {
                        wordBreak: "break-all",
                      },
                    }),
              }}
            >
              <Typography className={classes.getMemberEmailStyles}>
                {newMemberEmail}
              </Typography>
            </Grid>
            <Grid
              item
              lg={2}
              md={2}
              sm={2}
              xs={isActionButtonRequired ? 3 : 0}
              className={classes.getInviteButtonContStyles}
            >
              <InviteButton
                children={
                  isStatusCheckRequired
                    ? isAlreadyBooked && isTodaysMealBooked
                      ? isCancellationAllowed
                        ? "Cancel"
                        : "Booked"
                      : isMealBooked
                      ? "Cancel"
                      : children
                    : children
                }
                type=""
                handleAction={() => {
                  return isStatusCheckRequired
                    ? isAlreadyBooked && isTodaysMealBooked
                      ? actionBeingPerformed(() => {
                          handleMealCancellation(memberDataToBeSent);
                        })
                      : isMealBooked
                      ? actionBeingPerformed(() => {
                          handleMealCancellation(memberDataToBeSent);
                        })
                      : actionBeingPerformed(handleAction)
                    : actionBeingPerformed(handleAction);
                }}
                styles={customStyles(
                  isActionButtonRequired,
                  isAlreadyBooked,
                  isMealBooked,
                  isTodaysMealBooked,
                  isButtonDisableRequired
                )}
                isButtonDisableRequired={
                  isAlreadyBooked || isMealBooked
                    ? isButtonDisableRequired
                    : false
                }
                isLoaderRequired={isLoaderRequired}
              />
            </Grid>
          </Grid>
        </motion.div>
      ) : (
        <Skeleton animation="wave">
          <motion.div
            className={classes.getMemberCardStyles}
            key={indexNumber}
            initial={initial}
            whileInView={whileInView}
            transition={transition(animationDuration)}
          >
            <Grid container>
              <Skeleton animation="wave">
                <Grid
                  item
                  lg={1}
                  md={1}
                  sm={1}
                  xs={0}
                  className={classes.getMemberAvatarContStyles}
                >
                  <Skeleton animation="wave">
                    <Typography className={classes.getMemberNumberStyles}>
                      {indexNumber}
                    </Typography>
                  </Skeleton>
                </Grid>
              </Skeleton>

              <Skeleton animation="wave">
                <Grid
                  item
                  lg={4}
                  md={4}
                  sm={4}
                  xs={4}
                  className={classes.getMemberNameContStyles}
                >
                  <Skeleton animation="wave">
                    <Typography className={classes.getMemberNameStyles}>
                      {memberName}
                    </Typography>
                  </Skeleton>
                </Grid>
              </Skeleton>

              <Skeleton animation="wave">
                <Grid
                  item
                  lg={5}
                  md={5}
                  sm={5}
                  xs={5}
                  className={classes.getMemberEmailContStyles}
                >
                  <Skeleton animation="wave">
                    <Typography className={classes.getMemberEmailStyles}>
                      {newMemberEmail}
                    </Typography>
                  </Skeleton>
                </Grid>
              </Skeleton>

              <Skeleton animation="wave">
                <Grid item className={classes.getInviteButtonContStyles}>
                  <Skeleton animation="wave">
                    {!isDashboard ? (
                      <InviteButton
                        children={
                          isStatusCheckRequired
                            ? isAlreadyBooked
                              ? "Cancel"
                              : children
                            : children
                        }
                        type=""
                        styles={customStyles(
                          isActionButtonRequired,
                          isAlreadyBooked
                        )}
                      />
                    ) : null}
                  </Skeleton>
                </Grid>
              </Skeleton>
            </Grid>
          </motion.div>
        </Skeleton>
      )}
    </>
  );
};

export default InviteMemberCard;
