import React, { useState } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BuySellModal from "./BuySellModal";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Loader from "../../../components/Loader/Loader";
import { BiSort } from "react-icons/bi";
import Change from "../../../components/Table/Change";
import WatchlistStar from "../../../components/Table/WatchlistStar";
import Details from "../../../components/Table/Details";
import BuySellButton from "../../../components/Table/BuySellButton";
import Filters from "../../../components/Table/Filters";
import Pagination from "../../../components/Table/Pagination";

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
    accessorKey: 'ticker',
    header: "",
    size: 225,
    cell: BuySellButton,
    enableSorting: false,
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
    cell: (props) => <p>{Number(props.getValue()).toFixed(2)}</p>
  },
  {
    accessorKey: 'change',
    header: "Change",
    cell: Change,
    enableSorting: false,
  },
  {
    accessorKey: 'open',
    header: "Open",
    cell: (props) => <p>{Number(props.getValue()).toFixed(2)}</p>
  },
  {
    accessorKey: 'high',
    header: "High",
    cell: (props) => <p>{Number(props.getValue()).toFixed(2)}</p>
  },
  {
    accessorKey: 'low',
    header: "Low",
    cell: (props) => <p>{Number(props.getValue()).toFixed(2)}</p>
  },
  {
    accessorKey: 'close',
    header: "Close",
    cell: (props) => <p>{Number(props.getValue()).toFixed(2)}</p>
  },
  {
    accessorKey: 'week52_high',
    header: "52W H",
    cell: (props) => <p>{Number(props.getValue()).toFixed(2)}</p>
  },
  {
    accessorKey: 'week52_low',
    header: "52W L",
    cell: (props) => <p>{Number(props.getValue()).toFixed(2)}</p>
  },
]

const AssetTable = ({ title, status, rows, categories }) => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeTab, setActiveTab] = useState("buy");
  const [isModalOpen, setModalOpen] = useState(Array(rows.length).fill(false));
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [sellBuyModalOpen, setSellBuyModalOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowHovered, setRowHovered] = useState(null);

  const table = useReactTable({
    data: rows,
    columns,
    state:{
      columnFilters,
      rowHovered
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateTab: (tab, row) => handleTabClick(tab, row),
    },
  });
  
  const toggleRow = (idx) => {
    if (expandedRow === idx) {
      setExpandedRow(null);
    } else {
      setExpandedRow(idx);
    }
  };

  const handleTabClick = (tab, row) => {
    setActiveTab(tab);
    setSellBuyModalOpen(true);
    setSelectedRowData(row);
  };

  const closeBuySellModal = () => {
    setSellBuyModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
    closeModal();
  };

  const handleRowHover = (idx, isHovered) => {
    const group = document.querySelector(`.buy-sell-group-hover-${idx}`);
    if (group) {
      group.style.opacity = isHovered ? "1" : "0";
    }
  };

  const closeModal = (idx) => {
    const updatedModalOpenStates = isModalOpen.map((state, index) =>
      index === idx ? false : state
    );
    setModalOpen(updatedModalOpenStates);
    setSelectedRowData(null);
  };

  const handleRowClick = (idx) => {
    const selectedAsset = rows[idx];

    navigate(`/app/asset/view`, { state: { asset: selectedAsset } });
  };

  return (
    <>
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
                <tr key={row.id} onMouseEnter={() => setRowHovered(row.id)} onMouseLeave={() => setRowHovered(null)} className="cursor-pointer bg-white border-b hover:bg-slate-50 dark:hover:opacity-80 dark:hover:bg-slate-700 dark:bg-gray-800 dark:border-gray-700">
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
            {status === "IDLE" && <p className="flex justify-center">No assets found</p>}
          </>
        )}
        <div>
          {sellBuyModalOpen && (
            <BuySellModal
              onSubmit={handleClose}
              closeModal={closeBuySellModal}
              initialChecked={activeTab === "sell"}
              defaultValue={{
                category: selectedRowData.category,
                ticker: selectedRowData.ticker,
                market_value: selectedRowData.market_value,
                quantity: 0,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AssetTable;
