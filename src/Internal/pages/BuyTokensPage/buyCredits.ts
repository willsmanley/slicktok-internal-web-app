import axios, {AxiosError, AxiosResponse} from 'axios';
import {purchaseTokensPath, stripePath} from 'mojo-web-api/dist/routeNames';
import {OrganizationInterface} from 'mojo-web-api/dist/models/Organization/OrganizationInterface';
import {ErrorString} from '../../../components/Message/Message';
import getErrorMessage from '../../../lib/getErrorMessage';
import {setUser} from '../../../redux/reducers/userSlice';
import store from '../../../redux/store';

export type successfulBuyCreditsResponse = AxiosResponse<{
  organization: OrganizationInterface;
  charge: Record<string, unknown>;
}>;
export type failedLoginResponse = AxiosError<{message?: string}>;

const buyCredits = (bundle: {
  tokenCount: number;
  paymentMethod: string;
  currency: string;
}): Promise<unknown | ErrorString> => {
  return new Promise((resolve, reject) => {
    axios
      .post(stripePath + purchaseTokensPath, null, {params: bundle})
      .then((response: successfulBuyCreditsResponse) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // TODO: set User
        // store.dispatch(setOrganization(response.data.organization));
        // TODO: add charge to list of charges...
        resolve(response.data);
      })
      .catch((err: failedLoginResponse) => {
        console.error(err, err.stack);
        reject(getErrorMessage(err));
      });
  });
};

export default buyCredits;
