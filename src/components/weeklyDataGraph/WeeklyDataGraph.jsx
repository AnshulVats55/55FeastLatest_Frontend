import { Box, Typography } from "@mui/material";
import WeeklyDataGraphUtils from "./WeeklyDataGraph.Utils";
import { WeeklyDataGraphStyles } from "./WeeklyDataGraph.Styles";
import Chart from "react-apexcharts";

const WeeklyDataGraph = () => {
  const { chartData } = WeeklyDataGraphUtils();
  const { boxOneStyles, boxTwoStyles, boxThreeStyles, typographyOneStyles } =
    WeeklyDataGraphStyles;

  return (
    <Box sx={boxOneStyles}>
      <Box sx={boxTwoStyles}>
        <Typography sx={typographyOneStyles}>Last 5 days count</Typography>
      </Box>
      <Box sx={boxThreeStyles}>
        <Chart type="bar" options={chartData} series={chartData?.series} />
      </Box>
    </Box>
  );
};

export default WeeklyDataGraph;
