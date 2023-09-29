/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
import { Grid } from "@mui/material";
import { getMealBookingStyles } from "./BookMeal.Styles";
import PrebookImage from "../../assets/prebook image.jpg";
import FriendImage from "../../assets/friends image.jpg";
import SoloImage from "../../assets/solo image.jpg";
import BookingCard from "../../components/bookingCard/BookingCard";
import BookForBuddyDialog from "../../components/dialog/bookForBuddy/BookForBuddy";
import PrebookDialog from "../../components/dialog/prebookDialog/PrebookDialog";
import BookMealUtils from "./BookMeal.Utils";

const BookMeal = () => {
  const { classes } = getMealBookingStyles();
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
  } = BookMealUtils();

  return (
    <Grid container className={classes.getGridContStyles}>
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
    </Grid>
  );
};

export default BookMeal;
