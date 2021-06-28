import {authPath, registerEndpoint} from 'mojo-web-api/dist/routeNames';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {UserInterface} from 'mojo-web-api/dist/models/User/UserInterface';
import {UserSessionInterface} from 'mojo-web-api/dist/models/UserSession/UserSessionInterface';
import {OrganizationInterface} from 'mojo-web-api/dist/models/Organization/OrganizationInterface';
import {ApiTokenInterface} from 'mojo-web-api/dist/models/ApiToken/ApiTokenInterface';
import history from '../../../history';
import {setUser} from '../../../redux/reducers/userSlice';
import getErrorMessage from '../../../lib/getErrorMessage';
import store from '../../../redux/store';

type successfulRegistrationResponse = AxiosResponse<{
  user: UserInterface;
  userSession: UserSessionInterface;
  organization: OrganizationInterface;
  apiToken: ApiTokenInterface;
}>;

const register = (email: string, password: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    axios
      .post(authPath + registerEndpoint, null, {
        params: {email, password},
      })
      .then((response: successfulRegistrationResponse) => {
        store.dispatch(setUser(response.data.user));
        history.push('/app');
      })
      .catch((err: AxiosError) => {
        console.error(err, err.stack);
        reject(getErrorMessage(err));
      });
  });
};

export default register;
