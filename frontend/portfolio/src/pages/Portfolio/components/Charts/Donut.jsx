import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const Donut = ({ series, labels }) => {
  const mode = useSelector((state) => state.config.mode);
  // const series = [55, 27, 18];

  const options = {
    chart: {
      type: "donut",
      background: "transparent",
    },
    labels: labels,

    // theme: {
    //   mode: mode === "light" ? "light" : "dark",
    // },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
      fontSize: "16px",
      fontWeight: "600",
      labels: {
        colors: mode === "light" ? "#6B7280" : "#9CA3AF",
      },
    },

    plotOptions: {
      pie: {
        size: 100,
        donut: {
          size: "80%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "",
              formatter: function (w) {
                return "Equity";
              },
            },
            value: {
              offsetY: -8, // -8 worked for me
              color: mode === "light" ? "#000" : "#fff",
              fontSize: "18px",
              fontWeight: "semi-bold",
            },
          },
        },
      },
    },
    annotations: {
      position: "front",
      points: [
        {
          x: "50%",
          y: "50%",
          marker: {
            size: 0,
          },
          label: {
            text: "Center Text",
            offsetY: 0,
            style: {
              fontSize: "18px",
              color: "#000",
            },
          },
        },
      ],
    },
  };
  return (
    <div className="object-contain flex justify-center items-center">
      <Chart options={options} series={series} type="donut" />
    </div>
  );
};

export default Donut;
