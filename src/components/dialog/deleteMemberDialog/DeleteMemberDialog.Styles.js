export const DeleteMemberDialogStyles = {
  getDialogTitleStyles: {
    textAlign: "center",
    fontSize: "1.25rem",
    fontFamily: "Poppins, sans-serif",
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
    fontSize: 16,
  },

  getMemberCardStyles: {
    minWidth: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    border: "none",
    borderRadius: "5px",
    margin: "0.5rem 0rem",
    padding: "0.25rem 0rem",
    cursor: "pointer",
    transition: "0.20s ease-in-out",
    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      transform: "scale(1.015)",
    },
  },

  getMemberNameStyles: {
    fontSize: 16,
    fontFamily: "Poppins, sans-serif",
    color: "#232229",
  },

  getMemberEmailStyles: {
    fontSize: 16,
    fontFamily: "Poppins, sans-serif",
    color: "#232229",
  },

  root: {
    width: "100%",
    marginTop: "1rem",
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

  cancelIconStyles: {
    color: "#ef5d36",
    cursor: "pointer",
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },

  skeletonStyles: {
    width: "100%",
    height: "3rem",
    margin: "0.5rem 0 0.25rem",
    background: "rgba(0, 0, 0, 0.2)",
  },
};
