import { useRef, useEffect } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Grid,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";

const HomeBookingDialog = ({ open, handleClose }) => {
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        // className={classes.getDialogBoxStyles}
      >
        <Box>
          <Cancel
            // className={classes.cancelIconStyles}
            onClick={handleClose}
          />
        </Box>
        <DialogTitle
          id="scroll-dialog-title"
          //   className={classes.getDialogTitleStyles}
        >
          Add new member
        </DialogTitle>
        <DialogContent
          dividers={true}
          //   className={classes.getDialogContentStyles}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            // className={classes.getDialogContentTextStyles}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                "@media screen and (max-width: 532px)": {
                  fontSize: "0.9rem",
                },
              }}
            >
              Easily add new members to the portal for receiving their lunch
              counts
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HomeBookingDialog;
