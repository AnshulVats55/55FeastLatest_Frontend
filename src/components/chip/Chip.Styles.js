import { makeStyles } from "tss-react/mui";

export const getChipStyles = makeStyles()((theme) => ({
  getChipContStyles: {
    // background:"green",
  },

  getTypographyOneStyles: {
    fontSize: "0.8rem",
    color: "#000",
    fontWeight:500,
  },
}));

export const getDateChipStyles = {
  dateChipStyles: (isSelected, isAlreadyBooked) => {
    return {
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
      "&:hover": {
        background: isAlreadyBooked
          ? "#4caf50"
          : isSelected
          ? "#ef5d36"
          : "#FFDAD1",
        color: isAlreadyBooked ? "#FFF" : isSelected ? "#FFF" : "#ef5d36",
      },
    };
  },
};
