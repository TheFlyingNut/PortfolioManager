import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setActive } from "../../state/slices/configSlice";

const Ticker = ({ getValue }) => {
  const dispatch = useDispatch();
  const value = getValue();

  return (
    <div className="flex items-center">
      <span className="ml-2 rtl:mr-2 font-semibold hover:text-orange-600">
        <Link to={`/app/asset/view/${value}`} onClick={() => dispatch(setActive("assets"))}>
          {value}
        </Link>
      </span>
    </div>
  )
}

export default Ticker