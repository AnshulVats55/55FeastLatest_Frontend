import { useState } from "react";

const AdminDashboardUtils = () => {
  const [bookForAnyoneOpen, setBookForAnyoneOpen] = useState(false);
  const [bookForAnyoneScroll, setBookForAnyoneScroll] = useState("paper");

  const handleBookForAnyoneOpen = (scrollType) => () => {
    setBookForAnyoneOpen(true);
    setBookForAnyoneScroll(scrollType);
  };

  const handleBookForAnyoneClose = () => {
    setBookForAnyoneOpen(false);
  };
  return {
    bookForAnyoneOpen,
    bookForAnyoneScroll,
    handleBookForAnyoneOpen,
    handleBookForAnyoneClose,
  };
};

export default AdminDashboardUtils;
