import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const Bar = ({ investments }) => {
  const mode = useSelector((state) => state.config.mode);
  const series = [{
    name: 'Investment',
    data: [23, 44, 55, 57, 56, 61, 58, 63, 60, 66, 69, 73]
    // data: investments.data
  }];

  const options = {
    chart: {
      type: 'bar',
      background:"transparent",
      height: 350,
      toolbar: {
        show: false,
      }
    },
    theme: {
      mode: mode === "light" ? 'light' : 'dark',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      title: {
        text: 'Months'
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      // type: 'date',
      // labels: {
      //   format: 'dd MM yyyy'
      // },
      // categories: investments.categories,
    },
    yaxis: {
      title: {
        // text: '₹ (thousands)'
        text: 'Total Investment (in Rupees)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹ " + val + " thousands"
        }
      }
    }
  }

  return (
    <div className='object-contain' id="monthly-investment">
      <Chart options={options} series={series} type="bar" height={380} />
    </div>
  )
}

export default Bar;