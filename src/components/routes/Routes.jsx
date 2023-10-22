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
import CustomSnackbar from "../snackbar/Snackbar";
import CarrotImage from "../../assets/carrot.png";
import OrangeImage from "../../assets/orange image.png";
import NewAdminDashboard from "../../pages/newAdminDashboard/NewAdminDashboard";
import UserProfile from "../../pages/profile/Profile";

const AllRoutes = () => {
  return (
    <Router>
      <CustomSnackbar />
      {localStorage.getItem("memberToken") ? (
        <>
          <Navbar />
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
              path="/admin"
              element={<CommonLayout component={<NewAdminDashboard />} />}
            />
            <Route
              exact
              path="/reviews"
              element={<CommonLayout component={<Reviews />} />}
            />
            <Route
              exact
              path="/profile"
              element={<CommonLayout component={<UserProfile />} />}
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
                <Authmodal image={CarrotImage} component={<LoginForm />} />
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <Authmodal image={OrangeImage} component={<SignupForm />} />
              }
            />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default AllRoutes;
