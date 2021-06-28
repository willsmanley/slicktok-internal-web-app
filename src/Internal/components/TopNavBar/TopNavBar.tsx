import * as React from 'react';
import {useSelector} from 'react-redux';
import {RefObject, useState} from 'react';
import {UserInterface} from 'mojo-web-api/dist/models/User/UserInterface';
import {OrganizationInterface} from 'mojo-web-api/dist/models/Organization/OrganizationInterface';
import styles from './TopNavBar.module.css';
import {RootState} from '../../../redux/store';
import LeftNavBar from '../LeftNavBar/LeftNavBar';
import OpenHamburgerIcon from '../../../assets/svgrs/OpenHamburgerIcon';
import history from '../../../history';
import {
  accountPath,
  buyTokensPath,
  internalRootPath,
} from '../../internal-routes';
import useWindowDimensions from '../../../customHooks/useWindowDimensions';

const TopNavBar = (): React.ReactElement => {
  const [leftNavBarRef, setLeftNavBarRef] = useState(
    null as null | RefObject<HTMLElement>,
  );
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
  const {user} = useSelector((state: RootState) => ({
    user: state.user as UserInterface,
  }));
  const {width} = useWindowDimensions();

  // null or "first last" or "email"
  const getUserAlias = () => {
    if (!user) return null;
    if (user.firstName || user.lastName) {
      return `${user.firstName || ''} ${user.lastName || ''}`;
    }
    return user.email;
  };
  const userAlias = getUserAlias();

  const handleWrapperClick = (e: React.MouseEvent<HTMLElement>) => {
    // Check for clicks outside an open left nav bar; close left nav bar
    if (isLeftNavOpen && leftNavBarRef && leftNavBarRef.current) {
      if (!leftNavBarRef.current.contains(e.target as Node)) {
        setIsLeftNavOpen(false);
      }
    }
  };

  return (
    <div
      onClick={handleWrapperClick}
      className={isLeftNavOpen ? styles.topNavWrapper : ''}
    >
      <LeftNavBar
        closeLeftNavBar={() => setIsLeftNavOpen(false)}
        setLeftNavBarRef={setLeftNavBarRef}
        isOpen={isLeftNavOpen}
      />

      <nav className={styles.topNavBar}>
        {/* Left section. */}
        <div className={styles.leftSection}>
          <div>
            <OpenHamburgerIcon
              className={styles.openLeftNavIcon}
              onClick={() => setIsLeftNavOpen(!isLeftNavOpen)}
            />
          </div>
          <div>
            {/* TODO: SlickTok logo */}
            {/* <MojoLogoWhiteLong */}
            {/*  className={styles.mojoLogo} */}
            {/*  onClick={() => history.push(internalRootPath)} */}
            {/* /> */}
          </div>
        </div>

        {/* Right section  */}
        <div className={styles.rightSection}>
          {width && width > 700 && (
            <>
              <div
                onClick={() => history.push(buyTokensPath)}
                className={styles.validationCredits}
              ></div>
              <div
                onClick={() => history.push(accountPath)}
                className={styles.userAlias}
              >
                {userAlias}
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default TopNavBar;
