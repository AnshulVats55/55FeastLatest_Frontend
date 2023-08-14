/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import BookForAnyoneCardUtils from "./BookForAnyoneCard.Utils";
import {
  getBookForAnyoneCardStyles,
  getInviteButtonCustomStyles,
  getBookForAnyoneCardAnimation,
} from "./BookForAnyoneCard.Styles";
import { Typography, Skeleton, Grid } from "@mui/material";
import InviteButton from "../../inviteButton/InviteButton";
import { motion } from "framer-motion";

const BookForAnyoneCard = ({
  indexNumber,
  memberName,
  memberEmail,
  children,
  animationDuration,
  isDataLoaded,
  handleAction,
  isDashboard,
  isEmailChopRequired,
  isActionButtonRequired,
  isStatusCheckRequired,
}) => {
  const { classes } = getBookForAnyoneCardStyles();
  const {
    formattedDate,
    allDatesBooked,
    isAlreadyBooked,
    setIsAlreadyBooked,
    handleMemberName,
    handleMemberEmail,
    actionBeingPerformed,
    getBookingStatusOfMember,
  } = BookForAnyoneCardUtils();
  const { customStyles } = getInviteButtonCustomStyles;
  const { initial, whileInView, transition } = getBookForAnyoneCardAnimation;

  let newMemberEmail = "";
  {
    newMemberEmail = handleMemberEmail(isEmailChopRequired, memberEmail);
  }
  handleMemberName();

  useEffect(() => {
    if (isStatusCheckRequired) {
      getBookingStatusOfMember(memberEmail);
    }
  }, []);

  useEffect(() => {
    if (allDatesBooked?.indexOf(formattedDate) > -1) {
      setIsAlreadyBooked(true);
    }
  }, []);

  console.log("Children from dialog windows", children);

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
              xs={isDashboard ? 0 : 7}
              className={classes.getMemberEmailContStyles}
              sx={{
                ...(isDashboard
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
              xs={isDashboard ? 3 : 0}
              className={classes.getInviteButtonContStyles}
            >
              <InviteButton
                children={children}
                type=""
                handleAction={() => {
                  return actionBeingPerformed(handleAction);
                }}
                styles={customStyles(isDashboard)}
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
                    {isDashboard ? (
                      <InviteButton
                        children={children}
                        type=""
                        handleAction={() => {
                          return actionBeingPerformed(handleAction);
                        }}
                        styles={customStyles(isDashboard)}
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

export default BookForAnyoneCard;
