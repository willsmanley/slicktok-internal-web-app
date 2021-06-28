import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {accountPath, userEndpoint} from 'mojo-web-api/dist/routeNames';
import {UserInterface} from 'mojo-web-api/dist/models/User/UserInterface';
import Form from '../../../../components/Form/Form';
import Message, {ErrorString} from '../../../../components/Message/Message';
import {RootState} from '../../../../redux/store';
import getErrorMessage from '../../../../lib/getErrorMessage';
import form1Styles from '../../../../sharedStyles/form1Styles.module.css';
import AsyncButton from '../../../../components/AsyncButton/AsyncButton';
import {setUser} from '../../../../redux/reducers/userSlice';

const UserSettingsForm = (): React.ReactElement => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null as ErrorString);
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Determine if any user fields are different from their initial values
  const equivalentToOriginal =
    !user ||
    (firstName === user.firstName &&
      lastName === user.lastName &&
      email === user.email);

  // Populate state when we receive new user props
  useEffect(() => {
    setFirstName(user && user.firstName ? user.firstName : '');
    setLastName(user && user.lastName ? user.lastName : '');
    setEmail(user && user.email ? user.email : '');
  }, [user]);

  // Clear error and success messages when values change
  useEffect(() => {
    if (err) setErr(null);
    if (submitted) setSubmitted(false);
  }, [firstName, lastName, email]);

  // Validate inputs on every change
  useEffect(() => {
    yup
      .object()
      .shape({
        firstName: yup.string().min(0).max(300),
        lastName: yup.string().min(0).max(300),
        email: yup.string().email().max(300).required(),
      })
      .isValid({email, firstName, lastName})
      .then((checkIsValid) => {
        if (isValid !== checkIsValid) {
          setIsValid(checkIsValid);
        }
      })
      .catch((error: Error) => {
        console.error(error, error.stack);
      });
  }, [firstName, lastName, email]);

  const handleSubmit = () => {
    // Don't submit if we are loading or just submitted
    if (isLoading || submitted) return;
    setIsLoading(true);

    type successfulUserUpdateResponse = AxiosResponse<{user: UserInterface}>;
    type failedUserUpdateResponse = AxiosError<{message?: string}>;

    // Execute update
    axios
      .put(accountPath + userEndpoint, null, {
        params: {firstName, lastName, email},
      })
      .then((response: successfulUserUpdateResponse) => {
        setSubmitted(true);
        setIsLoading(false);
        dispatch(setUser(response.data.user));
      })
      .catch((error: failedUserUpdateResponse) => {
        console.error(error, error.stack);
        setErr(getErrorMessage(error));
        setIsLoading(false);
      });
  };

  return (
    <Form className={form1Styles.form1}>
      <h2>User Settings</h2>
      {err && <Message error message={err} />}
      {submitted && (
        <Message success message='User settings saved successfully.' />
      )}

      <div>
        <label>First Name</label>
        <input
          disabled={isLoading}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label>Last Name</label>
        <input
          disabled={isLoading}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <AsyncButton
        isLoading={isLoading}
        disabled={isLoading || submitted || !isValid || equivalentToOriginal}
        onClick={handleSubmit}
      >
        Save
      </AsyncButton>
    </Form>
  );
};

export default UserSettingsForm;
