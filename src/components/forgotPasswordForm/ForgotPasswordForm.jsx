import ForgotPasswordFormUtils from "./ForgotPasswordForm.utils";
import { ForgotPasswordFormStyles } from "./ForgotPasswordForm.styles";
import { getLoginFormStyles } from "../loginForm/LoginForm.Styles";
import { getAdditionalStyles } from "../signupForm/SignupForm.Styles";
import {
  Box,
  Grid,
  Stack,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import CommonButton from "../button/CommonButton";
import BrandLogo from "../../../src/assets/55FeastLogoNew.png";
import Loader from "../loader/Loader";

const ForgotPasswordForm = () => {
  const {
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
  } = ForgotPasswordFormUtils();
  const { getButtonCustomStyles } = ForgotPasswordFormStyles;
  const { classes } = getLoginFormStyles();
  const { getPasswordFieldStyles } = getAdditionalStyles;
  const { register } = useForm();

  return (
    <Box className={classes.getMainContStyles}>
      <Stack className={classes.getTextContStyles}>
        <img
          src={BrandLogo}
          alt=""
          width="20%"
          className={classes.getBrandLogoStyles}
        />
        <Typography className={classes.getTextOneStyles}>
          Create new password
        </Typography>
        <Typography className={classes.getTextTwoStyles}>
          This password must be new and different
        </Typography>
      </Stack>
      <form className={classes.getFormStyles}>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Stack>
              <OutlinedInput
                placeholder="Create new password*"
                variant="outlined"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                })}
                onChange={(e) => {
                  setPassword(e?.target?.value);
                  setPasswordErrorMsg(passwordCheck(e?.target?.value));
                  setPasswordMatch(e?.target?.value === confirmPassword);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setIsPasswordVisible(!isPasswordVisible);
                      }}
                      edge="end"
                    >
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={getPasswordFieldStyles}
              />
              {password?.length > 0 ? (
                <Typography
                  variant="caption"
                  sx={{
                    color: passwordErrorMsg?.status ? "#4caf50" : "red",
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
            <Stack>
              <OutlinedInput
                placeholder="Confirm new password*"
                variant="outlined"
                type={isConfirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                {...register("confirmPassword", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                })}
                onChange={(e) => {
                  setConfirmPassword(e?.target?.value);
                  setPasswordMatch(e?.target?.value === password);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                      }}
                      edge="end"
                    >
                      {isConfirmPasswordVisible ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={getPasswordFieldStyles}
              />
              {confirmPassword?.length > 0 ? (
                <Typography
                  variant="caption"
                  sx={{
                    color: passwordMatch ? "#4caf50" : "red",
                    fontSize: "0.8rem",
                  }}
                >
                  {passwordMatch
                    ? "Both passwords are identical"
                    : "Passwords don't match"}
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
                children="Create password"
                customStyles={getButtonCustomStyles}
                onClick={(event) => {
                  handleCreateNewPassword(event);
                }}
                isLoaderRequired={false}
                type="submit"
                isDisabled={isDisabled}
              />
            </motion.div>
          </Grid>
        </Grid>
      </form>
      {isLoading ? <Loader /> : <></>}
    </Box>
  );
};

export default ForgotPasswordForm;
