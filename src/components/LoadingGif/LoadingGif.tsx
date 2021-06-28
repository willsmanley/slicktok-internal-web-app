import * as React from 'react';
import classnames from 'classnames';
import styles from './LoadingGif.module.css';
import logo from '../../assets/svgs/mojo-m-logo-white.svg';

export const LoadingGif = ({large}: {large?: boolean}): React.ReactElement => (
  <div className={styles.loadingGifWrapper}>
    <img
      className={classnames({
        [styles.loadingGif]: true,
        [styles.loadingGifLarge]: large,
      })}
      src={logo}
      alt='Mojo loading gif'
    />
  </div>
);
