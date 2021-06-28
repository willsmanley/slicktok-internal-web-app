import React from 'react';
import {AxiosError} from 'axios';

type ExpressError = AxiosError<{
  errors?: string[];
  message?: string;
}>;

const defaultErrorMessage = 'An unknown server error occurred.';
const getErrorMessage = (err: ExpressError): React.ReactElement => {
  if (err.response) {
    if (err.response.data) {
      if (err.response.data.errors) {
        const count = err.response.data.errors.length;
        return (
          <>
            {err.response.data.errors.map((error, index) => {
              return (
                <>
                  {error}
                  {index !== count - 1 && <br />}
                </>
              );
            })}
          </>
        );
      }
      if (err.response.data.message) {
        return <>{err.response.data.message}</>;
      }
    }
  }

  console.error('Can not determine message for axios error: ', err);
  return <>{defaultErrorMessage}</>;
};

export default getErrorMessage;
