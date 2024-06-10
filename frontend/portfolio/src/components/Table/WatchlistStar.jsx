import React from 'react'
import { useUser } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import { addAssetToWatchlist, removeAssetFromWatchlist } from '../../state/slices/watchlistSlice';
import { BsStar, BsStarFill } from 'react-icons/bs';

const WatchlistStar = ({ row }) => {
  const ticker = row.original.ticker;
  const { user } = useUser();
  const dispatch = useDispatch();
  const { id, watchlists } = useSelector((state) => state.watchlists);

  const handleStarClick = (ticker) => {
    const email = user.primaryEmailAddress.emailAddress;

    try {
      if (watchlists[ticker]) {
        // console.log("remove", { ticker: ticker }, id, email);
        dispatch(removeAssetFromWatchlist({ ticker: ticker }, id, email));
        return;
      }

      // console.log("add", { ticker: ticker }, id, email);
      dispatch(addAssetToWatchlist({ ticker: ticker }, id, email));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <span onClick={() => handleStarClick(ticker)}>
      {watchlists[ticker] ? (
        <BsStarFill size={20} color="yellow" />
      ) : (
        <BsStar size={20} color="gray" />
      )}
    </span>
  )
}

export default WatchlistStar;