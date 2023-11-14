import LoginForm from "../loginForm/LoginForm";

const ConfirmPassword = () => {
  return (
    <LoginForm
      isLoginForm={false}
      formType="confirmPassword"
      heading="Confirm password"
      caption="Please confirm your password to reset it"
      buttonChildren="Confirm"
    />
  );
};

export default ConfirmPassword;
