import { makeStyles } from "tss-react/mui";

export const getBookingCardStyles = makeStyles()((theme) => ({
  getCardStyles: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px",
    margin: "2rem 0rem",
    cursor: "pointer",
    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      borderBottom: "2px solid #ef5d36",
    },
    "@media screen and (max-width: 1100px)": {
      width: "90%",
    },
    "@media screen and (max-width: 900px)": {
      width: "70%",
    },
    "@media screen and (max-width: 600px)": {
      width: "80%",
      margin: "2rem 0rem 1rem 0rem",
    },
    "@media screen and (max-width: 400px)": {
      width: "85%",
    },
  },

  getCardLabelContStyles: {
    minWidth: "100%",
    borderRadius: "10px 10px 0px 0px",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0rem 2rem",
    zIndex:"0"
  },

  getCardLabelStyles: {
    fontSize: "0.7rem",
    fontFamily: theme.typography.fontFamily,
    background: "#4caf50",
    border: "none",
    borderRadius: "0px 10px 0px 10px",
    padding: "0.1rem 0.70rem",
    color: "#FFF",
    fontWeight: 500,
  },

  getImageSkeletonStyles: {
    width: "100%",
    borderRadius: "0px",
  },

  getMemberPictureStyles: {
    width: "100%",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },

  getHeadingStyles: {
    fontSize: "1.5rem",
    fontFamily: theme.typography.fontFamily,
    marginTop: "1rem",
    textAlign: "center",
    "@media screen and (max-width: 346px)": {
      fontSize: "1.35rem",
    },
  },

  getCaptionStyles: {
    fontSize: "0.9rem",
    textAlign: "center",
    marginTop: "0.25rem",
    "@media screen and (max-width: 1275px)": {
      fontSize: "0.85rem",
    },
    "@media screen and (max-width: 346px)": {
      fontSize: "0.80rem",
    },
  },

  getActionButtonStyles: {},
}));

export const getCommonButtonCustomStyles = {
  customStyles: (isBooked) => {
    return {
      fontWeight: "normal",
      background: isBooked ? "red" : "transparent",
      color: isBooked ? "#FFF" : "#ef5d36",
      borderRadius: "4px",
      border: "1px solid",
      borderColor: isBooked ? "red" : "#ef5d36",
      margin: "1rem 0rem 2rem 0rem",
      fontSize: "0.9rem",
      "&:hover": {
        background: isBooked ? "transparent" : "#ef5d36",
        color: isBooked ? "red" : "#FFF",
        borderColor: isBooked ? "red" : "#ef5d36",
      },
      "&:focus": {
        outline: "none",
      },
      "@media screen and (max-width: 400px)": {
        fontSize: "0.85rem",
      },
    };
  },

  getButtonStyles: (isBooked) => {
    return {
      transition: "0.25s ease-in",
      fontFamily: "Poppins, sans-serif",
      padding: "0.25rem 0.75rem",
      textTransform: "none",
      fontWeight: "normal",
      background: isBooked ? "red" : "transparent",
      color: isBooked ? "#FFF" : "#ef5d36",
      borderRadius: "4px",
      border: "1px solid",
      borderColor: isBooked ? "red" : "#ef5d36",
      margin: "1rem 0rem 2rem 0rem",
      fontSize: "0.9rem",
      "&:hover": {
        background: isBooked ? "transparent" : "#ef5d36",
        color: isBooked ? "red" : "#FFF",
        borderColor: isBooked ? "red" : "#ef5d36",
      },
      "&:focus": {
        outline: "none",
      },
      "@media screen and (max-width: 400px)": {
        fontSize: "0.85rem",
      },
    };
  },
};
