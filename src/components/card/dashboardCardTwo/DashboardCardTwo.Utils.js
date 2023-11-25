import { useState, useEffect } from "react";
import snackbarMessages from "../../../Constants";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import * as XLSX from "xlsx";
import BASE_URL from "../../../api/baseUrl/BaseUrl";
import MEMBER_TOKEN from "../../../api/memberToken/MemberToken";
import axios from "axios";
import {
  handleFormattedDate,
  getNextDate,
  getMonthName,
} from "../../../common/CommonData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getReversedDate } from "../../../invitationMethods/InvitationMethods";
import { getCountsByDate } from "../../../bookingMethods/BookingMethods";

const DashboardCardTwoUtils = (index) => {
  const { location } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const [todaysCount, setTodaysCount] = useState([]);
  const [bookForAnyoneOpen, setBookForAnyoneOpen] = useState(false);
  const [bookForAnyoneScroll, setBookForAnyoneScroll] = useState("paper");
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [addMemberScroll, setAddMemberScroll] = useState("paper");
  const [nonEmployeeDialogOpen, setNonEmployeeDialogOpen] = useState(false);
  const [nonEmployeeDialogScroll, setNonEmployeeDialogScroll] =
    useState("paper");
  const [deleteMemberOpen, setDeleteMemberOpen] = useState(false);
  const [deleteMemberScroll, setDeleteMemberScroll] = useState("paper");
  const [isDailyDataLoading, setIsDailyDataLoading] = useState(false);
  const [isFileLoading, setIsFileLoading] = useState(false);

  const currentMonthName = getMonthName();
  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);

  const dispatch = useDispatch();

  const handleReversedDate = (date) => {
    const reversedDate = getReversedDate(date);
    return reversedDate;
  };

  const dateToBeChecked =
    new Date().getHours() >= 18 && new Date().getHours() <= 23
      ? nextDateFormatted
      : formattedDate;

  useEffect(() => {
    const getTodaysTotalCount = async () => {
      const response = await getCountsByDate(dateToBeChecked, location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setTodaysCount(response?.data?.data);
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        console.log("Error getting daily count");
      }
    };

    if (index === 0) {
      getTodaysTotalCount();
    }
  }, []);

  const handleBookForAnyoneOpen = (scrollType) => () => {
    setBookForAnyoneOpen(true);
    setBookForAnyoneScroll(scrollType);
  };

  const handleBookForAnyoneClose = () => {
    setBookForAnyoneOpen(false);
  };

  const handleAddMemberOpen = (scrollType) => () => {
    setAddMemberOpen(true);
    setAddMemberScroll(scrollType);
  };

  const handleAddMemberClose = () => {
    setAddMemberOpen(false);
  };

  const handleNonEmployeeDialogOpen = (scrollType) => () => {
    setNonEmployeeDialogOpen(true);
    setNonEmployeeDialogScroll(scrollType);
  };

  const handleNonEmployeeDialogClose = () => {
    setNonEmployeeDialogOpen(false);
  };

  const handleDeleteMemberOpen = (scrollType) => () => {
    setDeleteMemberOpen(true);
    setDeleteMemberScroll(scrollType);
  };

  const handleDeleteMemberClose = () => {
    setDeleteMemberOpen(false);
  };

  const handleExportInExcel = (memberData) => {
    const fileName =
      new Date().getHours() >= 18 && new Date().getHours() <= 23
        ? `Count for ${handleReversedDate(nextDateFormatted)}`
        : `Count for ${handleReversedDate(formattedDate)}`;

    if (memberData.length === 0) {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.NO_MEMBER_IN_LIST,
        })
      );
    } else if (memberData.length > 0) {
      try {
        setIsDailyDataLoading(true);
        const worksheet = XLSX.utils.json_to_sheet(memberData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, `${fileName}`);
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage: snackbarMessages.FILE_DOWNLOAD_SUCCESSFULL,
          })
        );
        setIsDailyDataLoading(false);
      } catch (error) {
        setIsDailyDataLoading(false);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: snackbarMessages.FILE_DOWNLOAD_FAILURE,
          })
        );
      }
    }
  };

  const handlePreviousMonthData = async () => {
    try {
      setIsFileLoading(true);
      const response = await axios.get(
        `${BASE_URL}/bookmeal/month/count?location=${location}`,
        {
          headers: {
            Authorization: `Bearer ${MEMBER_TOKEN}`,
            "Content-Type": "application/json",
            referrerPolicy: "no-referrer",
            mode: "no-mode",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        const fileName = `${currentMonthName} Data`;
        try {
          const worksheet = XLSX.utils.json_to_sheet(response.data.data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, `${fileName}`);
          XLSX.writeFile(workbook, `${fileName}.xlsx`);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.SUCCESS,
              snackbarMessage: snackbarMessages.FILE_DOWNLOAD_SUCCESSFULL,
            })
          );
          setIsFileLoading(false);
        } catch (error) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.FILE_DOWNLOAD_FAILURE,
            })
          );
          setIsFileLoading(false);
        }
      }
      return response;
    } catch (error) {
      setIsFileLoading(false);
      return error;
    }
  };

  return {
    todaysCount,
    bookForAnyoneOpen,
    bookForAnyoneScroll,
    handleBookForAnyoneOpen,
    handleBookForAnyoneClose,
    addMemberOpen,
    addMemberScroll,
    handleAddMemberOpen,
    handleAddMemberClose,
    nonEmployeeDialogOpen,
    nonEmployeeDialogScroll,
    handleNonEmployeeDialogOpen,
    handleNonEmployeeDialogClose,
    deleteMemberOpen,
    deleteMemberScroll,
    handleDeleteMemberOpen,
    handleDeleteMemberClose,
    isFileLoading,
    isDailyDataLoading,
    handleExportInExcel,
    handlePreviousMonthData,
  };
};

export default DashboardCardTwoUtils;
