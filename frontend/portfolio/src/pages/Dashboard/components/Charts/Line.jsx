import React from "react";
import Chart from "react-apexcharts";

const Line = () => {
  const series = [
    {
      name: "Profit",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 48],
    },
    {
      name: "Loss",
      data: [40, 11, 25, 21, 89, 42, 19, 12, 38],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "straight",
    },

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  return (
    <div id="profit-loss">
      <Chart options={options} series={series} type="line" height={380} />
    </div>
  );
};

export default Line;
