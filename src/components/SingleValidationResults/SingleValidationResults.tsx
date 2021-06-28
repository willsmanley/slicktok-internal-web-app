import * as React from 'react';
import {useEffect, useState} from 'react';
import {sentenceCase} from 'change-case';
import {EmailValidationRecordInterface} from 'mojo-web-api/dist/models/EmailValidationRecord/EmailValidationRecordInterface';
import styles from './SingleValidationResults.module.css';

interface SingleValidationResults {
  guestTokens?: number;
  results: EmailValidationRecordInterface;
}

const SingleValidationResults = ({
  guestTokens = undefined,
  results,
}: SingleValidationResults): React.ReactElement => {
  const [showDetails, setShowDetails] = useState(false);

  const handleStatuses = ([key, handler]: [string, (x: string) => string]) => {
    if (!results) return null;
    let value = results[key] as string | boolean;
    if (typeof handler === 'function') {
      value = handler(value as string);
    } else if (typeof value === 'boolean') {
      value = value.toString();
    } else if (value === null) {
      value = 'unknown';
    }
    return (
      <li key={key}>
        <div>{sentenceCase(key)}</div>
        <div className={styles.value}>{value}</div>
      </li>
    );
  };

  // Hide details when results change
  useEffect(() => setShowDetails(false), [results]);

  return (
    <div className={styles.results}>
      <div className={styles.resultsTopRow}>
        <h2>Results</h2>

        {/* Only render for guest view */}
        {guestTokens !== undefined && (
          <p>Guest Credits Remaining: {guestTokens}</p>
        )}
      </div>
      <hr />
      <ul className={styles.primaryResults}>
        {[
          // PRIMARY FIELDS
          ['shouldEmail'],
          ['deliverable'],
          ['suggestion', (value: string | null) => value || 'none'],
          ['username'],
          ['domain'],
          ['normalizedEmail'],
          ['gender'],
          ['firstName'],
          ['lastName'],

          // DO NOT MAIL FLAGS
          ['abuse'],
          ['globalSuppression'],
          ['sendsMailOnly'],
          ['alias'],
          ['catchAll'],
          ['fullInbox'],
          ['role'],
          ['disposable'],
          ['free'],
          ['spamTrap'],
          ['possibleSpamTrap'],
          ['roleBasedCatchAll'],
          ['toxic'],
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        ].map(handleStatuses)}
      </ul>

      {showDetails ? (
        <>
          <ul />

          <h3>Technical Details</h3>
          <ul>
            {[
              ['greylisted'],
              ['mailServerDidNotRespond'],
              ['mailServerTemporaryError'],
              ['timeoutExceeded'],
              ['forcibleDisconnect'],
              ['failedSmtpConnection'],
              ['hostDoesNotExist'],
              [
                'mxRecordUsed',
                (value: null | boolean) => (value === null ? 'n/a' : value),
              ],
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
            ].map(handleStatuses)}
          </ul>
        </>
      ) : (
        <div className={styles.moreDetailsSection}>
          <button onClick={() => setShowDetails(true)}>
            Show Technical Details
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleValidationResults;
