import { getTooltipStyles } from "./Tooltip.styles";
import TooltipUtils from "./Tooltip.Utils";
import { Box } from "@mui/material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { HelpCenter } from "@mui/icons-material";

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
      <HelpCenter
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
