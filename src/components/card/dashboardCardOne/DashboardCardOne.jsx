import DashboardCardOneUtils from "./DashboardCardOne.Utils";
import { DashboardCardOneStyles } from "./DashboardCardOne.Styles";
import { Box, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { motion } from "framer-motion";
import MissedCountDialog from "../../dialog/missedCountDialog/MissedCountDialog";
import CustomTooltip from "../../tooltip/Tooltip";

const DashboardCardOne = ({
  index,
  icon,
  cardLabel,
  cardValue,
  regularizationData,
  isTooltipRequired,
}) => {
  const {
    missedCountDialogOpen,
    missedCountDialogScroll,
    handleMissedCountDialogOpen,
    handleMissedCountDialogClose,
  } = DashboardCardOneUtils();
  const {
    topContStyles,
    threeDotsStyles,
    cardLabelStyles,
    cardValueStyles,
    tooltipContStyles,
  } = DashboardCardOneStyles;

  return (
    <motion.div
      initial={{ translateY: 0 }}
      transition={{ ease: "easeInOut" }}
      whileHover={{ translateY: -4 }}
    >
      <Box sx={topContStyles(index)}>
        {index === 2 && regularizationData && (
          <MoreVert
            sx={threeDotsStyles}
            onClick={handleMissedCountDialogOpen("paper")}
          />
        )}
        {isTooltipRequired && index === 3 && (
          <Box sx={tooltipContStyles}>
            <CustomTooltip tooltipTitle="Feast Factor is the ratio of meals booked by you and total meals booked" />
          </Box>
        )}
        {icon}
        <Typography sx={cardLabelStyles(index)}>{cardLabel}</Typography>
        <Typography sx={cardValueStyles(index)}>{cardValue}</Typography>
        {missedCountDialogOpen && (
          <MissedCountDialog
            open={missedCountDialogOpen}
            scroll={missedCountDialogScroll}
            handleClose={handleMissedCountDialogClose}
            regularizationData={regularizationData}
          />
        )}
      </Box>
    </motion.div>
  );
};

export default DashboardCardOne;
