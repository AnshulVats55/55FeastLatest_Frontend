/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
import { Grid, Typography, Box, Skeleton } from "@mui/material";
import { getMealBookingStyles, getAdditionalStyles } from "./BookMeal.Styles";
import PrebookImage from "../../assets/prebook image.jpg";
import FriendImage from "../../assets/friends image.jpg";
import SoloImage from "../../assets/solo image.jpg";
import BookingCard from "../../components/bookingCard/BookingCard";
import BookForBuddyDialog from "../../components/dialog/bookForBuddy/BookForBuddy";
import PrebookDialog from "../../components/dialog/prebookDialog/PrebookDialog";
import BookMealUtils from "./BookMeal.Utils";
import CommonButton from "../../components/button/CommonButton";

const BookMeal = () => {
  const { classes } = getMealBookingStyles();
  const { customStyles } = getAdditionalStyles;
  const {
    bookForBuddyOpen,
    prebookOpen,
    bookForBuddyScroll,
    prebookScroll,
    isBooked,
    isLoaderRequired,
    handleBookForBuddyOpen,
    handleBookForBuddyClose,
    handlePrebookOpen,
    handlePrebookClose,
    handleMealBooking,
    handleMealCancellation,
    isStatusFetched,
    prebookTooltip,
    bookForBuddyTooltip,
    mealBookingTooltip,
    handleNotifyAdmin,
    isAdminAlreadyNotified,
    isNotificationAllowed,
    isOverlayRequired,
  } = BookMealUtils();

  return (
    <Grid container className={classes.getGridContStyles}>
      {isNotificationAllowed ? (
        isAdminAlreadyNotified ? (
          <></>
        ) : isStatusFetched ? (
          !isBooked && (
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#F2FAFF",
                  border: "1px solid #009BFF",
                  borderRadius: "4px",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "57%",
                    display: "flex",
                    flexWrap: "wrap",
                    padding: "0.75rem 0.25rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#009BFF",
                      fontWeight: 500,
                      "@media screen and (max-width: 400px)": {
                        fontSize: "0.8rem",
                      },
                    }}
                  >
                    Missed to book meal for today? Notify admin now !
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    maxWidth: "43%",
                    padding: "0 0.25rem",
                  }}
                >
                  <CommonButton
                    onClick={handleNotifyAdmin}
                    customStyles={customStyles(isBooked)}
                    isLoaderRequired={isOverlayRequired}
                  >
                    Notify Admin
                  </CommonButton>
                </Box>
              </Box>
            </Grid>
          )
        ) : (
          <Grid
            item
            xs={12}
            sx={{
              padding: "0.5rem 0",
              "@media screen and (max-width: 900px)": { padding: "0.25rem 0" },
            }}
          >
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{
                height: "3rem",
                maxHeight: "3rem",
              }}
            ></Skeleton>
          </Grid>
        )
      ) : (
        <></>
      )}

      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        className={classes.getGridItemStyles}
      >
        <BookingCard
          image={PrebookImage}
          heading="Have Frictionless Meals"
          caption="Pre-book your meal for a week and relax!"
          actionName="Pre-Book your meal"
          animationDuration={0.5}
          onClick={handlePrebookOpen("paper")}
          label="Most awaited"
          isLoaderRequired={false}
          isStatusFetchingRequired={true}
          isStatusFetched={isStatusFetched}
          isCountdownRequired={false}
          tooltipTitle={prebookTooltip}
        />
        {prebookOpen ? (
          <PrebookDialog
            open={prebookOpen}
            scroll={prebookScroll}
            handleClose={handlePrebookClose}
          />
        ) : (
          <></>
        )}
      </Grid>

      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        className={classes.getGridItemStyles}
      >
        <BookingCard
          image={FriendImage}
          heading="Spirit of Companionship"
          caption="Help your companions by booking their meal!"
          actionName="Book for buddy"
          animationDuration={0.6}
          onClick={handleBookForBuddyOpen("paper")}
          label="Try it out"
          isLoaderRequired={false}
          isStatusFetchingRequired={false}
          isCountdownRequired={true}
          tooltipTitle={bookForBuddyTooltip}
        />
        {bookForBuddyOpen ? (
          <BookForBuddyDialog
            open={bookForBuddyOpen}
            scroll={bookForBuddyScroll}
            handleClose={handleBookForBuddyClose}
            children="Book"
          />
        ) : (
          <></>
        )}
      </Grid>

      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        className={classes.getGridItemStyles}
      >
        <BookingCard
          image={SoloImage}
          heading="Let’s Simplify Hunger"
          caption="Reserve your lunch spot now without a fuss!"
          actionName={isBooked ? "Cancel booking" : "Rapid booking"}
          animationDuration={0.7}
          onClick={isBooked ? handleMealCancellation : handleMealBooking}
          isBooked={isBooked}
          label="Most used"
          isLoaderRequired={isLoaderRequired}
          isStatusFetchingRequired={true}
          isStatusFetched={isStatusFetched}
          isCountdownRequired={true}
          tooltipTitle={mealBookingTooltip}
        />
      </Grid>
      {/* {isOverlayRequired && <Loader />} */}
    </Grid>
  );
};

export default BookMeal;
