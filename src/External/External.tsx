import React, {ReactElement, useState} from 'react';
import styles from './External.module.css';
import ExternalHeader from './components/ExternalHeader/ExternalHeader';
import ExternalFooter from './components/ExternalFooter/ExternalFooter';
import AuthPage from './pages/AuthPage/AuthPage';
import useWindowDimensions from '../customHooks/useWindowDimensions';

const External = (): ReactElement => {
  const {height} = useWindowDimensions();
  const heightStyle = height
    ? {minHeight: `${height.toString()}px`}
    : {minHeight: '100vh'};

  const [footerHeight, setFooterHeight] = useState(0);

  // Main section should be at least enough to get footer to bottom.
  let mainStyle = {};
  if (height) {
    mainStyle = {
      // height of browser, minus 80 (top nav), minus measured footer height
      minHeight: height - 80 - footerHeight,
    };
  }

  return (
    <div className={styles.external} style={heightStyle}>
      <ExternalHeader />

      <div className={styles.externalMain} style={mainStyle}>
        <AuthPage />
      </div>

      <ExternalFooter setFooterHeight={setFooterHeight} />
    </div>
  );
};

export default External;
