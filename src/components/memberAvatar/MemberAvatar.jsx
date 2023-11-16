import MemberAvatarUtils from "./lib/MemberAvatar.Utils";
import { getMemberAvatarStyles } from "./MemberAvatar.Styles";
import { Box, Avatar, Typography } from "@mui/material";

const MemberAvatar = ({ memberName, key }) => {
  const { themeIndex } = MemberAvatarUtils();
  const { getBoxStyles, getAvatarStyles, getTypographyStyles } =
    getMemberAvatarStyles;

  return (
    <Box sx={getBoxStyles}>
      <Avatar sx={getAvatarStyles(themeIndex)}>
        {memberName?.split(" ")[0].substring(0, 1) +
          "" +
          memberName?.split(" ")[1].substring(0, 1)}
      </Avatar>
      <Typography sx={getTypographyStyles}>
        {memberName?.split(" ")[0]}
      </Typography>
      <Typography sx={getTypographyStyles}>
        {memberName?.split(" ")[1]}
      </Typography>
    </Box>
  );
};

export default MemberAvatar;
