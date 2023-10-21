export const NewAdminDashboardStyles = {
  iconStylesOne: (index) => {
    return {
      background:
        index === 0
          ? "#5D87FF"
          : index === 1
          ? "#FEAF1F"
          : index === 2
          ? "#FA886A"
          : index === 3
          ? "#13DEB9"
          : "",
      padding: "1rem",
      border: "none",
      borderRadius: "0.75rem",
      color: "#FFF",
      fontSize: "1.25rem",
    };
  },

  iconStylesTwo: (index) => {
    return {
      background:
        index === 0
          ? "#5D87FF"
          : index === 1
          ? "#13DEB9"
          : index === 2
          ? "#FEAF1F"
          : index === 3
          ? "#539AFE"
          : index === 4
          ? "#FA886A"
          : index === 5
          ? "#FE53F1"
          : "",
      padding: "1rem",
      border: "none",
      borderRadius: "0.75rem",
      color: "#FFF",
      fontSize: "1rem",
    };
  },

  gridItemOneStyles: {
    padding: "1rem 0.75rem 0rem",
  },

  gridItemTwoStyles: {
    background: "skyblue",
    padding: "0.5rem 0.75rem 0rem",
  },

  gridItemThreeStyles: {
    background: "",
    padding: "0.5rem 0rem",
  },

  gridItemFourStyles: {
    margin: "0.25rem 0",
    padding: "0rem 0.75rem",
  },

  gridItemFiveStyles: {
    background:"lightblue",
  },

  gridItemSixStyles: {
    background: "lightgreen",
    height: "30vh",
    maxHeight: "30vh",
  },

  gridItemSevenStyles: {
    padding:"0.25rem 0.5rem",
  },

  gridItemEightStyles: {

  },
};
