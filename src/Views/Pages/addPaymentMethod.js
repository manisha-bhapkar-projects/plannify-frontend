import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../Forms/checkoutForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {replace} from 'connected-react-router';
import config from '../../config';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const conf = config();
const stripePromise = loadStripe(conf.stripePrivateKey);

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

class AddPaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values){
    this.props.handleAdd(values, this.props.authHandler);
  }

  render() {
    return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          style={{
            marginTop: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            style={{
              width: '100%', 
              mt: 1,
            }}
          >

            <div>
              <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                <CheckoutForm handleAdd={this.handleSubmit}/>
              </Elements>
            </div>
          </Box>
        </Box>
      </Container>

    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleAdd: async (id, authHandler) => {
    try {
      const conf = config();
      let res = await axios.post(conf.apiEndpoint + 'user/manageCards', {add: true, paymentMethodId: id }, { headers: { accessToken: authHandler.token } });
      dispatch({type: 'saveToken', payload: {token: res.data.refreshToken.token, account: res.data.body} });
      return dispatch(replace('/managePaymentMethods'));
    } catch (err) {
      if(err.response.data.message.code == 'INVALID_TOKEN_FROM_API' || err.response.data.message.code == 'INVALID_TOKEN_DB'){
        return dispatch({type: 'logout'});
      } else {
        console.log(err.response.data.message);
      }
    }

  },
});
  
const mapStateToProps = (state) => ({
  authHandler: state.authHandler,
});

AddPaymentMethod.propTypes = {
  authHandler: PropTypes.object,
  handleAdd:  PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentMethod);  