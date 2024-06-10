import React, { useState } from "react";
import dateFormat, { masks } from "dateformat";
import TransactionStatusChip from "./TransactionStatusChip";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Loader from "../../../components/Loader/Loader";
import { BiSort } from "react-icons/bi";
import Pagination from "../../../components/Table/Pagination";
import Details from "../../../components/Table/Details";
import Filters from "../../../components/Table/Filters";

const columns = [
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
    accessorKey: 'quantity',
    header: "quantity",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: false,
  },
  {
    accessorKey: 'action',
    header: "actions",
    cell: TransactionStatusChip,
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    header: "price",
    cell: (props) => <p>₹{Number(props.getValue()).toFixed(2)}</p>
  },
  {
    accessorKey: 'date',
    header: "date",
    size: 400,
    cell: (props) => <p>{dateFormat(props.getValue(), "h:MM TT, dS mmmm, yyyy")}</p>
  },
];

const TransactionsTable = ({ title, status, rows, categories }) => {
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
              <>
                {status === "ERROR" && <p className="flex justify-center text-red-500">Oops, Something went wrong!</p>}
                {status === "LOADING" && <Loader />}
                {status === "IDLE" && <p className="flex justify-center">No transactions yet!</p>}
              </>
            )}
            {/* <div className="overflow-x-auto">
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
                            <TransactionStatusChip status={handleStatus(row.buy_price, row.sell_price)} />
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
