import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {useEffect, useRef} from 'react';
import styles from './ExternalFooter.module.css';
import ExternalLink from '../../../components/ExternalLink/ExternalLink';
import {INFO_EMAIL} from '../../../components/Message/Message';

const ExternalFooter = ({
  setFooterHeight,
}: {
  setFooterHeight: (x: number) => void;
}): React.ReactElement => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const height = (ref.current as unknown as {clientHeight: number})
        .clientHeight;
      if (height) {
        setFooterHeight(height);
      }
    }
  });

  return (
    <nav ref={ref} className={styles.externalFooter}>
      <div className={styles.topRow}>
        {/* Logo + contact */}
        <div className={styles.topLeftSide}>
          <NavLink to={'/'}>{/* <SvgMojoLogoWhiteLong /> */}</NavLink>

          <div className={styles.address}>
            <p>SlickTok</p>
            {/* <p>14785 Preston Road</p> */}
            {/* <p>Suite 500</p> */}
            {/* <p>Dallas, TX 75254</p> */}
          </div>

          <p className={styles.emailLink}>
            <ExternalLink text={INFO_EMAIL} href={`mailto:${INFO_EMAIL}`} />
          </p>
        </div>

        {/* <div className={styles.linkColumns}> */}
        {/*  <div> */}
        {/*    */}
        {/*  </div> */}
        {/* </div> */}

        {/* Links */}
        <div className={styles.linkColumns}>
          {/* Links 1 */}
          <div>
            <ul />
          </div>

          {/* Links 2 */}
          <div>
            <ul />
          </div>
        </div>
      </div>
      <div className={styles.bottomRow}>
        <div>© {new Date().getFullYear()} SlickTok. All rights reserved.</div>
        {/* Compliance icons  */}
        <div></div>
      </div>
    </nav>
  );
};

export default ExternalFooter;
