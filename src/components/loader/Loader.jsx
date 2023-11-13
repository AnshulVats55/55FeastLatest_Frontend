/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { Stack, LinearProgress } from "@mui/material";
import { getCircularProgressStyles } from "./Loader.Styles";

const Loader = () => {
  const { classes } = getCircularProgressStyles();

  return (
    <Stack className={classes.getLoaderContStyles} sx={{ color: "#ef5d36" }}>
      <LinearProgress
        color="inherit"
        className={classes.getLinearProgressStyles}
      />
    </Stack>
  );
};

export default Loader;
