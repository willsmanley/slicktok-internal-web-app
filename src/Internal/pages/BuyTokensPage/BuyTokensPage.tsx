import * as React from 'react';
import {useEffect, useState} from 'react';
import Select from 'react-select';
import {Card} from 'stripe-types';
import {useSelector} from 'react-redux';
import {getPricePerToken} from 'mojo-web-api/dist/lib/stripe/getPricePerToken';
import styles from './BuyTokensPage.module.css';
import AddCreditCardModal from '../../components/AddCreditCardModal/AddCreditCardModal';
import {RootState} from '../../../redux/store';
import AsyncButton from '../../../components/AsyncButton/AsyncButton';
import buyCredits from './buyCredits';
import Message from '../../../components/Message/Message';
import buttonStyles from '../../../sharedStyles/buttonStyles.module.css';

const BuyTokensPage = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [err, setErr] = useState(null);
  const [emailCount, setEmailCount] = useState(1000 as number);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(
    null as null | {value: Card; label: string},
  );

  interface CardObject {
    value: Card;
    label: string;
  }

  const cards = useSelector((state: RootState) => state.paymentMethods);
  const customer = useSelector((state: RootState) => state.customer);

  const getCardString = (card: Card) => `${card.brand} ending in ${card.last4}`;

  const getCardObject = (card: Card) => ({
    value: card,
    label: getCardString(card),
  });

  // Select card when we receive cards
  useEffect(() => {
    // If we have received the list of cards and the customer object
    if (cards && cards.length && customer) {
      // Try to find the default card.
      const defaultCard = (customer.default_source &&
        cards.find(
          (card) => card.id === customer.default_source,
        )) as Card | null;

      if (defaultCard) {
        // If we find it, set it as the currently selected card
        setSelectedCard(getCardObject(defaultCard));
      } else if (!selectedCard) {
        // Otherwise, set it to the last card in the array (added most recently)
        setSelectedCard(getCardObject(cards[cards.length - 1]));
      }
    }
  }, [cards, customer]);

  const handleEmailCountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberCharsOnly = e.target.value.replace(/[^0-9.]/g, '');
    const integerOrNan = parseInt(numberCharsOnly, 10);
    const number = Number.isNaN(integerOrNan) ? 0 : integerOrNan;
    setEmailCount(number);
  };

  //
  const handlePurchase = () => {
    if (!selectedCard) return;
    setIsLoading(true);
    buyCredits({
      tokenCount: emailCount,
      paymentMethod: selectedCard.value.id,
      currency: 'usd',
    })
      .then(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      })
      .catch((error) => {
        setErr(error);
        setIsLoading(false);
      });
  };

  // Clear errors and submitted status when page inputs change
  useEffect(() => {
    if (err) setErr(null);
    if (isSubmitted) setIsSubmitted(false);
  }, [emailCount, selectedCard]);

  // Calculate expected cost.
  const pricePerToken = getPricePerToken(emailCount);
  const totalPrice = Math.round(100 * pricePerToken * emailCount) / 100;

  return (
    <div className={styles.buyTokensPage}>
      <AddCreditCardModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
      <div className={styles.buyTokensPageInner}>
        {/* Messages */}
        {err && <Message error message={err} />}
        {isSubmitted && (
          <Message
            success
            message={`${emailCount.toLocaleString()} tokens were purchased successfully.`}
          />
        )}

        <h1 className='h1'>Purchase Email Validation Credits</h1>
        <p>
          Credits never expire! We back our results with a 100% Money-Back
          Guarantee.
        </p>

        <div className={styles.paymentMethodArea}>
          <h2 className='h4'>Payment Method</h2>
          <div className={styles.cardSelectionArea}>
            <Select
              className={styles.cardDropdown}
              value={selectedCard}
              onChange={(value) => setSelectedCard(value as CardObject)}
              options={
                !cards
                  ? undefined
                  : cards.map((card: Card) => getCardObject(card))
              }
            />
            <button
              className={buttonStyles.button}
              onClick={() => setModalIsOpen(true)}
            >
              Add a New Card
            </button>
          </div>
        </div>

        <div>
          <h2 className='h4'>Credit Quantity</h2>
          <input
            className={styles.creditQuantityInput}
            value={emailCount.toLocaleString()}
            onChange={handleEmailCountInput}
          />
        </div>

        <div className={styles.purchaseArea}>
          <h2 className='h4'>Purchase</h2>
          <table>
            <tbody>
              <tr>
                <td>Email Validation Credits</td>
                <td>{emailCount.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Price per Credit</td>
                <td>{pricePerToken}</td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td>
                  $
                  {totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>
              $
              {totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className={styles.buttonRow}>
            <AsyncButton
              onClick={handlePurchase}
              isLoading={isLoading}
              disabled={isLoading || isSubmitted || emailCount < 1000}
              className={buttonStyles.button}
            >
              Purchase
            </AsyncButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTokensPage;
