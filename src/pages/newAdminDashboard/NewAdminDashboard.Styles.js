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
    background: "lightblue",
  },

  gridItemSixStyles: {
    background: "#FFF",
    padding: "0rem 0.75rem",
    background:"",
    alignSelf: "start",
  },

  gridItemSevenStyles: {
    padding: "0.25rem 0.75rem",
    maxHeight: "30vh",
    width: "100%",
    border:"none",
  },

  gridItemEightStyles: {
    background: "",
  },

  boxOneStyles: {
    width: "100%",
    height: "50vh",
    maxHeight: "50vh",
    background: "#FFF",
    boxShadow:
      "rgba(145, 158, 171, 0.3) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
    border: "none",
    borderRadius: "0.5rem",
    overflowY: "scroll",
    "&::-webkit-scrollbar": { display: "none" },
    marginBottom: "1rem",
  },

  boxTwoStyles: {
    
  },

  typographyOneStyles: {
    background: "#FFEAE4",
    color:"#EF5D36",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding:"0.25rem 0.75rem",
    border:"none",
    borderRadius: "0.25rem",
    marginBottom:"0.5rem",
  },
};
