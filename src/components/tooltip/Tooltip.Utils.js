import { useState } from "react";

const TooltipUtils = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return {
    tooltipOpen,
    handleTooltipOpen,
    handleTooltipClose,
  };
};

export default TooltipUtils;
