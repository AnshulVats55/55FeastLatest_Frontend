import { makeStyles } from "tss-react/mui";

export const getSignupFormStyles = makeStyles()((theme) => ({
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
      marginTop: "2rem",
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
    background: "#EF5D36",
  },

  getTextOneStyles: {
    fontSize: "2.5rem",
    fontFamily: theme.typography.fontFamily,
    "@media screen and (max-width: 981px)": {
      fontSize: "2rem",
    },
    "@media screen and (max-width: 785px)": {
      fontSize: "1.5rem",
    },
  },

  getTextTwoStyles: {
    fontSize: "1rem",
    marginTop: "0.5rem",
    fontFamily: theme.typography.fontFamily,
    "@media screen and (max-width: 785px)": {
      fontSize: "0.90rem",
    },
  },

  getSignupFormStyles: {
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

  getMenuItemStyles: {
    fontSize: "1rem",
  },

  getProfilePicLabelStyles: {
    width: "100%",
    padding: "1.05rem 1rem",
    background: "#ef5d36",
    color: "#FFF",
    transition: "0.25s ease-in",
    border: "1px solid #ef5d36",
    borderRadius: "4px",
    outline: "none",
    fontWeight: "500",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    textAlign: "center",
    "&:hover": {
      background: "transparent",
      border: "1px solid #ef5d36",
      color: "#ef5d36",
    },
  },

  getLinkContStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media screen and (max-width: 599px)": {
      marginBottom: "2rem",
    },
  },

  getActionTextOneStyles: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "1rem",
    "@media screen and (max-width: 785px)": {
      fontSize: "0.90rem",
    },
  },

  getLinkStyles: {
    textDecoration: "none",
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.action.active,
    fontWeight: "500",
    "&:hover": {
      color: theme.palette.action.active,
    },
    "&:focus": {
      color: theme.palette.action.active,
    },
    fontSize: "1rem",
    "@media screen and (max-width: 785px)": {
      fontSize: "0.90rem",
    },
  },
}));

export const getProfilePicAnimation = {
  initial: {
    scale: 1,
  },
  whileTap: {
    scale: 0.97,
  },
  transition: {
    duration: 0.1,
  },
};

export const getAdditionalStyles = {
  getSelectStyles: {
    "& .MuiSelect-select": {
      paddingLeft: "13px",
      fontSize: "1rem",
      background: "#F7F7F7",
    },
    "&.MuiInputBase-root": {
      color: "#232229 !important",
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
  },

  getPasswordFieldStyles: {
    "&.MuiOutlinedInput-root": {
      background: "#F7F7F7",
      fontSize: "1rem",
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
    "&.MuiFormLabel-root": {
      color: "green !important",
      fontSize: "1rem",
      "&.MuiFormLabel-root.Mui-focused": {
        color: "#ef5d36",
      },
    },
    "& .MuiOutlinedInput-input": {
      color: "#232229 !important",
    },
  },

  getCommonButtonCustomStyles: {
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
