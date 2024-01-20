import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleMemberBookingStatus } from "../../bookingMethods/BookingMethods";
import snackbarMessages from "../../Constants";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faUserGroup,
  faFaceSmile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NewAdminDashboardStyles } from "../newAdminDashboard/NewAdminDashboard.Styles";
import { CircularProgress } from "@mui/material";

const UserProfileUtils = () => {
  const { photo, gender, firstName, lastName, email } = useSelector((state) => {
    return state.memberDataReducer;
  });
  const memberName = firstName + " " + lastName;

  const [memberBookingData, setMemberBookingData] = useState([]);
  const [optionSelected, setOptionSelected] = useState("history");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/bookyourmeal");
  };
  useEffect(() => {
    const getMemberBookingStatus = async () => {
      const response = await handleMemberBookingStatus(email);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setIsDataLoaded(true);
        if (response?.data?.message === snackbarMessages.BOOK_YOUR_FIRST_MEAL) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: response.data.message,
            })
          );
        } else {
          const allBookingDates = response?.data?.data;
          setMemberBookingData(allBookingDates);
        }
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        setIsDataLoaded(true);
        if (
          response?.response?.data?.message === snackbarMessages.USER_NOT_VALID
        ) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: snackbarMessages.BOOK_YOUR_FIRST_MEAL,
            })
          );
        } else {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.MEMBER_MEAL_STATUS,
            })
          );
        }
      }
    };

    getMemberBookingStatus();
  }, []);

  const handleSwitchOption = (optionValue) => {
    setOptionSelected(optionValue);
  };

  const { iconStylesOne, circularProgressStyles } = NewAdminDashboardStyles;

  const profileCardsDataArray = [
    {
      icon: <FontAwesomeIcon icon={faUtensils} style={iconStylesOne(0)} />,
      cardLabel: "Total Meals Booked",
      cardValue: isDataLoaded ? (
        memberBookingData.length
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
      icon: <FontAwesomeIcon icon={faUser} style={iconStylesOne(1)} />,
      cardLabel: "Booked by you",
      cardValue: isDataLoaded ? (
        `${
          (memberBookingData?.filter(
            (member) => email === member?.bookedByEmail
          )).length
        }`
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
      icon: <FontAwesomeIcon icon={faUserGroup} style={iconStylesOne(2)} />,
      cardLabel: "Booked by others",
      cardValue: isDataLoaded ? (
        `${
          (memberBookingData?.filter(
            (member) => email !== member?.bookedByEmail
          )).length
        }`
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
      icon: <FontAwesomeIcon icon={faFaceSmile} style={iconStylesOne(3)} />,
      cardLabel: "Feast factor",
      cardValue: isDataLoaded ? (
        `${Math.ceil(
          ((memberBookingData?.filter(
            (member) => email === member?.bookedByEmail
          )).length /
            memberBookingData.length) *
            100
        )}%`
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
  return {
    photo,
    gender,
    memberName,
    memberBookingData,
    optionSelected,
    handleSwitchOption,
    isDataLoaded,
    handleNavigation,
    profileCardsDataArray,
  };
};

export default UserProfileUtils;
