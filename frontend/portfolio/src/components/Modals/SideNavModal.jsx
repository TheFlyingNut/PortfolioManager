import React from 'react';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import MobileMenuGroup from '../MobileMenu/MobileMenuGroup';
import { toggleCollapsed } from '../../state/slices/configSlice';

const SideNavModal = ({ menu }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.config.mode);
  const collapsed = useSelector((state) => state.config.collapsed);

  const closeModal = () => {
    dispatch(toggleCollapsed(true));
  }

  return (
    <Modal
      className={{
        base: 'drawer block md:hidden',
        afterOpen: 'drawer-after-open',
        beforeClose: 'drawer-before-close',
      }}
      overlayClassName={{
        base: 'drawer-overlay block md:hidden',
        afterOpen: 'drawer-overlay-after-open',
        beforeClose: 'drawer-overlay-before-close',
      }}
      portalClassName={"drawer-portal"}
      bodyOpenClassName={"drawer-open"}
      ariaHideApp={false}
      isOpen={!collapsed}
      onRequestClose={closeModal}
      contentLabel="SideNav"    
    >
      <div className="drawer-content vertical" style={{ width: "330px", left: "0px" }}>
        <div className="drawer-header">
          <h4>Navigation</h4>
          <span className='close-btn'>
            <MdClose onClick={closeModal} />
          </span>
        </div>
        <div className={`drawer-body side-nav-${mode} p-0 overflow-x-auto overflow-y-hidden`}>
          <nav className="menu menu-transparent px-4 pb-4">
            {menu.map((groupItem, index) => {
              return (
                <MobileMenuGroup key={index} group={groupItem} />
              )
            })}
          </nav>
        </div>
      </div>
    </Modal>
  )
}

export default SideNavModal;