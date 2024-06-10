import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
const Statistic = () => {
  const mode = useSelector((state) => state.config.mode);

  const series = [
    {
      name: "Crypto",
      data: [61000, 45000, 39000, 40800, 80000, 98700, 50000],
    },
    {
      name: "Index",
      data: [60000, 41000, 65000, 51000, 49000, 60000, 69000],
    },
    {
      name: "Innovation",
      data: [51000, 65000, 69000, 56800, 96000, 68700, 40000],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      background:"transparent",
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
      curve: "smooth",
    },
    colors: ["#008FFB", "#00A76D", "#E91E63"],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yaxis: {
      title: {
        text: 'Market Value (in Rupees)',
        // style: {
        //   color: mode === "light" ? "#111827" : "#e5e7eb",
        //   fontWeight: 600,
        // }
      }
    },
  };

  return (
    <div id="">
      <Chart options={options} series={series} type="line" height={380} />
    </div>
  );
};

export default Statistic;
