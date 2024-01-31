import { Box, Typography } from "@mui/material";
import CommonButton from "../button/CommonButton";

const Banner = ({
  bannerText,
  actionToBePerformed,
  isLoading,
  isActionPerformed,
  buttonChildren,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#F2FAFF",
        border: "1px solid #009BFF",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          maxWidth: "57%",
          display: "flex",
          flexWrap: "wrap",
          padding: "0.75rem 0.25rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "#009BFF",
            fontWeight: 500,
            "@media screen and (max-width: 400px)": {
              fontSize: "0.8rem",
            },
          }}
        >
          {bannerText}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          maxWidth: "43%",
          padding: "0 0.25rem",
        }}
      >
        <CommonButton
          onClick={actionToBePerformed}
          customStyles={{
            fontWeight: "normal",
            background: isActionPerformed ? "red" : "transparent",
            color: isActionPerformed ? "#FFF" : "#ef5d36",
            borderRadius: "1.25rem",
            border: "1px solid",
            borderColor: isActionPerformed ? "red" : "#ef5d36",
            fontSize: 13,
            "&:hover": {
              background: isActionPerformed ? "transparent" : "#ef5d36",
              color: isActionPerformed ? "red" : "#FFF",
              borderColor: isActionPerformed ? "red" : "#ef5d36",
            },
            "&:focus": {
              outline: "none",
            },
            "@media screen and (max-width: 400px)": {
              fontSize: 12,
            },
          }}
          isLoaderRequired={isLoading}
          children={buttonChildren}
        >
          Book Meal
        </CommonButton>
      </Box>
    </Box>
  );
};

export default Banner;
