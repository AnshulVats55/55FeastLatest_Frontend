import { makeStyles } from "tss-react/mui";

export const getMealBookingTimerStyles = makeStyles()((theme) => ({
  getTimerContStyles: {
    minWidth: "100%",
    borderRadius: "0px 0px 10px 10px",
  },

  getTimerStyles: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "0.8rem",
    background: "#FFEAE4",
    border: "none",
    borderRadius: "0px 0px 10px 10px",
    padding: "0.1rem 0.70rem",
    color: "#EF5D36",
    fontWeight: 400,
    textAlign: "center",
  },
}));
