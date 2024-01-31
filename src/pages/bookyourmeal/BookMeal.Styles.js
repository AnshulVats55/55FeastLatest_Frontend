import { makeStyles } from "tss-react/mui";

export const getMealBookingStyles = makeStyles()((theme) => ({
  getGridContStyles: {
    width: "100%",
  },

  getGridItemStyles: {
    display: "flex",
    justifyContent: "center",
  },
}));

// export const getAdditionalStyles = {
//   customStyles: (isBooked) => {
//     return {
//       fontWeight: "normal",
//       background: isBooked ? "red" : "transparent",
//       color: isBooked ? "#FFF" : "#ef5d36",
//       borderRadius: "1.25rem",
//       border: "1px solid",
//       borderColor: isBooked ? "red" : "#ef5d36",
//       fontSize: "0.9rem",
//       "&:hover": {
//         background: isBooked ? "transparent" : "#ef5d36",
//         color: isBooked ? "red" : "#FFF",
//         borderColor: isBooked ? "red" : "#ef5d36",
//       },
//       "&:focus": {
//         outline: "none",
//       },
//       "@media screen and (max-width: 400px)": {
//         fontSize: "0.85rem",
//       },
//     };
//   },
// };
