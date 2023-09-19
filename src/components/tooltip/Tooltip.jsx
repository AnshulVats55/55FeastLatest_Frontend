import { getTooltipStyles } from "./Tooltip.styles";
import TooltipUtils from "./Tooltip.Utils";
import { Box, ClickAwayListener } from "@mui/material";
import { HtmlTooltip } from "./Tooltip.styles";
import { HelpCenter } from "@mui/icons-material";

const CustomTooltip = ({ tooltipTitle }) => {
  const { tooltipOpen, handleTooltipOpen, handleTooltipClose } = TooltipUtils();
  const { getIconStyles } = getTooltipStyles;
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box>
        <HtmlTooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={tooltipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={tooltipTitle}
        >
          <HelpCenter
            sx={getIconStyles}
            color="inherit"
            onClick={tooltipOpen ? handleTooltipClose : handleTooltipOpen}
          />
        </HtmlTooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default CustomTooltip;
