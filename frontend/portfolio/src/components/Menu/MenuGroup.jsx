import React from "react";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import MenuItemCollapsed from "../MenuCollapsed/MenuItemCollapsed";

const MenuGroup = ({ item }) => {
  const collapsed = useSelector((state) => state.config.collapsed);

  return (
    <div className="menu-group">
      {!collapsed && (
        <div className="menu-title menu-title-transparent">
          {item.groupTitle}
        </div>
      )}
      <ul>
        {item.menuCollapsableItems.map((menuItem, index) => {
          if (collapsed)
            return <MenuItemCollapsed item={menuItem} key={index} />;

          return <MenuItem item={menuItem} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default MenuGroup;
