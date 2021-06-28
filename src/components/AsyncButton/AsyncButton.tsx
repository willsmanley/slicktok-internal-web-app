import React from 'react';
import removeKeys from '../../lib/removeKeys';
import styles from './AsyncButton.module.css';

const AsyncButton = (props: {
  title?: string;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactElement | React.ReactNode;
}): React.ReactElement => {
  return (
    <button {...removeKeys(props, ['isLoading', 'children'])}>
      {props.isLoading ? <div className={styles.loader} /> : props.children}
    </button>
  );
};

export default AsyncButton;
