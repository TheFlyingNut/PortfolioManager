import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router";
import { MdOutlineReadMore, MdChecklistRtl } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import BuySellModal from "./BuySellModal";
import MoreDetailsModal from "./MoreDetailsModal";
import { useDispatch } from "react-redux";
// import { saveWatchlistAsset } from "../../../../state/slices/watchlistSlice";

const Modal = ({ onSubmit, closeModal, defaultValue }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // console.log(defaultValue);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [moreDetailsModalOpen, setMoreDetailsModalOpen] = useState(false);
  const [formState, setFormState] = useState(
    defaultValue || {
      category: "",
      ticker: "",
      price: 0,
      quantity: 0,
    }
  );

  // console.log(defaultValue);

  const MoreDetailsClick = () => {
    setMoreDetailsModalOpen(true);
  };
  const [errors, setErrors] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [sellBuyModalOpen, setSellBuyModalOpen] = useState(false);

  const closeBuySellModal = () => {
    setSellBuyModalOpen(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSellBuyModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    closeModal();
  };

  const watch = ({ ticker, quantity, price, category }) => {
    // dispatch(saveWatchlistAsset({ ticker, quantity, price, category }));
    navigate("/app/watchlist");
  };

  return (
      <div className="absolute right-[17%] ">
        <div className=" dark:bg-gray-800 bg-white border w-72 p-6 -mt-7 rounded-md z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Asset Details</h3>
            <button
              className="text-gray-600 dark:text-gray-400 font-bold hover:text-gray-800 dark:hover:text-gray-200"
              onClick={handleClose}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="flex mx-auto justify-center items-center my-4">
            <button
              className={`${
                activeTab === "buy" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"
              } px-4 py-2 rounded-l cursor-pointer`}
              onClick={() => handleTabClick("buy")}
            >
              Buy
            </button>
            <button
              className={`${
                activeTab === "sell" ? "bg-red-500 text-white" : "bg-gray-300 text-gray-500"
              }  px-4 py-2 rounded-r cursor-pointer `}
              onClick={() => handleTabClick("sell")}
            >
              Sell
            </button>
          </div>
          <div>
            {sellBuyModalOpen && (
              <BuySellModal
                onSubmit={handleClose}
                closeModal={closeBuySellModal}
                initialChecked={activeTab === "sell"}
                defaultValue={defaultValue}
              />
            )}
          </div>
          <div>
            <div className="w-full mx-auto">
              <div className="w-full flex justify-start bg-white border-b hover:bg-slate-50 dark:hover:opacity-80 dark:hover:bg-slate-700 dark:bg-gray-800 dark:border-gray-700">
                <div className="py-4 pr-6 pl-2 flex text-xl font-bold text-gray-900 dark:text-white">
                  <MdOutlineReadMore />
                </div>
                <span
                  className="py-4 justify-start text-gray-900 dark:text-white cursor-pointer select-none font-semibold hover:text-gray-600"
                  onClick={() => setMoreDetailsModalOpen(true)}
                >
                  More Details
                </span>
              </div>
              <div className="w-full flex justify-start bg-white border-b hover:bg-slate-50 dark:hover:opacity-80 dark:hover:bg-slate-700 dark:bg-gray-800 dark:border-gray-700">
                <div className="py-4 pr-6 pl-2 flex text-xl font-bold text-gray-900 dark:text-white">
                  <FiSearch />
                </div>
                <span
                  className="py-4 justify-start text-gray-900 dark:text-white cursor-pointer select-none font-semibold hover:text-gray-600"
                  onClick={() => navigate("/app/asset/view")}
                >
                  View Asset
                </span>
              </div>
              <div className="w-full flex justify-start bg-white hover:bg-slate-50 dark:hover:opacity-80 dark:hover:bg-slate-700 dark:bg-gray-800 dark:border-gray-700">
                <div className="py-4 pr-6 pl-2 flex text-xl font-bold text-gray-900 dark:text-white">
                  <MdChecklistRtl />
                </div>
                <span
                  className="py-4 justify-start text-gray-900 dark:text-white cursor-pointer select-none font-semibold hover:text-gray-600"
                  onClick={() => watch(defaultValue)}
                >
                  Watchlist
                </span>
              </div>
            </div>
            {moreDetailsModalOpen && (
              <MoreDetailsModal
                closeModal={() => setMoreDetailsModalOpen(false)}
                defaultValue={defaultValue}
              />
            )}
          </div>
        </div>
      </div>
    
  );
};

export default Modal;