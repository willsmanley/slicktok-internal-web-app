import * as React from 'react';
import {useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import * as yup from 'yup';
import {useSelector} from 'react-redux';
import styles from './AuthPage.module.css';
import Form from '../../../components/Form/Form';
import login from './login';
import register from './register';
import Message, {ErrorString} from '../../../components/Message/Message';
import {RootState} from '../../../redux/store';
import {resolveLoginRedirect} from '../../../lib/loginRedirect';
import AsyncButton from '../../../components/AsyncButton/AsyncButton';
import buttonStyles from '../../../sharedStyles/buttonStyles.module.css';

const AuthPage = (): React.ReactElement => {
  // TODO: get session
  const session = null;
  // const session = useSelector((state: RootState) => state.session);
  const checkIsLogin = (): boolean => window.location.pathname === '/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null as ErrorString);
  const [isLogin, setIsLogin] = useState(checkIsLogin());
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Redirect to app if user is already logged in
  React.useEffect(() => {
    if (session) resolveLoginRedirect();
  }, []);

  // Location effects
  React.useEffect(() => {
    // Check if we are on login page or register page
    if (isLogin !== checkIsLogin()) {
      setIsLogin(checkIsLogin());
    }

    // Clear error message on route change
    if (error) setError(null);
  }, [location]);

  // AutoResizeTextArea effects
  React.useEffect(() => {
    yup
      .object()
      .shape({
        email: yup.string().email(),
        password: yup.string().min(8),
      })
      .isValid({
        email,
        password,
      })
      .then((checkIsValid) => {
        if (isValid !== checkIsValid) {
          setIsValid(checkIsValid);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [email, password]);

  const handleLogin = () => {
    // Clear current error before executing
    if (error) setError(null);
    setIsLoading(true);
    login(email, password).catch((err: ErrorString) => {
      setError(err);
      setIsLoading(false);
    });
  };

  const handleRegister = () => {
    // Clear current error before executing
    if (error) setError(null);
    setIsLoading(true);
    register(email, password).catch((err: ErrorString) => {
      setError(err);
      setIsLoading(false);
    });
  };

  return (
    <main className={styles.main}>
      <Form className={styles.form}>
        <div className={styles.headerDiv}>
          {/* TODO: slicktok logo */}
          {/* <MojoMLogoWhite /> */}
          <h1 className={styles.h1}>{isLogin ? 'Login' : 'Register'}</h1>
        </div>

        {error && <Message error message={error} />}

        <div className={styles.authInput}>
          <label>Email</label>
          <input
            autoComplete={isLogin ? 'email' : 'username'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.authInput}>
          <label>Password</label>
          <input
            type='password'
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <AsyncButton
          title={
            isValid
              ? ''
              : 'Must use a valid email address and a password of at least 8 characters.'
          }
          disabled={!isValid}
          onClick={isLogin ? handleLogin : handleRegister}
          className={`${buttonStyles.button} ${buttonStyles.hollowButton} ${buttonStyles.fullWidthButton}`}
          isLoading={isLoading}
        >
          {isLogin ? 'Login' : 'Register'}
        </AsyncButton>

        <div className={styles.moreInfoArea}>
          {isLogin ? (
            <div className={styles.forgotPasswordRow}>
              <NavLink className={styles.forgotPassword} to='/contact'>
                Forgot Password?
              </NavLink>
            </div>
          ) : (
            <div className={styles.termsAgreementRow}>
              By registering, you agree to our{' '}
              <NavLink to='/terms'>Terms</NavLink> and{' '}
              <NavLink to='/privacy'>Privacy Policy</NavLink>. You may receive
              communications from us. Opt out at any time.
            </div>
          )}
        </div>
      </Form>

      {isLogin ? (
        <p className={styles.toggleAuthViewPrompt}>
          Don't have an account yet?{' '}
          <NavLink to='/register'>Create an account</NavLink>
        </p>
      ) : (
        <p className={styles.toggleAuthViewPrompt}>
          Already have an account? <NavLink to='/login'>Login</NavLink>
        </p>
      )}
    </main>
  );
};

export default AuthPage;
