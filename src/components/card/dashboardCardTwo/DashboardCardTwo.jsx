import { DashboardCardTwoStyles } from "./DashboardCardTwo.Styles";
import { Box, Typography } from "@mui/material";
import CommonButton from "../../button/CommonButton";
import { motion } from "framer-motion";

const DashboardCardTwo = ({ index, icon, cardLabel, buttonChildren }) => {
  const { boxOneStyles, boxTwoStyles, cardLabelStyles, buttonStyles } =
    DashboardCardTwoStyles;

  return (
    <motion.div
      initial={{ scale: 1 }}
      transition={{ ease: "easeInOut" }}
      whileHover={{ scale: 1.025 }}
    >
      <Box sx={boxOneStyles(index)}>
        {icon}
        <Box sx={boxTwoStyles}>
          <Typography sx={cardLabelStyles(index)}>{cardLabel}</Typography>
          <CommonButton
            children={buttonChildren}
            isLoaderRequired={false}
            type=""
            onClick={() => {}}
            isDisabled={false}
            customStyles={buttonStyles}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default DashboardCardTwo;
