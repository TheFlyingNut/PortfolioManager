import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../../api";

const initialState = {
  notifications: {},
  numberOfUnreads: null,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    saveNotifications: (state, action) => {
      state.notifications = {};
      state.notifications = action.payload.notifications;
      state.numberOfUnreads = action.payload.unread;
    },
    markAsRead: (state, action) => {
      state.notifications[action.payload].read = true;
      state.numberOfUnreads -= 1;
    },
    markAllAsRead: (state, action) => {
      Object.keys(state.notifications).forEach((key) => {
        state.notifications[key].read = true;
      });
      state.numberOfUnreads = 0;
    }
  },
});

export const { saveNotifications, markAsRead, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;

const formatNotifications = (notifications) => {
  const formattedNotifications = {};

  notifications.forEach((notification) => {
    formattedNotifications[notification.id] = {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      read: notification.is_read,
      date: notification.created_at,
    }
  });

  return formattedNotifications;
}

export const fetchNotifcations = (email) => async (dispatch) => {
  try {
    const { data } = await getNotifications(email);
    const notifications = formatNotifications(data.data)
    // console.log(notifications)
    dispatch(saveNotifications({
      notifications,
      unread: data.count
    }));
  } catch (error) {
    console.log(error.message)
  }
}