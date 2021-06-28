import * as React from 'react';
import UserSettingsForm from './components/UserSettingsForm';
import PasswordResetForm from './components/PasswordResetForm';
import styles from './AccountPage.module.css';
import LogoutForm from './components/LogoutForm';

const AccountPage = (): React.ReactElement => {
  return (
    <div className={styles.accountPage}>
      <LogoutForm />
      <UserSettingsForm />
      <PasswordResetForm />
    </div>
  );
};

export default AccountPage;
