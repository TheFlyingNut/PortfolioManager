import React, { useState } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Line from "./charts/Line";

const EditAsset = () => {
  const { edit } = useSelector((state) => state.asset);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/app/portfolio");
  };

  const history = [
    {
      category: "Bonds",
      value: "10.2%",
    },
    {
      category: "Market Value",
      value: "287 USD",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3>Edit Asset</h3>
        </div>
      </div>
      {edit && (
        <form>
          <div className="grid grid-cols-2 gap-3"></div>
          {errors && (
            <div className="bg-red-200 text-red-600 rounded p-2 mb-4">
              {`Please include: ${errors}`}
            </div>
          )}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3">
                <div
                  className="card mb-4 border-0 border-b pb-6 py-4 md:border-gray-200 md:dark:border-gray-600 rounded-br-none rounded-bl-none card-border"
                  role="presentation"
                >
                  <div className="card-body card-gutterless">
                    <h5>Basic Information</h5>
                    <p className="mb-6">
                      Section to config basic asset information
                    </p>
                    <div className="form-item vertical">
                      <label className="form-label mb-2">Category</label>
                      <div className="">
                        <input
                          className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                          name="category"
                          onChange={handleChange}
                          value={edit.category}
                        />
                      </div>
                    </div>
                    <div className="form-item vertical">
                      <label className="form-label mb-2">Ticker</label>
                      <div className="">
                        <input
                          className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                          type="text"
                          placeholder="Ticker"
                          value={edit.ticker}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card mb-4 border-0 border-b pb-6 py-4 md:border-gray-200 md:dark:border-gray-600 rounded-br-none rounded-bl-none card-border"
                  role="presentation"
                >
                  <div className="card-body card-gutterless">
                    <h5>Pricing</h5>
                    <p className="mb-6">
                      Section to config pricing information
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-1">
                        <div className="form-item vertical">
                          <label className="form-label mb-2">Price</label>
                          <div className="">
                            <span className="input-wrapper undefined ">
                              <input
                                className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 "
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={edit.price}
                                onChange={handleChange}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="form-item vertical">
                          <label className="form-label mb-2">Quantity</label>
                          <div className="">
                            <span className="input-wrapper undefined ">
                              <input
                                className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 "
                                type="number"
                                name="price"
                                placeholder="Quantity"
                                value={edit.quantity}
                                onChange={handleChange}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card card-border flex flex-col lg:col-span-2"
                role="presentation"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between mb-6">
                    <h4>View Asset History</h4>
                    <button className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 text-sm">
                      View all
                    </button>
                  </div>
                  <div className="chartRef">
                    <div className="min-h-[395px]">
                      <Line />
                    </div>
                  </div>
                  <div className="relative ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th className="px-6 py-3">Category</th>
                          <th className="px-6 py-3 text-center">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((obj, index) => {
                          return (
                            <tr
                              key={index}
                              className="bg-white border-b hover:bg-slate-50 dark:hover:opacity-80 dark:hover:bg-slate-700 dark:bg-gray-800 dark:border-gray-700"
                            >
                              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span className="cursor-pointer select-none font-semibold hover:text-orange-600">
                                  {obj.category}
                                </span>
                              </th>
                              <td className="px-6 py-4 flex justify-center">
                                {obj.value}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer shadow-md block mx-auto"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default EditAsset;