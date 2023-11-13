import { useState } from "react";
import { useParams } from "react-router-dom";
import { createNewPassword } from "../../api/forgotPassword/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import snackbarMessages from "../../Constants";
import { setIsLoading } from "../../store/slices/LoaderSlice";

const ForgotPasswordFormUtils = () => {
  const isLoading = useSelector((state) => {
    return state?.loaderReducer?.isLoading;
  });
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const passwordCheck = (password) => {
    let message = {
      text: "",
      status: false,
    };

    const check_digit = function (pwd) {
      return /\d/.test(pwd);
    };

    const check_upperCase = function (pwd) {
      return /[A-Z]/.test(pwd);
    };

    const check_loweCase = function (pwd) {
      return /[a-z]/.test(pwd);
    };

    const check_special_Char = function (pwd) {
      return /[~!@#$%^&]/.test(pwd);
    };

    const check_white_space = function (pwd) {
      return /[\s]/.test(pwd);
    };

    const check_length = function (pwd) {
      if (pwd.length >= 6 && pwd.length <= 20) return true;
      return false;
    };

    if (
      check_digit(password) &&
      check_upperCase(password) &&
      check_loweCase(password) &&
      check_special_Char(password) &&
      !check_white_space(password) &&
      check_length(password)
    ) {
      message = {
        text: "Your password is strong !",
        status: true,
      };
    } else {
      message.status = false;
      if (!check_digit(password)) {
        message.text = "Password must have one digit";
      }
      if (!check_loweCase(password)) {
        message.text = "Password must have one lowercase character";
      }
      if (!check_upperCase(password)) {
        message.text = "Password must have one uppercase character";
      }
      if (!check_special_Char(password)) {
        message.text = "Password must have one special character";
      }
      if (!check_length(password)) {
        message.text = "Password should be between 6-20 characters";
      }
      if (check_white_space(password)) {
        message.text = "Password must not contain any white space";
      }
    }
    return message;
  };

  const newPasswordData = {
    newPassword: password,
  };

  const handleCreateNewPassword = async (event) => {
    event.preventDefault();
    if (password === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "Create new password !",
        })
      );
    } else if (confirmPassword === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "Confirm new password !",
        })
      );
    } else {
      if (passwordMatch) {
        if (passwordErrorMsg?.status) {
          dispatch(setIsLoading(true));
          setIsDisabled(true);
          const response = await createNewPassword(id, token, newPasswordData);
          console.log("RES OF FORGOT PWD API IS----->>>>>", response);
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
            setTimeout(() => {
              navigate("/");
            }, 1500);
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
        } else {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: "Please follow all rules !",
            })
          );
        }
      } else {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: "Passwords don't match !",
          })
        );
      }
    }
  };

  return {
    isLoading,
    password,
    setPassword,
    isPasswordVisible,
    setIsPasswordVisible,
    isConfirmPasswordVisible,
    setIsConfirmPasswordVisible,
    confirmPassword,
    setConfirmPassword,
    passwordErrorMsg,
    setPasswordErrorMsg,
    passwordMatch,
    setPasswordMatch,
    isDisabled,
    passwordCheck,
    handleCreateNewPassword,
  };
};

export default ForgotPasswordFormUtils;
