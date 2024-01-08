import DashboardCardOneUtils from "./DashboardCardOne.Utils";
import { DashboardCardOneStyles } from "./DashboardCardOne.Styles";
import { Box, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { motion } from "framer-motion";
import MissedCountDialog from "../../dialog/missedCountDialog/MissedCountDialog";

const DashboardCardOne = ({
  index,
  icon,
  cardLabel,
  cardValue,
  regularizationData,
}) => {
  const {
    missedCountDialogOpen,
    missedCountDialogScroll,
    handleMissedCountDialogOpen,
    handleMissedCountDialogClose,
  } = DashboardCardOneUtils();
  const { topContStyles, threeDotsStyles, cardLabelStyles, cardValueStyles } =
    DashboardCardOneStyles;

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
