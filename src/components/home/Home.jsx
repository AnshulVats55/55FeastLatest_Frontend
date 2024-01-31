/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { getHomePageStyles } from "./Home.Styles";
import {
  Grid,
  Typography,
  Button,
  Skeleton,
  Box,
  TextField,
} from "@mui/material";
import InvitationDialog from "../dialog/InvitationDialog";
import MenuSwiper from "../swiper/MenuSwiper";
import LunchImage from "../../assets/lunch image.png";
import HomePageImage from "../../assets/home-image.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCountsByDate } from "../../bookingMethods/BookingMethods";
import { handleFormattedDate, getNextDate } from "../../common/CommonData";
import { getReversedDate } from "../../invitationMethods/InvitationMethods";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import snackbarMessages from "../../Constants";
import { HandleLogoutOnSessionExpire } from "../../common/Logout";
import MemberAvatar from "../memberAvatar/MemberAvatar";
import Banner from "../banner/Banner";
import BookMealUtils from "../../pages/bookyourmeal/BookMeal.Utils";

const Home = () => {
  const { classes } = getHomePageStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleLogoutOnTokenExpire } = HandleLogoutOnSessionExpire();
  const { handleMealBooking, isBooked, isLoaderRequired } = BookMealUtils();

  const { isAdmin, location, email } = useSelector((state) => {
    return state.memberDataReducer;
  });

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
  const [isBookingWindowOpen, setIsBookingWindowOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTodaysMealBooked, setIsTodaysMealBooked] = useState(false);

  const handleNavigateMealBooking = () => {
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

  const handleCheckBookingWindow = () => {
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDay();
    const currentHour = currentDateTime.getHours();

    if (currentDay === 0) {
      if (currentHour >= 18 && currentHour <= 23) {
        return true;
      } else {
        return false;
      }
    } else if (currentDay >= 1 && currentDay <= 4) {
      if (currentHour >= 0 && currentHour <= 9) {
        return true;
      } else if (currentHour >= 18 && currentHour <= 23) {
        return true;
      } else {
        return false;
      }
    } else if (currentDay === 5) {
      if (currentHour >= 0 && currentHour <= 9) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    const handleGetCountsByDate = async () => {
      const isWindowOpen = handleCheckBookingWindow();
      console.log("isWindowOpen", isWindowOpen);
      setIsBookingWindowOpen(isWindowOpen);
      if (isWindowOpen) {
        //it should be isWindowOpen
        const response = await getCountsByDate(dateToBeChecked, location);
        if (response?.data?.status === snackbarMessages.SUCCESS) {
          setIsTodaysCountFetched(true);
          setTodaysCount(response?.data?.data);
          response?.data?.data.map((member) => {
            if (member.email === email) {
              setIsTodaysMealBooked(true);
            }
          });
          console.log("res at home page", response);
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
      } else {
        setIsTodaysCountFetched(true);
      }
    };

    handleGetCountsByDate();
  }, [isBooked]);

  const handleMemberSearch = (event) => {
    setSearchTerm(event?.target?.value.toLowerCase());
  };

  const filteredUsers = todaysCount?.filter((member) =>
    member?.fullName.toLowerCase().includes(searchTerm)
  );

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
          {isBookingWindowOpen ? (
            isTodaysCountFetched ? (
              !isTodaysMealBooked && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    padding: "0.5rem 0",
                    "@media screen and (max-width: 900px)": {
                      padding: "0.25rem 0",
                    },
                  }}
                >
                  <Banner
                    bannerText={`Planning to join office ${
                      dateToBeChecked === formattedDate ? "today" : "tomorrow"
                    }? Book your meal now !`}
                    actionToBePerformed={handleMealBooking}
                    isLoading={isLoaderRequired}
                    isActionPerformed={isTodaysMealBooked}
                    buttonChildren="Book Meal"
                  />
                </Grid>
              )
            ) : (
              <Grid
                item
                xs={12}
                sx={{
                  padding: "0.5rem 0",
                  "@media screen and (max-width: 900px)": {
                    padding: "0.25rem 0",
                  },
                }}
              >
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{
                    height: "3rem",
                    maxHeight: "3rem",
                    background: "rgba(0, 0, 0, 0.2)",
                  }}
                ></Skeleton>
              </Grid>
            )
          ) : (
            <></>
          )}
          {isBookingWindowOpen && (
            <Grid
              item
              lg={0}
              md={0}
              sm={0}
              xs={12}
              sx={{
                display: { xs: "flex", flexDirection: "column", sm: "none" },
              }}
              className={classes.getGridItemFourStyles}
            >
              <TextField
                type="search"
                placeholder="Search members..."
                variant="outlined"
                multiline
                className={classes.root}
                InputProps={{ className: classes.input }}
                onChange={handleMemberSearch}
              />
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
                {isAdmin ? (
                  isTodaysCountFetched ? (
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
                  )
                ) : (
                  <></>
                )}
              </Box>
              <Box className={classes.getMemberSliderContStyles}>
                {isTodaysCountFetched ? (
                  filteredUsers && filteredUsers?.length > 0 ? (
                    filteredUsers.map(({ fullName }, index) => {
                      return <MemberAvatar memberName={fullName} key={index} />;
                    })
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          textAlign: "center",
                          "@media screen and (max-width: 400px)": {
                            fontSize: "0.8rem",
                          },
                        }}
                      >
                        Hmm... No match found with this name
                      </Typography>
                    </Box>
                  )
                ) : (
                  Array(4)
                    .fill()
                    .map((data) => {
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
                      onClick={handleNavigateMealBooking}
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
                    {/* <Button
                      onClick={() => {
                        onHandleTag("prebook");
                      }}
                      className={classes.getInviteButtonStyles}
                    >
                      Notify user
                    </Button> */}
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
                    onClick={handleNavigateMealBooking}
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
                        onClick={handleNavigateMealBooking}
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
                      onClick={handleNavigateMealBooking}
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
