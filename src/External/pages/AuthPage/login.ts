import axios, {AxiosError, AxiosResponse} from 'axios';
import {authPath, loginEndpoint} from 'mojo-web-api/dist/routeNames';
import {UserInterface} from 'mojo-web-api/dist/models/User/UserInterface';
import {UserSessionInterface} from 'mojo-web-api/dist/models/UserSession/UserSessionInterface';
import store from '../../../redux/store';
import {setUser} from '../../../redux/reducers/userSlice';
import {resolveLoginRedirect} from '../../../lib/loginRedirect';
import {ErrorString} from '../../../components/Message/Message';
import getErrorMessage from '../../../lib/getErrorMessage';

interface successfulLoginData {
  user: UserInterface;
  userSession: UserSessionInterface;
}

type successfulLoginResponse = AxiosResponse<successfulLoginData>;

export type failedLoginResponse = AxiosError<{message?: string}>;

const login = (
  email: string,
  password: string,
): Promise<successfulLoginData | ErrorString> => {
  return new Promise((resolve, reject) => {
    axios
      .post(authPath + loginEndpoint, null, {params: {email, password}})
      .then((response: successfulLoginResponse) => {
        store.dispatch(setUser(response.data.user));
        // TODO: set the session
        // store.dispatch(setSession(response.data.userSession.token));
        resolve(response.data);
        resolveLoginRedirect();
      })
      .catch((err: failedLoginResponse) => {
        console.error(err, err.stack);
        reject(getErrorMessage(err));
      });
  });
};

export default login;
