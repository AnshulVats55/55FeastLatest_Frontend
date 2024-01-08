/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { getCommonLayoutStyles } from "./CommonLayout.Styles";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
const CommonLayout = ({ component }) => {
  const { classes } = getCommonLayoutStyles();
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/confirm-password" && pathname !== "/reset-password" && (
        <Navbar />
      )}
      <Container maxWidth="xl" className={classes.getContainerStyles}>
        {component}
      </Container>
    </>
  );
};

export default CommonLayout;
