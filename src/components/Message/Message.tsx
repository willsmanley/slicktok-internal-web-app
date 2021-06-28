import * as React from 'react';
import classNames from '../../lib/classNames';
import ExternalLink from '../ExternalLink/ExternalLink';
import styles from './Message.module.css';
import SvgAlertIcon from '../../assets/svgrs/AlertIcon';
import SvgSuccessIcon from '../../assets/svgrs/SuccessIcon';

export type ErrorString = null | string | React.ReactElement;

export const DOMAIN = window.location.hostname;
export const SUPPORT_EMAIL = `support@${DOMAIN}`;
export const INFO_EMAIL = `info@${DOMAIN}`;
export const PRIVACY_EMAIL = `privacy@${DOMAIN}`;

const emailLink = (
  <ExternalLink text={SUPPORT_EMAIL} href={`mailto:${SUPPORT_EMAIL}`} />
);
const defaultSuccessMessage: ErrorString = 'Success!';
const defaultErrorMessage: ErrorString = (
  <>An unknown error occurred. Please try again or contact {emailLink}.</>
);
const Message = (props: {
  message?: React.ReactNode;
  error?: boolean;
  success?: boolean;
}): React.ReactElement => {
  let defaultMessage;
  let fill;
  if (props.success) {
    fill = 'green';
    defaultMessage = defaultSuccessMessage;
  } else if (props.error) {
    defaultMessage = defaultErrorMessage;
    fill = 'red';
  } else if (!props.message) {
    throw new Error('Message component created without type or text.');
  } else {
    fill = 'black';
  }

  return (
    <div
      className={classNames({
        [styles.alertMessage]: true,
        [styles.alertMessageError]: props.error,
        [styles.alertMessageSuccess]: props.success,
      })}
    >
      {props.success ? (
        <SvgSuccessIcon fill={fill} />
      ) : (
        <SvgAlertIcon fill={fill} />
      )}
      <p>{props.message ?? defaultMessage}</p>
    </div>
  );
};
export default Message;
