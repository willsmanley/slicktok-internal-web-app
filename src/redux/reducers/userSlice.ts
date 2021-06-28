import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInterface} from 'mojo-web-api/dist/models/User/UserInterface';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {accountPath, userEndpoint} from 'mojo-web-api/dist/routeNames';
import store from '../store';
import {redirectToLogin} from '../../lib/loginRedirect';

// null = fetching user from server
// false = failed to fetch user from server
// UserInterface = the actual user entity
export type User = UserInterface | false | null;
const initialState = null as unknown as User;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser() {
      axios
        .get(accountPath + userEndpoint)
        .then((response: AxiosResponse<{user: UserInterface}>) => {
          store.dispatch(setUser(response.data.user));
        })
        .catch((err: AxiosError) => {
          console.error(err, err.stack);
          // Log out user if this request fails
          // store.dispatch(clearSession());
          // TODO: handle clear session
          redirectToLogin();
        });
    },
    setUser(state, action: PayloadAction<UserInterface>) {
      return action.payload;
    },
  },
});

export const {setUser, getUser} = userSlice.actions;
export default userSlice.reducer;
