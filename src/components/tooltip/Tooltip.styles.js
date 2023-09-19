import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const getTooltipStyles = {
  getTopContStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0px 0px 10px 0px",
  },

  getIconStyles: {
    color: "#EF5D36",
    fontSize: "1.50rem",
    cursor: "pointer",
    marginRight: "0.25rem",
  },

  getPopoverStyles: {
    background: "transparent",
  },

  getTooltipTitleStyles: {
    fontSize: "0.85rem",
    textAlign: "center",
    padding: "0.5rem",
    "@media screen and (max-width: 1275px)": {
      fontSize: "0.8rem",
    },
    "@media screen and (max-width: 346px)": {
      fontSize: "0.75rem",
    },
    maxWidth: "170px",
    background: "#FDFDFD",
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
    position: "relative",
    right: "0.5rem",
    zIndex: "1",
    "@media screen and (max-width: 1275px)": {
      fontSize: "0.80rem",
    },
    "@media screen and (max-width: 346px)": {
      fontSize: "0.75rem",
    },
  },
}));
