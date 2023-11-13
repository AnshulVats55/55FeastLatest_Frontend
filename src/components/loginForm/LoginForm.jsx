/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
// import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginFormUtils from "./lib/LoginForm.Utils";
import { getLoginFormStyles } from "./LoginForm.Styles";
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CommonButton from "../button/CommonButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { motion } from "framer-motion";
import Loader from "../loader/Loader";
import BrandLogo from "../../../src/assets/55FeastLogoNew.png";
import ForgotPassword from "../forgotPassword/ForgotPassword";

const LoginForm = () => {
  const {
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
  } = LoginFormUtils();
  const { classes } = getLoginFormStyles();
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
          {isLoginFormVisible ? "Welcome back !" : "Forgot password?"}
        </Typography>
        <Typography className={classes.getTextTwoStyles}>
          {isLoginFormVisible
            ? "Please enter your details"
            : "No worries, we'll help you reset it"}
        </Typography>
      </Stack>
      {isLoginFormVisible ? (
        <form className={classes.getFormStyles}>
          <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Stack>
                <TextField
                  placeholder="Enter your email"
                  variant="outlined"
                  type="email"
                  value={email}
                  required
                  {...register("email", { required: true })}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className={classes.root}
                  InputProps={{ className: classes.input }}
                ></TextField>
              </Stack>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Stack>
                <OutlinedInput
                  placeholder="Enter your password"
                  variant="outlined"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  required
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                  })}
                  onChange={(e) => {
                    setPassword(e?.target?.value);
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
                  sx={{
                    "&.MuiOutlinedInput-root": {
                      background: "#F7F7F7",
                      fontSize: "1rem",
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover fieldset": {
                        border: "none",
                      },
                      "&.MuiInputBase-root.Mui-focused fieldset": {
                        border: "1px solid #ef5d36",
                      },
                    },
                    "&.MuiFormLabel-root": {
                      color: "green !important",
                      fontSize: "1rem",
                      "&.MuiFormLabel-root.Mui-focused": {
                        color: "#ef5d36",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "#232229 !important",
                    },
                  }}
                />
              </Stack>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <motion.div
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1 }}
              >
                <CommonButton
                  children="Login"
                  customStyles={{
                    width: "100% !important",
                    height: "40px",
                    borderRadius: "4px",
                    border: "1px solid #ef5d36",
                    color: "#ef5d36",
                    "&:hover": {
                      background: "#ef5d36",
                      border: "none",
                      color: "#FFF",
                    },
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                  onClick={(event) => {
                    handleFormSubmit(event);
                  }}
                  isLoaderRequired={false}
                  type="submit"
                  isDisabled={isDisabled}
                />
              </motion.div>
            </Grid>
          </Grid>
        </form>
      ) : (
        <ForgotPassword isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
      )}
      <Box className={classes.getLinkTopContStyles}>
        <Box className={classes.getLinkContStyles}>
          <Typography className={classes.getActionTextOneStyles}>
            Don't have an account?
          </Typography>
          <Link to="/signup" className={classes.getLinkStyles}>
            &nbsp;Signup
          </Link>
        </Box>
        <Link
          to=""
          className={classes.getLinkStyles}
          onClick={() => {
            setIsLoginFormVisible(!isLoginFormVisible);
          }}
        >
          {isLoginFormVisible ? "Forgot Password" : "Back to login"}
        </Link>
      </Box>
      {isLoading ? <Loader /> : <></>}
    </Box>
  );
};

export default LoginForm;
