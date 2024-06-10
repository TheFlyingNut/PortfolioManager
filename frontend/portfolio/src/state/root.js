import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import configReducer from "./slices/configSlice";
import assetReducer from "./slices/assetSlice";
import watchlistReducer from "./slices/watchlistSlice";
import portfolioReducer from "./slices/portfolioSlice";
import notificationReducer from "./slices/notificationSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    config: configReducer,
    portfolio: portfolioReducer,
    watchlists: watchlistReducer,
    notifications: notificationReducer,
    // asset: assetReducer,
});

export default rootReducer;