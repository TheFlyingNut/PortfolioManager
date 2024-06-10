import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import SideNav from "./SideNav";
import Header from "./Header";
import View from "./View";
import ThemeConfigModal from "../Modals/ThemeConfigModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchMetrics, saveTimeInterval } from "../../state/slices/portfolioSlice";
import { fetchNotifcations } from "../../state/slices/notificationSlice";
import { fetchAllWatchlists } from "../../state/slices/watchlistSlice";

const DashboardLayout = () => {
  const { user } = useUser();
  const dispatch = useDispatch(); 
  const { interval } = useSelector((state) => state.portfolio);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(today.setMonth(today.getMonth() - 3));
    const endDate = new Date();

    dispatch(saveTimeInterval({ start: startDate.toString(), end: endDate.toString() }));
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(fetchMetrics(interval, user.primaryEmailAddress.emailAddress));
    }
  }, [user, dispatch, interval])

  useEffect(() => {
    dispatch(fetchNotifcations(user.primaryEmailAddress.emailAddress))
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(fetchAllWatchlists(user.primaryEmailAddress.emailAddress));
  }, [user, dispatch]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {user && (
        <>
          <main>
            <div className="flex flex-auto flex-col">
              <div className="flex flex-auto min-w-0">
                <SideNav />
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
                  <Header
                    className="shadow dark:shadow-2xl"
                    openModal={openModal}
                  />
                  <div className="h-full scroll-smooth flex flex-auto flex-col justify-between">
                    <View />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <ThemeConfigModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
        </>
      )}
    </>
  );
};

export default DashboardLayout;
