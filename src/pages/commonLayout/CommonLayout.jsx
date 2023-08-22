/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { getCommonLayoutStyles } from "./CommonLayout.Styles";
import { Container } from "@mui/material";

const CommonLayout = ({ component }) => {
  const { classes } = getCommonLayoutStyles();

  return (
    <Container maxWidth="xl" className={classes.getContainerStyles}>
      {component}
    </Container>
  );
};

export default CommonLayout;
