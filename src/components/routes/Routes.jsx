/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import CommonLayout from "../../pages/commonLayout/CommonLayout";
import Home from "../home/Home";
import BookMeal from "../../pages/bookyourmeal/BookMeal";
import Authmodal from "../../pages/authmodal/Authmodal";
import SignupForm from "../signupForm/SignupForm";
import LoginForm from "../loginForm/LoginForm";
import AdminDashboard from "../../pages/adminDashboard/AdminDashboard";
import Reviews from "../reviews/Reviews";
import ForgotPasswordForm from "../forgotPasswordForm/ForgotPasswordForm";
import ResetPassword from "../resetPassword/ResetPassword";
import CustomSnackbar from "../snackbar/Snackbar";
import CarrotImage from "../../assets/carrot.png";
import OrangeImage from "../../assets/orange image.png";
import OrangeImageOne from "../../assets/orange-image.png";

const AllRoutes = () => {
  return (
    <Router>
      <CustomSnackbar />
      {localStorage.getItem("memberToken") ? (
        <>
          {window?.location?.pathname !== "/reset-password" && <Navbar />}
          <Routes>
            <Route
              exact
              path="/"
              element={<CommonLayout component={<Home />} />}
            />
            <Route
              exact
              path="/bookyourmeal"
              element={<CommonLayout component={<BookMeal />} />}
            />
            <Route
              exact
              path="/dashboard"
              element={<CommonLayout component={<AdminDashboard />} />}
            />
            <Route
              exact
              path="/reviews"
              element={<CommonLayout component={<Reviews />} />}
            />
            <Route
              exact
              path="/reset-password"
              element={
                <Authmodal image={CarrotImage} component={<ResetPassword />} />
              }
            />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Authmodal
                  image={CarrotImage}
                  component={
                    <LoginForm
                      isLoginForm={true}
                      heading="Welcome back !"
                      caption="Please enter your details"
                      buttonChildren="Login"
                    />
                  }
                />
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <Authmodal image={OrangeImage} component={<SignupForm />} />
              }
            />
            <Route
              exact
              path="/update-password/:id/:token"
              element={
                <Authmodal
                  image={OrangeImageOne}
                  component={<ForgotPasswordForm />}
                />
              }
            />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default AllRoutes;
