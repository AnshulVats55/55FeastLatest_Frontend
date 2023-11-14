import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarPopoverUtils = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return {
    navigate,
    id,
    anchorEl,
    open,
    handlePopoverOpen,
    handlePopoverClose,
  };
};

export default NavbarPopoverUtils;
