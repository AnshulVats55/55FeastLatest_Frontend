/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
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
  Badge,
  Popover,
} from "@mui/material";
import { Close, CircleNotifications } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { getNavbarStyles } from "./Navbar.Styles";
import CommonButton from "../button/CommonButton";
import { motion } from "framer-motion";
import MaleAvatar from "../../assets/male avatar.jpg";
import FemaleAvatar from "../../assets/female avatar.jpg";
import Loader from "../loader/Loader";
import NavbarUtils from "./Navbar.Utils";
import NotificationCard from "../notificationCard/NotificationCard";

const Navbar = () => {
  const { classes } = getNavbarStyles();
  const {
    isAdmin,
    photo,
    gender,
    memberName,
    isLoading,
    memberNavigationLinks,
    adminNavigationLinks,
    actionLinks,
    anchorElNav,
    anchorElUser,
    toggleDrawer,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleOpenUserMenu,
    handleCloseUserMenu,
    handleLogout,
    handleOpenNotifications,
    handleOpenMobileNotifications,
    handleCloseNotifications,
    handleCloseMobileNotifications,
    isPopoverOpen,
    isMobilePopoverOpen,
    popoverOpen,
    mobilePopoverOpen,
    idOne,
    idTwo,
    isNotificationTriggered,
  } = NavbarUtils();

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
                  "@media screen and (max-width: 400px)": {
                    fontSize: "1.10rem !important",
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
                  background: "",
                }}
              >
                <Badge
                  badgeContent={isNotificationTriggered ? "New" : "0"}
                  color="success"
                  className={classes.getBadgeStyles}
                >
                  <CircleNotifications
                    color="inherit"
                    className={classes.getNotificationIconStyles}
                    aria-describedby={idOne}
                    onClick={handleOpenNotifications}
                  />
                  <Popover
                    id={idOne}
                    open={popoverOpen}
                    anchorEl={isPopoverOpen}
                    onClose={handleCloseNotifications}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    sx={{
                      background: "transparent",
                      "& .MuiPaper-root": {
                        width: 300,
                        maxHeight: 350,
                        padding: "0.5rem 0.5rem",
                        overflowY: "scroll",
                        "&::-webkit-scrollbar": {
                          display: "none",
                        },
                      },
                    }}
                  >
                    {isNotificationTriggered ? (
                      <NotificationCard
                        memberName={memberName}
                        notificationTitle="Book your meal"
                        notificationBody="Book your meal now! Bookings are open till 9AM morning"
                      />
                    ) : (
                      <NotificationCard
                        memberName={memberName}
                        notificationTitle="Hurray!"
                        notificationBody="You've no new notifications"
                      />
                    )}
                  </Popover>
                </Badge>
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
              <Badge
                color="success"
                className={classes.getBadgeStyles}
                badgeContent={isNotificationTriggered ? "1" : "0"}
              >
                <CircleNotifications
                  color="inherit"
                  className={classes.getNotificationIconStyles}
                  aria-describedby={idTwo}
                  onClick={handleOpenMobileNotifications}
                />
                <Popover
                  id={idTwo}
                  open={mobilePopoverOpen}
                  anchorEl={isMobilePopoverOpen}
                  onClose={handleCloseMobileNotifications}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  sx={{
                    background: "transparent",
                    "& .MuiPaper-root": {
                      width: 250,
                      maxHeight: 300,
                      padding: "0.5rem 0.5rem",
                      overflowY: "scroll",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    },
                  }}
                >
                  {isNotificationTriggered ? (
                    <NotificationCard
                      memberName={memberName}
                      notificationTitle="Book your meal"
                      notificationBody="Book your meal now! Bookings are open till 9AM morning"
                    />
                  ) : (
                    <NotificationCard
                      memberName={memberName}
                      notificationTitle="Hurray!"
                      notificationBody="You've no new notifications"
                    />
                  )}
                </Popover>
              </Badge>
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
          {isLoading && <Loader />}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
