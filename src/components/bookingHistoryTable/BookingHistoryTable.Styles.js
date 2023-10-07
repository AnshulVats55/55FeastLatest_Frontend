export const BookingHistoryTableStyles = {
  gridContStyles: {
    cursor: "pointer",
    border: "none",
    borderRadius: "0.25rem",
    background: "#FAFAFA",
    margin: "0.25rem 0rem",
    transition: "0.2s ease-in-out",
    "&:hover": {
      boxShadow:
        "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    },
  },

  gridItemOneStyles: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0.25rem",
    "@media screen and (max-width: 900px)": {
      display: "none",
    },
  },

  avatarStyles: {
    background: "#FFEAE4",
    color: "#EF5D36",
    fontWeight: 500,
    transition: "0.20s ease-in-out",
    "&:hover": {
      color: "#FFF",
      background: "#EF5D36",
      fontWeight: 400,
    },
  },

  gridItemTwoStyles: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0rem",
  },

  gridItemThreeStyles: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0rem",
    "@media screen and (max-width: 600px)": {
      display: "none",
    },
  },

  gridItemFourStyles: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0rem",
  },

  gridItemFiveStyles: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0rem",
    "@media screen and (max-width: 900px)": {
      display: "none",
    },
  },

  typographyStyles: {
    fontSize: "0.9rem",
    fontFamily: "Poppins, sans-serif",
  },

  statusTextStyles: {
    background: "#DEFFDF",
    color: "#4CAF50",
    padding: "0.1rem 0.5rem",
    border: "1px solid #4FAC50",
    fontSize: "0.9rem",
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
    border: "none",
    borderRadius: "0.25rem",
  },
};
