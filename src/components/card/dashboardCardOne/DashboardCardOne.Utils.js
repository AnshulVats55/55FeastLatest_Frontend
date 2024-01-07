import { useState, useRef, useEffect } from "react";

const DashboardCardOneUtils = () => {
  const [missedCountDialogOpen, setMissedCountDialogOpen] = useState(false);
  const [missedCountDialogScroll, setMissedCountDialogScroll] =
    useState("paper");

  const handleMissedCountDialogOpen = (scrollType) => () => {
    setMissedCountDialogOpen(true);
    setMissedCountDialogScroll(scrollType);
  };

  const handleMissedCountDialogClose = () => {
    setMissedCountDialogOpen(false);
  };

//   const descriptionElementRef = useRef(null);
//   useEffect(() => {
//     if (open) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [open]);

  return {
    missedCountDialogOpen,
    missedCountDialogScroll,
    handleMissedCountDialogOpen,
    handleMissedCountDialogClose,
  };
};

export default DashboardCardOneUtils;
