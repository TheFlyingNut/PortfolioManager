import React from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({ table }) => {
  return (
    // <div>
    //   <p className="mb-2">
    //     Page {table.getState().pagination.pageIndex + 1} of{" "}{table.getPageCount()}
    //   </p>
    //   <div className="flex justify-between">
    //     <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{"<"}</button>
    //     <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{">"}</button>
    //   </div>
    // </div>
    <div>
      <p className="mb-2 font-semibold text-[16px]">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </p>
      <div className="flex justify-start">
        <button 
          onClick={() => table.previousPage()} 
          disabled={!table.getCanPreviousPage()}
          className={`bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none ${
            !table.getCanPreviousPage() ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <FaAngleLeft />
        </button>
        <button 
          onClick={() => table.nextPage()} 
          disabled={!table.getCanNextPage()}
          className={`bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none ${
            !table.getCanNextPage() ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  )
}

export default Pagination;