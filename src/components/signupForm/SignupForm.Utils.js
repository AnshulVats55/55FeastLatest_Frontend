/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState } from "react";
import handleMemberSignup from "../../api/signup/Signup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../store/slices/LoaderSlice";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import snackbarMessages from "../../Constants";

const SignupFormUtils = () => {
  const { isLoading } = useSelector((state) => {
    return state.loaderReducer;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState({});
  const [passwordErrorMsg, setPasswordErrorMsg] = useState({});
  const [isProfilePicAttached, setIsProfilePicAttached] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhoneNumber = (event) => {
    const input = event.target.value;
    const hasEnglishAlphabets = /[a-zA-Z]/.test(input);
    const hasSpecialSymbols = /[^a-zA-Z0-9\s]/.test(input);

    if (hasEnglishAlphabets) {
      alert("Phone number can't have english characters");
    } else if (hasSpecialSymbols) {
      alert("Phone number can't have special symbols");
    } else {
      setPhoneNumber(input);
    }
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    let encodedFile = "";
    reader.readAsDataURL(file);
    reader.onload = function () {
      encodedFile = reader.result;
      setProfilePicture(encodedFile);
    };
    reader.onerror = function (error) {
      return error;
    };
  };

  const handleProfilePictureChange = (event) => {
    const profilePic = event.target.files;
    if (profilePic && profilePic.length > 0) {
      getBase64(profilePic[0]);
      setIsProfilePicAttached(true);
      setOpen(true);
    }
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const memberData = {
    firstName: firstName,
    lastName: lastName,
    phone: parseInt(phoneNumber),
    photo: profilePicture,
    location: location,
    gender: gender,
    email: email,
    password: password,
  };

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

  const handleSignup = async (event) => {
    event.preventDefault();
    if (firstName === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.FIRST_NAME_REQUIRED,
        })
      );
    } else if (lastName === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.LAST_NAME_REQUIRED,
        })
      );
    } else if (phoneNumber === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.PHONE_NUMBER_REQUIRED,
        })
      );
    } else if (location === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.LOCATION_REQUIRED,
        })
      );
    } else if (gender === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.GENDER_REQUIRED,
        })
      );
    } else if (email === "") {
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
          snackbarMessage: snackbarMessages.PASSWORD_REQUIRED_FOR_SIGNUP,
        })
      );
    } else {
      if (emailValidator(email).status && passwordCheck(password).status) {
        dispatch(setIsLoading(true));
        const response = await handleMemberSignup(memberData);
        console.log("SIGNUP", response);
        if (response?.data?.status === snackbarMessages.SUCCESS) {
          setIsDisabled(true);
          dispatch(setIsLoading(false));
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.SUCCESS,
              snackbarMessage: snackbarMessages.SIGNUP_SUCCESSFULL,
            })
          );
          navigate("/");
        } else if (
          response?.response?.data?.status === snackbarMessages.FAILURE
        ) {
          dispatch(setIsLoading(false));
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: response?.response?.data?.message,
            })
          );
        }
      }
    }
  };

  return {
    isLoading,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    gender,
    setGender,
    profilePicture,
    location,
    setLocation,
    email,
    setEmail,
    password,
    setPassword,
    isProfilePicAttached,
    isPasswordVisible,
    open,
    scroll,
    handleClose,
    handlePhoneNumber,
    handleProfilePictureChange,
    handlePasswordVisibility,
    handleMouseDownPassword,
    handleSignup,
    emailErrorMsg,
    setEmailErrorMsg,
    emailValidator,
    passwordErrorMsg,
    setPasswordErrorMsg,
    passwordCheck,
    isDisabled,
  };
};

export default SignupFormUtils;
