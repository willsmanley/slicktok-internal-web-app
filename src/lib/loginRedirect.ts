import history from '../history';
import {loginPath} from '../External/external-routes';

/**
 * Use to redirect to the login page if session is invalid. Retain
 * current path and query params so we can keep the user on track to
 * where they were going.
 */
export const redirectToLogin = (): void => {
  const url = new URL(window.location.href);

  // Only add redirect query param if there isn't one already
  if (!url.searchParams.get('redirect')) {
    url.searchParams.append('redirect', url.pathname);
  }

  history.push(loginPath + url.search);
};

/**
 * Use to resolve a scheduled redirect after a successful login was completed.
 */
export const resolveLoginRedirect = (): void => {
  const url = new URL(window.location.href);
  const redirectPath = url.searchParams.get('redirect');
  if (redirectPath) {
    url.searchParams.delete('redirect');
    history.push(decodeURIComponent(redirectPath) + url.search);
  } else {
    history.push('/app');
  }
};
