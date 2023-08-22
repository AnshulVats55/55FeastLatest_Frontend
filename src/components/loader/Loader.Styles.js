import { makeStyles } from "tss-react/mui";

export const getCircularProgressStyles = makeStyles()((theme) => ({
  getLoaderContStyles: {
    backgroundColor: "rgb(0, 0, 0) !important",
    color: "#ef5d36 !important",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "1",
    opacity: "0.9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const getLoaderAnimations = {
  initial: {
    scale: 0.85,
    rotate: 0,
  },
  animate: {
    scale: [0.85, 1, 0.85],
    rotate: [0, 360],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
