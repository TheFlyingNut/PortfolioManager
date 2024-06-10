import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  BiSolidDashboard,
  BiBriefcase,
  BiSolidUser,
  BiCog,
  BiLock,
  BiLogOut,
} from "react-icons/bi";
import { MdAnalytics, MdChecklistRtl, MdOutlineEdit, MdArrowDownward } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import MenuGroup from "../Menu/MenuGroup";
import { useSelector } from "react-redux";
import SideNavModal from "../Modals/SideNavModal";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RxActivityLog } from "react-icons/rx";

const SideNav = () => {
  const collapsed = useSelector((state) => state.config.collapsed);

  const menu = [
    {
      groupTitle: "Pages",
      menuCollapsableItems: [
        {
          id: "dashboard",
          name: "Dashboard",
          icon: <BiSolidDashboard />,
          path: "/app/dashboard",
          dropDown: false,
        },
        {
          id: "my-portfolio",
          name: "My Portfolio",
          icon: <BiBriefcase />,
          path: "/app/portfolio",
          dropDown: false,
        },
        {
          id: "assets",
          name: "Assets",
          icon: <FaMoneyBill />,
          path: "/app/asset/all",
          dropDown: false,
          // dropDown: true,
          // subMenu: [
          //   { id: "all-asset", name: "All Asset", path: "/app/asset/all" },
          //   { id: "view-asset", name: "View Asset", path: "/app/asset/view" },
          //   { id: "edit-asset", name: "Edit Asset", path: "/app/asset/edit" },
          // ],
        },
        {
          id: "transactions",
          name: "Transactions",
          icon: <HiOutlineDocumentReport />,
          // icon: <GrTransaction />,
          path: "/app/transactions",
          // dropDown: true,
          // subMenu: [
          //   { id: "order-asset", name: "Orders", path: "/app/reports/orders" },
          //   {
          //     id: "positions-asset",
          //     name: "Positions",
          //     path: "/app/reports/positions",
          //   },
          // ],
        },
        {
          id: "watchlist",
          name: "Watchlist",
          icon: <MdChecklistRtl />,
          path: "/app/watchlist",
          dropDown: false,
        },
        {
          id: "downloads",
          name: "Downloads",
          icon: <MdArrowDownward />,
          path: "/app/child",
          dropDown: false,
        },
      ],
    },
    {
      id: "account",
      groupTitle: "Account",
      menuCollapsableItems: [
        {
          id: "profile",
          name: "Profile",
          icon: <BiSolidUser />,
          path: "/app/profile",
          dropDown: false,
        },
        {
          id: "activity-logs",
          name: "Activity Logs",
          icon: <RxActivityLog size={22} />,
          path: "/app/activity-logs",
          dropDown: false,
        },
        // {
        //   id: "settings",
        //   name: "Settings",
        //   icon: <BiCog />,
        //   path: "/app/settings",
        //   dropDown: false,
        // },
        // {
        //   id: "change-password",
        //   name: "Change Password",
        //   icon: <BiLock />,
        //   path: "/app/change-password",
        //   dropDown: false,
        // },
        // {
        //   id: "logout",
        //   name: "Logout",
        //   icon: <BiLogOut />,
        //   path: "/app/logout",
        //   dropDown: false,
        // },
      ],
    },
  ];

  return (
    <>
      <div
        className="hidden md:block side-nav side-nav-transparent side-nav-expand"
        style={
          collapsed
            ? { width: "80px", minWidth: "80px" }
            : { width: "290px", minWidth: "290px" }
        }
      >
        <div className="side-nav-header">
          <h1
            className="logo flex flex-col justify-center px-6 h-16 font-bold text-[#022352]"
            style={{ width: "auto" }}
          >
            {collapsed ? (
              <div className="flex justify-center">P</div>
            ) : (
              "Portfolio"
            )}
          </h1>
        </div>
        {!collapsed ? (
          <div className="side-nav-content">
            <Scrollbars autoHide>
              <nav className="menu menu-transparent px-4 pb-4">
                {menu.map((item, index) => {
                  return <MenuGroup item={item} key={index} />;
                })}
              </nav>
            </Scrollbars>
          </div>
        ) : (
          <nav className="menu menu-transparent px-4 pb-4">
            {menu.map((item, index) => {
              return <MenuGroup item={item} key={index} />;
            })}
          </nav>
        )}
      </div>
      <SideNavModal menu={menu} />
    </>
  );
};

export default SideNav;
