import { DashboardCardTwoStyles } from "./DashboardCardTwo.Styles";
import { Box, Typography } from "@mui/material";
import CommonButton from "../../button/CommonButton";
import { motion } from "framer-motion";
import DashboardCardTwoUtils from "./DashboardCardTwo.Utils";
import BookForAnyone from "../../dialog/bookForAnyoneDialog/BookForAnyone";
import AddMemberDialog from "../../dialog/addMemberDialog/AddMemberDialog";
import DeleteMemberDialog from "../../dialog/deleteMemberDialog/DeleteMemberDialog";
import NonEmployeeGuestDialog from "../../dialog/bookForGuestDialog/nonEmployeeGuestDialog/NonEmployeeGuestDialog";
import MissedCountDialog from "../../dialog/missedCountDialog/MissedCountDialog";

const DashboardCardTwo = ({
  index,
  icon,
  cardLabel,
  buttonChildren,
  regularizationData,
}) => {
  const {
    todaysCount,
    bookForAnyoneOpen,
    bookForAnyoneScroll,
    handleBookForAnyoneOpen,
    handleBookForAnyoneClose,
    addMemberOpen,
    addMemberScroll,
    handleAddMemberOpen,
    handleAddMemberClose,
    nonEmployeeDialogOpen,
    nonEmployeeDialogScroll,
    handleNonEmployeeDialogOpen,
    handleNonEmployeeDialogClose,
    deleteMemberOpen,
    deleteMemberScroll,
    handleDeleteMemberOpen,
    handleDeleteMemberClose,
    missedCountDialogOpen,
    missedCountDialogScroll,
    handleMissedCountDialogOpen,
    handleMissedCountDialogClose,
    isFileLoading,
    isDailyDataLoading,
    handleExportInExcel,
    handlePreviousMonthData,
  } = DashboardCardTwoUtils(index);
  const {
    boxOneStyles,
    boxTwoStyles,
    cardLabelStyles,
    buttonStyles,
    // guestButtonContStyles,
    // guestButtonStyles,
  } = DashboardCardTwoStyles;

  return (
    <motion.div
      initial={{ scale: 1 }}
      transition={{ ease: "easeInOut" }}
      whileHover={{ scale: 1.025 }}
    >
      <Box sx={boxOneStyles(index)}>
        {icon}
        <Box sx={boxTwoStyles}>
          <Typography sx={cardLabelStyles(index)}>{cardLabel}</Typography>
          <CommonButton
            children={buttonChildren}
            isLoaderRequired={
              index === 0
                ? isDailyDataLoading
                : index === 3
                ? isFileLoading
                : false
            }
            type=""
            onClick={
              index === 0
                ? () => handleExportInExcel(todaysCount)
                : index === 1
                ? handleMissedCountDialogOpen("paper")
                : index === 2
                ? handleAddMemberOpen("paper")
                : index === 3
                ? handlePreviousMonthData
                : index === 4
                ? handleNonEmployeeDialogOpen("paper")
                : index === 5
                ? handleDeleteMemberOpen("paper")
                : null
            }
            isDisabled={false}
            customStyles={buttonStyles}
          />
          {addMemberOpen ? (
            <AddMemberDialog
              open={addMemberOpen}
              scroll={addMemberScroll}
              handleClose={handleAddMemberClose}
            />
          ) : (
            <></>
          )}
          {deleteMemberOpen ? (
            <DeleteMemberDialog
              open={deleteMemberOpen}
              scroll={deleteMemberScroll}
              handleClose={handleDeleteMemberClose}
              children="Delete"
              placeholder="Search member to delete..."
            />
          ) : (
            <></>
          )}
          {missedCountDialogOpen ? (
            <MissedCountDialog
              open={missedCountDialogOpen}
              scroll={missedCountDialogScroll}
              handleClose={handleMissedCountDialogClose}
              regularizationData={regularizationData}
            />
          ) : (
            <></>
          )}
          {nonEmployeeDialogOpen && (
            <NonEmployeeGuestDialog
              nonEmployeeDialogOpen={nonEmployeeDialogOpen}
              nonEmployeeDialogScroll={nonEmployeeDialogScroll}
              handleNonEmployeeDialogClose={handleNonEmployeeDialogClose}
            />
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default DashboardCardTwo;
