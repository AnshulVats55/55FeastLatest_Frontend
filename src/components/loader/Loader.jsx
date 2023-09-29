/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { Stack } from "@mui/material";
import {
  getCircularProgressStyles,
  getLoaderAnimations,
} from "./Loader.Styles";
import { motion } from "framer-motion";
// import BrandLogo from "../../assets/55FeastLogo.png";
import BrandLogo from "../../../src/assets/55FeastLogoNew.png";

const Loader = () => {
  const { classes } = getCircularProgressStyles();
  const { initial, animate } = getLoaderAnimations;

  return (
    <Stack className={classes.getLoaderContStyles} sx={{ color: "#ef5d36" }}>
      <motion.div
        initial={initial}
        animate={animate}
        style={{
          width: "100px",
          height: "100px",
          border: "none",
          "@media screen and (maxWidth: 400px)": {
            width: "75px",
            height: "75px",
          },
        }}
      >
        <img
          src={BrandLogo}
          alt=""
          width="100%"
          style={{ borderRadius: "50px", zIndex: 1000 }}
        />
      </motion.div>
    </Stack>
  );
};

export default Loader;
