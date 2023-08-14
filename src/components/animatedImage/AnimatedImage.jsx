/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import {
  getAnimatedImageStyles,
  getImageAnimation,
} from "./AnimatedImage.Styles";
import { motion } from "framer-motion";

const AnimatedImage = ({ image }) => {
  const { classes } = getAnimatedImageStyles();
  const { initial, whileInView, transition } = getImageAnimation;

  return (
    <motion.div
      className={classes.getAnimatedImageContStyles}
      initial={initial}
      animate={whileInView}
      transition={transition}
    >
      <img src={image} alt="" className={classes.getAnimatedImageStyles} />
    </motion.div>
  );
};

export default AnimatedImage;
