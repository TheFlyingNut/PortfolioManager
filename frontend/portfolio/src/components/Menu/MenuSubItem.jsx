import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../state/slices/configSlice";

const MenuSubItem = ({ item }) => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.config.active);

  const handleMenuItemClick = () => {
    dispatch(setActive(item.id));
  }

  return (
    <div
      className={`menu-item menu-item-transparent ${active === item.id ? "menu-item-active" : ""} menu-item-hoverable`}
      style={{ height: "40px" }}
    >
      <Link
        to={item.path}
        onClick={handleMenuItemClick}
        className="h-full w-full flex items-center"
      >
        <span>{item.name}</span>
      </Link>
    </div>
  )
}

export default MenuSubItem;