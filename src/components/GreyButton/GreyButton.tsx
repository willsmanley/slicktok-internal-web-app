import React, {ReactElement} from 'react';
import styles from './GreyButton.module.css';
import removeKeys from '../../lib/removeKeys';
import classNames from '../../lib/classNames';

export const GreyButton = (props: {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode[] | React.ReactNode;
  style?: Record<string, unknown>;
}): ReactElement => {
  return (
    <button
      {...removeKeys(props, 'children')}
      className={classNames([styles.button, props.className])}
    >
      {props.children}
    </button>
  );
};
