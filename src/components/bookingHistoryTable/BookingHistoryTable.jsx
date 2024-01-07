import { BookingHistoryTableStyles } from "./BookingHistoryTable.Styles";
import { Box, Grid, Typography, Avatar, Skeleton } from "@mui/material";

const BookingHistoryTable = ({ isDataLoaded, memberBookingData }) => {
  const {
    topContStyles,
    gridContStyles,
    gridItemOneStyles,
    avatarStyles,
    gridItemTwoStyles,
    gridItemThreeStyles,
    gridItemFourStyles,
    gridItemFiveStyles,
    typographyStyles,
    statusTextStyles,
    skeletonStyles,
  } = BookingHistoryTableStyles;

  return (
    <Box sx={topContStyles}>
      {isDataLoaded ? (
        memberBookingData && memberBookingData.length > 0 ? (
          memberBookingData.map((memberData, index) => {
            return (
              <Grid container item xs={12} sx={gridContStyles} key={index}>
                <Grid item lg={1} md={1} sm={1} xs={2.5} sx={gridItemOneStyles}>
                  <Avatar sx={avatarStyles}>
                    {memberData?.bookedBy.substring(0, 1)}
                  </Avatar>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={3.5} sx={gridItemTwoStyles}>
                  <Typography sx={typographyStyles}>
                    {memberData?.date?.split("-").reverse().join("-")}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={4} sx={gridItemThreeStyles}>
                  <Typography sx={typographyStyles}>
                    {memberData?.bookedBy}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={0} sx={gridItemFourStyles}>
                  <Typography sx={typographyStyles}>
                    {memberData?.bookedByEmail}
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={2} xs={2} sx={gridItemFiveStyles}>
                  <Typography sx={statusTextStyles}>Booked</Typography>
                </Grid>
              </Grid>
            );
          })
        ) : (
          <Box>No booking history found</Box>
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
  );
};

export default BookingHistoryTable;
