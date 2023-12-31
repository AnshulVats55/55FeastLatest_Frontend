/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getProgressBarStyles } from "./ProgressBar.Styles";
import { Box, Skeleton } from "@mui/material";
import ProgressBarUtils, { textStyle } from "./ProgressBar.Utils";

const ProgressBar = ({ totalMembers, todaysCount, isDataLoaded }) => {
  const { classes } = getProgressBarStyles();
  const { progress } = ProgressBarUtils(todaysCount, totalMembers);

  return (
    <Box className={classes.getProgressBarContStyles}>
      {isDataLoaded ? (
        <CircularProgressbar
          value={progress}
          text={`${Math.round(progress)}%`}
          circleRatio={0.75}
          strokeWidth={20}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: "butt",
            textSize: "0.70rem",
            pathTransitionDuration: 0,
            pathTransition: "ease-in-out",
            pathColor:
              Math.round(progress) >= Math.round(0.5 * totalMembers)
                ? "#4caf50"
                : "#ef5d36",
            textColor:
              Math.round(progress) >= Math.round(0.5 * totalMembers)
                ? "#4caf50"
                : "#ef5d36",
            trailColor: "#f5f5f5",
            textStyle,
          })}
          minValue={0}
        />
      ) : (
        <Skeleton animation="wave">
          <CircularProgressbar
            value={progress}
            text={`${Math.round(progress)}%`}
            circleRatio={0.75}
            strokeWidth={20}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              textSize: "0.70rem",
              pathTransitionDuration: 0,
              pathTransition: "ease-in-out",
              pathColor:
                Math.round(progress) >= Math.round(0.5 * totalMembers)
                  ? "#4caf50"
                  : "#ef5d36",
              textColor:
                Math.round(progress) >= Math.round(0.5 * totalMembers)
                  ? "#4caf50"
                  : "#ef5d36",
              trailColor: "#f5f5f5",
              textStyle,
            })}
            minValue={0}
          />
        </Skeleton>
      )}
    </Box>
  );
};

export default ProgressBar;
