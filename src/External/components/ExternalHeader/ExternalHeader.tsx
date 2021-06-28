import * as React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './ExternalHeader.module.css';
import useWindowDimensions from '../../../customHooks/useWindowDimensions';
import SvgOpenHamburgerIcon from '../../../assets/svgrs/OpenHamburgerIcon';
import SvgCloseHamburgerIcon from '../../../assets/svgrs/CloseHamburgerIcon';
import {loginPath, registerPath} from '../../external-routes';
import buttonStyles from '../../../sharedStyles/buttonStyles.module.css';

const maxMobileHeaderWidth = 870;

const ExternalHeader = (): React.ReactElement => {
  const {width, height} = useWindowDimensions();
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false);

  // Close mobile menu if we exceed mobile width
  React.useEffect(() => {
    if (width && width > maxMobileHeaderWidth && hamburgerOpen) {
      setHamburgerOpen(false);
    }
  }, [width]);

  if (width && width > maxMobileHeaderWidth) {
    return (
      /** DESKTOP NAV */
      <nav className={styles.nav}>
        <div className={styles.leftSection}></div>

        <ul className={styles.midSection}></ul>

        <ul className={styles.rightSection}>
          <li>
            <NavLink to={loginPath}>Login</NavLink>
          </li>
          <li>
            <NavLink
              style={{margin: '0px 15px'}}
              className={`${buttonStyles.button} ${buttonStyles.hollowButton}`}
              to={registerPath}
            >
              Get Started
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <>
      {/** MOBILE NAV */}
      <nav className={styles.nav}>
        <div className={styles.leftSection}>
          <NavLink to='/'>{/* <SvgMojoLogoWhiteLong /> */}</NavLink>
        </div>

        {/* hamburger opener */}
        <div className={styles.rightSection}>
          <SvgOpenHamburgerIcon
            className={styles.hamburgerIcon}
            onClick={() => setHamburgerOpen(true)}
          />
        </div>
      </nav>

      {/** Mobile menu */}
      <div
        className={styles.mobileMenu}
        style={{width, height, left: hamburgerOpen ? 0 : width}}
      >
        {/* Logo + Close Menu Icon */}
        <div className={styles.mobileHeader}>
          <div className={styles.leftSection}></div>
          <div className={styles.rightSection}>
            <SvgCloseHamburgerIcon
              className={styles.hamburgerIcon}
              onClick={() => setHamburgerOpen(false)}
            />
          </div>
        </div>

        {/* Links */}
        <ul>
          <li className='h3'>
            <NavLink onClick={() => setHamburgerOpen(false)} to={loginPath}>
              Login
            </NavLink>
          </li>
          <li className='h3'>
            <NavLink
              className={`${buttonStyles.button} ${buttonStyles.largeButton}`}
              onClick={() => setHamburgerOpen(false)}
              to={registerPath}
            >
              Get Started
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ExternalHeader;
