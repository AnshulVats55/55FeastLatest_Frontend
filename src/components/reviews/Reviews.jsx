/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { Box } from "@mui/material";
import { getReviewsStyles } from "./Reviews.Styles";
import ReviewsUtils from "./Reviews.Utils";
import ComingSoonImage from "../../assets/reviews image.jpg";
import { motion } from "framer-motion";

const Reviews = () => {
  const { classes } = getReviewsStyles();
  const { imageVariants } = ReviewsUtils();

  return (
    <Box className={classes.getTopContStyles}>
      <motion.div
        variants={imageVariants}
        initial="bounce"
        animate="bounce"
        className={classes.getImageContStyles}
      >
        <img
          src={ComingSoonImage}
          alt="reviews"
          className={classes.getImageStyles}
        />
      </motion.div>
    </Box>
  );
};

export default Reviews;
