import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { BiSort } from "react-icons/bi";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Ticker from "../../../../components/Table/Ticker";
import Change from "../../../../components/Table/Change"

const columns = [
  {
    accessorKey: 'ticker',
    header: "Ticker",
    // size: 225,
    cell: Ticker,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: 'price',
    header: "Price",
    cell: (props) => <span>₹{Number(props.getValue()).toFixed(2)}</span>,
    enableColumnFilter: true,
    filterFn: "inNumberRange",
  },
  {
    accessorKey: 'category',
    header: "Category",
    cell: (props) => <span className="capitalize">{props.getValue()}</span>,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: 'change',
    header: "Gain",
    cell: Change,
    enableSorting: false,
  },
]

const TopListing = ({ name, rows }) => {
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: rows,
    columns,
    state:{
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <>
      <div className="card card-border" role="presentation">
        <div className="card h-full border-0 card-border" role="presentation">
          <div className="card-body card-gutterless h-full">
            <div className="lg:flex items-center justify-between mb-4">
              <h3 className="mb-4 lg:mb-0">{name}</h3>
              {/* <button className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 text-sm block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4">
                <span className="flex items-center justify-center">
                  <span className="text-lg">
                    <CiFilter />
                  </span>
                  <span className="ltr:ml-1 rtl:mr-1">Filter</span>
                </span>
              </button> */}
            </div>
            <div>
              <div className="overflow-x-auto">
                <table width={table.getTotalSize()} className="table-default w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} width={header.getSize()} className="font-bold px-6 py-3 dark:text-gray-300">
                            <span className="flex justify-start gap-1">
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
                </table>
                {/* <table className="table-default w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 dark:text-gray-300">
                        Ticker
                      </th>
                      <th scope="col" className="px-6 py-3 dark:text-gray-300">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 dark:text-gray-300">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 dark:text-gray-300">
                        Gain
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {rows.map((row, idx) => (
                      <React.Fragment key={idx}>
                        <tr className="cursor-pointer bg-white border-b hover:bg-slate-50 dark:hover:opacity-80 dark:hover:bg-slate-700 dark:bg-gray-800 dark:border-gray-700">
                          <td className="py-4">
                            <div className="flex items-center">
                              <span className="ml-2 rtl:mr-2 font-semibold hover:text-orange-600">
                                <Link to={`/app/asset/view/${row.ticker}`} onClick={() => dispatch(setActive("assets"))}>
                                  {row.ticker}
                                </Link>
                              </span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span>₹{Number(row.price).toFixed(2)}</span>
                          </td>
                          <td className="py-4">
                            <span className="capitalize">{row.category}</span>
                          </td>
                          <td
                            className={`py-4 ${
                              row.change.value >= 0
                                ? "text-emerald-500"
                                : "text-red-500"
                            }`}
                          >
                            {row.change.value} ({row.change.percentage}%)
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopListing;
