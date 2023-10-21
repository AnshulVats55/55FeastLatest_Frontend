import { DashboardCardOneStyles } from "./DashboardCardOne.Styles";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const DashboardCardOne = ({ index, icon, cardLabel, cardValue }) => {
  const { topContStyles, cardLabelStyles, cardValueStyles } =
    DashboardCardOneStyles;

  return (
    <motion.div
      initial={{ translateY: 0 }}
      transition={{ ease: "easeInOut" }}
      whileHover={{ translateY: -4 }}
    >
      <Box sx={topContStyles(index)}>
        {icon}
        <Typography sx={cardLabelStyles(index)}>{cardLabel}</Typography>
        <Typography sx={cardValueStyles(index)}>{cardValue}</Typography>
      </Box>
    </motion.div>
  );
};

export default DashboardCardOne;
