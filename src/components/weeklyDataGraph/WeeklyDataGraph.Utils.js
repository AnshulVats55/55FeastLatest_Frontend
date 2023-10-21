const WeeklyDataGraphUtils = () => {
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
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
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
        data: [30, 40, 25, 35, 49],
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
  };
};

export default WeeklyDataGraphUtils;
