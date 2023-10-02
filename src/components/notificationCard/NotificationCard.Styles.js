export const getNotificationCardStyles = {
  getTopContStyles: {
    width: "100%",
    display: "flex",
    padding: "0.25rem 0rem",
    margin: "0.25rem 0rem",
    borderRadius: "0.25rem",
    transition: "0.20s ease-in-out",
    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
    },
    cursor: "pointer",
  },
  getAvatarContStyles: {
    width: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.25rem 0rem 0rem 0.25rem",
  },
  getMemberAvatarStyles: {
    background: "#FFEAE4",
    color: "#EF5D36",
    fontWeight: 500,
    transition: "0.20s ease-in-out",
    "&:hover": {
      color: "#FFF",
      background: "#EF5D36",
      fontWeight: 400,
    },
    "@media screen and (max-width: 899px)": {
        fontSize:"1.10rem",
    },
  },
  getNotificationContStyles: {
    width: "80%",
    wordBreak: "break-word",
    padding: "0rem 0.25rem",
    borderRadius: "0rem 0.25rem 0.25rem 0rem",
  },
  getNotificationTitleStyles: {
    fontSize: "0.9rem",
    color: "#000",
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
    "@media screen and (max-width: 899px)": {
      fontSize: "0.8rem",
    },
  },
  getNotificationBodyStyles: {
    fontSize: "0.75rem",
    color: "#000",
    fontWeight: 400,
    fontFamily: "Poppins, sans-serif",
    "@media screen and (max-width: 899px)": {
      fontSize: "0.7rem",
    },
  },
};
