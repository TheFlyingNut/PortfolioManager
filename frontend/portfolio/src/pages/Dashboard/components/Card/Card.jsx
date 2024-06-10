import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import abbreviate from "number-abbreviate";
import { useSelector } from "react-redux";
import dateFormat, { masks } from "dateformat";

const Card = ({ title, type, value, change }) => {
  const { interval } = useSelector((state) => state.portfolio);

  return (
    // <div className="card dark:bg-[rgb(31,41,55)] card-border dark:border-[rgb(75,85,99)]" role='presentation'>
    <div className="card card-border" role="presentation">
      <div className="card-body">
        <h6 className="font-semibold mb-4 text-sm">{title}</h6>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">
              <span>₹{abbreviate(Number(value).toFixed(2), 2)}</span>
            </h3>
            <p>
              from{" "}
              <span className="font-semibold">
                {dateFormat(interval.start, "mmm d, yyyy")}
              </span>{" "}
              to{" "}
              <span className="block font-semibold">
                {dateFormat(interval.end, "mmm d, yyyy")}
              </span>
            </p>
          </div>
          {type === "green" ? (
            <div className="tag gap-1 font-bold border-0 text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100">
              <span>
                <FaArrowUp />
              </span>
              <span>
                ₹{abbreviate(Number(change.value).toFixed(2), 1)} (
                {abbreviate(Number(change.percentage).toFixed(2), 2)}%)
              </span>
            </div>
          ) : (
            <div className="tag gap-1 font-bold border-0 text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-500/20 dark:text-red-100">
              <span>
                <FaArrowDown />
              </span>
              <span>
                ₹{abbreviate(Number(change.value).toFixed(2), 1)} (
                {abbreviate(Number(change.percentage).toFixed(2), 2)}%)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
