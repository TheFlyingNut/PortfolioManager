import { createSlice } from "@reduxjs/toolkit";
import { addToWatchlist, getAllWatchlists, getWatchlist, removeFromWatchlist } from "../../api";

const initialState = {
  watchlists: {},
  id: null,
};

export const watchlistSlice = createSlice({
  name: "watchlists",
  initialState,
  reducers: {
    saveWatchlist: (state, action) => {
      state.watchlists = action.payload;
    },
    saveWatchlistId: (state, action) => {
      state.id = action.payload;
    },
    // addWatchList: (state, action) => {
    //   state.watchlists[action.payload.id] = action.payload;
    // },
    // removeWatchList: (state, action) => {
    //   delete state.watchlists[action.payload.id];
    // },
  },
});

export const { saveWatchlist, saveWatchlistId } = watchlistSlice.actions;
export default watchlistSlice.reducer;

const formatWatchlist = (watchlist) => {
  const formattedWatchlist = {};

  watchlist.forEach((watchlist) => {
    formattedWatchlist[watchlist.ticker] = {
      ticker: watchlist.ticker,
      name: watchlist.name,
      category: watchlist.category,
      market_value: watchlist.pricing,
      daypl: watchlist.daypl,
    }
  });

  return formattedWatchlist;
}

export const fetchWatchlist = (id, email) => async (dispatch) => {
  try {
    const { data } = await getWatchlist(id, email);
    const formattedWatchlist = formatWatchlist(data.data.watchlist_assets);
    dispatch(saveWatchlist(formattedWatchlist));
  } catch (error) {
    console.log(error.message);
  }
}

export const fetchAllWatchlists = (email) => async (dispatch) => {
  try {
    const { data } = await getAllWatchlists(email);
    const { id } = data.data[0];
    dispatch(saveWatchlistId(id));
    
    dispatch(fetchWatchlist(id, email));
  } catch (error) {
    console.log(error.message)
  }
};

export const addAssetToWatchlist = (data, watchlistId, email) => async (dispatch) => {
  try {
    await addToWatchlist(data, watchlistId, email);
    
    dispatch(fetchWatchlist(watchlistId, email));
  } catch (error) {
    console.log(error.message);
  }
};

export const removeAssetFromWatchlist = (data, watchlistId, email) => async (dispatch) => {
  // console.log(data, watchlistId, email)
  try {
    await removeFromWatchlist(data, watchlistId, email);
    
    dispatch(fetchWatchlist(watchlistId, email));
  } catch (error) {
    console.log(error.message);
  }
};
