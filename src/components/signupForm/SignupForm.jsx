/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  getSignupFormStyles,
  getProfilePicAnimation,
  getAdditionalStyles,
} from "./SignupForm.Styles";
import {
  Box,
  Grid,
  Stack,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CommonButton from "../button/CommonButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomDialog from "../dialog/Dialog";
import { motion } from "framer-motion";
import Loader from "../loader/Loader";
import SignupFormUtils from "./SignupForm.Utils";
import BrandLogo from "../../../src/assets/55FeastLogoNew.png";

const SignupForm = () => {
  const { classes } = getSignupFormStyles();
  const { initial, whileTap, transition } = getProfilePicAnimation;
  const {
    getSelectStyles,
    getPasswordFieldStyles,
    getCommonButtonCustomStyles,
  } = getAdditionalStyles;
  const {
    isLoading,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    gender,
    setGender,
    profilePicture,
    profilePictureName,
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
  } = SignupFormUtils();

  const { register } = useForm();

  return (
    <Box className={classes.getMainContStyles}>
      <Stack className={classes.getTextContStyles}>
        <img
          src={BrandLogo}
          alt="55Feast"
          width="20%"
          className={classes.getBrandLogoStyles}
        />
        <Typography className={classes.getTextOneStyles}>
          Welcome to 55Feast
        </Typography>
        <Typography className={classes.getTextTwoStyles}>
          Please enter your details
        </Typography>
      </Stack>
      <form className={classes.getSignupFormStyles}>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Stack>
              <TextField
                placeholder="Enter first name*"
                variant="outlined"
                type="text"
                value={firstName}
                id="firstName"
                {...register("firstName", {
                  required: true,
                  maxLength: 15,
                })}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className={classes.root}
                inputProps={{ className: classes.input }}
              />
            </Stack>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Stack>
              <TextField
                placeholder="Enter last name*"
                variant="outlined"
                type="text"
                value={lastName}
                id="lastName"
                {...register("lastName", {
                  required: true,
                  maxLength: 15,
                })}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className={classes.root}
                inputProps={{ className: classes.input }}
              />
            </Stack>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Stack>
              <TextField
                placeholder="Enter phone number*"
                variant="outlined"
                type="text"
                value={phoneNumber}
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: true,
                  maxLength: 10,
                })}
                onChange={(event) => {
                  handlePhoneNumber(event);
                }}
                className={classes.root}
                inputProps={{ className: classes.input, maxLength: 10 }}
              />
            </Stack>
          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={initial}
              whileTap={whileTap}
              transition={transition}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="files"
                className={classes.getProfilePicLabelStyles}
              >
                Choose Picture
              </label>
            </motion.div>
            <Typography
              sx={{
                fontSize: "0.8rem",
                marginTop: "0.25rem",
              }}
            >
              {profilePictureName && `Image selected: ${profilePictureName}`}
            </Typography>
            <input
              id="files"
              type="file"
              style={{
                display: "none",
              }}
              multiple={false}
              accept="image/*"
              {...register("profilePicture")}
              onChange={(event) => {
                handleProfilePictureChange(event);
              }}
            />
          </Grid>
          {isProfilePicAttached ? (
            <CustomDialog
              open={open}
              scroll={scroll}
              handleClose={handleClose}
              image={profilePicture}
            />
          ) : (
            <></>
          )}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Stack>
              <FormControl fullWidth>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  displayEmpty
                  value={location}
                  inputProps={{ "aria-label": "Without label" }}
                  {...register("location")}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  sx={getSelectStyles}
                >
                  <MenuItem value="" className={classes.getMenuItemStyles}>
                    Select location*
                  </MenuItem>
                  <MenuItem
                    value={"Jaipur"}
                    className={classes.getMenuItemStyles}
                  >
                    Jaipur
                  </MenuItem>
                  <MenuItem
                    value={"Gurgaon"}
                    className={classes.getMenuItemStyles}
                  >
                    Gurgaon
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Stack>
              <FormControl fullWidth>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  displayEmpty
                  value={gender}
                  inputProps={{ "aria-label": "Without label" }}
                  {...register("gender")}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  sx={getSelectStyles}
                >
                  <MenuItem value="" className={classes.getMenuItemStyles}>
                    Select gender*
                  </MenuItem>
                  <MenuItem
                    value={"Male"}
                    className={classes.getMenuItemStyles}
                  >
                    Male
                  </MenuItem>
                  <MenuItem
                    value={"Female"}
                    className={classes.getMenuItemStyles}
                  >
                    Female
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Stack>
              <TextField
                placeholder="Enter your email*"
                variant="outlined"
                type="email"
                value={email}
                {...register("email", { required: true })}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErrorMsg(emailValidator(e.target.value));
                }}
                className={classes.root}
                inputProps={{ className: classes.input }}
              ></TextField>
              {email.length > 0 ? (
                <Typography
                  variant="caption"
                  sx={{
                    color: emailErrorMsg.status ? "#4caf50" : "red",
                    fontSize: "0.8rem",
                  }}
                >
                  {emailErrorMsg.text}
                </Typography>
              ) : (
                <></>
              )}
            </Stack>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Stack>
              <OutlinedInput
                placeholder="Create password*"
                variant="outlined"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                })}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordErrorMsg(passwordCheck(e.target.value));
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {isPasswordVisible ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={getPasswordFieldStyles}
              />
              {password.length > 0 ? (
                <Typography
                  variant="caption"
                  sx={{
                    color: passwordErrorMsg.status ? "#4caf50" : "red",
                    fontSize: "0.8rem",
                  }}
                >
                  {passwordErrorMsg.text}
                </Typography>
              ) : (
                <></>
              )}
            </Stack>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <motion.div
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.1 }}
            >
              <CommonButton
                children="Signup"
                customStyles={getCommonButtonCustomStyles}
                type="submit"
                isLoaderRequired={false}
                onClick={(event) => {
                  handleSignup(event);
                }}
                isDisabled={isDisabled}
              />
            </motion.div>
          </Grid>
        </Grid>
      </form>
      <Box className={classes.getLinkContStyles}>
        <Typography className={classes.getActionTextOneStyles}>
          Already have an account?
        </Typography>
        <Link to="/" className={classes.getLinkStyles}>
          &nbsp;Login
        </Link>
      </Box>
      {isLoading ? <Loader /> : <></>}
    </Box>
  );
};

export default SignupForm;
