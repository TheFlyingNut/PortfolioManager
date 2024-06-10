import React from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

const TransactionStatusChip = ({ getValue }) => {
  const status = getValue();
  let tagColor, arrowIcon, title;

  switch (status) {
    case "PURCHASED":
      tagColor = "tag gap-1 font-bold border-0 text-emerald-600  bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100";
      arrowIcon = <FaArrowUp />;
      title = "Purchased";
      break;
    case "PENDING":
      tagColor = "tag gap-1 font-bold border-0 text-yellow-500  bg-yellow-100 dark:bg-yellow-500/20 dark:text-yellow-100";
      arrowIcon = <FaArrowDown />;
      title = "Pending";
      break;
    case "SOLD":
      tagColor = "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100";
      arrowIcon = <FaArrowDown />;
      title = "Sold";
      break;
    default:
      // Handle unknown status
      tagColor = "bg-gray-100 dark:bg-gray-500/20 dark:text-gray-100";
      arrowIcon = null;
      title = "Unknown";
  }

  return (
    <>
      <div className="py-4 -ml-1">
        <div className={`tag gap-1 font-bold border-0 flex items-center justify-center  ${tagColor} w-[100px]`}>
          <span className=''>{title}</span>
        </div>
      </div>
    </>
  );
}

export default TransactionStatusChip;
