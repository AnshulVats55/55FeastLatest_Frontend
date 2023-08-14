import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { getButtonStyles } from "./CommonButton.Styles";

const CommonButton = ({
  children,
  type,
  customStyles,
  onClick,
  isLoaderRequired,
}) => {
  const { classes } = getButtonStyles(customStyles);

  return (
    <>
      <Button
        className={classes.getCommonButtonStyles}
        type={type}
        onClick={onClick}
      >
        {children}&nbsp;
        {isLoaderRequired && (
          <CircularProgress size={15} thickness={4} color="inherit" />
        )}
      </Button>
    </>
  );
};

export default CommonButton;
