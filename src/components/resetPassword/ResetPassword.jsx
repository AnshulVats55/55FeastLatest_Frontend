import LoginForm from "../loginForm/LoginForm";

const ResetPassword = () => {
  return (
    <LoginForm
      isLoginForm={false}
      formType="resetPassword"
      heading="Reset password"
      caption="Enter below details to reset your password"
      buttonChildren="Reset"
    />
  );
};

export default ResetPassword;
