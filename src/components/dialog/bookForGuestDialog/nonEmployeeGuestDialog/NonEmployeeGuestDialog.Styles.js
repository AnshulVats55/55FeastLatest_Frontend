export const NonEmployeeGuestDialogStyles = {
  getDialogTitleStyles: {
    textAlign: "center",
    fontSize: "1.25rem",
    "@media screen and (max-width: 532px)": {
      fontSize: "1.10rem",
    },
  },

  getDialogContentStyles: {
    border: "none",
  },

  getDialogContentTextStyles: {
    border: "none",
    padding: "0.5rem 0rem",
    textAlign: "center",
    "&:focus": {
      outline: "none",
    },
    fontSize: "1rem",
  },

  getAddMemberFormStyles: {
    width: "100%",
    margin: "1rem 0rem 1rem",
  },

  getFormGridContStyles: {
    width: "100%",
  },

  getFormGridItemStyles: {
    display: "flex",
    justifyContent: "center",
  },

  getFormGridItemFourStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  getDialogActionStyles: {
    // background:"wheat",
  },

  root: {
    "& .MuiInputBase-root": {
      fontSize: "0.9rem",
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
      fontSize: "1rem",
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

  getMenuItemStyles: {
    fontSize: "0.9rem",
  },

  getButtonStyles: (type) => {
    return {
      width: "15%",
      height: "35px",
      borderRadius:"1.25rem",
      border: "1px solid #ef5d36",
      color: "#ef5d36",
      margin: type === "close" ? "1.5rem 0rem 0rem 5rem" : "",
      transition: "0.25s ease-in",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.9rem",
      padding: "0.20rem 0.25rem",
      textTransform: "capitalize",
      textDecoration: "none",
      "&:hover": {
        background: "#ef5d36",
        border: "none",
        color: "#FFF",
      },
      "&:focus": {
        outline: "none",
      },
      "@media screen and (max-width: 900px)": {
        marginLeft: "0px",
      },
      "@media screen and (max-width: 409px)": {
        // height: type === "book" && "26px",
        fontSize: "0.75rem",
        padding: type === "book" && "0.10rem 0.25rem",
      },
    };
  },

  getCloseButtonStyles: {
    width: "15%",
    height: "35px",
    borderRadius: "4px",
    border: "1px solid #ef5d36",
    color: "#ef5d36",
    margin: "1.5rem 0rem 0rem 5rem",
    transition: "0.25s ease-in",
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
    padding: "0.20rem 0.25rem",
    textTransform: "capitalize",
    textDecoration: "none",
    "&:hover": {
      background: "#ef5d36",
      border: "none",
      color: "#FFF",
    },
    "&:focus": {
      outline: "none",
    },
    "@media screen and (max-width: 900px)": {
      marginLeft: "0px",
    },
    "@media screen and (max-width:409px)": {
      fontSize: "0.9rem",
    },
  },

  getSliderStyles: {
    color: "#EF5D36",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#EF5D36",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  },

  cancelIconStyles: {
    color: "#ef5d36",
    cursor: "pointer",
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
};

export const getCommonButtonCustomStyles = {
  customStyles: {
    width: "100% !important",
    height: "40px",
    borderRadius: "4px",
    border: "1px solid #ef5d36",
    color: "#ef5d36",
    fontSize: "0.9rem !important",
    "&:hover": {
      background: "#ef5d36",
      border: "none",
      color: "#FFF",
    },
    "&:focus": {
      outline: "none",
    },
  },
};
