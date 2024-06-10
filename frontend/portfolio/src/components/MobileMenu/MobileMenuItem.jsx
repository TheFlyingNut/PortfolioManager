import React, { useState } from "react";
import { setActive, toggleCollapsed } from "../../state/slices/configSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import MobileMenuSubItem from "./MobileMenuSubItem";

const MobileMenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.config.active);
  const [menuOpen, toggleMenu] = useState(false);

  const handleMenuItemClick = () => {
    dispatch(setActive(item.id));
    dispatch(toggleCollapsed(true));
  };

  return (
    <>
      {!item.dropDown ? (
        <div
          className={`menu-item menu-item-transparent ${
            active === item.id ? "menu-item-active" : ""
          } menu-item-hoverable mb-2`}
          style={{ height: "40px" }}
        >
          <Link
            to={item.path}
            onClick={handleMenuItemClick}
            className="h-full w-full flex items-center"
          >
            <span className="text-2xl mr-2">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        </div>
      ) : (
        <div className="menu-collapse" onClick={() => toggleMenu(!menuOpen)}>
          <div className="menu-collapse-item menu-collapse-item-transparent mb-2">
            <span className="flex items-center">
              <span className="text-2xl mr-2">{item.icon}</span>
              <span>{item.name}</span>
            </span>
            <span
              className="text-lg mt-1"
              style={
                menuOpen
                  ? { transform: "rotate(180deg)" }
                  : { transform: "rotate(0deg)" }
              }
            >
              <MdKeyboardArrowDown />
            </span>
          </div>
          {menuOpen && item.subMenu && (
            <ul
              className="ml-5"
              style={
                menuOpen
                  ? { opacity: "1", height: "auto", overflow: "hidden" }
                  : { opacity: "0", height: "0px", overflow: "hidden" }
              }
            >
              {item.subMenu.map((item, index) => {
                return <MobileMenuSubItem key={index} item={item} />;
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default MobileMenuItem;
