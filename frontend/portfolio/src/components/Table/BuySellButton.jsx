import React from 'react'

const BuySellButton = ({ table, row }) => {
  const id = table.getState().rowHovered
  const item = row.original;
  let show = false;

  if(id === row.id) {
    show = true;
  } else {
    show = false;
  }

  const handleTabClick = (tab, row) => {
    table.options.meta?.updateTab(tab, row);
  }

  return (
    <>
      <div className='relative'>
        <div className="w-12"></div>
        <div className={`absolute inset-0 flex items-center justify-center opacity-1`}>
          {show && (
            <>
              <button
                className="buy-sell-button bg-green-500 text-white px-4 py-2 rounded-l cursor-pointer"
                onClick={() => handleTabClick("buy", item)}
              >
                Buy
              </button>
              <button
                className="buy-sell-button bg-red-500 text-white px-4 py-2 rounded-r cursor-pointer"
                onClick={() => handleTabClick("sell", item)}
              >
                Sell
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BuySellButton;