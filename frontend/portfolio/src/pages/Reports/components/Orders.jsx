import React, { useEffect, useState } from "react";
import OrdersTable from "./OrdersTable";
import { getAllTransactions } from "../../../api";
import { useUser } from "@clerk/clerk-react";

const Orders = () => {
  const { user } = useUser();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const { data } = await getAllTransactions(user.primaryEmailAddress.emailAddress);
        // console.log(data)
        setRows(data.data);
      } catch (error) {
        console.log(error.message) 
      }
    };

    fetchAllTransactions();
  }, [user]);

  return (
    <>
      <div className="pb-4 lg:mb-0">
        <h3>Transactions</h3>
        <p>View your current transactions & summary</p>
      </div>
      <OrdersTable
        rows={rows}
      />
    </>
  );
};

export default Orders;
