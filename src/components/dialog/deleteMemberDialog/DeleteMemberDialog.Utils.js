/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  getTotalMembers,
  handleDeleteMember,
} from "../../../invitationMethods/InvitationMethods";

const DeleteMemberDialogUtils = (open) => {
  const { location } = useSelector((state) => {
    return state.memberDataReducer;
  });

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
      setTotalMembers(response?.data?.data);
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
    //handles member search
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
