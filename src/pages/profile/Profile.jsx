import UserProfileUtils from "./Profile.Utils";
import { getUserProfileStyles } from "./Profile.Styles";
import { Box, Grid, Typography, Avatar, Chip } from "@mui/material";
import { History, ModeEdit } from "@mui/icons-material";
import MaleAvatar from "../../assets/male avatar.jpg";
import FemaleAvatar from "../../assets/female avatar.jpg";
import BookingHistoryTable from "../../components/bookingHistoryTable/BookingHistoryTable";
import CommonButton from "../../components/button/CommonButton";
import DashboardCardOne from "../../components/card/dashboardCardOne/DashboardCardOne";
import { motion } from "framer-motion";

const UserProfile = () => {
  const {
    photo,
    gender,
    memberName,
    memberBookingData,
    optionSelected,
    handleSwitchOption,
    isDataLoaded,
    handleNavigation,
    profileCardsDataArray,
  } = UserProfileUtils();

  const {
    gridContStyles,
    gridItemOneStyles,
    gridItemTwoStyles,
    gridItemThreeStyles,
    boxOneStyles,
    memberAvatarStyles,
    memberNameStyles,
    boxTwoStyles,
    boxThreeStyles,
    boxFourStyles,
    chipOneStyles,
    iconOneStyles,
    chipTwoStyles,
    iconTwoStyles,
    chipTypographyStyles,
    bookYourMealButtonStyles,
    tableColumnTypographyStyles,
    headerGridItemStyles,
  } = getUserProfileStyles;

  return (
    <Grid container sx={gridContStyles}>
      <Grid item xs={12} sx={gridItemOneStyles}>
        <Box sx={boxOneStyles}>
          <Avatar
            src={
              photo && photo.length > 0
                ? photo
                : gender === "Male"
                ? MaleAvatar
                : FemaleAvatar
            }
            sx={memberAvatarStyles}
          ></Avatar>
        </Box>
      </Grid>
      <Grid item xs={12} sx={gridItemTwoStyles}>
        <Box sx={boxTwoStyles}>
          <Typography sx={memberNameStyles}>{memberName}</Typography>
        </Box>
      </Grid>
      {profileCardsDataArray?.map((profileCardsData, index) => {
        return (
          <Grid
            key={index}
            item
            lg={3}
            md={6}
            sm={6}
            xs={12}
            sx={{ padding: "1rem 0.75rem 0rem" }}
          >
            <DashboardCardOne
              index={index}
              icon={profileCardsData.icon}
              cardLabel={profileCardsData.cardLabel}
              cardValue={profileCardsData.cardValue}
            />
          </Grid>
        );
      })}

      <Grid item xs={12} sx={gridItemThreeStyles}>
        <Box sx={boxThreeStyles}>
          <Box sx={boxFourStyles}>
            <Chip
              icon={
                <History sx={iconOneStyles(optionSelected)} color="inherit" />
              }
              label={<Typography sx={chipTypographyStyles}>History</Typography>}
              variant="outlined"
              clickable
              onClick={() => {
                handleSwitchOption("history");
              }}
              sx={chipOneStyles(optionSelected)}
            />
            <Chip
              icon={
                <ModeEdit sx={iconTwoStyles(optionSelected)} color="inherit" />
              }
              label={<Typography sx={chipTypographyStyles}>Reviews</Typography>}
              variant="outlined"
              clickable
              onClick={() => {
                handleSwitchOption("reviews");
              }}
              sx={chipTwoStyles(optionSelected)}
            />
          </Box>
          <Box sx={boxFourStyles}>
            <CommonButton
              children="Book meal"
              isLoaderRequired={false}
              type=""
              onClick={handleNavigation}
              customStyles={bookYourMealButtonStyles}
            />
          </Box>
        </Box>
      </Grid>
      {optionSelected === "history" && (
        <Grid container item xs={12} sx={{ marginTop: "0.5rem" }}>
          <Grid item lg={1} md={1} sm={1} xs={2.5}>
            <Typography sx={tableColumnTypographyStyles}>Profile</Typography>
          </Grid>
          <Grid item lg={2} md={2} sm={2} xs={3.5}>
            <Typography sx={tableColumnTypographyStyles}>Date</Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={4}>
            <Typography sx={tableColumnTypographyStyles}>Booked by</Typography>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={0} sx={headerGridItemStyles}>
            <Typography sx={tableColumnTypographyStyles}>Email</Typography>
          </Grid>
          <Grid item lg={2} md={2} sm={2} xs={2}>
            <Typography sx={tableColumnTypographyStyles}>Status</Typography>
          </Grid>
        </Grid>
      )}
      {optionSelected === "history" ? (
        <>
          <BookingHistoryTable
            isDataLoaded={isDataLoaded}
            memberBookingData={memberBookingData}
          />
        </>
      ) : (
        <Box>
          <Typography>Your Reviews</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default UserProfile;
