import ForgotPasswordUtils from "./ForgotPassword.utils";
import { ForgotPasswordStyles } from "./ForgotPassword.Styles";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import CommonButton from "../button/CommonButton";
import Loader from "../loader/Loader";

const ForgotPassword = ({ isDisabled, setIsDisabled }) => {
  const {
    isLoading,
    memberEmail,
    setMemberEmail,
    emailErrorMsg,
    setEmailErrorMsg,
    emailValidator,
    sendForgotPasswordResetEmail,
  } = ForgotPasswordUtils(setIsDisabled);
  const { getSignupFormStyles, getButtonCustomStyles, root, input } =
    ForgotPasswordStyles;
  const { register } = useForm();

  return (
    <>
      <form style={getSignupFormStyles}>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Stack>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                type="email"
                value={memberEmail}
                required
                {...register("email", { required: true })}
                onChange={(e) => {
                  setMemberEmail(e?.target?.value);
                  setEmailErrorMsg(emailValidator(e?.target?.value));
                }}
                sx={root}
                InputProps={{ sx: input }}
              ></TextField>
              {memberEmail?.length > 0 ? (
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
            <motion.div
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.1 }}
            >
              <CommonButton
                children="Send Link"
                customStyles={getButtonCustomStyles}
                onClick={(event) => {
                  sendForgotPasswordResetEmail(event);
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
    </>
  );
};

export default ForgotPassword;
