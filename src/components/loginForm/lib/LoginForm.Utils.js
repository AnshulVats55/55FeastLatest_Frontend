import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import snackbarMessages from "../../../Constants";
import handleMemberLogin from "../../../api/login/Login";
import { setMemberData } from "../../../store/slices/MemberDataSlice";
import { setIsLoading } from "../../../store/slices/LoaderSlice";

const LoginFormUtils = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const isLoading = useSelector((state) => {
    return state?.loaderReducer?.isLoading;
  });

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const handlePasswordVisibility = () => {
    //to toggle visibility of password
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const memberData = {
    email: email,
    password: password,
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (email === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.EMAIL_REQUIRED,
        })
      );
    } else if (password === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.PASSWORD_REQUIRED_FOR_LOGIN,
        })
      );
    } else {
      dispatch(setIsLoading(true));
      setIsDisabled(true);
      const response = await handleMemberLogin(memberData);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        dispatch(setIsLoading(false));
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage: snackbarMessages.LOGIN_SUCCESSFULL,
          })
        );
        localStorage.setItem("memberToken", response?.data?.data?.token);
        dispatch(setMemberData(response?.data?.data?.user));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
    isDisabled,
    isLoading,
    email,
    password,
    isPasswordVisible,
    isLoginFormVisible,
    setIsDisabled,
    setEmail,
    setPassword,
    setIsLoginFormVisible,
    handlePasswordVisibility,
    handleMouseDownPassword,
    handleFormSubmit,
  };
};

export default LoginFormUtils;
