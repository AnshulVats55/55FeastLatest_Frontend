export const DashboardCardOneStyles = {
  topContStyles: (index) => {
    return {
      background:
        index === 0
          ? "#ECF3FE"
          : index === 1
          ? "#FEF5E5"
          : index === 2
          ? "#FDEDE8"
          : index === 3
          ? "#E6FEFB"
          : "",
      borderRadius: "0.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem 0rem",
      cursor: "pointer",
      "&:hover": {
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
      },
      position: "relative",
    };
  },

  threeDotsStyles: {
    color: "#EF5D36",
    position: "absolute",
    top: "0.5rem",
    left: "calc(100% - 35px)",
    fontSize: "1.5rem",
    cursor: "pointer",
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
          : "",
      fontSize: "0.9rem",
      marginTop: "1rem",
    };
  },

  cardValueStyles: (index) => {
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
          : "",
      fontSize: "1.75rem",
      fontWeight: 500,
    };
  },
};
