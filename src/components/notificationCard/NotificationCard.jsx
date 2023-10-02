import NotificationCardUtils from "./NotificationCard.Utils";
import { getNotificationCardStyles } from "./NotificationCard.Styles";
import { Avatar, Box, Typography } from "@mui/material";

const NotificationCard = ({
  memberName,
  notificationTitle,
  notificationBody,
}) => {
  const {} = NotificationCardUtils();
  const {
    getTopContStyles,
    getAvatarContStyles,
    getMemberAvatarStyles,
    getNotificationContStyles,
    getNotificationTitleStyles,
    getNotificationBodyStyles,
  } = getNotificationCardStyles;

  return (
    <Box sx={getTopContStyles}>
      <Box sx={getAvatarContStyles}>
        <Avatar sx={getMemberAvatarStyles}>
          {memberName?.substring(0, 1)}
        </Avatar>
      </Box>
      <Box sx={getNotificationContStyles}>
        <Typography sx={getNotificationTitleStyles}>
          {notificationTitle}
        </Typography>
        <Typography sx={getNotificationBodyStyles}>
          {notificationBody}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationCard;
