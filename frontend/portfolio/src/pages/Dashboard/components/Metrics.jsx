import React from 'react'

const Metrics = ({title,Amount,percentage}) => {
  // Assuming percentage is a string like "-90.56(-0.47%)"
const percentageValue = parseFloat(percentage.match(/[-+]?[\d.]+/)[0]);
// console.log(percentageValue);
const isPositive = percentageValue >= 0;
  return (
    <>  
 
   
      <div className=''>
      <div className=" h-28   font-Poppins">
      <div className="grid grid-cols-3 items-center p-5">
        <h1 className="text-xl font-bold  text-darkPurple items-center">{title}</h1>
        <div className="flex justify-center py-1">
          <div className='flex items-center' >
            <h2 className="text-xl font-semibold text-lightPurple">${Amount}</h2>
          </div>
        </div>
        <div className={`flex justify-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <h3 className="text-sm">{percentage}</h3>
        </div>
      </div>
    </div>  
        </div>

    </>
  )
}

export default Metrics