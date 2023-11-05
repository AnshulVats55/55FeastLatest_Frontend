import { makeStyles } from "tss-react/mui";

export const getReviewsStyles = makeStyles()((theme) => ({
  getTopContStyles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  getTextOneContStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "30vh 0rem 5rem 0rem",
    "@media screen and (max-width: 599px)": {
      margin: "35vh 0rem 5rem 0rem",
    },
    "@media screen and (max-width: 400px)": {
      margin: "40vh 0rem 5rem 0rem",
    },
  },

  getTextTwoContStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "3rem 0rem",
    "@media screen and (max-width: 400px)": {
      margin: "0rem",
    },
  },

  getImageStyles: {
    "@media screen and (max-width: 630px)": {
      width: "100%",
    },
  },
}));
