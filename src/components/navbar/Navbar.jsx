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
  Logout,
  EmojiPeople,
  LockReset,
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
import NavbarPopover from "../navbarPopover/NavbarPopover";

const Navbar = () => {
  const {
    getAppbarStyles,
    getToolbarContStyles,
    getToolbarStyles,
    getHamburgerIconContStyles,
    getHamburgerIconStyles,
    getBrandLogoStylesTwo,
    getBrandLogoStylesOne,
    getNavLinksContStylesOne,
    getNavLinksStylesOne,
    getNavLinksContStylesTwo,
    getNavLinksStylesTwo,
    getListItemStylesOne,
    getListItemStylesTwo,
    getCloseIconStylesOne,
    getCloseIconStylesTwo,
    getListItemIconStyles,
    getListItemTextStylesOne,
    getListItemTextStylesTwo,
    getCurrentUserNameStyles,
  } = getNavbarStyles;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAdmin, photo, gender, firstName, lastName } = useSelector(
    (state) => {
      return state.memberDataReducer;
    }
  );

  const memberName = firstName + " " + lastName;

  const isLoading = useSelector((state) => {
    return state.loaderReducer.isLoading;
  });

  const memberNavigationLinks = [
    {
      text: "Home",
      icon: <Home sx={getListItemIconStyles} />,
      url: "/",
    },
    {
      text: "Book your meal",
      icon: <RestaurantMenu sx={getListItemIconStyles} />,
      url: "/bookyourmeal",
    },
    {
      text: "Reviews",
      icon: <RateReview sx={getListItemIconStyles} />,
      url: "/reviews",
    },
  ];

  const adminNavigationLinks = [
    {
      text: "Home",
      icon: <Home sx={getListItemIconStyles} />,
      url: "/",
    },
    {
      text: "Book your meal",
      icon: <RestaurantMenu sx={getListItemIconStyles} />,
      url: "/bookyourmeal",
    },
    {
      text: "Dashboard",
      icon: <DashboardCustomizeIcon sx={getListItemIconStyles} />,
      url: "/dashboard",
    },
    {
      text: "Reviews",
      icon: <RateReview sx={getListItemIconStyles} />,
      url: "/reviews",
    },
  ];

  const actionLinks = [
    {
      text: `${memberName}`,
      icon: <EmojiPeople sx={getListItemIconStyles} />,
    },
    {
      text: "Reset password",
      icon: <LockReset sx={getListItemIconStyles} />,
    },
    {
      text: "Logout",
      icon: <Logout sx={getListItemIconStyles} />,
    },
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElPopover, setAnchorElPopover] = useState(null);
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

  const handlePopoverOpen = (event) => {
    setAnchorElPopover(event?.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElPopover(null);
  };

  const popoverOpen = Boolean(anchorElPopover);
  const popoverId = popoverOpen ? "simple-popover" : undefined;

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
      navigate("/");
      window.location.reload();
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

  const navigateToConfirmPassword = () => {
    navigate("/confirm-password");
  };

  return (
    <AppBar sx={getAppbarStyles}>
      <Container maxWidth="xl">
        <Box sx={getToolbarContStyles}>
          <Toolbar sx={getToolbarStyles}>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={getHamburgerIconContStyles}
              >
                <MenuIcon sx={getHamburgerIconStyles} />
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
                    sx={getNavLinksContStylesOne}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <Close
                      sx={getCloseIconStylesOne}
                      onClick={handleCloseNavMenu}
                    />
                    <List>
                      {adminNavigationLinks?.map((link, index) => (
                        <ListItem
                          key={index}
                          component="a"
                          href={link.url}
                          sx={getListItemStylesOne(index)}
                        >
                          {link.icon}
                          <Typography sx={getListItemTextStylesOne}>
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
                    sx={getNavLinksContStylesOne}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <Close
                      sx={getCloseIconStylesOne}
                      onClick={handleCloseNavMenu}
                    />
                    <List>
                      {memberNavigationLinks?.map((link, index) => (
                        <ListItem
                          key={index}
                          component="a"
                          href={link.url}
                          sx={getListItemStylesOne(index)}
                        >
                          {link.icon}
                          <Typography sx={getListItemTextStylesOne}>
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
                width: "100%",
                justifyContent: "center",
                display: { xs: "flex", md: "none" },
              }}
            >
              <Typography
                noWrap
                component="a"
                href="/"
                sx={getBrandLogoStylesTwo}
              >
                55Feast
              </Typography>
            </Box>
            <Box sx={getNavLinksStylesTwo}>
              <Typography
                noWrap
                component="a"
                href="/"
                sx={getBrandLogoStylesOne}
              >
                55Feast
              </Typography>
              {isAdmin ? (
                <Box sx={getNavLinksContStylesTwo}>
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
                            sx={getNavLinksStylesOne}
                          >
                            {page.text}
                          </Typography>
                        </motion.div>
                      );
                    }
                  })}
                </Box>
              ) : (
                <Box sx={getNavLinksContStylesTwo}>
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
                        sx={getNavLinksStylesOne}
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
                <IconButton
                  sx={{ p: 0, marginRight: "1rem" }}
                  onClick={(event) => handlePopoverOpen(event)}
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
                      width: 36,
                      height: 36,
                    }}
                  />
                </IconButton>
                {popoverOpen && (
                  <NavbarPopover
                    popoverId={popoverId}
                    popoverOpen={popoverOpen}
                    anchorElPopover={anchorElPopover}
                    handlePopoverClose={handlePopoverClose}
                  />
                )}
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
                  sx={getNavLinksContStylesOne}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <Close
                    sx={getCloseIconStylesTwo}
                    onClick={handleCloseUserMenu}
                  />
                  <List>
                    {actionLinks?.map((link, index) => (
                      <ListItem
                        key={index}
                        sx={getListItemStylesTwo(index)}
                        onClick={
                          index === 0
                            ? null
                            : index === 1
                            ? navigateToConfirmPassword
                            : index === 2
                            ? handleLogout
                            : null
                        }
                      >
                        {link.icon}
                        <Typography sx={getListItemTextStylesTwo}>
                          {link.text}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
          {isLoading && <Loader />}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
