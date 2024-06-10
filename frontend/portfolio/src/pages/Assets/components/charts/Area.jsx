import React from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import abbreviate from "number-abbreviate";

const Area = ({ data, min, max, type }) => {
  const mode = useSelector((state) => state.config.mode);
  const series= [{
      name: "Market Value",
      data: data,
    },
  ];

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      background:"transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        autoScaleYaxis: true,
      }
    },
    colors: [type === "green" ? "#81C995" : "#F28B82"],
    theme: {
      mode: mode === "light" ? "light" : "dark",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    zoom: {
      enabled: true,
      type: 'xy',
      autoScaleYaxis: true,
    },
    stroke: {
      width: 3,
      // curve: "smooth",
      curve: "straight",
    },
    xaxis: {
      type: 'datetime',
      min: min,
      max: max,
      tickAmount: 6,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return abbreviate(value, 2);
        },
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: function (val) {
          return "₹ " + val
        }
      }
    },
    fill: {
      colors: type === "green" ? "#81C995" : "#F28B82",
      type: "gradient",
      gradient: {
        shadeIntensity: mode === "light" ? 1 : 0.5,
        opacityFrom: mode === "light" ? 0.3 : 0.7,
        opacityTo: mode === "light" ? 0.9: 0.1,
        stops: [0, 100],
      },
    },
    // optionsLine: {
    //   id: 'timeline',
    //   type: 'area',
    //   brush: {
    //     enabled: true,
    //     target: 'area-datetime'
    //   },
    //   selection: {
    //     enabled: true,
    //   },
    // }
  };

  return (
    <div id="area-chart">
      <Chart options={options} series={series} type="area" height={380} />
    </div>
  );
};

export default Area;