import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getTopGainersAndLosers } from "../../api";
import TopListing from "./components/TopListing/TopListing";
import Statistic from "../Portfolio/components/Charts/Statistic";
import { Card, Donut, Calendar } from "./components/components";
import { MdClose } from "react-icons/md";
import { HiOutlineFilter } from "react-icons/hi";
// import { AiOutlineStock } from "react-icons/ai";
// import { CiCalendar } from "react-icons/ci";

const Dashboard = () => {
  const calendarRef = useRef(null);
  const { interval } = useSelector((state) => state.portfolio);
  const { metrics, equityDistribution } = useSelector((state) => state.portfolio);
  const [showCalendar, setShowCalendar] = useState(false);
  // const [activeButton, setActiveButton] = useState("monthly");
  // const [rowToEdit, setRowToEdit] = useState(null);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: dayjs(interval.start),
    endDate: dayjs(interval.end),
  });

  useEffect(() => {
    const fetchTopGainersAndLosers = async () => {
      try {
        const { data } = await getTopGainersAndLosers();

        const topGainers = data.data.top_gainers;
        const topLosers = data.data.top_losers;
        const topGainersData = topGainers.map((gainer) => {
          return {
            ticker: gainer.ticker,
            price: gainer.price,
            category: gainer.category,
            change: {
              value: gainer.day_change,
              percentage: gainer.day_change_percentage,
            },
          };
        });
        const topLosersData = topLosers.map((loser) => {
          return {
            ticker: loser.ticker,
            price: loser.price,
            category: loser.category,
            change: {
              value: loser.day_change,
              percentage: loser.day_change_percentage,
            }
          };
        });
        setTopGainers(topGainersData);
        setTopLosers(topLosersData);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchTopGainersAndLosers();
  }, []);

  useEffect(() => {
    if (showCalendar) {
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [showCalendar]);

  const handleClickOutside = (event) => {
    event.preventDefault();

    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  const handleCalendarClose = () => {
    setShowCalendar(false);
  };

  const formatData = (data) => {
    const formattedData = [];
    for (let key in data) {
      formattedData.push(data[key].percentage);
    }
    return formattedData;
  }

  const formatLabels = (labels) => {
    return labels.map((label) => label.charAt(0).toUpperCase() + label.slice(1));
  }

  return (
    <>
      <main>
        <div className="flex flex-col gap-4 h-full">
          <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
              <h3>Overview</h3>
              <p>View your current portfolio & summary</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <div ref={calendarRef} className="relative">
                <span className="input-wrapper">
                  <input
                    onClick={() => setShowCalendar(!showCalendar)}
                    type="text"
                    placeholder="Select Date Range"
                    className="input input-sm h-9 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                    readOnly={true}
                    autoComplete="off"
                    value={
                      selectedDateRange.startDate && selectedDateRange.endDate
                        ? `${selectedDateRange.startDate.format(
                            "MMM DD, YYYY"
                          )} ~ ${selectedDateRange.endDate.format(
                            "MMM DD, YYYY"
                          )}`
                        : ""
                    }
                    style={{ paddingRight: "2rem" }}
                  />
                  <div className="input-suffix-end">
                    <span className="close-btn text-base" role="button">
                      <MdClose />
                    </span>
                  </div>
                </span>
                {showCalendar && (
                  <Calendar
                    onClose={handleCalendarClose}
                    selectedDateRange={selectedDateRange}
                    setSelectedDateRange={setSelectedDateRange}
                    // onSelectDateRange={(startDate, endDate) => setSelectedDateRange({ startDate, endDate })}
                  />
                )}
              </div>
              <button className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 text-sm">
                <span className="flex items-center justify-center">
                  <span className="text-lg">
                    <HiOutlineFilter />
                  </span>
                  <span className="ml-2">Filter</span>
                </span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* {metrics.map((metric) => (
              <Card key={metric.title} {...metric} />
            ))} */}
            {Object.keys(metrics).length !== 0 && (
              <>
                <Card title="Current Value" {...metrics.market_value} />
                <Card title="Invested Value" {...metrics.invested_value} />
                <Card title="Overall P/L" {...metrics.overall_pl} />
              </>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="card col-span-2 card-border" role="presentation">
              <div className="card-body">
                <h4>Statistics</h4>
                <div className="mt-4">
                  <div className="chartRef min-h-[365px]">
                    <div>
                      <Statistic />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card card-border" role="presentation">
              <div className="card-body">
                <h4>Equity Distribution</h4>
                <div className="mt-6">
                  {Object.keys(equityDistribution).length ? (
                    <div className="chartRef">
                      <div style={{ minHeight: "278.7px" }}>
                        <Donut series={formatData(equityDistribution)} labels={formatLabels(Object.keys(equityDistribution))} />
                      </div>
                    </div>
                  ) : (
                    <div className="h-80 flex flex-col justify-center items-center">
                      <p className="text-gray-400">Buy some assets!</p>
                    </div>
                  )}
                  {/* <div className="mt-6 grid grid-cols-2 gap-4 max-w-[180px] mx-auto">
                    <div className="flex items-center gap-1">
                      <span
                        className="badge-dot"
                        style={{ backgroundColor: "rgb(0,143,251)" }}
                      ></span>
                      <span className="font-semibold">Crypto</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span
                        className="badge-dot"
                        style={{ backgroundColor: "rgb(0,227,150)" }}
                      ></span>
                      <span className="font-semibold">Index</span>
                    </div>
                    <div className="flex col-span-2 items-center gap-1">
                      <span
                        className="badge-dot"
                        style={{ backgroundColor: "rgb(254,176,25)" }}
                      ></span>
                      <span className="font-semibold">Innovation</span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {topGainers.length !== 0 && (
              <TopListing name={"Top Gainers"} rows={topGainers} />
            )}
            {topLosers.length !== 0 && (
              <TopListing name={"Top losers"} rows={topLosers} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
