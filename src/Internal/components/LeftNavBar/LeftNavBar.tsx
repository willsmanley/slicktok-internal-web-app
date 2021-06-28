import * as React from 'react';
import {RefObject, useEffect, useRef} from 'react';
import styles from './LeftNavBar.module.css';
import {
  accountPath,
  apiTokensPath,
  bulkValidationPath,
  buyTokensPath,
  internalRootPath,
  singleValidationPath,
} from '../../internal-routes';
import classNames from '../../../lib/classNames';
import history from '../../../history';

interface LeftNavBarProps {
  isOpen: boolean;
  closeLeftNavBar: () => void;
  setLeftNavBarRef: (x: RefObject<HTMLElement>) => void;
}

const LeftNavBar = (props: LeftNavBarProps): React.ReactElement => {
  const path = window.location.pathname;

  // Pass ref to parent component.
  const ref = useRef(null);
  useEffect(() => props.setLeftNavBarRef(ref), [ref]);

  return (
    <nav
      ref={ref}
      className={classNames({
        [styles.leftNavBar]: true,
        [styles.leftNavBarOpen]: props.isOpen,
      })}
    >
      <div>
        <h2
          onClick={() => {
            history.push(internalRootPath);
            props.closeLeftNavBar();
          }}
        >
          Email Validation
        </h2>
        <ul></ul>
      </div>
      <div>
        <h2
          onClick={() => {
            history.push(accountPath);
            props.closeLeftNavBar();
          }}
        >
          Account
        </h2>
      </div>
    </nav>
  );
};

export default LeftNavBar;
