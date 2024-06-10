import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import addProduct from "../../../components/svg/add.svg";
import { IoIosAddCircle } from "react-icons/io";
import { RiDownloadLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import dateFormat, { masks } from "dateformat";
import { useNavigate } from "react-router-dom";
import OrderStatusChip from "./card/OrderStatusChip";
import Loader from "../../../components/Loader/Loader";

const OrdersTable = ({ rows, deleteRow, editRow }) => {
  const getStatusColorClass = (status) => {
    switch (status) {
      case "PURCHASED":
        return "bg-emerald-500"; // Green color for PURCHASED
      case "PENDING":
        return "bg-yellow-500"; // Yellow color for PENDING
      case "SOLD":
        return "bg-red-500"; // Red color for SOLD
      default:
        return "";
    }
  };

  const getStatusTextColorClass = (status) => {
    switch (status) {
      case "PURCHASED":
        return "text-emerald-500"; // Green color for PURCHASED
      case "PENDING":
        return "text-yellow-500"; // Yellow color for PENDING
      case "SOLD":
        return "text-red-500"; // Red color for SOLD
      default:
        return "";
    }
  };

  const handleStatus = (buyPrice, sellPrice) => {
    if (buyPrice !== null) {
      return "PURCHASED";
    } else if (sellPrice !== null) {
      return "SOLD";
    } else {
      return "PENDING";
    }
  }

  return (
    <div
      className="card 2xl:col-span-3 mt-4 xl:col-span-4 card-border"
      role="presentation"
    >
      <div className="card h-full border-0 card-border" role="presentation">
        <div className="card-body card-gutterless h-full">
          {/* <div className="lg:flex items-center justify-between mb-4">
            <h3 className="mb-4 lg:mb-0">Orders</h3>
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
              <span className="input-wrapper max-w-md md:w-52 md:mb-0 mb-4">
                <div className="input-suffix-start ml-2">
                  <FiSearch />
                </div>

                <input
                  className="input input-sm h-9 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 pl-[2.125rem]"
                  type="text"
                  placeholder="Search product"
                />
              </span>
              <button className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4">
                <span className="flex items-center justify-center">
                  <span className="text-lg">
                    <CiFilter />
                  </span>
                  <span className="ltr:ml-1 rtl:mr-1">Filter</span>
                </span>
              </button>
              <a
                className="block lg:inline-block md:mb-0 mb-4"
                href="/app/funds/ticker-new"
              >
                <button className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white radius-round h-9 px-3 py-2 text-sm w-full">
                  <span className="flex items-center justify-center">
                    <span className="text-lg mr-1">
                      <IoIosAddCircle />
                    </span>
                    <span className="ltr:ml-1 rtl:mr-1">Add Product</span>
                  </span>
                </button>
              </a>
            </div>
          </div> */}
          <div className="">
            <div className="overflow-x-auto">
              <table className="table-default table-hover">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="">
                    <th className="" colSpan="1">
                      <div className="cursor-pointer inline-flex select-none justify-center items-center dark:text-gray-300">
                        Category
                       
                      </div>
                    </th>
                    <th className="" colSpan="1">
                      <div className="cursor-pointer inline-flex select-none justify-center items-center dark:text-gray-300">
                        Ticker
                        
                      </div>
                    </th>
                    <th className="" colSpan="1">
                      <div className="cursor-pointer text-center inline-flex select-none justify-center items-center dark:text-gray-300">
                        Quantity
                        
                      </div>
                    </th>
                    <th className="" colSpan="1">
                      <div className="cursor-pointer inline-flex select-none justify-center items-center dark:text-gray-300">
                        Actions
                        
                      </div>
                    </th>
                    <th className="" colSpan="1">
                      <div className="cursor-pointer inline-flex select-none justify-center items-center dark:text-gray-300">
                        Price
                       
                      </div>
                    </th>
                    <th className="" colSpan="1">
                      <div className="cursor-pointer inline-flex select-none justify-center items-center dark:text-gray-300">
                        Date
                       
                      </div>
                    </th>
                    {/* <th className="" colSpan="1">
                      <div className=""></div>
                    </th> */}
                  </tr>
                </thead>
                {rows.length !== 0 && (
                  <tbody className="">
                    {rows.map((row, idx) => (
                      <React.Fragment key={idx}>
                        <tr
                          // className="cursor-pointer"
                          // onClick={() => handleRowClick(idx)}
                        >
                          <td className="py-2">
                            <div className="flex items-center">
                              <span className="rtl:mr-2 font-semibold capitalize">
                                {row.transaction_asset.category}
                              </span>
                            </div>
                          </td>
                          <td className="py-2">
                            <span className="capitalize">{row.transaction_asset.ticker}</span>
                          </td>
                          <td className="py-2">{row.quantity}</td>
                          <td className="py-2">
                            <OrderStatusChip status={handleStatus(row.buy_price, row.sell_price)} />
                          </td>
                          <td className="py-2">
                            <span>₹{Number(row.buy_price !== null ? row.buy_price : row.sell_price).toFixed(2)}</span>
                          </td>
                          <td className="py-2">
                            {dateFormat(row.updated_at, "h:MM TT, dS mmmm, yyyy")}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                )}
              </table>
              {rows.length === 0 && (
                <Loader />
              )}
            </div>
            {/* <div className="flex items-center justify-between mt-4">
              <div className="pagination">
                <span
                  className="pagination-pager pagination-pager-prev pagination-pager-disabled"
                  role="presentation"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <ul>
                  <li
                    className="pagination-pager text-indigo-600 bg-indigo-50 hover:bg-indigo-50 dark:bg-indigo-600 dark:text-gray-100"
                    role="presentation"
                  >
                    1
                  </li>
                  <li
                    className="pagination-pager pagination-pager-inactive"
                    role="presentation"
                  >
                    2
                  </li>
                </ul>
                <span
                  className="pagination-pager pagination-pager-next pagination-pager-inactive"
                  role="presentation"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
              <div className="min-w-[130px]">
                <div className="select select-sm css-b62m3t-container">
                  <span
                    id="react-select-4-live-region"
                    className="css-7pg0cj-a11yText"
                  ></span>
                  <span
                    aria-live="polite"
                    aria-atomic="false"
                    aria-relevant="additions text"
                    className="css-7pg0cj-a11yText"
                  ></span>
                  <div className="select__control css-1nndncl-control">
                    <div className="select__value-container select__value-container--has-value css-hlgwow">
                      <div className="select__single-value css-yr46hd-singleValue">
                        10 / page
                      </div>
                      <input
                        id="react-select-4-input"
                        tabindex="0"
                        inputmode="none"
                        aria-autocomplete="list"
                        aria-expanded="false"
                        aria-haspopup="true"
                        role="combobox"
                        aria-readonly="true"
                        className="css-1hac4vs-dummyInput"
                        value=""
                      />
                    </div>
                    <div className="select__indicators css-1wy0on6">
                      <div className="select-dropdown-indicator">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
