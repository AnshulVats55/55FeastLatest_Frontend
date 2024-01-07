import NavbarPopoverUtils from "./NavbarPopover.Utils";
import { getNavbarPopoverStyles } from "./NavbarPopover.Styles";
import { Popover, Typography, Box } from "@mui/material";

const NavbarPopover = ({
  popoverId,
  popoverOpen,
  anchorElPopover,
  handlePopoverClose,
  isMobileView,
  actionToBePerformed,
}) => {
  const { navigate } = NavbarPopoverUtils();
  const {
    getPopoverStyles,
    getPopoverStylesMobile,
    getLinkContStyles,
    getLinkStyles,
  } = getNavbarPopoverStyles;

  return (
    <Box>
      <Popover
        id={popoverId}
        open={popoverOpen}
        anchorEl={anchorElPopover}
        onClose={handlePopoverClose}
        anchorOrigin={
          isMobileView
            ? { vertical: "top", horizontal: "right" }
            : { vertical: "bottom", horizontal: "right" }
        }
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={isMobileView ? getPopoverStylesMobile : getPopoverStyles}
      >
        <Box sx={getLinkContStyles(0)}>
          <Typography
            component="a"
            onClick={() => {
              navigate("/profile");
              handlePopoverClose();
            }}
            sx={getLinkStyles}
          >
            Profile
          </Typography>
        </Box>
        <Box sx={getLinkContStyles(1)}>
          <Typography
            component="a"
            onClick={() => {
              navigate("/confirm-password");
              handlePopoverClose();
            }}
            sx={getLinkStyles}
          >
            Reset Password
          </Typography>
        </Box>
        {isMobileView && (
          <Box sx={getLinkContStyles(1)}>
            <Typography
              component="a"
              onClick={actionToBePerformed}
              sx={getLinkStyles}
            >
              Logout
            </Typography>
          </Box>
        )}
      </Popover>
    </Box>
  );
};

export default NavbarPopover;
