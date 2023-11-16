export const getMemberAvatarStyles = {
  getBoxStyles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  getAvatarStyles: (themeIndex) => {
    return {
      fontSize: "2rem",
      background:
        themeIndex === 1
          ? "#ECF3FE"
          : themeIndex === 2
          ? "#FEF5E5"
          : themeIndex === 3
          ? "#FDEDE8"
          : themeIndex === 4
          ? "#E6FEFB"
          : themeIndex === 5
          ? "#EEE3FF"
          : "#",
      color:
        themeIndex === 1
          ? "#5D87FF"
          : themeIndex === 2
          ? "#FEAF1F"
          : themeIndex === 3
          ? "#FA886A"
          : themeIndex === 4
          ? "#13DEB9"
          : themeIndex === 5
          ? "#CA53FE"
          : "#FE53F1",
      fontWeight: 500,
      width: "4.75rem",
      maxWidth: "4.8rem",
      height: "4.75rem",
      maxHeight: "4.8rem",
      border: "1px solid",
      borderColor:
        themeIndex === 1
          ? "#5D87FF"
          : themeIndex === 2
          ? "#FEAF1F"
          : themeIndex === 3
          ? "#FA886A"
          : themeIndex === 4
          ? "#13DEB9"
          : themeIndex === 5
          ? "#CA53FE"
          : "#FE53F1",
    };
  },

  getTypographyStyles: {
    fontSize: "0.8rem",
    "@media screen and (max-width: 400px)": {
      fontSize: "0.75rem",
    },
    fontWeight: 500,
    textAlign: "center",
  },
};
