import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import paymentMethodsSlice from './reducers/paymentMethodsSlice';
import customerSlice from './reducers/customerSlice';

const rootReducer = combineReducers({
  user: userSlice,
  customer: customerSlice,
  paymentMethods: paymentMethodsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type Dispatch = typeof store.dispatch;
