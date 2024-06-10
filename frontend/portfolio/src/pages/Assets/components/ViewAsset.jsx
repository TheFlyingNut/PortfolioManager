import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { Box, Button } from "@mui/material";
import Card from "./card/Card";
import { useDispatch, useSelector } from "react-redux";
import CustomSlider from "./CustomSlider";
import BuySellModal from "./BuySellModal";
import { MdCandlestickChart } from "react-icons/md";
import { FaChartArea } from "react-icons/fa6";
import { TbChartAreaLineFilled } from "react-icons/tb";
import { useParams } from "react-router-dom";
import {
  getAssetDetails,
  getAssetPrice,
  getPortfolioAssetDetails,
} from "../../../api";
import abbreviate from "number-abbreviate";
import Statistics from "./Statistics";
import { useUser } from "@clerk/clerk-react";
import Loader from "../../../components/Loader/Loader";

const ViewAsset = ({ balance }) => {
  const { ticker } = useParams();
  const { user } = useUser();
  const [assetDetails, setAssetDetails] = useState(null);
  const [portfolioAsset, setPortfolioAsset] = useState(null);
  const [assetPrice, setAssetPrice] = useState(null);
  const [areaData, setAreaData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("BUY");

  useEffect(() => {
    const fetchAssetDetails = async () => {
      try {
        const { data } = await getAssetDetails(ticker);
        setAssetDetails(data[0]);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAssetDetails();
  }, [ticker]);

  useEffect(() => {
    const fetchPortfolioAssetDetails = async () => {
      try {
        const { data } = await getPortfolioAssetDetails(
          ticker,
          user.primaryEmailAddress.emailAddress
        );
        setPortfolioAsset(data.assets[0]);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPortfolioAssetDetails();
  }, [ticker, user]);

  useEffect(() => {
    const formatCandleStickData = (data) => {
      return data.map((item) => {
        return {
          x: new Date(item.timestamp1).getTime(),
          y: [item.open, item.high, item.low, item.close],
        };
      });
    };

    const formatAreaData = (data) => {
      return data.map((item) => {
        return [new Date(item.timestamp1).getTime(), item.market_value];
      });
    };

    const fetchAssetPrice = async () => {
      try {
        const { data } = await getAssetPrice(
          ticker,
          user.primaryEmailAddress.emailAddress
        );
        setAssetPrice(formatCandleStickData(data));
        setAreaData(formatAreaData(data));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAssetPrice();
  }, [ticker, user]);

  const handleChangePortfolioAsset = (portfolio) => {
    setPortfolioAsset(portfolio);
  }

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="pb-4 lg:mb-0">
        <h3>View Asset</h3>
        <p>View the asset & summary</p>
      </div>
      {(assetDetails && assetPrice) && (
        <>
          <div className="grid grid-cols-3">
            <div className="col-span-3 row-span-2">
              <div
                className="card 2xl:col-span-8 xl:col-span-7 card-border"
                role="presentation"
              >
                {assetDetails && assetPrice && areaData && (
                  <Statistics
                    assetDetails={assetDetails}
                    candleData={assetPrice}
                    areaData={areaData}
                  />
                )}
              </div>
            </div>
          </div>
          {portfolioAsset && (
            <>
              <h3 className="mt-4">My Portfolio</h3>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                <Card
                  title="Average Price"
                  value={`₹${abbreviate(portfolioAsset.avgBasis, 2)}`}
                />
                <Card
                  title="Current Value"
                  value={`₹${abbreviate(portfolioAsset.marketValue, 2)}`}
                />
                <Card title="Quantity" value={portfolioAsset.quantity} />
                <Card
                  title="Unrealised P/L"
                  value={`₹${abbreviate(portfolioAsset.profitLoss, 2)}`}
                  type={
                    parseInt(portfolioAsset.profitLoss) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                />
                <Card
                  title="Day's P/L"
                  value={`₹${abbreviate(portfolioAsset.daypl, 2)}`}
                  type={
                    parseInt(portfolioAsset.daypl) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                />
              </div>
            </>
          )}
          {assetDetails && (
            <>
              <h3 className="mt-4">Asset Details</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="card card-border mt-4 " role="presentation">
                  <div className="card-body  ">
                    <div className="flex justify-between items-center my-3">
                      <h6 className="font-semibold mb-4 text-sm">CURRENT PRICE</h6>
                      <h3 className="font-bold">
                        <span>₹{abbreviate(assetDetails.market_value, 2)}</span>
                      </h3>
                    </div>
                    <div className="flex justify-between items-center my-4">
                      <h6 className="font-semibold mb-4 text-sm">OPEN PRICE</h6>
                      <h3 className="font-bold">
                        <span>₹{abbreviate(assetDetails.open, 2)}</span>
                      </h3>
                    </div>
                    <div className="flex justify-between items-center">
                      <h6 className="font-semibold mb-4 text-sm">PREV CLOSE</h6>
                      <h3 className="font-bold">
                        <span>₹{abbreviate(assetDetails.close, 2)}</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="card card-border mt-4" role="presentation">
                  <div className="card-body">
                    <div className="flex justify-between items-center">
                      <h6 className="font-semibold mb-4 text-sm">
                        Today's Low-High
                      </h6>
                      <div>
                        <div className="flex justify-between">
                          <h6>{abbreviate(assetDetails.highLow.today.low, 2)}</h6>
                          <h6>{abbreviate(assetDetails.highLow.today.high, 2)}</h6>
                        </div>
                        <CustomSlider
                          value={parseInt(
                            (assetDetails.market_value /
                              assetDetails.highLow.today.high) *
                              100
                          )}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h6 className="font-semibold mb-4 text-sm">
                        52 Week Low-High
                      </h6>
                      <div>
                        <div className="flex justify-between">
                          <h6>
                            {abbreviate(assetDetails.highLow["52week"].low, 2)}
                          </h6>
                          <h6>
                            {abbreviate(assetDetails.highLow["52week"].high, 2)}
                          </h6>
                        </div>
                        <CustomSlider
                          value={parseInt(
                            (assetDetails.market_value /
                              assetDetails.highLow["52week"].high) *
                              100
                          )}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h6 className="font-semibold mb-4 text-sm">
                        Lower-Upper Circuit
                      </h6>
                      <div>
                        <div className="flex justify-between">
                          <h6>{abbreviate(assetDetails.highLow.overall.low, 2)}</h6>
                          <h6>
                            {abbreviate(assetDetails.highLow.overall.high, 2)}
                          </h6>
                        </div>
                        <CustomSlider
                          value={parseInt(
                            (assetDetails.market_value /
                              assetDetails.highLow.overall.high) *
                              100
                          )}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div
              className={`card card-border mt-4 bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-center cursor-pointer hover:bg-green-700 ${balance >= assetDetails.market_value ? '' : 'pointer-events-none opacity-50'}`}
              role="presentation"
              onClick={() => balance >= assetDetails.market_value && openModal("BUY")}
            >
              <div className="card-body">
                <h6 className="text-white">BUY</h6>
              </div>
            </div>

            <div
              className={`card card-border mt-4 bg-red-500 dark:bg-red-600 dark:hover:bg-red-500 text-center cursor-pointer hover:bg-red-600 ${balance >= assetDetails.market_value ? '' : 'pointer-events-none opacity-50'}`}
              role="presentation"
              onClick={() => balance >= assetDetails.market_value && openModal("SELL")}
            >
              <div className="card-body text-white">
                <h6 className="text-white">SELL</h6>
              </div>
            </div>
          </div>
        </>
      )}
      {!(assetDetails && assetPrice) && (
        <Loader />
      )}

      {isModalOpen && (
        <BuySellModal
          closeModal={closeModal}
          ticker={ticker}
          handleChangePortfolioAsset={handleChangePortfolioAsset}
          defaultValue={{
            category: assetDetails.category,
            ticker: assetDetails.ticker,
            market_value: assetDetails.market_value,
            quantity: portfolioAsset.quantity || 0,
          }}
          initialChecked={modalType === "SELL"}
        />
      )}
    </>
  );
};

export default ViewAsset;
