import { NewAdminDashboardStyles } from "./NewAdminDashboard.Styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faDollar,
  faAdd,
  faDownload,
  faPlus,
  faDeleteLeft,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

const NewAdminDashboardUtils = () => {
  const { iconStylesOne, iconStylesTwo } = NewAdminDashboardStyles;
  const bookingDataArray = [
    {
      icon: <FontAwesomeIcon icon={faUser} style={iconStylesOne(0)} />,
      cardLabel: "Today's count",
      cardValue: "35",
    },
    {
      icon: <FontAwesomeIcon icon={faEnvelope} style={iconStylesOne(1)} />,
      cardLabel: "Today's count",
      cardValue: "35%",
    },
    {
      icon: <FontAwesomeIcon icon={faAdd} style={iconStylesOne(2)} />,
      cardLabel: "Today's Regularization requests",
      cardValue: "06",
    },
    {
      icon: <FontAwesomeIcon icon={faDollar} style={iconStylesOne(3)} />,
      cardLabel: "Est. billing",
      cardValue: "₹3,000",
    },
  ];

  const adminActionsArray = [
    {
      icon: <FontAwesomeIcon icon={faDownload} style={iconStylesTwo(0)} />,
      cardLabel: "Daily data",
      buttonChildren: "Daily Data",
    },
    {
      icon: <FontAwesomeIcon icon={faUserGroup} style={iconStylesTwo(2)} />,
      cardLabel: "Book for anyone",
      buttonChildren: "Book for anyone",
    },
    {
      icon: <FontAwesomeIcon icon={faPlus} style={iconStylesTwo(4)} />,
      cardLabel: "Add member",
      buttonChildren: "Add member",
    },
    {
      icon: <FontAwesomeIcon icon={faDownload} style={iconStylesTwo(1)} />,
      cardLabel: "Monthly data",
      buttonChildren: "Monthly Data",
    },
    {
      icon: <FontAwesomeIcon icon={faUserGroup} style={iconStylesTwo(3)} />,
      cardLabel: "Book for guests",
      buttonChildren: "Book for guests",
    },
    {
      icon: <FontAwesomeIcon icon={faDeleteLeft} style={iconStylesTwo(5)} />,
      cardLabel: "Delete member",
      buttonChildren: "Delete member",
    },
  ];

  const dailyDataArray = [
    {
      memberName: "Anshul Vats",
      memberEmail: "anshul.vats@fiftyfivetech.io",
      status: "Booked",
    },
    {
      memberName: "Anshul Vats",
      memberEmail: "anshul.vats@fiftyfivetech.io",
      status: "Booked",
    },
    {
      memberName: "Anshul Vats",
      memberEmail: "anshul.vats@fiftyfivetech.io",
      status: "Booked",
    },
    {
      memberName: "Anshul Vats",
      memberEmail: "anshul.vats@fiftyfivetech.io",
      status: "Booked",
    },
    {
      memberName: "Anshul Vats",
      memberEmail: "anshul.vats@fiftyfivetech.io",
      status: "Booked",
    },
    {
      memberName: "Anshul Vats",
      memberEmail: "anshul.vats@fiftyfivetech.io",
      status: "Booked",
    },
    {
      memberName: "Anshul Vats",
      memberEmail: "anshul.vats@fiftyfivetech.io",
      status: "Booked",
    },
    {
      memberName: "Anshul Vats",
      memberEmail: "anshul.vats@fiftyfivetech.io",
      status: "Booked",
    },
    {
      memberName: "Anshul Vats",
      memberEmail: "anshul.vats@fiftyfivetech.io",
      status: "Booked",
    },
    {
      memberName: "Anshul Vats",
      memberEmail: "anshul.vats@fiftyfivetech.io",
      status: "Booked",
    },
  ];

  return {
    bookingDataArray,
    adminActionsArray,
    dailyDataArray,
  };
};

export default NewAdminDashboardUtils;
