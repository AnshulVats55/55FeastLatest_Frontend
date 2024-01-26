export const getNavbarPopoverStyles = {
  getPopoverStyles: {
    "& .MuiPaper-root": {
      "&.MuiPopover-paper": {
        minWidth: "6rem",
        display: "flex",
        flexDirection: "column",
        rowGap: "0.5rem",
        padding: "0.5rem 0rem",
        top: "64px !important",
        left: "calc(100% - 200px) !important",
      },
    },
  },

  getPopoverStylesMobile: {
    "& .MuiPaper-root": {
      "&.MuiPopover-paper": {
        minWidth: "6rem",
        display: "flex",
        flexDirection: "column",
        rowGap: "0.5rem",
        padding: "0.5rem 0rem",
        top: "calc(100% - 175px) !important",
        left: "calc(100% - 180px) !important",
      },
    },
  },

  getLinkContStyles: (index) => {
    return {
      width: "100%",
      padding: index === 0 ? "0.25rem 1rem 0.25rem" : "0.25rem 1rem 0.25rem",
      transition: "0.2s ease-in-out",
      "&:hover": {
        background: "whitesmoke",
      },
    };
  },

  getLinkStyles: {
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 13,
    fontFamily: "Poppins, sans-serif",
  },
};
