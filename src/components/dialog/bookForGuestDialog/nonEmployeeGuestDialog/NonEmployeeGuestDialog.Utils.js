import { useState, useEffect } from "react";
import { bookForGuests } from "../../../../bookingMethods/BookingMethods";
import { useSelector } from "react-redux";
import { dateToBeChecked } from "../../../../common/CommonData";

const NonEmployeeGuestDialogUtils = () => {
  const { location } = useSelector((state) => {
    return state.memberDataReducer;
  });
  console.log("Loc of admin", location);

  const [nonEmployeeGuests, setNonEmployeeGuests] = useState(0);
  const guestData = {
    count: nonEmployeeGuests,
    dates: [dateToBeChecked],
  }

  const handleBookForGuests = async () => {
    if(nonEmployeeGuests <= 0){
      alert("Please select guest(s)")
    }
    else{
      const response = await bookForGuests("nonEmployee", location, guestData);
      console.log("RES OF GUESTS API", response);
    }
  };

  return {
    setNonEmployeeGuests,
    handleBookForGuests,
  };
};

export default NonEmployeeGuestDialogUtils;
