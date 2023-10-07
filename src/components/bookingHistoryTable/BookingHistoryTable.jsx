import BookingHistoryTableUtils from "./BookingHistoryTable.Utils";
import { BookingHistoryTableStyles } from "./BookingHistoryTable.Styles";
import {
  Box,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Skeleton,
  CircularProgress,
  Badge,
} from "@mui/material";

const BookingHistoryTable = ({ isDataLoaded, memberBookingData }) => {
  const { memberDummyData } = BookingHistoryTableUtils();
  const {
    gridContStyles,
    gridItemOneStyles,
    avatarStyles,
    gridItemTwoStyles,
    gridItemThreeStyles,
    gridItemFourStyles,
    gridItemFiveStyles,
    typographyStyles,
    statusTextStyles,
  } = BookingHistoryTableStyles;

  return (
    <>
      {isDataLoaded ? (
        memberBookingData && memberBookingData.length > 0 ? (
          memberBookingData.map((memberData, index) => {
            return (
              <Grid container item xs={12} sx={gridContStyles} key={index}>
                <Grid item lg={1} md={1} sm={0} xs={0} sx={gridItemOneStyles}>
                  <Avatar sx={avatarStyles}>
                    {memberData?.bookedBy.substring(0, 1)}
                  </Avatar>
                </Grid>
                <Grid item lg={2} md={2} sm={4} xs={4} sx={gridItemTwoStyles}>
                  <Typography sx={typographyStyles}>
                    {memberData?.date?.split("-").reverse().join("-")}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={0} sx={gridItemThreeStyles}>
                  <Typography sx={typographyStyles}>
                    {memberData?.bookedBy}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={5} xs={8} sx={gridItemFourStyles}>
                  <Typography sx={typographyStyles}>
                    {memberData?.bookedByEmail}
                  </Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={0} xs={0} sx={gridItemFiveStyles}>
                  <Typography sx={statusTextStyles}>Availed</Typography>
                </Grid>
              </Grid>
            );
          })
        ) : (
          <Box>No booking history found</Box>
        )
      ) : (
        <>
          {memberDummyData.map((dummyData, index) => {
            return (
              <Skeleton animation="wave" width="100%" height="3rem" key={index}>
                <Grid container item xs={12} sx={{ background: "pink" }}>
                  <Grid item lg={1} md={1} sm={0} xs={0}>
                    <Avatar>{dummyData?.bookedBy.substring(0, 1)}</Avatar>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xs={4}>
                    <Typography>
                      {dummyData?.date?.split("-").reverse().join("-")}
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={0} xs={0}>
                    <Typography>{dummyData?.bookedBy}</Typography>
                  </Grid>
                  <Grid item lg={4} md={4} sm={8} xs={8}>
                    <Typography>{dummyData?.bookedByEmail}</Typography>
                  </Grid>
                  <Grid item lg={2} md={2} sm={0} xs={0}>
                    <Typography>
                      {dummyData?.date?.split("-").reverse().join("-")}
                    </Typography>
                  </Grid>
                </Grid>
              </Skeleton>
            );
          })}
        </>
      )}
    </>
  );
};

export default BookingHistoryTable;
