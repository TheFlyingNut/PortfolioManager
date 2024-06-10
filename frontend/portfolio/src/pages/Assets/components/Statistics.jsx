import React, { useState } from "react";
import Candle from "./charts/Candle";
import Area from "./charts/Area";
import { MdCandlestickChart } from "react-icons/md";
import { TbChartAreaLineFilled } from "react-icons/tb";

const Statistics = ({ assetDetails, candleData, areaData }) => {
  const [showCandlestick, setShowCandlestick] = useState(true);
  const [activeButton, setActiveButton] = useState("default");
  const [minTime, setMinTime] = useState(areaData[areaData.length - 1][0]);
  const maxTime = areaData[0][0];
  
  const updateData = (timeline) => {
    const today = new Date();
    setActiveButton(timeline);

    if (activeButton === timeline) {
      setActiveButton("default");
      setMinTime(null);
      return;
    }



    switch (timeline) {
      case "one_month":
        let prevMonthTime = new Date(today.setMonth(today.getMonth() - 1))
        if(new Date(areaData[areaData.length - 1][0]) < prevMonthTime) 
          setMinTime(prevMonthTime.getTime());
        else
          setMinTime(areaData[areaData.length - 1][0]);
        break;
      case "six_month":
        let prevSixMonthTime = new Date(today.setMonth(today.getMonth() - 6))
        if(new Date(areaData[areaData.length - 1][0]) < prevSixMonthTime) 
          setMinTime(prevSixMonthTime.getTime());
        else
          setMinTime(areaData[areaData.length - 1][0]);
        break;
      case "one_year":
        let prevYearTime = new Date(today.setFullYear(today.getFullYear() - 1))
        if(new Date(areaData[areaData.length - 1][0]) < prevYearTime)
          setMinTime(prevYearTime.getTime());
        else
          setMinTime(areaData[areaData.length - 1][0]);
        break;
      case "ytd":
        let ytd = new Date(today.getFullYear(), 0, 1);
        if(new Date(areaData[areaData.length - 1][0]) < ytd)
          setMinTime(ytd.getTime());
        else
          setMinTime(areaData[areaData.length - 1][0]);
        break;
      case "all":
        setMinTime(areaData[areaData.length - 1][0]);
        break;
      default:
        setMinTime(areaData[areaData.length - 1][0]);
        break;
    }
  };

  const handleButtonClick = (buttonType) => {
    updateData(buttonType);
  };

  const formatTime = () => {
    switch (activeButton) {
      case "one_month":
        return "past month";
      case "six_month":
        return "past 6 months";
      case "one_year":
        return "past year";
      case "ytd":
        return "year to date";
      case "all":
        return "all time";
      default:
        return "today";
    }
  };

  return (
    <div className="card-body">
      <div className="flex justify-start items-center gap-4 mb-2 ml-2 text-[18px]">
        <h4>{assetDetails.name}</h4>
        <div className="flex flex-col justify-between">
          <p>
            {Number(assetDetails.market_value).toFixed(2)}{" "}
            <span className="text-xs">INR</span>
          </p>
          <p
            className={`${
              assetDetails.changes[activeButton].change >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            <span>
              {Number(assetDetails.changes[activeButton].change).toFixed(2)}
            </span>{" "}
            <span>
              (
              {Number(
                assetDetails.changes[activeButton].change_percentage
              ).toFixed(2)}
              %)
            </span>{" "}
            {assetDetails.changes[activeButton].change >= 0 ? "▲" : "▼"}{" "}
            <span>{formatTime()}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="segment flex gap-2">
            <button
              className={`button ${
                activeButton === "one_month"
                  ? "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-gray-100"
                  : "border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100"
              }
                ml-2 radius-round h-9 px-3 text-sm`}
              onClick={() => handleButtonClick("one_month")}
            >
              1M
            </button>
            <button
              className={`button ${
                activeButton === "six_month"
                  ? "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-gray-100"
                  : "border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100"
              }
                ml-2 radius-round h-9 px-3 text-sm`}
              onClick={() => handleButtonClick("six_month")}
            >
              6M
            </button>
            <button
              className={`button ${
                activeButton === "one_year"
                  ? "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-gray-100"
                  : "border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100"
              }
                ml-2 radius-round h-9 px-3 text-sm`}
              onClick={() => handleButtonClick("one_year")}
            >
              1Y
            </button>
            <button
              className={`button ${
                activeButton === "ytd"
                  ? "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-gray-100"
                  : "border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100"
              }
                ml-2 radius-round h-9 px-3 text-sm`}
              onClick={() => handleButtonClick("ytd")}
            >
              YTD
            </button>
            <button
              className={`button ${
                activeButton === "all"
                  ? "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-gray-100"
                  : "border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100"
              }
                ml-2 radius-round h-9 px-3 text-sm`}
              onClick={() => handleButtonClick("all")}
            >
              Max
            </button>
          </div>
        </div>
        <div>
          <button
            className={`button ${
              showCandlestick
                ? "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-gray-100"
                : "border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100"
            }
               mx-2 radius-round h-9 px-3 text-sm`}
            onClick={() => setShowCandlestick(true)}
          >
            <MdCandlestickChart size={20} />
          </button>
          <button
            className={`button ${
              !showCandlestick
                ? "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-gray-100"
                : "border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100"
            }
              mx-2 radius-round h-9 px-3 text-sm`}
            onClick={() => setShowCandlestick(false)}
          >
            <TbChartAreaLineFilled size={20} />
          </button>
        </div>
      </div>
      <div className="chartRef">
        <div className="h-auto">
          {showCandlestick ? (
            <Candle data={candleData} min={minTime} max={maxTime} />
          ) : (
            <Area
              data={areaData}
              min={minTime}
              max={maxTime}
              type={
                assetDetails.changes[activeButton].change >= 0 ? "green" : "red"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
