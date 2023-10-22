import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLastFiveDaysCount,
  getReversedDate,
} from "../../invitationMethods/InvitationMethods";
import { setCustomSnackbar } from "../../store/slices/SnackbarSlice";
import snackbarMessages from "../../Constants";

const WeeklyDataGraphUtils = () => {
  const { location } = useSelector((state) => {
    return state.memberDataReducer;
  });

  const dispatch = useDispatch();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [lastFiveDaysCount, setLastFiveDaysCount] = useState([]);
  const [lastFiveDaysDate, setLastFiveDaysDate] = useState([]);

  const handleLastFiveDaysCount = async () => {
    const response = await getLastFiveDaysCount(location);
    if (response?.data?.status === snackbarMessages.SUCCESS) {
      const fiveDaysCount = [],
        fiveDaysName = [],
        fiveDaysDate = [];
      response?.data?.data.map((count) => {
        fiveDaysCount.push(count?.count);
        fiveDaysName.push(count?.day);
        fiveDaysDate.push(getReversedDate(count?.date));
      });
      setLastFiveDaysCount(fiveDaysCount);
      setLastFiveDaysDate(fiveDaysDate);
      setIsDataLoaded(true);
    } else if (response?.response?.data?.status === snackbarMessages.FAILURE) {
      setIsDataLoaded(true);
      dispatch(
        setCustomSnackbar({
          snackbarOpen: true,
          snackbarType: snackbarMessages.ERROR,
          snackbarMessage: snackbarMessages.DATA_FETCHED_FAILURE,
        })
      );
    }
  };

  useEffect(() => {
    handleLastFiveDaysCount();
  }, []);

  const chartData = {
    chart: {
      id: "apexchart-example",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 1000,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1000,
        },
      },
    },
    xaxis: {
      categories: isDataLoaded ? lastFiveDaysDate : [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      showForNullSeries: true,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "";
        },
      },
    },
    series: [
      {
        name: "Total members",
        data: isDataLoaded ? lastFiveDaysCount : [],
        type: "bar",
      },
    ],
    stroke: {
      curve: "smooth",
      width: 0,
      colors: ["#5D87FF"],
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      strokeDashArray: 0,
    },
    colors: ["#5D87FF"],
    plotOptions: {
      bar: {
        borderRadius: 5,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#5D87FF"],
      },
    },
  };

  return {
    chartData,
    isDataLoaded,
  };
};

export default WeeklyDataGraphUtils;
