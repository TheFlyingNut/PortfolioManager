import { createSlice } from "@reduxjs/toolkit";
import { getMetrics, buyAsset as buyAssetAPI, sellAsset as sellAssetAPI, getNotifications } from "../../api";
import { saveNotifications } from "./notificationSlice";
import { useSelector } from "react-redux";

const initialState = {
  balance: 1000,
  metrics: [],
  equityDistribution: {},
  interval: {
    start: null,
    end: null,
  },
};


export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    saveMetrics: (state, action) => {
      state.metrics = action.payload;
    },
    saveEquityDistribution: (state, action) => {
      state.equityDistribution = action.payload;
    },
    saveTimeInterval: (state, action) => {
      state.interval = action.payload;
    },
    saveStartDate: (state, action) => {
      state.interval.start = action.payload;
    },
    saveEndDate: (state, action) => {
      state.interval.end = action.payload;
    },
    // New action to save balance
    saveBalance: (state, action) => {
      state.balance = action.payload;
    },
    updateBalance(state, action) {
      state.balance += action.payload;
    },
  }
});

export const { saveMetrics, saveEquityDistribution, saveTimeInterval, saveStartDate, saveEndDate, saveBalance, updateBalance } = portfolioSlice.actions;
export default portfolioSlice.reducer;

export const fetchMetrics = (interval, email) => async (dispatch) => {
  const { start, end } = interval;

  // console.log(start, end)

  try {
    const { data } = await getMetrics(start, end, email);
    dispatch(saveMetrics(data.metrics));
    dispatch(saveEquityDistribution(data.categories));
    // Assuming 'data.balance' contains the balance value
    dispatch(saveBalance(data.balance));
  } catch (error) {
    console.log(error.message)
  }
}

const formatNotifications = (notifications) => {
  const formattedNotifications = {};

  notifications.forEach((notification) => {
    formattedNotifications[notification.id] = {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      read: notification.is_read,
      date: notification.updated_at,
    }
  });

  return formattedNotifications;
}


export const buyAsset = (data, email, interval) => async (dispatch) =>{
  console.log("buy", data)
  try {
    await buyAssetAPI(data, email);

    try {
      const { data } = await getMetrics(interval.start, interval.end, email);
      dispatch(saveMetrics(data.metrics));
      dispatch(saveEquityDistribution(data.categories))
    } catch (error) {
      console.log(error.message)
    }

    try {
      const { data } = await getNotifications(email);
        const notifications = formatNotifications(data.data)
        dispatch(saveNotifications({
          notifications,
          unread: data.count
        }));
    } catch (error) {
      console.log(error.message)
    }
  } catch (error) {
    console.log(error.message)
  }
};

export const sellAsset = (data, email, interval) => async (dispatch) =>{
  console.log("buy", data)
  try {
    await sellAssetAPI(data, email);

    try {
      const { data } = await getMetrics(interval.start, interval.end, email);
      dispatch(saveMetrics(data.metrics));
      dispatch(saveEquityDistribution(data.categories))
    } catch (error) {
      console.log(error.message)
    }

    try {
      const { data } = await getNotifications(email);
        const notifications = formatNotifications(data.data)
        dispatch(saveNotifications({
          notifications,
          unread: data.count
        }));
    } catch (error) {
      console.log(error.message)
    }
  } catch (error) {
    console.log(error.message)
  }
};

export const usePortfolioBalance = () => {
  return useSelector((state) => state.portfolio.balance);
};