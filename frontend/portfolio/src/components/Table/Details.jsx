import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActive } from "../../state/slices/configSlice";

const Details = ({ getValue, row }) => {
  const dispatch = useDispatch();
  const name = getValue();
  const ticker = row.original.ticker;

  return (
    <div className="flex items-center">
      <span className="font-semibold hover:text-orange-600">
        <Link to={`/app/asset/view/${ticker}`} onClick={() => dispatch(setActive("assets"))}>
          {name}
        </Link>
      </span>
    </div>
  )
}

export default Details;