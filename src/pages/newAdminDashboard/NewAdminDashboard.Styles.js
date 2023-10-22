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

  circularProgressStyles: (index) => {
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

  gridItemSixStyles: {
    background: "#FFF",
    padding: "0rem 0.75rem",
    background: "",
    alignSelf: "start",
  },

  gridItemSevenStyles: {
    padding: "0.25rem 0.75rem",
    maxHeight: "30vh",
    width: "100%",
    border: "none",
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

  typographyOneStyles: {
    background: "#FFEAE4",
    color: "#EF5D36",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "0.25rem 0.75rem",
    border: "none",
    borderRadius: "0.25rem",
    marginBottom: "0.5rem",
  },

  skeletonStyles: {
    height: "2.5rem",
    margin: "0.5rem",
    borderRadius: "0.25rem",
  },

  root: {
    width: "100%",
    marginBottom: "0.5rem",
    "& .MuiInputBase-root": {
      fontSize: "0.8rem",
      background: "#FFF",
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
      fontSize: "1rem",
      "&.MuiFormLabel-root.Mui-focused": {
        color: "#ef5d36",
      },
    },
    "@media screen and (max-width: 900px)": {
      // margin: "1rem auto 1rem",
    },
  },

  input: {
    "& .MuiInputBase-input": {
      color: "#232229 !important",
    },
  },

  boxTwoStyles: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  typographyTwoStyles: {
    fontSize: "0.85rem",
    textAlign: "center",
    "@media screen and (max-width: 400px)": {
      fontSize: "0.75rem",
    },
    marginTop: "1rem",
  },

  imageContOneStyles: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  imageOneStyles: {
    width: "50%",
    "@media screen and (maxWidth: 400px)": {
      width: "75%",
    },
  },
};
