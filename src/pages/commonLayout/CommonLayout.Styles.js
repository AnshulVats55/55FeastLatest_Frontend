import { makeStyles } from "tss-react/mui";

export const getCommonLayoutStyles = makeStyles()((theme) => ({
  getContainerStyles: {
    minWidth: "100%",
    position: "absolute",
    top: "10vh",
    left: "0vh",
  },
}));
