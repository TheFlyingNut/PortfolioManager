import React from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import abbreviate from "number-abbreviate";

const Candle = ({ data, min, max }) => {
  const mode = useSelector((state) => state.config.mode);
  const series = [
    {
      data: data,
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      background: "transparent",
      toolbar: {
        show: true,
      },
    },
    theme: {
      mode: mode === "light" ? "light" : "dark",
    },
    zoom: {
      enabled: true,
      type: "xy",
      autoScaleYaxis: false,
    },
    xaxis: {
      type: "datetime",
      min: min,
      max: max,
      // max: new Date('01 Mar 2020').getTime(),
      tickAmount: 6,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return abbreviate(value, 2);
        },
      },
    },
    tooltip: {
      enabled: true,
    }
    // yaxis: {
    //   tooltip: {
    //     enabled: true
    //   }
    // }
  };

  return (
    <div id="profit-loss">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={380}
      />
    </div>
  );
};

export default Candle;
