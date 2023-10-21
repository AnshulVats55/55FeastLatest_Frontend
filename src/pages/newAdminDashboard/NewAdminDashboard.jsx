import NewAdminDashboardUtils from "./NewAdminDashboard.Utils";
import { NewAdminDashboardStyles } from "./NewAdminDashboard.Styles";
import { Box, Grid, Typography } from "@mui/material";
import DashboardCardOne from "../../components/card/dashboardCardOne/DashboardCardOne";
import DashboardCardTwo from "../../components/card/dashboardCardTwo/DashboardCardTwo";
import DailyCountCard from "../../components/card/DailyCountCard/DailyCountCard";
import WeeklyDataGraph from "../../components/weeklyDataGraph/WeeklyDataGraph";

const NewAdminDashboard = () => {
  const { bookingDataArray, adminActionsArray, dailyDataArray } =
    NewAdminDashboardUtils();
  const {
    gridItemOneStyles,
    gridItemTwoStyles,
    gridItemThreeStyles,
    gridItemFourStyles,
    gridItemFiveStyles,
    gridItemSixStyles,
    gridItemSevenStyles,
    gridItemEightStyles,
    boxOneStyles,
    boxTwoStyles,
    typographyOneStyles,
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
            />
          </Grid>
        );
      })}
      <Grid container item lg={8} md={6} xs={12} sx={gridItemThreeStyles}>
        {adminActionsArray?.map((adminAction, index) => {
          return (
            <Grid
              item
              lg={4}
              md={6}
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
      <Grid item lg={4} md={6} xs={12} sx={gridItemFiveStyles}>
        To be decided
      </Grid>
      <Grid container item lg={6} md={6} xs={12} sx={gridItemSixStyles}>
        <Box sx={boxTwoStyles}>
          <Typography sx={typographyOneStyles}>
            Member's joining today
          </Typography>
        </Box>
        <Box sx={boxOneStyles}>
          {dailyDataArray?.map((dailyData, index) => {
            return (
              <Grid item xs={12} key={index} sx={gridItemSevenStyles}>
                <DailyCountCard
                  id={index + 1}
                  memberName={dailyData.memberName}
                  memberEmail={dailyData.memberEmail}
                  status={dailyData.status}
                />
              </Grid>
            );
          })}
        </Box>
      </Grid>
      <Grid item lg={6} md={6} xs={12} sx={gridItemEightStyles}>
        <WeeklyDataGraph />
      </Grid>
    </Grid>
  );
};

export default NewAdminDashboard;
