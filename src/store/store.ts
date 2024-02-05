import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";

import storage from "redux-persist/lib/storage"; // Default: localStorage if web, AsyncStorage if React Native
import orderSlice from "./order-slice";
import selectedPetSlice from '@quicker/store/selected-pet-slice';

const rootReducer = combineReducers({
  order: orderSlice.reducer,
  selectedPet: selectedPetSlice.reducer,
});
const logger = createLogger({
  // options...
  collapsed: true,

});


const middleware = import.meta.env.PROD ? [] :  [logger];

const store = configureStore({
  reducer: rootReducer,
  middleware,

});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
