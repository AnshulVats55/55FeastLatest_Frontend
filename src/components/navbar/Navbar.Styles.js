export const getNavbarStyles = {
  getAppbarStyles: {
    width: "100%",
    boxShadow: "none",
    position: "fixed",
    top: "0px",
    left: "0px",
    background: "none",
    height: "10vh",
    "@media screen and (max-width: 400px)": {
      height: "8vh",
    },
    // display: { xs: "none", sm: "flex" },
  },

  getToolbarContStyles: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  getToolbarStyles: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "10vh",
    background: "#232229",
    borderBottomLeftRadius: "1.2rem",
    borderBottomRightRadius: "1.2rem",
    "@media screen and (max-width: 600px)": {
      borderBottomLeftRadius: "1rem",
      borderBottomRightRadius: "1rem",
    },
    "@media screen and (max-width: 400px)": {
      height: "8vh",
    },
  },

  getHamburgerIconContStyles: {
    "&:focus": {
      outline: "none",
    },
    display: { xs: "none", sm: "flex" },
  },

  getHamburgerIconStyles: {
    "@media screen and (max-width: 599px)": {
      fontSize: "1.25rem !important",
    },
  },

  getBrandLogoStylesTwo: {
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "#FFF",
    textDecoration: "none",
    "&:hover": {
      color: "#FFF",
    },
    fontSize: "1.5rem !important",
    display: { xs: "flex", md: "none" },
    "@media screen and (max-width: 400px)": {
      fontSize: "1.10rem !important",
    },
  },

  getBrandLogoStylesOne: {
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "#FFF",
    textDecoration: "none",
    fontSize: "1.5rem",
    "&:hover": {
      color: "#FFF",
    },
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontSize: "1.5rem !important",
  },

  getNavLinksContStylesOne: {
    width: 225,
    background: "#232229",
    height: "100%",
    color: "#FFF",
    "@media screen and (max-width: 600px)": {
      width: 200,
    },
    "@media screen and (max-width: 360px)": {
      width: 175,
    },
  },

  getNavLinksStylesOne: {
    position: "relative",
    textDecoration: "none",
    color: "#FFF",
    fontSize: 16, //16
    letterSpacing: "1px",
    padding: "0.25rem 0.75rem",
    transition: "0.2s ease-in-out",
    borderRadius: "4px",
    "&::before": {
      content: '""',
      position: "absolute",
      bottom: "-2px",
      left: 0,
      width: "100%",
      height: "2px",
      backgroundColor: "#ef5d36",
      transform: "scaleX(0)",
      transition: "transform 0.3s ease",
      borderRadius: "1px",
    },
    "&:hover::before": {
      transform: "scaleX(1)",
    },
  },

  getNavLinksContStylesTwo: {
    display: { xs: "none", md: "flex" },
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
    flexGrow: 0.1,
    "@media screen and (max-width: 1069px)": {
      flexGrow: "0.20",
    },
    "@media screen and (max-width: 1020px)": {
      flexGrow: "0.25",
    },
    "@media screen and (max-width: 978px)": {
      flexGrow: "0.35",
    },
  },

  getNavLinksStylesTwo: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "@media screen and (max-width: 900px)": {
      display: "none",
    },
  },

  getListItemStylesOne: (index) => {
    return {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: index === 0 ? "2.5rem !important" : "1.5rem !important",
    };
  },

  getListItemStylesTwo: (index) => {
    return {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: index === 0 ? "2.5rem !important" : "0.75rem !important",
    };
  },

  getCloseIconStylesOne: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    cursor: "pointer",
  },

  getCloseIconStylesTwo: {
    position: "absolute",
    top: "0.5rem",
    left: "0.5rem",
    cursor: "pointer",
  },

  getListItemIconStyles: {
    fontSize: "1.5rem",
    color: "#FFF",
    "@media screen and (max-width: 360px)": {
      fontSize: "1rem",
    },
  },

  getListItemTextStylesOne: {
    fontSize: "0.9rem",
    color: "#FFF",
    margin: "0rem 0.5rem",
    "@media screen and (max-width: 360px)": {
      fontSize: "0.8rem",
    },
  },

  getListItemTextStylesTwo: {
    fontSize: "0.9rem",
    color: "#FFF",
    margin: "0rem 0.5rem",
    "@media screen and (max-width: 360px)": {
      fontSize: "0.85rem",
    },
  },

  getCurrentUserNameStyles: {
    color: "#FFF",
    fontSize: "1rem",
  },
};
