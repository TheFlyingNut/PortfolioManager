import React from "react";

const DropdownMenu = ({ options }) => {
  return (
    <div className="dropdown-menu">
      <ul>
        {options.map((option, index) => (
          <li key={index} className="dropdown-item" onClick={option.onClick}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
