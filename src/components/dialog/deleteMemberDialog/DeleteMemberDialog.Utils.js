/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalMembers,
  handleDeleteMember,
} from "../../../invitationMethods/InvitationMethods";
import snackbarMessages from "../../../Constants";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";

const DeleteMemberDialogUtils = (open) => {
  const { location } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const dispatch = useDispatch();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalMembers, setTotalMembers] = useState([]);
  let animationDuration = 0.4;

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    const handleGetTotalMembers = async () => {
      const response = await getTotalMembers(location);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        setTotalMembers(response?.data?.data);
        setIsDataLoaded(true);
      } else if (response?.data?.data?.status === snackbarMessages.FAILURE) {
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.ERROR,
            snackbarMessage: snackbarMessages.ERROR_FECTHING_ALL_MEMBERS,
          })
        );
        setIsDataLoaded(true);
      }
    };

    handleGetTotalMembers();
  }, []);

  const handleMemberSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = totalMembers?.filter((member) =>
    member?.fullName?.toLowerCase().includes(searchTerm)
  );

  const handleDeleteExistingMember = async (memberEmail) => {
    const response = await handleDeleteMember(memberEmail);
    return response;
  };

  return {
    isDataLoaded,
    animationDuration,
    descriptionElementRef,
    filteredUsers,
    handleMemberSearch,
    handleDeleteExistingMember,
  };
};

export default DeleteMemberDialogUtils;
