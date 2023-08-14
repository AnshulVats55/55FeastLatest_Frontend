/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomSnackbar } from "../../../store/slices/SnackbarSlice";
import snackbarMessages from "../../../Constants";
import { handleAddMember } from "../../../invitationMethods/InvitationMethods";

const AddMemberDialogUtils = () => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [isLoaderRequired, setIsLoaderRequired] = useState(false);

  const handleAddNewMember = async (event, newMemberData) => {
    //handles adding new member
    event.preventDefault();
    if (fullName === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "Please enter fullname !",
        })
      );
    } else if (email === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "Please enter email !",
        })
      );
    } else if (location === "") {
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: "Please enter location !",
        })
      );
    } else if (fullName !== "" && email !== "" && location !== "") {
      // dispatch(setIsLoading(true));
      setIsLoaderRequired(true);
      const response = await handleAddMember(newMemberData);
      console.log("Response of add new member API is this", response);
      if (response?.data?.status === snackbarMessages.SUCCESS) {
        // dispatch(setIsLoading(false));
        setIsLoaderRequired(false);
        dispatch(
          setCustomSnackbar({
            snackbarOpen: true,
            snackbarType: snackbarMessages.SUCCESS,
            snackbarMessage: "Member added successfully !",
          })
        );
        setFullName("");
        setEmail("");
        setLocation("");
      } else if (
        response?.response?.data?.status === snackbarMessages.FAILURE
      ) {
        if (response?.response?.data?.message === "Email already exists") {
          // dispatch(setIsLoading(false));
          setIsLoaderRequired(false);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.MEMBER_EMAIL_ALREADY_EXISTS,
            })
          );
        } else {
          // dispatch(setIsLoading(false));
          setIsLoaderRequired(false);
          dispatch(
            setCustomSnackbar({
              snackbarOpen: true,
              snackbarType: snackbarMessages.ERROR,
              snackbarMessage: snackbarMessages.MEMBER_ADDED_FAILURE,
            })
          );
        }
      }
    }
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    location,
    setLocation,
    handleAddNewMember,
    isLoaderRequired,
    setIsLoaderRequired,
  };
};

export default AddMemberDialogUtils;
