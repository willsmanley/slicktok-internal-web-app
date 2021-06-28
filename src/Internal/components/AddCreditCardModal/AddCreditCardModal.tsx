import * as React from 'react';
import Modal from 'react-modal';
import {useEffect, useState} from 'react';
import {cardValidation} from 'mojo-web-api/dist/validations/cardValidation';
import styles from './AddCreditCardModal.module.css';
import Form from '../../../components/Form/Form';
import AsyncButton from '../../../components/AsyncButton/AsyncButton';
import addCard from './addCard';
import buttonStyles from '../../../sharedStyles/buttonStyles.module.css';
import Message from '../../../components/Message/Message';

const AddCreditCardModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}): React.ReactElement => {
  // eslint-disable-next-line
  const [isDefault, setIsDefault] = useState(true);
  const [number, setNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [addressZip, setAddressZip] = useState('');
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  // Check input validity when inputs change.
  useEffect(() => {
    setErr(null);
    cardValidation
      .isValid({number, expMonth, expYear, cvc, addressZip, name})
      .then((checkIsValid) => {
        if (isValid !== checkIsValid) {
          setIsValid(checkIsValid);
        }
      })
      .catch((error: Error) => {
        console.log(error, error.stack);
      });
  }, [number, expMonth, expYear, cvc, addressZip, name]);

  const handleAddCard = () => {
    setIsLoading(true);
    addCard({number, expMonth, expYear, cvc, addressZip, isDefault})
      .then((response) => {
        console.log({response});
        setIsLoading(false);
        closeModal();
      })
      .catch((error) => {
        setErr(error);
        setIsLoading(false);
      });
  };

  return (
    <Modal
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={isOpen}
      onRequestClose={() => closeModal()}
      contentLabel='Add a Credit Card'
    >
      <div className={styles.innerModal}>
        <h1 className='h3'>Add a Credit Card</h1>
        {err && <Message error message={err} />}
        <Form className={styles.creditCardForm}>
          <div>
            <div>
              <label>Card Number</label>
              <input
                disabled={isLoading}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Exp Month</label>
              <input
                disabled={isLoading}
                placeholder='MM'
                maxLength={2}
                value={expMonth}
                onChange={(e) => setExpMonth(e.target.value)}
              />
            </div>
            <div>
              <label>Exp Year</label>
              <input
                disabled={isLoading}
                placeholder='YY'
                maxLength={2}
                value={expYear}
                onChange={(e) => setExpYear(e.target.value)}
              />
            </div>
            <div>
              <label>CVC</label>
              <input
                disabled={isLoading}
                maxLength={4}
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Cardholder name</label>
              <input
                disabled={isLoading}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Zip/postal code</label>
              <input
                disabled={isLoading}
                value={addressZip}
                onChange={(e) => setAddressZip(e.target.value)}
              />
            </div>
          </div>

          <AsyncButton
            className={buttonStyles.button}
            isLoading={isLoading}
            disabled={isLoading || !isValid}
            onClick={handleAddCard}
          >
            Add Card
          </AsyncButton>
        </Form>
      </div>
    </Modal>
  );
};

export default AddCreditCardModal;
