export const getUserProfileStyles = {
  gridContStyles: {
    // background: "pink",
  },

  gridItemOneStyles: {
    // background: "wheat",
  },

  gridItemTwoStyles: {
    // background: "lightgreen",
  },

  gridItemThreeStyles: {
    margin: "1rem 0rem 0.5rem",
  },

  boxOneStyles: {
    background: "#FFEAE4",
    display: "flex",
    justifyContent: "center",
    padding: "4rem 0rem",
    border: "none",
    borderRadius: "0.5rem",
  },

  memberAvatarStyles: {
    width: "8rem",
    height: "8rem",
    position: "absolute",
    background: "#FFF",
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
    };
  },

  chipTypographyStyles: {
    fontSize: "1rem",
    fontFamily: "Poppins, sans-serif",
  },

  bookYourMealButtonStyles: {
    borderRadius: "4px",
    border: "1px solid #ef5d36",
    color: "#ef5d36",
    transition: "0.25s ease-in",
    fontFamily: "Poppins, sans-serif",
    fontSize: "1rem",
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
  },

  tableColumnTypographyStyles: {
    fontSize: "1rem",
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
  },
};
