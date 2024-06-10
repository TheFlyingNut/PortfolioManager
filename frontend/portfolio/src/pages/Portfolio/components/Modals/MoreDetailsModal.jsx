import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const MoreDetailsModal = ({ closeModal, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      category: "",
      ticker: "",
      price: 0,
      quantity: 0,
    }
  );
  const history = [
    {
      category: "Bonds",
      value: "10.2%",
    },
    {
      category: "Market Value",
      value: "287 USD",
    },
  ];

  const handleClose = (e) => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal bg-white w-[60vh] p-6 rounded-md z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">More Details</h3>
          <div className="flex">
            <button
              className="text-gray-900 text-lg font-bold hover:text-gray-800"
              onClick={handleClose}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <h2 className="text-lg font-medium">Category</h2>
          <h2 className="text-lg font-medium">{formState.category}</h2>
          <h2 className="text-lg font-medium">Ticker</h2>
          <h2 className="text-lg font-medium">{formState.ticker}</h2>
          <h2 className="text-lg font-medium">Quantity</h2>
          <h2 className="text-lg font-medium">{formState.quantity}</h2>
          <h2 className="text-lg font-medium">Price</h2>
          <h2 className="text-lg font-medium">{formState.price}</h2>
        </div>
      </div>
    </div>
  );
};

export default MoreDetailsModal;
