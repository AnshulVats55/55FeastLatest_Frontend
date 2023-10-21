export const DashboardCardTwoStyles = {
  boxOneStyles: (index) => {
    return {
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      transition: "0.3s ease-in-out",
      background:
        index === 0
          ? "#ECF3FE"
          : index === 1
          ? "#FEF5E5"
          : index === 2
          ? "#FDEDE8"
          : index === 3
          ? "#E6FEFB"
          : index === 4
          ? "#EBF2FF"
          : index === 5
          ? "#FCEBFF"
          : "",
      "&:hover": {
        // boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
      },
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
      fontSize: "0.8rem",
    },
  },
};
