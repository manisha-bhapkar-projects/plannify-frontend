import React, {useState} from 'react';
import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    if (error) {
      //console.log('[error]', error);
      setError(error);
    } else {
      //console.log('[PaymentMethod]', paymentMethod);
      props.handleAdd(paymentMethod.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{padding: 10, border: '1.5px dashed #e0e0e0'}}>
        <CardElement options={{
          hidePostalCode: true,
          style: {
            base: {
              color: '#303238',
              fontSize: '16px',
              fontFamily: '"Open Sans", sans-serif',
              fontSmoothing: 'antialiased',
              '::placeholder': {
                color: '#CFD7DF',
              },
            },
            invalid: {
              color: '#e5424d',
              ':focus': {
                color: '#303238',
              },
            },        
          },
        }} />
      </div>
      <div style={{marginTop: 10, color: 'red'}}>
        {error ? error.message : null}
      </div>
      <Button  variant="contained" fullWidth type="submit" style={{marginTop: 25}} disabled={!stripe}>
        Add Payment Method
      </Button>
    </form>
  );
};

CheckoutForm.propTypes = {
  handleAdd: PropTypes.func,
};
  
export default CheckoutForm;