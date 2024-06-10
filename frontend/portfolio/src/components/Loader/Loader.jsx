import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

const Loader = () => {
  const mode = useSelector((state) => state.config.mode);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className='min-w-full flex justify-center my-4 mt-8'>
      <div className='flex justify-start items-center gap-4'>
        <ClipLoader color={`${mode === "light" ? "black" : "gray" }`} css={override} size={22} />
        <p className='text-lg'>Loading...</p>
        </div>
    </div>
  )
}

export default Loader