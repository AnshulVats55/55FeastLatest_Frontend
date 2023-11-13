import LoginForm from "../loginForm/LoginForm";

const ResetPassword = () => {
  return (
    <LoginForm
      isLoginForm={false}
      heading="Confirm password"
      caption="Please confirm your password to reset it"
      buttonChildren="Confirm"
    />
  );
};

export default ResetPassword;
