/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { Box, Typography } from "@mui/material";
import { getReviewsStyles } from "./Reviews.Styles";
import ReviewsUtils from "./Reviews.Utils";
import "./Reviews.css";

const Reviews = () => {
  const { classes } = getReviewsStyles();
  const {} = ReviewsUtils();

  return (
    <Box className={classes.getTopContStyles}>
      <Box className={classes.getTextOneContStyles}>
        <section>
          <Box className="content">
            <Typography className="textStyles">Coming</Typography>
            <Typography className="textStyles">Coming</Typography>
          </Box>
        </section>
      </Box>
      <Box className={classes.getTextTwoContStyles}>
        <section>
          <Box className="content">
            <Typography className="textStyles">Soon</Typography>
            <Typography className="textStyles">Soon</Typography>
          </Box>
        </section>
      </Box>
    </Box>
  );
};

export default Reviews;
