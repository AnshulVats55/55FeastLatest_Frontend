import { useState } from "react";

const TooltipUtils = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenTooltip = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseTooltip = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return {
    handleOpenTooltip,
    handleCloseTooltip,
    anchorEl,
    open,
    id,
  };
};

export default TooltipUtils;
