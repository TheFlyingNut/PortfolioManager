import React, { useEffect, useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import { getAllTransactions } from "../../api";
import { useUser } from "@clerk/clerk-react";

const Transactions = () => {
  const { user } = useUser();
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState({});
  const [status, setStatus] = useState("IDLE");

  useEffect(() => {
    if(rows.length !== 0) {
      rows.forEach((item) => {
        if(!categories[item.category] && item.category) {
          setCategories((prev) => {
            let category = item.category.charAt(0).toUpperCase() + item.category.slice(1);

            return {
              ...prev,
              [category]: "true"
            }
          })
        }
      })
    }
  }, [rows]);

  useEffect(() => {
    const handleStatus = (buyPrice, sellPrice) => {
      if (buyPrice !== null) {
        return "PURCHASED";
      } else if (sellPrice !== null) {
        return "SOLD";
      } else {
        return "PENDING";
      }
    }

    const formatData = (data) => {
      return data.map((item) => {
        return {
          id: item.id,
          ticker: item.transaction_asset.ticker,
          name: item.transaction_asset.name,
          category: item.transaction_asset.category.charAt(0).toUpperCase() + item.transaction_asset.category.slice(1),
          action: handleStatus(item.buy_price, item.sell_price),
          quantity: item.quantity,
          price: item.buy_price ? item.buy_price : item.sell_price,
          date: item.updated_at,
        };
      })
    }

    const fetchAllTransactions = async () => {
      setStatus("LOADING");
      try {
        const { data } = await getAllTransactions(user.primaryEmailAddress.emailAddress);
        const formattedData = formatData(data.data);
        setRows(formattedData);
        setStatus("IDLE");
      } catch (error) {
        setStatus("ERROR");
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
      {rows && categories && (
        <TransactionsTable title="My Transactions" status={status} rows={rows} categories={Object.keys(categories)} />
      )}
    </>
  );
};

export default Transactions;
