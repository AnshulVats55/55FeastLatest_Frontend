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
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import {
  Home,
  RestaurantMenu,
  RateReview,
  Close,
  Logout,
  EmojiPeople,
  LockReset,
  Dashboard,
} from "@mui/icons-material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import MenuIcon from "@mui/icons-material/Menu";
import { getNavbarStyles } from "./Navbar.Styles";
import CommonButton from "../button/CommonButton";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();
  console.log("pathame", pathname);

  const [currentURL, setCurrentURL] = useState("/");

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
      text: "Book meal",
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
      text: "Book meal",
      icon: <RestaurantMenu sx={getListItemIconStyles} />,
      url: "/bookyourmeal",
    },
    {
      text: "Dashboard",
      icon: <DashboardCustomizeIcon sx={getListItemIconStyles} />,
      url: "/admin/dashboard",
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
  const [anchorElPopoverMobile, setAnchorElPopoverMobile] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const handlePopoverOpenMobile = (event) => {
    setAnchorElPopoverMobile(event?.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElPopover(null);
  };

  const handlePopoverCloseMobile = () => {
    setAnchorElPopoverMobile(null);
  };

  const popoverOpen = Boolean(anchorElPopover);
  const popoverId = popoverOpen ? "simple-popover" : undefined;

  const popoverOpenMobile = Boolean(anchorElPopoverMobile);
  const popoverIdMobile = popoverOpenMobile ? "simple-popover" : undefined;

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
    <>
      <BottomNavigation
        sx={{
          width: 500,
          width: "100%",
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          zIndex: "1",
          display: { lg: "none", md: "none", sm: "none", xs: "flex" },
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        }}
        value={value}
        onChange={handleChange}
      >
        {isAdmin
          ? adminNavigationLinks?.map(({ text, url }, index) => {
              if (index !== 3) {
                return (
                  <BottomNavigationAction
                    label={text}
                    value={text}
                    icon={
                      index === 0 ? (
                        <Home />
                      ) : index === 1 ? (
                        <RestaurantMenu />
                      ) : index === 2 ? (
                        <Dashboard />
                      ) : (
                        <></>
                      )
                    }
                    key={index}
                    onClick={() => {
                      navigate(url);
                    }}
                    sx={{
                      color: "#EF5D36 !important",
                      "&:focus": { color: "#EF5D36 !important" },
                      "& .MuiBottomNavigationAction-label": {
                        fontSize: "0.9rem",
                        "@media screen and (max-width: 400px)": {
                          fontSize: "0.70rem",
                        },
                        "&.MuiBottomNavigationAction-label.Mui-selected": {
                          fontWeight: 600,
                          fontSize: "0.80rem",
                        },
                      },
                    }}
                  />
                );
              }
            })
          : memberNavigationLinks?.map(({ text, url }, index) => {
              if (index !== 2) {
                return (
                  <BottomNavigationAction
                    label={text}
                    value={text}
                    icon={
                      index === 0 ? (
                        <Home />
                      ) : index === 1 ? (
                        <RestaurantMenu />
                      ) : (
                        <></>
                      )
                    }
                    key={index}
                    onClick={() => {
                      navigate(url);
                    }}
                    sx={{
                      color: "#EF5D36 !important",
                      "&:focus": { color: "#EF5D36 !important" },
                      "& .MuiBottomNavigationAction-label": {
                        fontSize: "0.9rem",
                        "@media screen and (max-width: 400px)": {
                          fontSize: "0.70rem",
                        },
                        "&.MuiBottomNavigationAction-label.Mui-selected": {
                          fontWeight: 600,
                          fontSize: "0.80rem",
                        },
                      },
                    }}
                  />
                );
              }
            })}
        <BottomNavigationAction
          label="Actions"
          value="actions"
          icon={
            <Avatar
              src={
                photo ? photo : gender === "Male" ? MaleAvatar : FemaleAvatar
              }
              alt=""
              sx={{
                width: 40,
                height: 40,
                "@media screen and (max-width: 400px)": {
                  width: 36,
                  height: 36,
                },
              }}
            />
          }
          onClick={(event) => {
            handlePopoverOpenMobile(event);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            "& .MuiBottomNavigationAction-root": {
              background: "pink",
            },
            color: "#EF5D36 !important",
            "&:focus": { color: "#EF5D36 !important" },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "0.9rem",
              "@media screen and (max-width: 400px)": {
                fontSize: "0.70rem",
              },
              "&.MuiBottomNavigationAction-label.Mui-selected": {
                fontWeight: 600,
                fontSize: "0.80rem",
              },
            },
          }}
        />
        {popoverOpenMobile && (
          <NavbarPopover
            popoverId={popoverIdMobile}
            popoverOpen={popoverOpenMobile}
            anchorElPopover={anchorElPopoverMobile}
            handlePopoverClose={handlePopoverCloseMobile}
            isMobileView={true}
            actionToBePerformed={handleLogout}
          />
        )}
      </BottomNavigation>
      <AppBar sx={getAppbarStyles}>
        <Container maxWidth="xl">
          <Box sx={getToolbarContStyles}>
            <Toolbar sx={getToolbarStyles}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { lg: "none", md: "none", sm: "flex", xs: "none" },
                }}
              >
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
                            onClick={() => navigate(link.url)}
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
                          <Typography
                            key={index}
                            sx={getListItemStylesOne(index)}
                            onClick={() => navigate(link.url)}
                          >
                            {link.icon}
                            <Typography sx={getListItemTextStylesOne}>
                              {link.text}
                            </Typography>
                          </Typography>
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
                  onClick={() => navigate("/")}
                  sx={getBrandLogoStylesTwo}
                  className="brand_logo"
                >
                  FEASTIFY
                </Typography>
              </Box>
              <Box sx={getNavLinksStylesTwo}>
                <Typography
                  noWrap
                  onClick={() => navigate("/")}
                  sx={getBrandLogoStylesOne}
                  className="brand_logo"
                >
                  FEASTIFY
                </Typography>
                {isAdmin ? (
                  <Box sx={getNavLinksContStylesTwo}>
                    {adminNavigationLinks?.map((page, index) => {
                      return (
                        <motion.div
                          transition={{ duration: 0.15 }}
                          whileTap={{ scale: 0.95 }}
                          key={index}
                        >
                          <Typography
                            key={page.text}
                            onClick={() => navigate(page.url)}
                            sx={getNavLinksStylesOne(pathname === page.url)}
                          >
                            {page.text}
                          </Typography>
                        </motion.div>
                      );
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
                          key={page.text}
                          onClick={() => navigate(page.url)}
                          sx={getNavLinksStylesOne(pathname === page.url)}
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
                      isMobileView={false}
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
                        height: "2.25rem",
                        background: "transparent",
                        color: "#FFF",
                        borderRadius: "1.25rem",
                        border: "1px solid #FFF",
                        "&:hover": {
                          background: "#FFF",
                          border: "none",
                          color: "#232229",
                        },
                        "&:focus": {
                          outline: "none",
                        },
                        fontSize:14,
                      }}
                    />
                  </motion.div>
                </Box>
              </Box>

              <Box
                sx={{
                  flexGrow: 0,
                  display: { lg: "none", md: "none", sm: "flex", xs: "none" },
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
    </>
  );
};

export default Navbar;
