import { makeStyles } from "tss-react/mui";

export const getProgressBarStyles = makeStyles()((theme) => ({
  getProgressBarContStyles: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1.5rem",
    "@media  screen and (max-width: 599px)": {
      width: "30%",
    },
    "@media  screen and (max-width: 400px)": {
      width: "45%",
    },
  },

  getCircularProgressStyles: {
    color: "#ef5d36",
  },
}));
