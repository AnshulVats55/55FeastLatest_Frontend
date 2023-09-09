/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import {
  Typography,
  Skeleton,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import CommonButton from "../button/CommonButton";
import {
  getBookingCardStyles,
  getCommonButtonCustomStyles,
} from "./BookingCard.Styles";
import { motion } from "framer-motion";
import BookingkCardUtils from "./BookingkCard.Utils";

const BookingCard = ({
  image,
  heading,
  caption,
  actionName,
  animationDuration,
  onClick,
  isBooked,
  label,
  isLoaderRequired,
  isStatusFetchingRequired,
  isStatusFetched,
}) => {
  const { classes } = getBookingCardStyles();
  const { isDataLoaded } = BookingkCardUtils();
  const { customStyles, getButtonStyles } = getCommonButtonCustomStyles;

  return (
    <motion.div
      className={classes.getCardStyles}
      initial={{ translateY: "30px", opacity: 0 }}
      animate={{ translateY: "0px", opacity: 1 }}
      whileHover={{ scale: 1.015 }}
      transition={{
        duration: animationDuration,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {isDataLoaded ? (
        <>
          <Box className={classes.getCardLabelContStyles}>
            <Typography className={classes.getCardLabelStyles}>
              {label}
            </Typography>
          </Box>
          <img src={image} alt="" className={classes.getMemberPictureStyles} />
          <Typography className={classes.getHeadingStyles}>
            {heading}
          </Typography>
          <Typography className={classes.getCaptionStyles}>
            {caption}
          </Typography>
          {isStatusFetchingRequired ? (
            isStatusFetched ? (
              <Button
                onClick={onClick ? onClick : null}
                isLoaderRequired={isLoaderRequired}
                isStatusFetched={isStatusFetched}
                sx={getButtonStyles(isBooked)}
              >
                {actionName}&nbsp;
                {isLoaderRequired && (
                  <CircularProgress size={15} thickness={4} color="inherit" />
                )}
              </Button>
            ) : (
              <Button sx={getButtonStyles(isBooked)}>
                Fetching status...&nbsp;
                <CircularProgress size={15} thickness={4} color="inherit" />
              </Button>
            )
          ) : (
            <CommonButton
              children={actionName}
              type=""
              customStyles={customStyles(isBooked)}
              onClick={onClick ? onClick : null}
              isLoaderRequired={isLoaderRequired}
              isStatusFetched={isStatusFetched}
            />
          )}
        </>
      ) : (
        <>
          <Skeleton animation="wave" className={classes.getImageSkeletonStyles}>
            <img
              src={image}
              alt=""
              className={classes.getMemberPictureStyles}
            />
          </Skeleton>
          <Skeleton animation="wave">
            <Typography className={classes.getHeadingStyles}>
              {heading}
            </Typography>
          </Skeleton>
          <Skeleton animation="wave">
            <Typography className={classes.getCaptionStyles}>
              {caption}
            </Typography>
          </Skeleton>
          <Skeleton animation="wave">
            <CommonButton
              children={actionName}
              type=""
              customStyles={customStyles(isBooked)}
              onClick={onClick ? onClick : null}
              isLoaderRequired={isLoaderRequired}
            />
          </Skeleton>
        </>
      )}
    </motion.div>
  );
};

export default BookingCard;
