import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const getTooltipStyles = {
  getIconStyles: {
    color: "#EF5D36",
    fontSize: "1.50rem",
  },
};

export const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FDFDFD",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 170,
    fontSize: "0.85rem",
    fontWeight: 500,
    border: "1px solid #EF5D36",
    "@media screen and (max-width: 1275px)": {
      fontSize: "0.80rem",
    },
    "@media screen and (max-width: 346px)": {
      fontSize: "0.75rem",
    },
  },
}));
