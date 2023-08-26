/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Drawer,
  List,
  ListItem,
  Box,
} from "@mui/material";
import {
  Home,
  RestaurantMenu,
  RateReview,
  Close,
  RestartAlt,
  Logout,
  Male,
} from "@mui/icons-material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import MenuIcon from "@mui/icons-material/Menu";
import { getNavbarStyles } from "./Navbar.Styles";
import CommonButton from "../button/CommonButton";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import snackbarMessages from "../../Constants";
import MaleAvatar from "../../assets/male avatar.jpg";
import FemaleAvatar from "../../assets/female avatar.jpg";
import { setIsLoading } from "../../store/slices/LoaderSlice";
import Loader from "../loader/Loader";

const Navbar = () => {
  const { classes } = getNavbarStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAdmin, photo, gender } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const isLoading = useSelector((state) => {
    return state.loaderReducer.isLoading;
  });

  const memberNavigationLinks = [
    {
      text: "Home",
      icon: <Home className={classes.getListItemIconStyles} />,
      url: "/",
    },
    {
      text: "Book your meal",
      icon: <RestaurantMenu className={classes.getListItemIconStyles} />,
      url: "/bookyourmeal",
    },
    {
      text: "Reviews",
      icon: <RateReview className={classes.getListItemIconStyles} />,
      url: "/reviews",
    },
  ];

  const adminNavigationLinks = [
    {
      text: "Home",
      icon: <Home className={classes.getListItemIconStyles} />,
      url: "/",
    },
    {
      text: "Book your meal",
      icon: <RestaurantMenu className={classes.getListItemIconStyles} />,
      url: "/bookyourmeal",
    },
    {
      text: "Dashboard",
      icon: (
        <DashboardCustomizeIcon className={classes.getListItemIconStyles} />
      ),
      url: "/dashboard",
    },
    {
      text: "Reviews",
      icon: <RateReview className={classes.getListItemIconStyles} />,
      url: "/reviews",
    },
  ];

  const actionLinks = [
    {
      text: "Reset password",
      icon: <RestartAlt className={classes.getListItemIconStyles} />,
    },
    {
      text: "Logout",
      icon: <Logout className={classes.getListItemIconStyles} />,
    },
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(setIsLoading(true));
    localStorage.removeItem("memberToken");
    if (localStorage.getItem("memberToken") === null) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.SUCCESS,
          snackbarMessage: snackbarMessages.LOGOUT_SUCCESSFULL,
        })
      );
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
      dispatch(setIsLoading(false));
    } else {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.LOGOUT_FAILURE,
        })
      );
      dispatch(setIsLoading(false));
    }
  };

  return (
    <AppBar className={classes.getAppbarStyles}>
      <Container maxWidth="xl">
        <Box className={classes.getToolbarContStyles}>
          <Toolbar className={classes.getToolbarStyles}>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                className={classes.getHamburgerIconContStyles}
              >
                <MenuIcon className={classes.getHamburgerIconStyles} />
              </IconButton>
              {isAdmin ? (
                <Drawer
                  anchor="left"
                  open={Boolean(anchorElNav)}
                  onClick={handleCloseNavMenu}
                  sx={{
                    "& .MuiPaper-root": {
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      background: "transparent",
                    },
                    "& .MuiBox-root": {
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                    },
                  }}
                >
                  <Box
                    className={classes.getNavLinksContStylesOne}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <Close
                      className={classes.getCloseIconStylesOne}
                      onClick={handleCloseNavMenu}
                    />
                    <List>
                      {adminNavigationLinks?.map((link, index) => (
                        <ListItem
                          key={index}
                          component="a"
                          href={link.url}
                          className={classes.getListItemStylesOne}
                          sx={{
                            ...(index === 0
                              ? { marginTop: "2.5rem !important" }
                              : { marginTop: "1.5rem !important" }),
                          }}
                        >
                          {link.icon}
                          <Typography
                            className={classes.getListItemTextStylesOne}
                          >
                            {link.text}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              ) : (
                <Drawer
                  anchor="left"
                  open={Boolean(anchorElNav)}
                  onClick={handleCloseNavMenu}
                  sx={{
                    "& .MuiPaper-root": {
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      background: "transparent",
                    },
                    "& .MuiBox-root": {
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                    },
                  }}
                >
                  <Box
                    className={classes.getNavLinksContStylesOne}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <Close
                      className={classes.getCloseIconStylesOne}
                      onClick={handleCloseNavMenu}
                    />
                    <List>
                      {memberNavigationLinks?.map((link, index) => (
                        <ListItem
                          key={index}
                          component="a"
                          href={link.url}
                          className={classes.getListItemStylesOne}
                          sx={{
                            ...(index === 0
                              ? { marginTop: "2.5rem !important" }
                              : { marginTop: "1.5rem !important" }),
                          }}
                        >
                          {link.icon}
                          <Typography
                            className={classes.getListItemTextStylesOne}
                          >
                            {link.text}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              )}
            </Box>
            <Box
              sx={{
                // background: "orange",
                width: "100%",
                justifyContent: "center",
                display: { xs: "flex", md: "none" },
              }}
            >
              <Typography
                noWrap
                component="a"
                href="/"
                sx={{
                  fontSize: "1.5rem !important",
                  display: { xs: "flex", md: "none" },
                  // flexGrow: 2,
                  "@media screen and (max-width: 899px)": {
                    // flexGrow: 1,
                  },
                  "@media screen and (max-width: 599px)": {
                    // fontSize: "1.25rem !important",
                  },
                  "@media screen and (max-width: 399px)": {
                    fontSize: "1.10rem !important",
                    // mr: 3.5,
                  },
                }}
                className={classes.getBrandLogoStylesTwo}
              >
                55Feast
              </Typography>
            </Box>
            <Box className={classes.getNavLinksStylesTwo}>
              <Typography
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontSize: "1.5rem !important",
                }}
                className={classes.getBrandLogoStylesOne}
              >
                55Feast
              </Typography>
              {isAdmin ? (
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                  }}
                  className={classes.getNavLinksContStylesTwo}
                >
                  {adminNavigationLinks?.map((page, index) => {
                    if (index !== 1) {
                      return (
                        <motion.div
                          transition={{ duration: 0.15 }}
                          whileTap={{ scale: 0.95 }}
                          key={index}
                        >
                          <Typography
                            component="a"
                            href={page.url}
                            key={page.text}
                            onClick={handleCloseNavMenu}
                            className={classes.getNavLinksStylesOne}
                          >
                            {page.text}
                          </Typography>
                        </motion.div>
                      );
                    }
                  })}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                  }}
                  className={classes.getNavLinksContStylesTwo}
                >
                  {memberNavigationLinks?.map((page, index) => (
                    <motion.div
                      transition={{ duration: 0.15 }}
                      whileTap={{ scale: 0.95 }}
                      key={index}
                    >
                      <Typography
                        component="a"
                        href={page.url}
                        key={page.text}
                        onClick={handleCloseNavMenu}
                        className={classes.getNavLinksStylesOne}
                      >
                        {page.text}
                      </Typography>
                    </motion.div>
                  ))}
                </Box>
              )}
              <Box
                sx={{
                  flexGrow: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton sx={{ p: 0, marginRight: "1rem" }}>
                  <Avatar
                    src={
                      photo
                        ? photo
                        : gender === "Male"
                        ? MaleAvatar
                        : FemaleAvatar
                    }
                    alt=""
                    sx={{
                      width: 36,
                      height: 36,
                    }}
                  />
                </IconButton>
                <motion.div
                  initial={{ scale: 1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  <CommonButton
                    onClick={handleLogout}
                    children="Logout"
                    type=""
                    customStyles={{
                      width: "80px",
                      height: "40px",
                      background: "transparent",
                      color: "#FFF",
                      borderRadius: "4px",
                      border: "1px solid #FFF",
                      "&:hover": {
                        background: "#FFF",
                        border: "none",
                        color: "#232229",
                      },
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                  />
                </motion.div>
              </Box>
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, marginRight: "0.5rem" }}
              >
                <Avatar
                  src={
                    photo
                      ? photo
                      : gender === "Male"
                      ? MaleAvatar
                      : FemaleAvatar
                  }
                  alt=""
                  sx={{
                    width: 32,
                    height: 32,
                  }}
                />
              </IconButton>
              <Drawer
                anchor="right"
                open={Boolean(anchorElUser)}
                onClick={handleCloseUserMenu}
                sx={{
                  "& .MuiPaper-root": {
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    background: "transparent",
                  },
                  "& .MuiBox-root": {
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  },
                }}
              >
                <Box
                  className={classes.getNavLinksContStylesOne}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <Close
                    className={classes.getCloseIconStylesTwo}
                    onClick={handleCloseUserMenu}
                  />
                  <List>
                    {actionLinks?.map((link, index) => (
                      <ListItem
                        key={index}
                        className={classes.getListItemStylesTwo}
                        sx={{
                          ...(index === 0
                            ? { marginTop: "2.5rem !important" }
                            : { marginTop: "0.75rem !important" }),
                        }}
                        onClick={link.text === "Logout" ? handleLogout : null}
                      >
                        {link.icon}
                        <Typography
                          className={classes.getListItemTextStylesTwo}
                        >
                          {link.text}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
          {isLoading ? <Loader /> : <></>}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
