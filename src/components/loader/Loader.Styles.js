import { makeStyles } from "tss-react/mui";

export const getCircularProgressStyles = makeStyles()((theme) => ({
  getLoaderContStyles: {
    background: "#000 !important",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "1",
    opacity: "0.8",
  },

  getLinearProgressStyles: {
    color: "#EF5D36",
  },
}));
