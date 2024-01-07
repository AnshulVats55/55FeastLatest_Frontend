import NewAdminDashboardUtils from "./NewAdminDashboard.Utils";
import { NewAdminDashboardStyles } from "./NewAdminDashboard.Styles";
import { Box, Grid, Typography, Skeleton, TextField } from "@mui/material";
import DashboardCardOne from "../../components/card/dashboardCardOne/DashboardCardOne";
import DashboardCardTwo from "../../components/card/dashboardCardTwo/DashboardCardTwo";
import DailyCountCard from "../../components/card/DailyCountCard/DailyCountCard";
import WeeklyDataGraph from "../../components/weeklyDataGraph/WeeklyDataGraph";
import NoResultMatchesImage from "../../assets/no-result-matches.png";
import NoBookingsImage from "../../assets/no-booking.png";
import { motion } from "framer-motion";

const NewAdminDashboard = () => {
  const {
    todaysCount,
    bookingDataArray,
    adminActionsArray,
    isDataLoaded,
    handleMemberSearch,
    filteredUsers,
    dateToBeChecked,
    imageVariants,
    handleReversedDate,
    regularizationRequests,
  } = NewAdminDashboardUtils();
  const {
    gridItemOneStyles,
    gridItemThreeStyles,
    gridItemFourStyles,
    gridItemSixStyles,
    gridItemSevenStyles,
    gridItemEightStyles,
    boxOneStyles,
    typographyOneStyles,
    skeletonStyles,
    root,
    boxTwoStyles,
    typographyTwoStyles,
    imageContOneStyles,
    imageOneStyles,
  } = NewAdminDashboardStyles;

  return (
    <Grid container sx={{ background: "" }}>
      {bookingDataArray?.map((bookingData, index) => {
        return (
          <Grid
            key={index}
            item
            lg={3}
            md={6}
            sm={6}
            xs={12}
            sx={gridItemOneStyles}
          >
            <DashboardCardOne
              index={index}
              icon={bookingData.icon}
              cardLabel={bookingData.cardLabel}
              cardValue={bookingData.cardValue}
              regularizationData={index === 2 && regularizationRequests}
            />
          </Grid>
        );
      })}
      <Grid container item xs={12} sx={gridItemThreeStyles}>
        {adminActionsArray?.map((adminAction, index) => {
          return (
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
              key={index}
              sx={gridItemFourStyles}
            >
              <DashboardCardTwo
                index={index}
                icon={adminAction.icon}
                cardLabel={adminAction.cardLabel}
                buttonChildren={adminAction.buttonChildren}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container item lg={6} md={6} xs={12} sx={gridItemSixStyles}>
        <Box>
          <Typography sx={typographyOneStyles}>
            Member's joining today
          </Typography>
        </Box>
        <TextField
          type="search"
          placeholder="Search members for today's count..."
          variant="outlined"
          multiline
          sx={root}
          onChange={handleMemberSearch}
        />
        <Box sx={boxOneStyles}>
          {isDataLoaded ? (
            todaysCount && todaysCount.length > 0 ? (
              filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers?.map((dailyData, index) => {
                  return (
                    <Grid item xs={12} key={index} sx={gridItemSevenStyles}>
                      <DailyCountCard
                        id={index + 1}
                        memberName={dailyData.fullName}
                        memberEmail={dailyData.email}
                        type="status"
                      />
                    </Grid>
                  );
                })
              ) : (
                <Box sx={boxTwoStyles}>
                  <Typography sx={typographyTwoStyles}>
                    No results match with what you searched for
                  </Typography>
                  <motion.div
                    style={imageContOneStyles}
                    variants={imageVariants}
                    initial="bounce"
                    animate="bounce"
                  >
                    <img
                      src={NoResultMatchesImage}
                      alt="no_booking"
                      style={imageOneStyles}
                    />
                  </motion.div>
                </Box>
              )
            ) : (
              <Box sx={boxTwoStyles}>
                <Typography
                  sx={typographyTwoStyles}
                >{`No member has booked a meal for ${handleReversedDate(
                  dateToBeChecked
                )}`}</Typography>
                <motion.div
                  style={imageContOneStyles}
                  variants={imageVariants}
                  initial="bounce"
                  animate="bounce"
                >
                  <img
                    src={NoBookingsImage}
                    alt="no_booking"
                    style={imageOneStyles}
                  />
                </motion.div>
              </Box>
            )
          ) : (
            Array(6)
              .fill()
              .map((data, index) => {
                return (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    key={index}
                    sx={skeletonStyles}
                  ></Skeleton>
                );
              })
          )}
        </Box>
      </Grid>
      <Grid item lg={6} md={6} xs={12} sx={gridItemEightStyles}>
        <WeeklyDataGraph />
      </Grid>
    </Grid>
  );
};

export default NewAdminDashboard;
