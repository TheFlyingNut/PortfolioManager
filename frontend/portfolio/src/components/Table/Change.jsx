import React from 'react'

const Change = ({ getValue }) => {
  const change = getValue()
  return (
    <span
      className={`${
        change?.value >= 0
          ? "text-emerald-500"
          : "text-red-500"
      }`}
    >
      {Number(change?.value).toFixed(2)} ({Number(change?.percentage).toFixed(2)}%)
    </span>
  )
}

export default Change