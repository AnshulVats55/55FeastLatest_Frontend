/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { getHomePageStyles } from "./Home.Styles";
import { Grid, Typography, Button, Skeleton, Box, Avatar } from "@mui/material";
import InvitationDialog from "../dialog/InvitationDialog";
import MenuSwiper from "../swiper/MenuSwiper";
import LunchImage from "../../assets/lunch image.png";
import HomePageImage from "../../assets/home-image.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  handleMemberBookingStatus,
  getCountsByDate,
} from "../../bookingMethods/BookingMethods";
import { handleFormattedDate, getNextDate } from "../../common/CommonData.js";
import { getReversedDate } from "../../invitationMethods/InvitationMethods";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import snackbarMessages from "../../Constants";
import { HandleLogoutOnSessionExpire } from "../../common/Logout";
import MemberAvatar from "../memberAvatar/MemberAvatar";

const Home = () => {
  const { classes } = getHomePageStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleLogoutOnTokenExpire } = HandleLogoutOnSessionExpire();

  const { isAdmin, email, location } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const currentDate = new Date();

  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);

  const dateToBeChecked =
    new Date().getHours() >= 18 && new Date().getHours() <= 23
      ? nextDateFormatted
      : formattedDate;

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteScroll, setInviteScroll] = useState("paper");
  const [todaysCount, setTodaysCount] = useState([]);
  const [isTodaysCountFetched, setIsTodaysCountFetched] = useState(false);

  const handleMealBooking = () => {
    navigate("/bookyourmeal");
  };

  const handleInvitation = (scrollType) => () => {
    setInviteOpen(true);
    setInviteScroll(scrollType);
  };

  const handleInvitationClose = () => {
    setInviteOpen(false);
  };

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => {
      setIsDataLoaded(true);
    }, 1500);
  }, [isDataLoaded]);

  useEffect(() => {
    const getMemberBookingStatus = async () => {
      const response = await handleMemberBookingStatus(email);
      if (
        response?.response?.data?.message === snackbarMessages.JWT_TOKEN_EXPIRED
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
    };
    getMemberBookingStatus();
  }, []);

  useEffect(() => {
    const handleGetCountsByDate = async () => {
      const response = await getCountsByDate(dateToBeChecked, location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setIsTodaysCountFetched(true);
        setTodaysCount(response?.data?.data);
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        setIsTodaysCountFetched(true);
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
        } else {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: "Error fetching members !",
            })
          );
        }
      }
    };

    handleGetCountsByDate();
  }, []);

  const imageVariants = {
    bounce: {
      y: [-20, 20, -20],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {isDataLoaded ? (
        <Grid container className={classes.getGridContStyles}>
          {currentDate?.getDay() !== 0 && currentDate?.getDay() !== 6 && (
            <Grid
              item
              lg={0}
              md={0}
              sm={0}
              xs={12}
              sx={{
                display: { xs: "flex", sm: "none" },
              }}
              className={classes.getGridItemFourStyles}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  paddingBottom: "0.5rem",
                }}
              >
                <Box className={classes.getTypographyContStyles}>
                  <Typography className={classes.getTypographyOneStyles}>
                    {`Members joining on`}
                  </Typography>
                  <Typography className={classes.getTypographyTwoStyles}>
                    {`${getReversedDate(dateToBeChecked)}`}
                  </Typography>
                </Box>
                {isTodaysCountFetched ? (
                  todaysCount && todaysCount?.length > 0 ? (
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
                      {todaysCount?.length}
                    </Typography>
                  ) : (
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
                      0
                    </Typography>
                  )
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={32}
                    height={32}
                  ></Skeleton>
                )}
              </Box>
              <Box className={classes.getMemberSliderContStyles}>
                {isTodaysCountFetched ? (
                  todaysCount && todaysCount?.length > 0 ? (
                    todaysCount.map(({ fullName }, index) => {
                      return <MemberAvatar memberName={fullName} key={index} />;
                    })
                  ) : (
                    <></>
                  )
                ) : (
                  Array(4)
                    .fill()
                    .map(() => {
                      return (
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={76}
                          height={76}
                        ></Skeleton>
                      );
                    })
                )}
              </Box>
            </Grid>
          )}
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className={classes.getGridItemOneStyles}
          >
            <motion.div className={classes.getHomeTextContStyles}>
              <motion.div
                initial={{ translateY: "50px", opacity: 0 }}
                animate={{ translateY: "0px", opacity: 1 }}
                transition={{
                  duration: 0.7,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Typography className={classes.getHomeTextOneStyles}>
                  Buckle up it's
                </Typography>
              </motion.div>

              <motion.div
                initial={{ translateY: "40px", opacity: 0 }}
                animate={{ translateY: "0px", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Typography className={classes.getHomeTextTwoStyles}>
                  <span style={{ color: "#ef5d36" }}>Food O'Clock! </span>
                </Typography>
              </motion.div>

              <motion.div
                initial={{ translateY: "50px", opacity: 0 }}
                animate={{ translateY: "0px", opacity: 1 }}
                transition={{
                  duration: 0.9,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Typography className={classes.getHomeTextThreeStyles}>
                  Say goodbye to the stress of worrying about meal planning.
                  We've got you covered!
                </Typography>
              </motion.div>

              <motion.div
                initial={{
                  translateY: "50px",
                  opacity: 0,
                }}
                animate={{
                  translateY: "0px",
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                {isAdmin ? (
                  <>
                    <Button
                      onClick={handleMealBooking}
                      className={classes.getBookYourMealButtonStyles}
                    >
                      Book your meal
                    </Button>
                    <Button
                      onClick={handleInvitation("paper")}
                      className={classes.getInviteButtonStyles}
                    >
                      Invite Members
                    </Button>
                    {inviteOpen ? (
                      <InvitationDialog
                        open={inviteOpen}
                        scroll={inviteScroll}
                        handleClose={handleInvitationClose}
                        children="Invite"
                      />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <Button
                    onClick={handleMealBooking}
                    className={classes.getBookYourMealButtonStyles}
                  >
                    Book your meal
                  </Button>
                )}
              </motion.div>
            </motion.div>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className={classes.getGridItemTwoStyles}
          >
            <motion.div
              className={classes.getHomeImageContStyles}
              variants={imageVariants}
              initial="bounce"
              animate="bounce"
            >
              <img
                src={HomePageImage}
                alt=""
                className={classes.getHomeImageStyles}
              />
            </motion.div>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.getGridItemThreeStyles}
          >
            <motion.div className={classes.getSwiperContStyles}>
              <MenuSwiper
                heading="Our Lunch Picks!"
                caption="The Culinary delights for the FiftyFive Tribe to satiate the hunger pangs!"
                swiperType="Lunch"
              />
            </motion.div>
          </Grid>

          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.getGridItemThreeStyles}
          >
            <motion.div className={classes.getSwiperContStyles}>
              <MenuSwiper
                heading="Our Snack Picks!"
                caption="Is your productivity getting hacked? Our list of healthy snacks is your saviour!"
                swiperType="Snacks"
              />
            </motion.div>
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.getGridContStyles}>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className={classes.getGridItemOneStyles}
          >
            <motion.div className={classes.getHomeTextContStyles}>
              <motion.div
                initial={{ translateY: "50px", opacity: 0 }}
                animate={{ translateY: "0px", opacity: 1 }}
                transition={{
                  duration: 0.7,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Skeleton>
                  <Typography className={classes.getHomeTextOneStyles}>
                    Buckle up it's
                  </Typography>
                </Skeleton>
              </motion.div>

              <motion.div
                initial={{ translateY: "40px", opacity: 0 }}
                animate={{ translateY: "0px", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Skeleton>
                  <Typography className={classes.getHomeTextTwoStyles}>
                    <span style={{ color: "#ef5d36" }}>Food O'Clock! </span>
                  </Typography>
                </Skeleton>
              </motion.div>

              <motion.div
                initial={{ translateY: "50px", opacity: 0 }}
                animate={{ translateY: "0px", opacity: 1 }}
                transition={{
                  duration: 0.9,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Skeleton>
                  <Typography className={classes.getHomeTextThreeStyles}>
                    Say goodbye to the stress of worrying about meal planning.
                    We've got you covered!
                  </Typography>
                </Skeleton>
              </motion.div>

              <motion.div
                initial={{ translateY: "50px", opacity: 0 }}
                animate={{ translateY: "0px", opacity: 1 }}
                transition={{
                  duration: 1,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                {isAdmin ? (
                  <>
                    <Skeleton>
                      <Button
                        onClick={handleMealBooking}
                        className={classes.getBookYourMealButtonStyles}
                      >
                        Book your meal
                      </Button>
                    </Skeleton>
                    <Skeleton>
                      <Button
                        onClick={handleInvitation("paper")}
                        className={classes.getInviteButtonStyles}
                      >
                        Invite Members
                      </Button>
                    </Skeleton>
                    {inviteOpen ? (
                      <Skeleton>
                        <InvitationDialog
                          open={inviteOpen}
                          scroll={inviteScroll}
                          handleClose={handleInvitationClose}
                        />
                      </Skeleton>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <Skeleton>
                    <Button
                      onClick={handleMealBooking}
                      className={classes.getBookYourMealButtonStyles}
                    >
                      Book your meal
                    </Button>
                  </Skeleton>
                )}
              </motion.div>
            </motion.div>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className={classes.getGridItemTwoStyles}
          >
            <motion.div
              className={classes.getHomeImageContStyles}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Skeleton animation="wave">
                <img
                  src={LunchImage}
                  alt=""
                  className={classes.getHomeImageStyles}
                />
              </Skeleton>
            </motion.div>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.getGridItemThreeStyles}
          >
            <motion.div className={classes.getSwiperContStyles}>
              <MenuSwiper
                heading="Our Lunch Picks!"
                caption="The Culinary delights for the FiftyFive Tribe to satiate the hunger pangs!"
                swiperType="Lunch"
              />
            </motion.div>
          </Grid>

          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.getGridItemThreeStyles}
          >
            <motion.div className={classes.getSwiperContStyles}>
              <MenuSwiper
                heading="Our Snack Picks!"
                caption="Is your productivity getting hacked? Our list of healthy snacks is your saviour!"
                swiperType="Snacks"
              />
            </motion.div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
