/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTotalMembers,
  handleDeleteMember,
} from "../../../invitationMethods/InvitationMethods";
import { HandleLogoutOnSessionExpire } from "../../../common/Logout";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import snackbarMessages from "../../../Constants";

const DeleteMemberDialogUtils = (open) => {
  const { location } = useSelector((state) => {
    return state.memberDataReducer;
  });
  const dispatch = useDispatch();

  const { handleLogoutOnTokenExpire } = HandleLogoutOnSessionExpire();

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
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        if (
          response?.response?.data?.message ===
          snackbarMessages.JWT_TOKEN_EXPIRED
        ) {
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.INFO,
              snackbarMessage: snackbarMessages.SESSION_EXPIRED,
            })
          );
          setTimeout(() => {
            handleLogoutOnTokenExpire();
          }, 1500);
        }
      }
      setIsDataLoaded(true);
    };

    handleGetTotalMembers();
  }, []);

  const memberData = [
    //member's dummy data
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
    {
      memberName: "",
      memberEmail: "",
    },
  ];

  const handleMemberSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = totalMembers?.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm)
  );

  const handleDeleteExistingMember = async (memberEmail) => {
    const response = await handleDeleteMember(memberEmail);
    return response;
  };

  return {
    isDataLoaded,
    animationDuration,
    descriptionElementRef,
    memberData,
    filteredUsers,
    handleMemberSearch,
    handleDeleteExistingMember,
  };
};

export default DeleteMemberDialogUtils;
