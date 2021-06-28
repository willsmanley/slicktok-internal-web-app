import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Card} from 'stripe-types';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {listPaymentMethodsPath, stripePath} from 'mojo-web-api/dist/routeNames';
import store from '../store';

export type PaymentMethods = Card[] | false | null;
const initialState = null as unknown as PaymentMethods;

type FetchPaymentMethodsResponse = AxiosResponse<{
  object: 'list';
  data: Card[];
  // eslint-disable-next-line camelcase
  has_more: boolean;
  url: '/v1/payment_methods';
}>;
export type failedLoginResponse = AxiosError<{message?: string}>;

const sessionSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {
    getPaymentMethods() {
      axios
        .get(stripePath + listPaymentMethodsPath)
        .then((response: FetchPaymentMethodsResponse) => {
          response.data.data.forEach((card) =>
            store.dispatch(addPaymentMethod(card)),
          );
        })
        .catch((err: failedLoginResponse) => {
          console.error(err, err.stack);
        });
    },
    addPaymentMethod(state, action: PayloadAction<Card>) {
      if (!state) return [action.payload];

      // Only add payment method if ID is unique.
      if (!state.find((card) => card.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
  },
});

export const {getPaymentMethods, addPaymentMethod} = sessionSlice.actions;
export default sessionSlice.reducer;
