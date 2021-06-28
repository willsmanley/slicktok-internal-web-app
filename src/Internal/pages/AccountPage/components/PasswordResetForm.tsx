import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {accountPath, userEndpoint} from 'mojo-web-api/dist/routeNames';
import {UserInterface} from 'mojo-web-api/dist/models/User/UserInterface';
import Form from '../../../../components/Form/Form';
import Message, {ErrorString} from '../../../../components/Message/Message';
import getErrorMessage from '../../../../lib/getErrorMessage';
import form1Styles from '../../../../sharedStyles/form1Styles.module.css';
import AsyncButton from '../../../../components/AsyncButton/AsyncButton';
import {setUser} from '../../../../redux/reducers/userSlice';

const UserSettingsForm = (): React.ReactElement => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null as ErrorString);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  // Clear error and success messages when values change
  useEffect(() => {
    if (err) setErr(null);
    if (submitted) setSubmitted(false);
  }, [password, confirmPassword]);

  // Validate inputs on every change
  useEffect(() => {
    yup
      .object()
      .shape({
        password: yup.string().min(8).max(300),
      })
      .isValid({password})
      .then((checkIsValid) => {
        const isValidAndEqual = checkIsValid && password === confirmPassword;
        if (isValid !== isValidAndEqual) {
          setIsValid(isValidAndEqual);
        }
      })
      .catch((error: Error) => {
        console.error(error, error.stack);
      });
  }, [password, confirmPassword]);

  const handleSubmit = () => {
    // Don't submit if we are loading or just submitted
    if (isLoading || submitted) return;
    setIsLoading(true);

    type successfulUserUpdateResponse = AxiosResponse<{user: UserInterface}>;
    type failedUserUpdateResponse = AxiosError<{message?: string}>;

    // Execute update
    axios
      .put(accountPath + userEndpoint, null, {
        params: {password},
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
      <h2>Reset Password</h2>
      {err && <Message error message={err} />}
      {submitted && <Message success message='Password reset successfully.' />}

      <div>
        <label>New Password</label>
        <input
          type='password'
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Confirm New Password</label>
        <input
          type='password'
          disabled={isLoading}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <AsyncButton
        isLoading={isLoading}
        disabled={isLoading || submitted || !isValid}
        onClick={handleSubmit}
      >
        Save
      </AsyncButton>
    </Form>
  );
};

export default UserSettingsForm;
