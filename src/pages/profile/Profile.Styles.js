// import ProfileImage from "../../assets/profile-banner.jpg";
import ProfileImage from "../../assets/profile-bg.svg";

export const getUserProfileStyles = {
  gridContStyles: {
    // background: "pink",
  },

  gridItemOneStyles: {
    // background: "wheat",
  },

  gridItemTwoStyles: {
    marginTop: "4.5rem",
  },

  gridItemThreeStyles: {
    margin: "1rem 0rem 0.5rem",
  },

  boxOneStyles: {
    width: "100%",
    // background: "rgba(200, 200, 200, 0.1)", //#FFEAE4/
    background: `url(${ProfileImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    objectFit: "fill",
    display: "flex",
    justifyContent: "center",
    padding: "5rem 0",
    border: "none",
    borderRadius: "0.5rem",
    "@media screen and (max-width: 450px)": {
      padding: "2rem 0",
    },
    margin: "1rem 0 0",
  },

  memberAvatarStyles: {
    width: "7rem",
    height: "7rem",
    position: "absolute",
    top: "14rem",
    background: "#FFF",
    "@media screen and (max-width: 900px)": {
      top: "8.5rem",
      width: "6rem",
      height: "6rem",
    },
    "@media screen and (max-width: 600px)": {
      top: "7.5rem",
      width: "5.5rem",
      height: "5.5rem",
    },
    "@media screen and (max-width: 450px)": {
      top: "6.25rem",
      width: "4.5rem",
      height: "4.5rem",
    },
  },

  memberNameStyles: {
    fontWeight: 500,
    fontSize: "1.25rem",
  },

  boxTwoStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "4.5rem 0rem 0rem",
  },

  boxThreeStyles: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },

  boxFourStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  chipOneStyles: (optionSelected) => {
    return {
      background: optionSelected === "history" ? "#FFEAE4" : "",
      border: optionSelected === "history" ? "1px solid #EF5D36" : "",
      color: optionSelected === "history" ? "#EF5D36" : "",
      "&:hover": {
        background: optionSelected === "history" ? "#FFEAE4 !important" : "",
      },
    };
  },

  iconOneStyles: (optionSelected) => {
    return {
      color: optionSelected === "history" ? "#EF5D36" : "",
      fontSize: "1.25rem",
      "@media screen and (max-width: 400px)": {
        fontSize: "1rem",
      },
    };
  },

  chipTwoStyles: (optionSelected) => {
    return {
      background: optionSelected === "reviews" ? "#FFEAE4 !important" : "",
      border: optionSelected === "reviews" ? "1px solid #EF5D36" : "",
      color: optionSelected === "reviews" ? "#EF5D36" : "",
      marginLeft: "0.5rem",
    };
  },

  iconTwoStyles: (optionSelected) => {
    return {
      color: optionSelected === "reviews" ? "#EF5D36" : "",
      fontSize: "1.25rem",
      "@media screen and (max-width: 400px)": {
        fontSize: "0.8rem",
      },
    };
  },

  chipTypographyStyles: {
    fontSize: "1rem",
    fontFamily: "Poppins, sans-serif",
    "@media screen and (max-width: 400px)": {
      fontSize: "0.8rem",
    },
  },

  bookYourMealButtonStyles: {
    borderRadius: "1.25rem",
    border: "1px solid #ef5d36",
    color: "#ef5d36",
    transition: "0.25s ease-in",
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    padding: "0.25rem 0.75rem",
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
      fontSize: "0.95rem",
    },
    "@media screen and (max-width: 600px)": {
      fontSize: "0.9rem",
    },
    "@media screen and (max-width:400px)": {
      fontSize: "0.80rem",
    },
    "@media screen and (max-width:360px)": {
      fontSize: "0.75rem",
    },
  },

  tableColumnTypographyStyles: {
    fontSize: "1rem",
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
    "@media screen and (max-width: 400px)": {
      fontSize: "0.9rem",
    },
  },

  headerGridItemStyles: {
    "@media screen and (max-width: 600px)": {
      display: "none",
    },
  },
};
