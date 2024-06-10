import React, { useState } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { BiSort } from "react-icons/bi";
import Pagination from "../../../components/Table/Pagination";
import Details from "../../../components/Table/Details";
import Filters from "../../../components/Table/Filters";
import WatchlistStar from "../../../components/Table/WatchlistStar";

const columns = [
  {
    accessorKey: 'id',
    header: "",
    size: 20,
    cell: WatchlistStar,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: 'name',
    header: "Name",
    // size: 225,
    cell: Details,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: 'category',
    header: "Category",
    cell: (props) => <span>{props.getValue()}</span>,
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterCategories) => {
      if (filterCategories.length === 0) return true;
      const category = row.getValue(columnId);
      return filterCategories.includes(category);
    },
  },
  {
    accessorKey: 'market_value',
    header: "Market Value",
    cell: (props) => <p>₹{Number(props.getValue()).toFixed(2)}</p>
  },
  {
    accessorKey: 'daypl',
    header: "Day P/L",
    cell: (props) => <p className={`py-4 ${props.getValue() > 0 ? "text-green-500" : "text-red-500" }`}>{Number(props.getValue()).toFixed(2)}</p>
  },
];

const WatchlistTable = ({ title, rows, categories }) => {
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: rows,
    columns,
    state:{
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <div
      className="card 2xl:col-span-3 mt-4 xl:col-span-4 card-border"
      role="presentation"
    >
      <div className="card h-full border-0 card-border" role="presentation">
        <div className="card-body card-gutterless h-full">
          <Filters
            title={title}
            categories={categories}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
          <div className="overflow-x-auto h-full">
            <table width={table.getTotalSize()} className="table-default table-hover w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 font-bold dark:text-gray-400">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} width={header.getSize()} className="font-bold px-6 py-3 dark:text-gray-300">
                        <span className="flex justify-start items-center gap-1">
                          {header.column.columnDef.header}
                          <>
                            {
                              header.column.getCanSort() && (
                                <span className="cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                                  <BiSort size={14} />
                                </span>
                              )
                            }
                            {
                              {
                                asc: "🔼",
                                desc: "🔽",
                              }[header.column.getIsSorted()]
                            }
                          </>
                        </span>
                        {/* <div 
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`resizer ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`} 
                        /> */}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {rows.length !== 0 && (
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="cursor-pointer bg-white border-b hover:bg-slate-50 dark:hover:opacity-80 dark:hover:bg-slate-700 dark:bg-gray-800 dark:border-gray-700">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} width={cell.column.getSize()} className="py-4">
                          {
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            <br />
            {rows.length > 10 && (
              <Pagination table={table} />
            )}
            {rows.length === 0 && (
              <div className="flex items-center justify-center h-60">
                <p className="text-gray-500 dark:text-gray-400">The watchlist is empty!</p>
              </div>
            )}
          </div>
          {/* <div className="lg:flex items-center justify-between mb-4">
            <h3 className="mb-4 lg:mb-0">Watchlist</h3>
            <div className="flex flex-col lg:flex-row lg:items-center gap-x-2">
              <span className="input-wrapper max-w-md md:w-52 md:mb-0 mb-4">
                <div className="input-suffix-start ml-2">
                  <FiSearch />
                </div>

                <input
                  className="input input-sm h-9 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 pl-[2.125rem]"
                  type="text"
                  placeholder="Search asset"
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
                    <span className="ltr:ml-1 rtl:mr-1">Add Asset</span>
                  </span>
                </button>
              </a>
            </div>
          </div>
          <div className="">
            <div className="overflow-x-auto">
              <table className="table-default table-hover">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="">
                    <th className="" colSpan="1">
                      <div className="cursor-pointer inline-flex select-none justify-center items-center dark:text-gray-300">
                        Ticker
                        
                      </div>
                    </th>
                    <th className="" colSpan="1">
                      <div className="cursor-pointer inline-flex select-none justify-center items-center dark:text-gray-300">
                        Category
                      </div>
                    </th>
                    <th className="" colSpan="1">
                      <div className="cursor-pointer inline-flex select-none justify-center items-center dark:text-gray-300">
                        Market Value
                        
                      </div>
                    </th>
                    <th className="" colSpan="1">
                      <div className="cursor-pointer inline-flex select-none justify-center items-center dark:text-gray-300">
                        Day P/L
                        
                      </div>
                    </th>
                    <th className="" colSpan="1">
                      <div className=""></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {Object.keys(watchlists).map((key, index) => {
                    return (
                      <tr
                        key={index}
                        // className="hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleRowClick()}
                      >
                        <td className="!py-8 !pl-4">
                          <div className="flex items-center justify-between gap-4">
                            <div
                              className="flex items-center px-1 cursor-pointer"
                            >
                              <span onClick={() => handleStarClick(watchlists[key].ticker)}>
                                {watchlists[key] ? (
                                  <BsStarFill size={20} color="yellow" />
                                ) : (
                                  <BsStar size={20} color="gray" />
                                )}
                              </span>
                              <span className="ml-2 rtl:mr-2 font-semibold hover:text-orange-600">
                                <Link to={`/app/asset/view/${watchlists[key].ticker}`} onClick={() => dispatch(setActive("assets"))}>
                                  {watchlists[key].ticker}
                                </Link>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="capitalize">
                            {watchlists[key].category}
                          </span>
                        </td>
                        <td className="py-4">₹{Number(watchlists[key].market_value).toFixed(2)}</td>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <span className="badge-dot bg-emerald-500"></span>
                            <span className="capitalize font-semibold text-emerald-500">
                              In Stock
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={ watchlists[key].daypl >= 0 ? "text-green-500" : "text-red-500"}>{Number(watchlists[key].daypl).toFixed(2)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default WatchlistTable;