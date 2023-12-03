import { Box, Typography, Avatar } from "@mui/material";
import { DailyCountCardStyles } from "./DailyCountCard.styles";
import { motion } from "framer-motion";
import CommonButton from "../../button/CommonButton";
import InviteButton from "../../inviteButton/InviteButton";

const DailyCountCard = ({ id, memberName, memberEmail, type }) => {
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
    buttonStyles,
  } = DailyCountCardStyles;

  return (
    <motion.div
      initial={{ scale: 1 }}
      transition={{ ease: "easeInOut" }}
      whileHover={{ scale: 1.01 }}
    >
      <Box sx={topContStyles}>
        <Box sx={boxOneStyles}>
          <Typography sx={typographyOneStyles}>{id}</Typography>
        </Box>
        <Box sx={boxTwoStyles}>
          <Avatar sx={avatarStyles}>
            {memberName?.toUpperCase().substring(0, 1)}
          </Avatar>
        </Box>
        <Box sx={boxThreeStyles}>
          <Typography sx={typographyTwoStyles}>{memberName}</Typography>
          <Typography sx={typographyThreeStyles}>{memberEmail}</Typography>
        </Box>
        <Box sx={boxFourStyles}>
          {type === "status" ? (
            <Typography sx={typographyFourStyles}>Booked</Typography>
          ) : (
            <InviteButton
              type="button"
              isLoaderRequired={false}
              handleAction={() => alert("clicked")}
              styles={buttonStyles}
            >
              Book
            </InviteButton>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default DailyCountCard;
