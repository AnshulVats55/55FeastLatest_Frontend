import MemberAvatarUtils from "./lib/MemberAvatar.Utils";
import { getMemberAvatarStyles } from "./MemberAvatar.Styles";
import { Box, Avatar, Typography } from "@mui/material";

const MemberAvatar = ({ memberName, key }) => {
  const { themeIndex } = MemberAvatarUtils();
  const { getBoxStyles, getAvatarStyles, getTypographyStyles } =
    getMemberAvatarStyles;

  return (
    <Box sx={getBoxStyles} key={key}>
      <Avatar sx={getAvatarStyles(themeIndex)}>
        {memberName?.toUpperCase().split(" ")[0].substring(0, 1) +
          "" +
          memberName?.toUpperCase().split(" ")[1].substring(0, 1)}
      </Avatar>
      <Typography sx={getTypographyStyles}>
        {memberName?.split(" ")[0].charAt(0).toUpperCase() +
          memberName?.split(" ")[0].slice(1)}
      </Typography>
      <Typography sx={getTypographyStyles}>
        {memberName?.split(" ")[1].charAt(0).toUpperCase() +
          memberName?.split(" ")[1].slice(1)}
      </Typography>
    </Box>
  );
};

export default MemberAvatar;
