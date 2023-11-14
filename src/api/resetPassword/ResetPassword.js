import axios from "axios";
import BASE_URL from "../baseUrl/BaseUrl";
import MEMBER_TOKEN from "../memberToken/MemberToken";

export const confirmCurrentPassword = async (confirmPasswordData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/check-password`,
      confirmPasswordData,
      {
        headers: {
          Authorization: `Bearer ${MEMBER_TOKEN}`,
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

export const resetPassword = async (memberData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/reset-password`,
      memberData,
      {
        headers: {
          Authorization: `Bearer ${MEMBER_TOKEN}`,
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
