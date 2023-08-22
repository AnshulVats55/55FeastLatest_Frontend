/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { Button, CircularProgress } from "@mui/material";
import { getInviteButtonStyles } from "./InviteButton.Styles";

const InviteButton = ({
  children,
  type,
  handleAction,
  styles,
  isButtonDisableRequired,
  isLoaderRequired,
}) => {
  const { classes } = getInviteButtonStyles(styles);

  const handleActionBeingPerformed = async () => {
    try {
      const response = await handleAction();
      return response;
    } catch (error) {
      return error;
    }
  };

  return (
    <Button
      className={classes.getButtonStyles}
      type={type}
      onClick={handleActionBeingPerformed}
      disabled={isButtonDisableRequired}
    >
      {children}&nbsp;
      {isLoaderRequired && (
        <CircularProgress size={15} thickness={4} color="inherit" />
      )}
    </Button>
  );
};

export default InviteButton;
