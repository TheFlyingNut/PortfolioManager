import React, { useState } from "react";

const AddMoneyToWallet = ({ onUpdateBalance, onClose }) => {
  const [amount, setAmount] = useState(0);

  const handleIncrement = () => {
    setAmount(prevAmount => prevAmount + 1000);
  };

  const handleDecrement = () => {
    setAmount(prevAmount => Math.max(prevAmount - 1000, 0));
  };

  const handleChange = (e) => {
    const inputAmount = parseInt(e.target.value);
    setAmount(isNaN(inputAmount) ? 0 : inputAmount);
  };

  const handleSubmit = () => {
    onUpdateBalance(amount);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Money to Wallet</h2>
        <div className="flex items-center mb-4">
          <button className="px-2 py-1 border border-gray-400 rounded-md mr-2" onClick={handleDecrement}>-</button>
          <input type="text" className="border border-gray-400 rounded-md p-1 w-24 text-center" value={amount} onChange={handleChange} />
          <button className="px-2 py-1 border border-gray-400 rounded-md ml-2" onClick={handleIncrement}>+</button>
        </div>
        <div className="flex justify-between">
          <button className="bg-gray-200 px-4 py-2 rounded-md" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyToWallet;

