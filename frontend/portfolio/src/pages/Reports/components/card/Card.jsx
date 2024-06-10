import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

const Card = ({ title, type, value, relativeValue, percentage }) => {
  return (
    <div className="card card-border" role="presentation">
      <div className="card-body">
        <h6 className="font-semibold mb-4 text-sm">{title}</h6>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">
              <span>{value}</span>
            </h3>
          </div>
          {type === "green" ? (
            <div className="tag gap-1 font-bold border-0 text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100">
              <span>
                <FaArrowUp />
              </span>
              <span>
                {relativeValue} ({percentage}%)
              </span>
            </div>
          ) : (
            <div className="tag gap-1 font-bold border-0 text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-100">
              <span>
                <FaArrowDown />
              </span>
              <span>
                {relativeValue}({percentage}%)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
