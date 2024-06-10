import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setActive } from "../../state/slices/configSlice";

const MenuSubItemCollapsed = ({ item }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.config.mode);

  const handleMenuSubItemClick = () => {
    dispatch(setActive(item.id));
  };

  return (
    <li
      className={`menu-item menu-item-${mode} menu-item-hoverable`}
      style={{ height: "35px" }}
    >
      <Link
        to={item.path}
        onClick={handleMenuSubItemClick}
        className="h-full w-full flex items-center"
      >
        <span>{item.name}</span>
      </Link>
    </li>
  );
};

export default MenuSubItemCollapsed;
