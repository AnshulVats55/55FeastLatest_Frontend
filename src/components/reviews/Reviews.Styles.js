import { makeStyles } from "tss-react/mui";

export const getReviewsStyles = makeStyles()((theme) => ({
  getTopContStyles: {
    display: "flex",
    justifyContent: "center",
  },

  getImageContStyles: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    "@media screen and (max-width: 899px)": {
      width: "90% !important",
    },
    "@media screen and (max-width: 630px)": {
      width: "85% !important",
    },
  },

  getImageStyles: {
    "@media screen and (max-width: 630px)": {
      width: "100%",
    },
  },
}));
