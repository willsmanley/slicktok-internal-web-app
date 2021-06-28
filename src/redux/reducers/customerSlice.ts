import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {customerPath, stripePath} from 'mojo-web-api/dist/routeNames';
import store from '../store';

export type Customer = {[x: string]: unknown} | false | null;
const initialState = null as unknown as Customer;

type FetchPaymentMethodsResponse = AxiosResponse<Customer>;
export type failedLoginResponse = AxiosError<{message?: string}>;

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    getCustomer() {
      axios
        .get((stripePath as string) + (customerPath as string))
        .then((response: FetchPaymentMethodsResponse) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          store.dispatch(setCustomer(response.data));
        })
        .catch((err: failedLoginResponse) => {
          console.error(err, err.stack);
        });
    },
    setCustomer(state, action: PayloadAction<Customer>) {
      return action.payload;
    },
  },
});

export const {getCustomer, setCustomer} = customerSlice.actions;
export default customerSlice.reducer;
