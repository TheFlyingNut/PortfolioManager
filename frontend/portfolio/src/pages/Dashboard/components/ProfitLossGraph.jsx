import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Utils from "../helper/Utils";

const ProfitLossGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, config);

    return () => {
      myChart.destroy(); // Clean up when the component unmounts
    };
  }, []);

  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [
          40, 45, 70, 60, 77, 61, 42, 34, 34, 34, 3, 43, 4, 34, 34, 34, 3, 43,
          43,
        ],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Dataset 2",
        data: [40, 10, 18, 22, 23, 16, 15],
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      maintainAspectRatio: false,
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: "Chart.js Line Chart - Multi Axis",
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    },
  };
  return (
    <div className="h-72 ">
      <h1 className="font-bold text-xl text-gray-600  p-5">Profit/Loss</h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ProfitLossGraph;
