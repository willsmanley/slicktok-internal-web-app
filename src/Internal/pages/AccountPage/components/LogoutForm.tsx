import * as React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import Form from '../../../../components/Form/Form';
import form1Styles from '../../../../sharedStyles/form1Styles.module.css';
import AsyncButton from '../../../../components/AsyncButton/AsyncButton';

const LogoutForm = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsLoading(true);
    // TODO: handle logout
    // dispatch();
  };

  return (
    <Form className={form1Styles.form1}>
      <h2>Manage Session</h2>
      <AsyncButton
        isLoading={isLoading}
        disabled={isLoading}
        onClick={handleSubmit}
      >
        Logout
      </AsyncButton>
    </Form>
  );
};

export default LogoutForm;
