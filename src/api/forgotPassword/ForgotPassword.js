import axios from "axios";
import BASE_URL from "../baseUrl/BaseUrl";

export const handleForgotPassword = async (memberData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login/forgot-password`,
      memberData,
      {
        headers: {
          "Content-Type": "application/json",
          referrerPolicy: "no-referrer",
          mode: "no-mode",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const createNewPassword = async (id, token, newPasswordData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login/update-password/${id}/${token}`,
      newPasswordData,
      {
        headers: {
          "Content-Type": "application/json",
          referrerPolicy: "no-referrer",
          mode: "no-mode",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
