import { Box } from "@mui/material";
import { getReviewsStyles } from "./Reviews.Styles";
import ReviewsUtils from "./Reviews.Utils";
import ComingSoonImage from "../../assets/reviews image.jpg";
import { motion } from "framer-motion";

const Reviews = () => {
  const { classes } = getReviewsStyles();
  const { imageVariants } = ReviewsUtils();

  return (
    <motion.div variants={imageVariants} initial="bounce" animate="bounce">
      <Box className={classes.getImageContStyles}>
        <img src={ComingSoonImage} alt="reviews" />
      </Box>
    </motion.div>
  );
};

export default Reviews;
