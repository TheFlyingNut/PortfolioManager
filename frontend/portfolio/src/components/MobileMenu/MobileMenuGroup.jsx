import React from 'react'
import MobileMenuItem from './MobileMenuItem';

const MobileMenuGroup = ({ group }) => {
  return (
    <div className="menu-group">
      <div className="menu-title menu-title-transparent">{group.groupTitle}</div>
      <ul>
        {group.menuCollapsableItems.map((menuItem, index) => {
          return (
            <MobileMenuItem key={index} item={menuItem} />
          )
        })}
      </ul>
    </div>
  )
}

export default MobileMenuGroup;