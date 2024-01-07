import { getTooltipStyles } from "./Tooltip.styles";
import TooltipUtils from "./Tooltip.Utils";
import { Box, Popover, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

const CustomTooltip = ({ tooltipTitle }) => {
  const { anchorEl, handleOpenTooltip, handleCloseTooltip, open, id } =
    TooltipUtils();
  const {
    getTopContStyles,
    getIconStyles,
    getPopoverStyles,
    getTooltipTitleStyles,
  } = getTooltipStyles;

  return (
    <Box sx={getTopContStyles}>
      <HelpIcon
        aria-describedby={id}
        variant="contained"
        onClick={handleOpenTooltip}
        sx={getIconStyles}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseTooltip}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={getPopoverStyles}
      >
        <Typography sx={getTooltipTitleStyles}>{tooltipTitle}</Typography>
      </Popover>
    </Box>
  );
};

export default CustomTooltip;
