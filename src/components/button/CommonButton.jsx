/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { Button, CircularProgress } from "@mui/material";
import { getButtonStyles } from "./CommonButton.Styles";

const CommonButton = ({
  children,
  type,
  customStyles,
  onClick,
  isLoaderRequired,
  isDisabled,
}) => {
  const { classes } = getButtonStyles(customStyles);

  return (
    <Button
      className={classes.getCommonButtonStyles}
      type={type}
      onClick={onClick}
      disabled={isDisabled ? isDisabled : false}
    >
      {children}&nbsp;
      {isLoaderRequired && (
        <CircularProgress size={15} thickness={4} color="inherit" />
      )}
    </Button>
  );
};

export default CommonButton;
