import { Box, Typography, Avatar } from "@mui/material";
import { DailyCountCardStyles } from "./DailyCountCard.styles";

const DailyCountCard = ({ id, memberName, memberEmail, status }) => {
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
    <Box sx={topContStyles}>
      <Box sx={boxOneStyles}>
        <Typography sx={typographyOneStyles}>{id}</Typography>
      </Box>
      <Box sx={boxTwoStyles}>
        <Avatar sx={avatarStyles}>{memberName?.substring(0, 1)}</Avatar>
      </Box>
      <Box sx={boxThreeStyles}>
        <Typography sx={typographyTwoStyles}>{memberName}</Typography>
        <Typography sx={typographyThreeStyles}>{memberEmail}</Typography>
      </Box>
      <Box sx={boxFourStyles}>
        <Typography sx={typographyFourStyles}>{status}</Typography>
      </Box>
    </Box>
  );
};

export default DailyCountCard;
