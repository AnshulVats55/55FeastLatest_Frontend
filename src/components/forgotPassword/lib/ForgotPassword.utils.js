import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleForgotPassword } from "../../../api/forgotPassword/ForgotPassword";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import snackbarMessages from "../../../Constants";
import { setIsLoading } from "../../../store/slices/LoaderSlice";

const ForgotPasswordUtils = (setIsDisabled) => {
  const isLoading = useSelector((state) => {
    return state?.loaderReducer?.isLoading;
  });
  const dispatch = useDispatch();
  const [memberEmail, setMemberEmail] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState({});

  const emailValidator = (email) => {
    let message = {
      text: "",
      status: true,
    };

    const checkAtTheRate = () => /@/.test(email);
    const brandName = () => /@fiftyfivetech/.test(email);
    const regex = /^[A-Za-z0-9]+[._]?[A-Za-z0-9]+@fiftyfivetech\.io$/;
    if (regex.test(email)) {
      message.text = "Email Id is valid";
      message.status = true;
    } else if (!checkAtTheRate()) {
      message.text = "Email Id must contain @";
      message.status = false;
    } else if (!brandName()) {
      message.text = "Email Id must contain 'fiftyfivetech'";
      message.status = false;
    } else {
      message.text = "Invalid Email Id";
      message.status = false;
    }
    return message;
  };

  const memberData = {
    email: memberEmail,
  };

  const sendForgotPasswordResetEmail = async (event) => {
    event?.preventDefault();
    if (memberEmail === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.EMAIL_REQUIRED,
        })
      );
    } else {
      dispatch(setIsLoading(true));
      setIsDisabled(true);
      const response = await handleForgotPassword(memberData);
      // console.log("RES OF FORGOT PASSWORD API", response);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        dispatch(setIsLoading(false));
        setIsDisabled(false);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage: response?.data?.message,
          })
        );
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        dispatch(setIsLoading(false));
        setIsDisabled(false);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: response?.response?.data?.message,
          })
        );
      } else {
        dispatch(setIsLoading(false));
        setIsDisabled(false);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: "Please try again !",
          })
        );
      }
    }
  };

  return {
    isLoading,
    memberEmail,
    setMemberEmail,
    emailErrorMsg,
    setEmailErrorMsg,
    emailValidator,
    sendForgotPasswordResetEmail,
  };
};

export default ForgotPasswordUtils;
