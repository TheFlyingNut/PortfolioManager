import React, { useEffect, useState } from "react";
import { IoDocument } from "react-icons/io5";
import { getActivityLogs } from "../../api";
import { useUser } from "@clerk/clerk-react";
import dateFormat, { masks } from "dateformat";
import { TbCoinRupee } from "react-icons/tb";
import Loader from "../../components/Loader/Loader";

const ActivityLogs = () => {
  const { user } = useUser();
  const [activityLogs, setActivityLogs] = useState({});
  const [status, setStatus] = useState("IDLE");

  useEffect(() => {
    const fetchActivityLogs = async () => {
      setStatus("LOADING");
      try {
        const { data } = await getActivityLogs(user.primaryEmailAddress.emailAddress);
        setActivityLogs(data.data);
        setStatus("IDLE");
      } catch (error) {
        setStatus("ERROR");
        console.log(error.message)
      }
    }

    fetchActivityLogs();
  }, [user]);

  return (
      <main>
      <div className="container mx-auto">
        <div className="card border-0 card-border" role="presentation">
          <div className="card-body card-gutterless">
            <div className="grid lg:grid-cols-5 gap-8 ">
              <div className="col-span-4 order-last md:order-first">
                <h3 className="mb-6">Activity Log</h3>
                <div className="max-w-[900px]">
                  {Object.keys(activityLogs).length !== 0 && (
                    <>
                      {Object.keys(activityLogs).map((key, index) => {
                        return (
                          <div key={index} className="mb-8">
                            <div className="mb-4 font-semibold uppercase">{dateFormat(key, "dddd, dd mmmm")}</div>
                            <ul className="timeline">
                              {activityLogs[key].map((log, index) => {
                                return (
                                  <li key={index} className={`timeline-item ${activityLogs[key].length !== (index + 1) && "timeline-item-last"}`}>
                                    <div className="timeline-item-wrapper">
                                      <div className="timeline-item-media">
                                        <div className="timeline-item-media-content">
                                          <div className="avatar avatar-circle" style={{width: "30px", height: "30px", minWidth: "30px", lineHeight: "30px", fontSize: "12px"}}>
                                          {/* <div className="avatar avatar-circle bg-teal-500 dark:bg-teal-500" style={{width: "30px", height: "30px", minWidth: "30px", lineHeight: "30px", fontSize: "12px"}}> */}
                                            {/* <span className="avatar-string" style={{lineHeight: "30px", transform: "translateX(-50%) scale(1)", height: "30px"}}>
                                              CP
                                            </span> */}
                                            <div className={`avatar-img ${log.title !== "SELL" ? (log.title === "BUY" ? "text-green-800 dark:text-green-500" : "text-indigo-500 dark:text-indigo-700") : "text-red-500 dark:text-red-800" } `}>
                                              <TbCoinRupee size={30} />
                                            </div>
                                          </div>
                                        </div>
                                        {activityLogs[key].length !== (index + 1) && (
                                          <div className="timeline-connect"></div>
                                        )}
                                      </div>
                                      <div className={`timeline-item-content ${activityLogs[key].length === (index + 1)  && "timeline-item-content-last"}`}>
                                        <div className="mt-1">
                                          <p className="my-1 flex items-center">
                                            <span className={`font-semibold ${log.title !== "SELL" ? (log.title === "BUY" ? "text-green-500" : "text-indigo-500") : "text-red-500" }`}>{log.title}</span>
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">.</span>
                                            <span className="mx-1">{log.message}</span>
                                            <span className="ml-3 rtl:mr-3">{dateFormat(log.created_at, "hh:MM TT")}</span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        )
                      })}
                    </>
                  )}
                  {Object.keys(activityLogs).length === 0 && (
                    <>
                      {status === "ERROR" && <p className="flex justify-center text-red-500">Oops, Something went wrong!</p>}
                      {status === "LOADING" && <Loader />}
                      {status === "IDLE" && <p className="flex justify-center">No activity yet!</p>}
                    </>
                  )}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ActivityLogs;
