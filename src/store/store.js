import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

//only run logger if you are in development. if in development, it will return false. filter() filters out anything false, so nothing gets run/returned in prod
const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  thunk
].filter(Boolean);

//allows us to use Redux DevTools in development
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

const persistConfig = {
  //key is where you set which parts of the store you want to persist
  //this case we want to start at the "root" level and persist the whole store
  key: "root",
  //use localStorage
  storage,
  //main thing we want to persist is the cart
  whitelist: ["cart"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
