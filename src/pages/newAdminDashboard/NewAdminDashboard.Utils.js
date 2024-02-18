import { NewAdminDashboardStyles } from "./NewAdminDashboard.Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faDollar,
  faAdd,
  faDownload,
  faPlus,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import {
  getCountsByDate,
  getRegularizedMeals,
} from "../../bookingMethods/BookingMethods";
import { handleFormattedDate, getNextDate } from "../../common/CommonData";
import { useDispatch, useSelector } from "react-redux";
import { getReversedDate } from "../../invitationMethods/InvitationMethods";
import snackbarMessages from "../../Constants";
import { CircularProgress } from "@mui/material";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import { dateToBeChecked } from "../../common/CommonData";

const NewAdminDashboardUtils = () => {
  const { location } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const dispatch = useDispatch();

  const { iconStylesOne, iconStylesTwo, circularProgressStyles } =
    NewAdminDashboardStyles;

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [todaysCount, setTodaysCount] = useState([]);
  const [todaysTotalCount, setTodaysTotalCount] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [regularizationRequests, setRegularizationRequests] = useState([]);

  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);

  const handleReversedDate = (date) => {
    const reversedDate = getReversedDate(date);
    return reversedDate;
  };

  // const dateToBeChecked =
  //   new Date().getHours() >= 18 && new Date().getHours() <= 23
  //     ? nextDateFormatted
  //     : formattedDate;

  useEffect(() => {
    const getTodaysTotalCount = async () => {
      const response = await getCountsByDate(dateToBeChecked, location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setTodaysCount(response?.data?.data);
        setIsDataLoaded(true);
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        setIsDataLoaded(true);
      }
    };
    getTodaysTotalCount();
  }, []);

  useEffect(() => {
    let currentValue = 0;
    const increment = todaysCount?.length / 100;
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= todaysCount?.length) {
        currentValue = todaysCount?.length;
        clearInterval(interval);
      }
      setTodaysTotalCount(Math.round(currentValue));
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [todaysCount, totalMembers]);

  useEffect(() => {
    const handleReqularizationRequests = async () => {
      const response = await getRegularizedMeals(dateToBeChecked, location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setRegularizationRequests(response?.data?.data);
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: snackbarMessages.ERROR_FETCHING_REQUESTS,
          })
        );
      } else {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: "Please try again !",
          })
        );
      }
    };

    handleReqularizationRequests();
  }, []);

  const handleMemberSearch = (event) => {
    setSearchTerm(event?.target?.value?.toLowerCase());
  };

  const filteredUsers = todaysCount?.filter((member) =>
    member?.fullName?.toLowerCase().includes(searchTerm)
  );

  const bookingDataArray = [
    {
      icon: <FontAwesomeIcon icon={faUser} style={iconStylesOne(0)} />,
      cardLabel:
        new Date().getHours() >= 18 && new Date().getHours() <= 23
          ? `Count for ${handleReversedDate(nextDateFormatted)}`
          : `Count for ${handleReversedDate(formattedDate)}`,
      cardValue: isDataLoaded ? (
        `${Math.round(todaysTotalCount)}`
      ) : (
        <CircularProgress
          size={25}
          thickness={4}
          color="inherit"
          sx={circularProgressStyles(0)}
        />
      ),
    },
    {
      icon: <FontAwesomeIcon icon={faEnvelope} style={iconStylesOne(1)} />,
      cardLabel:
        new Date().getHours() >= 18 && new Date().getHours() <= 23
          ? `Count for ${handleReversedDate(nextDateFormatted)} (in %)`
          : `Count for ${handleReversedDate(formattedDate)} (in %)`,
      cardValue: isDataLoaded ? (
        `${Math.round((todaysCount?.length / 102) * 100)}%`
      ) : (
        <CircularProgress
          size={25}
          thickness={4}
          color="inherit"
          sx={circularProgressStyles(1)}
        />
      ),
    },
    {
      icon: <FontAwesomeIcon icon={faAdd} style={iconStylesOne(2)} />,
      cardLabel: "Today's Regularization requests",
      cardValue: isDataLoaded ? (
        regularizationRequests ? (
          regularizationRequests?.length
        ) : (
          0
        )
      ) : (
        <CircularProgress
          size={25}
          thickness={4}
          color="inherit"
          sx={circularProgressStyles(2)}
        />
      ),
    },
    {
      icon: <FontAwesomeIcon icon={faDollar} style={iconStylesOne(3)} />,
      cardLabel: "Est. billing (inc. GST)",
      cardValue: isDataLoaded ? (
        `₹${Math.round(todaysCount?.length * 112)}`
      ) : (
        <CircularProgress
          size={25}
          thickness={4}
          color="inherit"
          sx={circularProgressStyles(3)}
        />
      ),
    },
  ];

  const adminActionsArray = [
    {
      icon: <FontAwesomeIcon icon={faDownload} style={iconStylesTwo(0)} />,
      cardLabel: "Daily data",
      buttonChildren: "Daily Data",
    },
    {
      icon: <FontAwesomeIcon icon={faUser} style={iconStylesTwo(2)} />,
      cardLabel: "Regularize meal",
      buttonChildren: "Regularize meal",
    },
    {
      icon: <FontAwesomeIcon icon={faPlus} style={iconStylesTwo(4)} />,
      cardLabel: "Add member",
      buttonChildren: "Add member",
    },
    {
      icon: <FontAwesomeIcon icon={faDownload} style={iconStylesTwo(1)} />,
      cardLabel: "Monthly data",
      buttonChildren: "Monthly Data",
    },
    {
      icon: <FontAwesomeIcon icon={faUser} style={iconStylesTwo(3)} />,
      cardLabel: "Book for guests",
      buttonChildren: "Book for guests",
    },
    {
      icon: <FontAwesomeIcon icon={faClose} style={iconStylesTwo(5)} />,
      cardLabel: "Delete member",
      buttonChildren: "Delete member",
    },
  ];

  const imageVariants = {
    bounce: {
      y: [-15, 15, -15],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return {
    todaysCount,
    bookingDataArray,
    adminActionsArray,
    isDataLoaded,
    handleMemberSearch,
    filteredUsers,
    dateToBeChecked,
    imageVariants,
    handleReversedDate,
    regularizationRequests,
  };
};

export default NewAdminDashboardUtils;
