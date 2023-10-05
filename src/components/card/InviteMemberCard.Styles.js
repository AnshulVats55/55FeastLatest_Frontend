import { makeStyles } from "tss-react/mui";

export const getInviteMemberCardStyles = makeStyles()((theme) => ({
  getMemberCardStyles: {
    minWidth: "100%",
    border: "none",
    borderRadius: "5px",
    margin: "0.5rem 0rem",
    cursor: "pointer",
    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      transform: "scale(1.015)",
      background: "#FFF",
    },
  },

  getGridContStyles: {
    width: "100%",
    padding: "0.6rem 0rem",
  },

  getMemberNumberContStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media screen and (max-width: 599px)": {
      display: "none",
    },
  },

  getMemberNumberStyles: {
    fontSize: "0.9rem",
    fontFamily: theme.typography.fontFamily,
    "@media screen and (max-width: 615px)": {
      fontSize: "0.8rem",
    },
  },

  getMemberNameContStyles: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  getMemberNameStyles: {
    fontSize: "0.9rem",
    fontFamily: theme.typography.fontFamily,
    color: "#232229",
    marginLeft: "0.5rem",
    "@media screen and (max-width: 615px)": {
      fontSize: "0.8rem",
    },
    "@media screen and (max-width: 470px)": {
      workBreak: "break-all",
    },
  },

  getMemberEmailContStyles: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  getMemberEmailStyles: {
    fontSize: "0.9rem",
    fontFamily: theme.typography.fontFamily,
    color: "#232229",
    marginLeft: "0.5rem",
    "@media screen and (max-width: 615px)": {
      fontSize: "0.8rem",
    },
  },
}));

export const getInviteButtonCustomStyles = {
  customStyles: (
    isActionButtonRequired,
    isAlreadyBooked,
    isMealBooked,
    isTodaysMealBooked,
    isButtonDisableRequired
  ) => {
    return {
      background:
        isAlreadyBooked && isTodaysMealBooked
          ? isButtonDisableRequired
            ? "lightgreen"
            : "red"
          : isMealBooked
          ? "red"
          : "transparent",
      color:
        isAlreadyBooked && isTodaysMealBooked
          ? isButtonDisableRequired
            ? "#000"
            : "#FFF"
          : isMealBooked
          ? "#FFF"
          : "#ef5d36",
      borderColor:
        isAlreadyBooked && isTodaysMealBooked
          ? isButtonDisableRequired
            ? "#4CAF50"
            : "red"
          : isMealBooked
          ? "red"
          : "#ef5d36",
      display: isActionButtonRequired ? "flex" : "none",
      "&:hover": {
        background:
          isAlreadyBooked && isTodaysMealBooked
            ? "transparent"
            : isMealBooked
            ? "transparent"
            : "#ef5d36",
        color:
          isAlreadyBooked && isTodaysMealBooked
            ? "red"
            : isMealBooked
            ? "red"
            : "#FFF",
        borderColor:
          isAlreadyBooked && isTodaysMealBooked
            ? "red"
            : isMealBooked
            ? "red"
            : "#ef5d36",
      },
      "@media screen and (max-width: 615px)": {
        fontSize: "0.8rem",
      },
      "@media screen and (max-width: 370px)": {
        padding: "0.15rem 0rem",
      },
    };
  },
};

export const getInviteMemberCardAnimation = {
  initial: {
    translateY: "25px",
    opacity: 0,
  },
  whileInView: {
    translateY: "0px",
    opacity: 1,
  },
  transition: (animationDuration) => {
    return {
      duration: animationDuration,
      repeatType: "reverse",
      ease: "easeInOut",
    };
  },
};
