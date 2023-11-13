export const ForgotPasswordFormStyles = {
  getMainContStyles: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  getTextContStyles: {
    justifyContent: "center",
    alignItems: "center",
    "@media screen and (max-width: 599px)": {
      marginTop: "-5rem",
    },
  },

  getBrandLogoStyles: {
    width: "28%",
    "@media screen and (max-width: 899px)": {
      width: "22.5%",
    },
    "@media screen and (max-width: 599px)": {
      width: "30%",
    },
  },

  getTextOneStyles: {
    fontSize: "2.5rem",
    fontFamily: "Poppins, sans-serif",
    "@media screen and (max-width: 981px)": {
      fontSize: "2rem",
    },
    "@media screen and (max-width: 785px)": {
      fontSize: "1.5rem",
    },
    textAlign: "center",
  },

  getTextTwoStyles: {
    fontSize: "1rem",
    marginTop: "0.5rem",
    fontFamily: "Poppins, sans-serif",
    "@media screen and (max-width: 785px)": {
      fontSize: "0.90rem",
    },
    textAlign: "center",
  },

  getFormStyles: {
    width: "80%",
    "@media screen and (max-width: 1200px)": {
      width: "90%",
    },
    margin: "1rem 0rem",
  },

  root: {
    "& .MuiInputBase-root": {
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
