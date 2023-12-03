export const DailyCountCardStyles = {
  topContStyles: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "1px solid #E5EAEF",
    padding: "0.25rem 0",
    cursor: "pointer",
  },

  typographyOneStyles: {
    fontSize: "0.9rem",
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
  },

  avatarStyles: {
    background: "#EF5D36",
    color: "#FFF",
    width: "2rem",
    height: "2rem",
    fontSize: "1.10rem",
    "@media screen and (max-width: 450px)": {
      display: "none",
      width: "0",
      height: "0",
    },
  },

  boxOneStyles: {
    width: "5%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "1rem",
    "@media screen and (max-width: 450px)": {
      padding: "0 0.30rem 0 0",
    },
  },

  boxTwoStyles: {
    width: "10%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0 0.25rem",
    "@media screen and (max-width: 450px)": {
      display: "none",
      width: "0%",
    },
  },

  boxThreeStyles: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0 0.25rem",
    "@media screen and (max-width: 450px)": {
      padding: "0",
      width: "80%",
    },
    // background: "lightgreen",
  },

  boxFourStyles: {
    width: "15%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0 0.5rem 0 0.25rem",
  },

  typographyTwoStyles: {
    fontSize: "0.9rem",
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
    "@media screen and (max-width: 450px)": {
      fontSize: "0.8rem",
    },
    color: "#000",
  },

  typographyThreeStyles: {
    fontSize: "0.7rem",
    color: "#000",
    fontWeight: 400,
    fontFamily: "Poppins, sans-serif",
    "@media screen and (max-width: 450px)": {
      fontSize: "0.65rem",
    },
  },

  typographyFourStyles: {
    fontSize: "0.7rem",
    fontWeight: 400,
    background: "#DEFFDF",
    color: "#4CAF50",
    padding: "0.1rem 0.5rem",
    border: "1px solid #4FAC50",
    fontFamily: "Poppins, sans-serif",
    border: "none",
    borderRadius: "0.25rem",
    "@media screen and (max-width: 600px)": {
      fontSize: "0.80rem",
      padding: "0.09rem 0.40rem",
    },
    "@media screen and (max-width: 450px)": {
      fontSize: "0.70rem",
    },
    "@media screen and (max-width: 400px)": {
      fontSize: "0.65rem",
      padding: "0.09rem 0.30rem",
    },
  },

  buttonStyles: {
    // borderRadius: "4px",
    // border: "1px solid #ef5d36",
    // color: "#ef5d36",
    // fontSize: "0.7rem",
    // margin: "0.25rem 1rem",
    // "&:hover": {
    //   background: "#ef5d36",
    //   color: "#FFF",
    // },
    // "&:focus": {
    //   outline: "none",
    // },
    // "@media screen and (max-width: 400px)": {
    //   fontSize: "0.65rem",
    // },
    "@media screen and (max-width: 615px)": {
      fontSize: "0.8rem",
    },
    "@media screen and (max-width: 370px)": {
      padding: "0.15rem 0rem",
    },
  },
};
