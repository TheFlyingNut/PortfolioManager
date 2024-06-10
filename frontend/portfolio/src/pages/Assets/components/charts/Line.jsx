import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from 'react-redux';

const Line = () => {
  const mode = useSelector((state) => state.config.mode);
  const series = [{
    name: "Details",
    data: [40, 11, 25, 21, 89, 42, 19, 12, 38],
  },]

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
    theme: {
      mode: mode === "light" ? 'light' : 'dark',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
        width: 3,
      curve: "smooth",
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
    fill: {
      opacity: 1
    },
  };

  return (
    <div id="Asset details">
      <Chart
        options={options}
        series={series}
        type="line"
        height={380}
      />
    </div>
  );
};

export default Line;