export const DashboardCardTwoStyles = {
  boxOneStyles: (index) => {
    return {
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      transition: "0.3s ease-in-out",
      background: "#FFF",
      boxShadow:
        "rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
      border: "none",
    };
  },

  boxTwoStyles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  cardLabelStyles: (index) => {
    return {
      color:
        index === 0
          ? "#5D87FF"
          : index === 1
          ? "#FEAF1F"
          : index === 2
          ? "#FA886A"
          : index === 3
          ? "#13DEB9"
          : index === 4
          ? "#539AFE"
          : index === 5
          ? "#FE53F1"
          : "",
      fontSize: "0.8rem",
      fontWeight: 500,
      margin: "0rem 1rem",
    };
  },

  buttonStyles: {
    borderRadius: "4px",
    border: "1px solid #ef5d36",
    color: "#ef5d36",
    fontSize: "0.7rem",
    margin: "0.25rem 1rem",
    "&:hover": {
      background: "#ef5d36",
      color: "#FFF",
    },
    "&:focus": {
      outline: "none",
    },
    "@media screen and (max-width: 400px)": {
      fontSize: "0.65rem",
    },
  },

  guestButtonContStyles: {
    display: "flex",
    alignItems: "center",
  },

  guestButtonStyles: {
    borderRadius: "4px",
    border: "1px solid #ef5d36",
    color: "#ef5d36",
    fontSize: "0.7rem",
    margin: "0.25rem 0 0.25rem 1rem",
    "&:hover": {
      background: "#ef5d36",
      color: "#FFF",
    },
    "&:focus": {
      outline: "none",
    },
    "@media screen and (max-width: 400px)": {
      fontSize: "0.65rem",
    },
  },
};
