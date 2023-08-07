import { makeStyles } from "tss-react/mui";

export const getChipStyles = makeStyles()((theme) => ({
  getChipContStyles: {
    width: "95%",
  },

  getTypographyOneStyles: {
    fontSize: "0.8rem",
    color: "#000",
    fontWeight: 500,
  },
}));

export const getDateChipStyles = {
  dateChipStyles: (isSelected, isAlreadyBooked) => {
    return {
      width: "100%",
      cursor: "pointer",
      background: isAlreadyBooked
        ? "#4caf50"
        : isSelected
        ? "#ef5d36"
        : "#FFDAD1",
      color: isAlreadyBooked ? "#FFF" : isSelected ? "#FFF" : "#ef5d36",
      borderRadius: "5px !important",
      fontWeight: 500,
      padding: "2rem 1.25rem",
      fontSize: "1rem",
      border: "1px solid #FFDAD1",
      "&:hover": {
        background: isAlreadyBooked
          ? "#4caf50"
          : isSelected
          ? "#ef5d36"
          : "#FFDAD1",
        color: isAlreadyBooked ? "#FFF" : isSelected ? "#FFF" : "#ef5d36",
        borderColor: !isAlreadyBooked ? "#ef5d36" : "",
      },
      "@media screen and (max-width: 599px)": {
        padding: "1.75rem 0.9rem",
      },
      "@media screen and (max-width: 550px)": {
        padding: "1.75rem 0.8rem",
        fontSize: "0.9rem",
      },
    };
  },
};
