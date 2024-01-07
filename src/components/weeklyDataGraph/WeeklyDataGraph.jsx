import { Box, Typography, CircularProgress } from "@mui/material";
import WeeklyDataGraphUtils from "./WeeklyDataGraph.Utils";
import { WeeklyDataGraphStyles } from "./WeeklyDataGraph.Styles";
import Chart from "react-apexcharts";

const WeeklyDataGraph = () => {
  const { chartData, isDataLoaded } = WeeklyDataGraphUtils();
  const {
    boxOneStyles,
    boxTwoStyles,
    boxThreeStyles,
    typographyOneStyles,
    circularProgressStyles,
    boxFourStyles,
  } = WeeklyDataGraphStyles;

  return (
    <Box sx={boxOneStyles}>
      <Box sx={boxTwoStyles}>
        <Typography sx={typographyOneStyles}>Last 5 days count</Typography>
      </Box>
      <Box sx={boxThreeStyles}>
        {isDataLoaded ? (
          <Chart type="bar" options={chartData} series={chartData?.series} />
        ) : (
          <Box sx={boxFourStyles}>
            <CircularProgress
              size={25}
              thickness={4}
              color="inherit"
              sx={circularProgressStyles}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WeeklyDataGraph;
