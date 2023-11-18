import { Box, Typography, Avatar } from "@mui/material";
import { DailyCountCardStyles } from "./DailyCountCard.styles";
import { motion } from "framer-motion";

const DailyCountCard = ({ id, memberName, memberEmail }) => {
  const {
    topContStyles,
    typographyOneStyles,
    avatarStyles,
    boxOneStyles,
    boxTwoStyles,
    boxThreeStyles,
    boxFourStyles,
    typographyTwoStyles,
    typographyThreeStyles,
    typographyFourStyles,
  } = DailyCountCardStyles;

  return (
    <motion.div
      initial={{ scale: 1 }}
      transition={{ ease: "easeInOut" }}
      whileHover={{ scale: 1.010 }}
    >
      <Box sx={topContStyles}>
        <Box sx={boxOneStyles}>
          <Typography sx={typographyOneStyles}>{id}</Typography>
        </Box>
        <Box sx={boxTwoStyles}>
          <Avatar sx={avatarStyles}>{memberName?.toUpperCase().substring(0, 1)}</Avatar>
        </Box>
        <Box sx={boxThreeStyles}>
          <Typography sx={typographyTwoStyles}>{memberName}</Typography>
          <Typography sx={typographyThreeStyles}>{memberEmail}</Typography>
        </Box>
        <Box sx={boxFourStyles}>
          <Typography sx={typographyFourStyles}>Booked</Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default DailyCountCard;
