export const ForgotPasswordStyles = {
  getSignupFormStyles: {
    width: "90%",
    "@media screen and (max-width: 1200px)": {
      width: "90%",
    },
    margin: "1rem 0rem",
  },

  root: {
    "& .MuiInputBase-root": {
      width: "100% !important",
      fontSize: "1rem",
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

  getButtonCustomStyles: {
    width: "100% !important",
    height: "40px",
    borderRadius: "4px",
    border: "1px solid #ef5d36",
    color: "#ef5d36",
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
