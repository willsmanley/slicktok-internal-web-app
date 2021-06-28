import axios, {AxiosError, AxiosResponse} from 'axios';
import {addPaymentCardPath, stripePath} from 'mojo-web-api/dist/routeNames';
import {Card} from 'stripe-types';
import {StripeCustomer} from 'mojo-web-api/dist/types/StripeCustomer';
import {ErrorString} from '../../../components/Message/Message';
import getErrorMessage from '../../../lib/getErrorMessage';
import {setCustomer} from '../../../redux/reducers/customerSlice';
import {addPaymentMethod} from '../../../redux/reducers/paymentMethodsSlice';
import store from '../../../redux/store';

export type successfulAddCardResponse = AxiosResponse<{
  card: Card;
  customer?: StripeCustomer;
}>;
export type failedLoginResponse = AxiosError<{message?: string}>;

const addCard = (bundle: {
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  addressZip: string;
  isDefault: boolean;
}): Promise<unknown | ErrorString> => {
  return new Promise((resolve, reject) => {
    axios
      .post(stripePath + addPaymentCardPath, null, {params: bundle})
      .then((response: successfulAddCardResponse) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store.dispatch(addPaymentMethod(response.data.card));
        if (response.data.customer) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          store.dispatch(setCustomer(response.data.customer));
        }
        resolve(response.data);
      })
      .catch((err: failedLoginResponse) => {
        console.error(err, err.stack);
        reject(getErrorMessage(err));
      });
  });
};

export default addCard;
