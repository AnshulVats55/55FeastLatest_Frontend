import { useNavigate } from "react-router-dom";

export const HandleLogoutOnSessionExpire = () => {
  const navigate = useNavigate();

  const handleLogoutOnTokenExpire = () => {
    localStorage.removeItem("memberToken");
    navigate("/");
    window.location.reload();
  };

  return {
    handleLogoutOnTokenExpire,
  };
};
