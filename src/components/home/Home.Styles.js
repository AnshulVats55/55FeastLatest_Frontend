import { makeStyles } from "tss-react/mui";

export const getHomePageStyles = makeStyles()((theme) => ({
  getGridContStyles: {
    width: "100%",
    display: "flex",
  },

  getGridItemOneStyles: {
    padding: "6rem 0rem 12rem 0rem",
    "@media screen and (max-width: 900px)": {
      display: "flex",
      justifyContent: "center",
      padding: "2rem 0rem",
    },
  },

  getHomeTextContStyles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "4rem 0rem 2rem 5rem",
    "@media screen and (max-width:900px)": {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: "4rem 0rem 2rem",
    },
  },

  getHomeTextOneStyles: {
    fontSize: "4rem",
    fontFamily: theme.typography.fontFamily,
    "@media screen and (max-width: 1287px)": {
      fontSize: "3.75rem",
    },
    "@media screen and (max-width: 1180px)": {
      fontSize: "3.25rem",
    },
    "@media screen and (max-width: 1072px)": {
      fontSize: "3rem",
    },
    "@media screen and (max-width: 964px)": {
      fontSize: "2.75rem",
    },
    "@media screen and (max-width:900px)": {
      fontSize: "3.5rem",
    },
    "@media screen and (max-width:544px)": {
      fontSize: "2.75rem",
    },
    "@media screen and (max-width:463px)": {
      fontSize: "2.25rem",
    },
    "@media screen and (max-width:400px)": {
      fontSize: "1.75rem",
    },
  },

  getHomeTextTwoStyles: {
    fontSize: "5rem",
    fontFamily: theme.typography.fontFamily,
    "@media screen and (max-width: 1287px)": {
      fontSize: "4.5rem",
    },
    "@media screen and (max-width: 1180px)": {
      fontSize: "4rem",
    },
    "@media screen and (max-width: 1072px)": {
      fontSize: "3.5rem",
    },
    "@media screen and (max-width: 964px)": {
      fontSize: "3rem",
    },
    "@media screen and (max-width:900px)": {
      fontSize: "4.75rem",
    },
    "@media screen and (max-width:544px)": {
      fontSize: "4rem",
    },
    "@media screen and (max-width:463px)": {
      fontSize: "3.5rem",
    },
    "@media screen and (max-width:410px)": {
      fontSize: "3.25rem",
    },
    "@media screen and (max-width:400px)": {
      fontSize: "2.80rem",
    },
    "@media screen and (max-width:334px)": {
      fontSize: "2.65rem",
    },
  },

  getHomeTextThreeStyles: {
    fontSize: "1rem",
    fontFamily: theme.typography.fontFamily,
    maxWidth: "500px",
    "@media screen and (max-width:900px)": {
      textAlign: "center",
    },
    "@media screen and (max-width:400px)": {
      fontSize: "0.90rem",
    },
  },

  getGridItemTwoStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  getHomeImageContStyles: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  getHomeImageStyles: {
    "@media screen and (max-width: 900px)": {
      width: "70%",
      // marginTop: "25px",
    },
    "@media screen and (max-width: 800px)": {
      width: "72.5%",
    },
    "@media screen and (max-width: 700px)": {
      width: "75%",
    },
    "@media screen and (max-width: 600px)": {
      width: "80%",
    },
    "@media screen and (max-width: 500px)": {
      width: "82.5%",
    },
    "@media screen and (max-width: 400px)": {
      width: "100%",
    },
  },

  getGridItemThreeStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem 0rem",
  },

  getSwiperContStyles: {
    width: "100%",
    background: "#f2f3f9",
    padding: "1rem 0rem",
    borderRadius: "10px",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
  },

  getBookYourMealButtonStyles: {
    minWidth: "25% !important",
    borderRadius: "1.25rem",
    border: "1px solid #ef5d36",
    color: "#ef5d36",
    margin: "1.5rem 0rem 0rem 0rem",
    transition: "0.25s ease-in",
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    padding: "0.25rem 1rem",
    textTransform: "capitalize",
    textDecoration: "none",
    "&:hover": {
      background: "#ef5d36",
      border: "1px solid #ef5d36",
      color: "#FFF",
    },
    "&:focus": {
      outline: "none",
    },
    "@media screen and (max-width: 900px)": {
      marginLeft: "0px",
    },
    "@media screen and (max-width: 544px)": {
      fontSize: "0.9rem",
    },
    "@media screen and (max-width:400px)": {
      fontSize: "0.85rem",
      padding: "0.25rem 0.70rem",
    },
    "@media screen and (max-width:360px)": {
      padding: "0.17rem 0.50rem",
    },
  },

  getInviteButtonStyles: {
    minWidth: "25% !important",
    borderRadius: "1.25rem",
    border: "1px solid transparent",
    color: "#FFF",
    background: "#ef5d36",
    margin: "1.5rem 0rem 0rem 1.5rem",
    transition: "0.25s ease-in",
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    padding: "0.25rem 1rem",
    textTransform: "capitalize",
    "&:hover": {
      background: "transparent",
      border: "1px solid #ef5d36",
      color: "#ef5d36",
    },
    "&:focus": {
      outline: "none",
    },
    "@media screen and (max-width: 900px)": {
      marginLeft: "1.5rem",
    },
    "@media screen and (max-width: 544px)": {
      fontSize: "0.87rem",
    },
    "@media screen and (max-width:400px)": {
      fontSize: "0.85rem",
      padding: "0.25rem 0.70rem",
    },
    "@media screen and (max-width:360px)": {
      padding: "0.17rem 0.50rem",
    },
  },

  getGridItemFourStyles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  getTypographyContStyles: {
    display: "flex",
    columnGap: "0.25rem",
    alignItems: "baseline",
  },

  getTypographyOneStyles: {
    fontSize: "0.8rem",
  },

  getTypographyTwoStyles: {
    fontSize: "1rem",
    fontWeight: 500,
  },

  getMemberSliderContStyles: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    columnGap: "1rem",
    overflowX: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },

  root: {
    width: "100%",
    marginTop: "0.25rem",
    fontSize: "0.9rem",
    "& .MuiInputBase-root": {
      fontSize: "0.85rem",
      background: "#F7F7F7",
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.MuiInputBase-root.Mui-focused fieldset": {
        border: "1px solid #ef5d36",
      },
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.9rem",
      "&.MuiFormLabel-root.Mui-focused": {
        color: "#ef5d36",
      },
    },
  },

  input: {
    "& .MuiInputBase-input": {
      color: "#232229 !important",
    },
  },
}));
