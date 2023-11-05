/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import { getDialogStyles } from "./Dialog.Styles";

const CustomDialog = ({ open, scroll, handleClose, image }) => {
  const { classes } = getDialogStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Typography
              variant="body1"
              textAlign={"center"}
              className={classes.getTopTextStyles}
            >
              This is the preview of your profile picture
            </Typography>
            <img
              src={image}
              alt=""
              width="100%"
              className={classes.getImageStyles}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.getActionButtonStyles}
            onClick={handleClose}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
