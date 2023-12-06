/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect, useRef } from "react";
import { getAdminDashboardStyles } from "./AdminDashboard.Styles";
import {
  Box,
  Grid,
  Typography,
  Skeleton,
  TextField,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import InviteMemberCard from "../../components/card/InviteMemberCard";
import { getCountsByDate } from "../../bookingMethods/BookingMethods";
import { handleFormattedDate, getNextDate } from "../../common/CommonData.js";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ProgressBar from "../../components/progressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalMembers,
  getReversedDate,
} from "../../invitationMethods/InvitationMethods";
import CommonButton from "../../components/button/CommonButton";
import WeeklyData from "../../components/weeklyDataChart/WeeklyData";
import AddMemberDialog from "../../components/dialog/addMemberDialog/AddMemberDialog";
import DeleteMemberDialog from "../../components/dialog/deleteMemberDialog/DeleteMemberDialog";
import snackbarMessages from "../../Constants";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import AdminDashboardUtils from "./AdminDashboard.Utils";
import BookForAnyone from "../../components/dialog/bookForAnyoneDialog/BookForAnyone";
import BASE_URL from "../../api/baseUrl/BaseUrl";
import MEMBER_TOKEN from "../../api/memberToken/MemberToken";
import axios from "axios";
import { HandleLogoutOnSessionExpire } from "../../common/Logout";

const AdminDashboard = () => {
  const { location } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const { classes } = getAdminDashboardStyles();
  const dispatch = useDispatch();
  const { handleLogoutOnTokenExpire } = HandleLogoutOnSessionExpire();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [todaysCount, setTodaysCount] = useState([]);
  const [todaysTotalCount, setTodaysTotalCount] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [addMemberScroll, setAddMemberScroll] = useState("paper");
  const [deleteMemberOpen, setDeleteMemberOpen] = useState(false);
  const [deleteMemberScroll, setDeleteMemberScroll] = useState("paper");
  const [isFileLoading, setIsFileLoading] = useState(false);
  const {
    bookForAnyoneOpen,
    bookForAnyoneScroll,
    handleBookForAnyoneOpen,
    handleBookForAnyoneClose,
    currentMonthName,
  } = AdminDashboardUtils();
  let animationDuration = 0.4;

  const formattedDate = handleFormattedDate(new Date());
  const nextDate = getNextDate(new Date());
  const nextDateFormatted = handleFormattedDate(nextDate);

  const dateToBeChecked =
    new Date().getHours() >= 18 && new Date().getHours() <= 23
      ? nextDateFormatted
      : formattedDate;

  const handleReversedDate = (date) => {
    const reversedDate = getReversedDate(date);
    return reversedDate;
  };

  const handleAddMemberOpen = (scrollType) => () => {
    setAddMemberOpen(true);
    setAddMemberScroll(scrollType);
  };

  const handleAddMemberClose = () => {
    setAddMemberOpen(false);
  };

  const handleDeleteMemberOpen = (scrollType) => () => {
    setDeleteMemberOpen(true);
    setDeleteMemberScroll(scrollType);
  };

  const handleDeleteMemberClose = () => {
    setDeleteMemberOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    //get todaysCount according to date
    const getTodaysTotalCount = async () => {
      const response = await getCountsByDate(dateToBeChecked, location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setTodaysCount(response?.data?.data);
        setIsDataLoaded(true);
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        if (
          response?.response?.data?.message ===
          snackbarMessages.JWT_TOKEN_EXPIRED
        ) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: snackbarMessages.SESSION_EXPIRED,
            })
          );
          setTimeout(() => {
            handleLogoutOnTokenExpire();
          }, 1500);
        }
        setIsDataLoaded(true);
      }
    };

    getTodaysTotalCount();
  }, []);

  useEffect(() => {
    //get total members according to location
    const handleGetTotalMembers = async () => {
      const response = await getTotalMembers(location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setTotalMembers(response?.data?.data?.length);
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        if (
          response?.response?.data?.message ===
          snackbarMessages.JWT_TOKEN_EXPIRED
        ) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: snackbarMessages.SESSION_EXPIRED,
            })
          );
          setTimeout(() => {
            handleLogoutOnTokenExpire();
          }, 1500);
        }
      }
    };

    handleGetTotalMembers();
  }, [totalMembers]);

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

  const memberData = [
    //member's dummy data
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
  ];

  const handleMemberSearch = (event) => {
    //handles member search
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = todaysCount?.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm)
  );

  const handleExportInExcel = (memberData) => {
    //handles exporting member list in excel
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
      } catch (error) {
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
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        if (
          response?.response?.data?.message ===
          snackbarMessages.JWT_TOKEN_EXPIRED
        ) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: snackbarMessages.SESSION_EXPIRED,
            })
          );
          setTimeout(() => {
            handleLogoutOnTokenExpire();
          }, 1500);
        }
      }
      return response;
    } catch (error) {
      setIsFileLoading(false);
      return error;
    }
  };

  return (
    <Grid container className={classes.getGridContStyles} rowGap={2}>
      <Grid
        container
        item
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className={classes.getGridItemOneStyles}
        rowGap={0}
      >
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={12}
          className={classes.getGridItemOnePointOneStyles}
        >
          <motion.div
            style={{ width: "90%" }}
            initial={{ translateY: "30px", opacity: 0 }}
            animate={{ translateY: "0px", opacity: 1 }}
            transition={{
              duration: 0.75,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Box className={classes.getBoxOneStyles}>
              <Stack className={classes.getStackOneStyles}>
                <Typography className={classes.getTextOneStyles}>
                  {new Date().getHours() >= 18 && new Date().getHours() <= 23
                    ? `Count for ${handleReversedDate(nextDateFormatted)}`
                    : `Count for ${handleReversedDate(formattedDate)}`}
                </Typography>
                {isDataLoaded ? (
                  <Typography className={classes.getTextTwoStyles}>
                    {`${Math.round(todaysTotalCount)}`}
                  </Typography>
                ) : (
                  <Typography className={classes.getTextTwoStyles}>
                    <CircularProgress
                      size={35}
                      thickness={5}
                      color="inherit"
                      className={classes.circularProgressStyles}
                    />
                  </Typography>
                )}
              </Stack>
              <ShowChartIcon className={classes.getIconOneStyles} />
            </Box>
          </motion.div>
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={12}
          className={classes.getGridItemOnePointTwoStyles}
        >
          <motion.div
            style={{ width: "90%" }}
            initial={{ translateY: "30px", opacity: 0 }}
            animate={{ translateY: "0px", opacity: 1 }}
            transition={{
              duration: 0.9,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Box className={classes.getBoxTwoStyles}>
              <ProgressBar
                todaysCount={todaysCount?.length}
                totalMembers={totalMembers}
                isDataLoaded={isDataLoaded}
              />
            </Box>
          </motion.div>
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={12}
          sx={{ background: "" }}
          className={classes.getGridItemOnePointThreeStyles}
        >
          <motion.div
            style={{ width: "90%" }}
            initial={{ translateY: "30px", opacity: 0 }}
            animate={{ translateY: "0px", opacity: 1 }}
            transition={{
              duration: 1.05,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Box className={classes.getBoxThreeStyles}>
              <Stack>
                <Typography className={classes.getTextThreeStyles}>
                  Freeing up the time by transitioning from manual list creation
                  to automation
                </Typography>
                <Box className={classes.getDownloadButtonsContStyles}>
                  <Grid container sx={{ width: "100%" }}>
                    <Grid
                      item
                      lg={6}
                      xs={12}
                      sx={{
                        background: "",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.1 }}
                        style={{ width: "90%", background: "" }}
                      >
                        <CommonButton
                          children={"Daily data"}
                          type=""
                          onClick={() => {
                            handleExportInExcel(todaysCount);
                          }}
                          customStyles={{
                            width: "90% !important",
                            height: "40px",
                            borderRadius: "4px",
                            border: "1px solid #ef5d36",
                            color: "#ef5d36",
                            fontSize: "0.9rem",
                            margin: "0.25rem 0rem",
                            "&:hover": {
                              background: "#ef5d36",
                              border: "none",
                              color: "#FFF",
                            },
                            "&:focus": {
                              outline: "none",
                            },
                            "@media screen and (max-width: 400px)": {
                              fontSize: "0.8rem",
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      xs={12}
                      sx={{
                        background: "",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.1 }}
                        style={{ width: "90%", background: "" }}
                      >
                        <CommonButton
                          children={"Monthly data"}
                          type=""
                          onClick={handlePreviousMonthData}
                          isLoaderRequired={isFileLoading}
                          customStyles={{
                            width: "90% !important",
                            height: "40px",
                            borderRadius: "4px",
                            border: "1px solid #ef5d36",
                            color: "#ef5d36",
                            fontSize: "0.9rem",
                            margin: "0.25rem 0rem",
                            "&:hover": {
                              background: "#ef5d36",
                              border: "none",
                              color: "#FFF",
                            },
                            "&:focus": {
                              outline: "none",
                            },
                            "@media screen and (max-width: 400px)": {
                              fontSize: "0.8rem",
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid
                      item
                      lg={12}
                      xs={12}
                      sx={{
                        background: "",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.1 }}
                        className={classes.bookForAnyoneBtnContStyles}
                      >
                        <CommonButton
                          children={"Book for anyone"}
                          type=""
                          onClick={handleBookForAnyoneOpen("paper")}
                          customStyles={{
                            width: "90% !important",
                            height: "40px",
                            borderRadius: "4px",
                            border: "1px solid #ef5d36",
                            color: "#ef5d36",
                            fontSize: "0.9rem",
                            margin: "0.25rem 0rem",
                            "&:hover": {
                              background: "#ef5d36",
                              border: "none",
                              color: "#FFF",
                            },
                            "&:focus": {
                              outline: "none",
                            },
                            "@media screen and (max-width: 1199px)": {
                              width: "90% !important",
                            },
                            "@media screen and (max-width: 400px)": {
                              fontSize: "0.8rem",
                            },
                          }}
                        />
                        {bookForAnyoneOpen ? (
                          <BookForAnyone
                            open={bookForAnyoneOpen}
                            scroll={bookForAnyoneScroll}
                            handleClose={handleBookForAnyoneClose}
                            children="Book"
                          />
                        ) : (
                          <></>
                        )}
                      </motion.div>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Box>
          </motion.div>
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={12}
          sx={{ background: "" }}
          className={classes.getGridItemOnePointFourStyles}
        >
          <motion.div
            style={{ width: "90%" }}
            initial={{ translateY: "30px", opacity: 0 }}
            animate={{ translateY: "0px", opacity: 1 }}
            transition={{
              duration: 1.2,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Box className={classes.getBoxFourStyles}>
              <Stack>
                <Typography className={classes.getTextFourStyles}>
                  Now you can add & delete members in a speedy way without a
                  fuss!
                </Typography>
                <Box className={classes.getDownloadButtonsContStyles}>
                  <motion.div
                    style={{
                      width: "90%",
                      background: "",
                      padding: "0",
                      margin: "0.25rem 0rem",
                      borderRadius: "4px",
                      border: "none",
                    }}
                  >
                    <Button
                      className={classes.getAddMemberButtonStyles}
                      onClick={handleAddMemberOpen("paper")}
                    >
                      Add member
                    </Button>
                  </motion.div>
                  {addMemberOpen ? (
                    <AddMemberDialog
                      open={addMemberOpen}
                      scroll={addMemberScroll}
                      handleClose={handleAddMemberClose}
                    />
                  ) : (
                    <></>
                  )}
                  <motion.div
                    style={{
                      width: "90%",
                      background: "",
                      padding: "0",
                      margin: "0.25rem 0rem",
                      borderRadius: "4px",
                      border: "none",
                    }}
                  >
                    <Button
                      className={classes.getAddMemberButtonStyles}
                      onClick={handleDeleteMemberOpen("paper")}
                    >
                      Delete member
                    </Button>
                  </motion.div>
                  {deleteMemberOpen ? (
                    <DeleteMemberDialog
                      open={deleteMemberOpen}
                      scroll={deleteMemberScroll}
                      handleClose={handleDeleteMemberClose}
                      children="Delete"
                      placeholder="Search member to delete..."
                    />
                  ) : (
                    <></>
                  )}
                </Box>
              </Stack>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      <Grid
        container
        item
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className={classes.getGridItemTwoStyles}
      >
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.getGridItemTwoPointOneStyles}
        >
          <TextField
            type="search"
            placeholder="Search members for today's count..."
            variant="outlined"
            multiline
            className={classes.root}
            onChange={handleMemberSearch}
          />
          <Box className={classes.getStackStyles}>
            <Grid container item>
              {isDataLoaded ? (
                filteredUsers?.length > 0 ? (
                  filteredUsers?.map((member, index) => {
                    return (
                      <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{ background: "" }}
                      >
                        <InviteMemberCard
                          indexNumber={index + 1}
                          memberName={member.fullName}
                          memberEmail={member.email}
                          animationDuration={animationDuration}
                          isDataLoaded={isDataLoaded}
                          isDashboard={true}
                          isEmailChopRequired={false}
                          isActionButtonRequired={false}
                          isStatusCheckRequired={false}
                        />
                      </Grid>
                    );
                  })
                ) : (
                  <Typography className={classes.getErrorMessageOneStyles}>
                    {`No member has booked a meal for ${
                      new Date().getHours() >= 18 && new Date().getHours() <= 23
                        ? handleReversedDate(nextDateFormatted)
                        : handleReversedDate(formattedDate)
                    }`}
                  </Typography>
                )
              ) : (
                Array(6)
                  .fill()
                  .map((data, index) => {
                    return (
                      <Skeleton
                        key={index}
                        animation="wave"
                        variant="rounded"
                        sx={{
                          width: "100%",
                          height: "3rem",
                          margin: "0.5rem 0 0.25rem",
                        }}
                      />
                    );
                  })
              )}
            </Grid>
          </Box>
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.getGridItemTwoPointTwoStyles}
        >
          <WeeklyData isDataLoaded={isDataLoaded} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
