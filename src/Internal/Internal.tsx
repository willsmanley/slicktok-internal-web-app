import * as React from 'react';
import {ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import {RootState} from '../redux/store';
import {redirectToLogin} from '../lib/loginRedirect';
import useWindowDimensions from '../customHooks/useWindowDimensions';
import styles from './Internal.module.css';
import TopNavBar from './components/TopNavBar/TopNavBar';
import {accountPath, buyTokensPath, internalRootPath} from './internal-routes';
import AccountPage from './pages/AccountPage/AccountPage';
import BuyTokensPage from './pages/BuyTokensPage/BuyTokensPage';
import {getUser} from '../redux/reducers/userSlice';

const Internal = (): ReactElement => {
  // Redirect to login if there is no active session.
  // TODO: Get session
  const session = null;
  // const session = useSelector((state: RootState) => state.session);
  // Fetch user, organization, apiTokens, etc... only on first render
  // Otherwise redirect to login
  const dispatch = useDispatch();
  useEffect(() => {
    if (session) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(getUser());
    } else {
      redirectToLogin();
    }
  }, []);

  const {height} = useWindowDimensions();
  const heightStyle = height
    ? {minHeight: `${height.toString()}px`}
    : {minHeight: '100vh'};

  // Scroll to top of page on route changes
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location]);

  return (
    <div style={heightStyle} className={styles.internal}>
      <TopNavBar />
      <main className={styles.main}>
        <Switch>
          {/* Temporarily redirect root path to buy tokens page until we get a landing page */}
          <Redirect exact path={internalRootPath} to={buyTokensPath} />

          <Route exact path={accountPath} component={AccountPage} />
          <Route exact path={buyTokensPath} component={BuyTokensPage} />

          {/* Send unknown routes back to buy tokens path */}
          <Redirect to={buyTokensPath} />
        </Switch>
      </main>
    </div>
  );
};

export default Internal;
