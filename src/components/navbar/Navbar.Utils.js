import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import snackbarMessages from "../../Constants";
import { setIsLoading } from "../../store/slices/LoaderSlice";
import {
  Home,
  RestaurantMenu,
  RateReview,
  Logout,
  EmojiPeople,
  DashboardCustomize,
} from "@mui/icons-material";
import { getNavbarStyles } from "./Navbar.Styles";

const NavbarUtils = () => {
  const { classes } = getNavbarStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAdmin, photo, gender, firstName, lastName } = useSelector(
    (state) => {
      return state?.memberDataReducer;
    }
  );

  const memberName = firstName + " " + lastName;

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
      icon: <DashboardCustomize className={classes.getListItemIconStyles} />,
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
      text: `${memberName}`,
      icon: <EmojiPeople className={classes.getListItemIconStyles} />,
    },
    {
      text: "Logout",
      icon: <Logout className={classes.getListItemIconStyles} />,
    },
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);
  const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(null);
  const [isNotificationTriggered, setIsNotificationTriggered] = useState(false);
  const currentDate = new Date();

  const triggerNotification = () => {
    if (
      (currentDate.getHours() >= 0 && currentDate.getHours() < 9) ||
      (currentDate.getHours() >= 18 && currentDate.getHours() <= 23)
    ) {
      setIsNotificationTriggered(true);
    } else {
      setIsNotificationTriggered(false);
    }
  };

  useEffect(() => {
    triggerNotification();
  }, [currentDate.getHours()]);

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

  const handleOpenNotifications = (event) => {
    setIsPopoverOpen(event?.currentTarget);
  };

  const handleCloseNotifications = () => {
    setIsPopoverOpen(null);
  };

  const popoverOpen = Boolean(isPopoverOpen);
  const idOne = popoverOpen ? "simple-popover" : undefined;

  const handleOpenMobileNotifications = (event) => {
    setIsMobilePopoverOpen(event?.currentTarget);
  };

  const handleCloseMobileNotifications = () => {
    setIsMobilePopoverOpen(null);
  };

  const mobilePopoverOpen = Boolean(isMobilePopoverOpen);
  const idTwo = mobilePopoverOpen ? "simple-popover" : undefined;

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

  return {
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
  };
};

export default NavbarUtils;
