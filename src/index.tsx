import React, {ReactElement} from 'react';
import {hydrate, render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import axios, {AxiosError} from 'axios';
import store from './redux/store';
import './index.css';
import Internal from './Internal/Internal';
import External from './External/External';
import history from './history';
import {redirectToLogin} from './lib/loginRedirect';
import {loginPath, registerPath} from './External/external-routes';
// import reportWebVitals from './reportWebVitals';

// Global interceptor for all axios requests
axios.interceptors.request.use((config) => {
  // Use "NO_MODIFY" header as an escape hatch to not intercept
  if (config.headers.NO_MODIFY) return config;

  // Add session token to request header if one exists
  const sessiontoken = localStorage.getItem('sessiontoken');

  // Override URL path to route to localhost or production API.
  let url = config.url as string;
  if (!url.startsWith('http')) {
    // Ensure leading forward slash is present on path
    if (!url.startsWith('/')) url = `/${url}`;

    // Use correct hostname for dev vs prod
    url =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3000${url}`
        : `https://api.${window.location.hostname}${url}`;
  }

  // Reassemble and return new config
  return {
    ...config,
    url,
    headers: {
      ...config.headers,
      ...(sessiontoken ? {sessiontoken} : {}),
    },
  };
});

// Global interceptor for all axios responses
axios.interceptors.response.use(
  (response) => response,
  (err: AxiosError): Promise<AxiosError> => {
    console.log('intercepting error');
    if (err.response && err.response.status === 401) {
      // 401 is always an invalid authentication error
      // Session has ended, authentication failed. Redirect to login.
      redirectToLogin();
    }
    // return err.response.data.error;
    return Promise.reject(err);
  },
);

// Root component for app
const App = (): ReactElement => {
  return (
    // Enforce strict JS throughout app
    <React.StrictMode>
      {/* Inject redux store at top level */}
      <Provider store={store}>
        {/* Allow Router to control History API */}
        <Router history={history}>
          {[loginPath, registerPath].includes(window.location.pathname) ? (
            <External />
          ) : (
            <Internal />
          )}
        </Router>
      </Provider>
    </React.StrictMode>
  );
};
export default App;

// Hydrate if SSR; Render if static
const rootElement = document.getElementById('root');
if (rootElement && rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// Report performance
if (process.env.NODE_ENV === 'development') {
  // reportWebVitals((metric) => console.log('web vitals', metric));
} else {
  // TODO: report web vitals to production system. See: https://bit.ly/CRA-vitals
}
