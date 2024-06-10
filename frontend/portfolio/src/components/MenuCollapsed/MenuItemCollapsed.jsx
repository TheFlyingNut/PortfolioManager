import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { setActive } from "../../state/slices/configSlice";
import MenuSubItemCollapsed from "./MenuSubItemCollapsed";

const MenuItemCollapsed = ({ item }) => {
  const dispatch = useDispatch();
  const { mode, active } = useSelector((state) => state.config);
  const [show, setShow] = useState(false);

  const handleMenuItemClick = () => {
    dispatch(setActive(item.id));
  };

  return (
    <>
      {!item.dropDown ? (
        <>
          <div
            id={item.id}
            className={`menu-item menu-item-transparent ${
              active === item.id ? "menu-item-active" : ""
            } menu-item-hoverable mb-2`}
            style={{ height: "40px" }}
          >
            <Link
              onClick={handleMenuItemClick}
              to={item.path}
              className="h-full w-full flex items-center"
            >
              <span className="text-2xl mr-2">{item.icon}</span>
            </Link>
          </div>
          <Tooltip
            anchorSelect={"#" + item.id} 
            wrapper="span"
            // className="tooltip !bg-gray-800 dark:!bg-slate-100"
            className="tooltip !bg-gray-800 dark:!bg-black"
            content={item.name} 
            place="right"
            // variant={mode === "light" ? "dark" : "light"}
          />
        </>
      ) : (
        <div
          className="dropdown"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <div className="dropdown-toggle">
            <div
              className="menu-collapse-item menu-collapse-item-transparent mb-2"
              style={{ height: "40px" }}
            >
              <span className="text-2xl mr-2">{item.icon}</span>
            </div>
          </div>
          {show && (
            <ul
              className="dropdown-menu middle-start-top"
              style={
                show
                  ? {
                      opacity: "1",
                      visibility: "visible",
                      transform: "rotateX(0deg)",
                    }
                  : {}
              }
            >
              {item.subMenu.map((item, index) => {
                return <MenuSubItemCollapsed key={index} item={item} />;
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default MenuItemCollapsed;
