import * as React from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';
import Buy from '../Forms/buy';

class BuyToken extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values){
    return this.props.handlePurchase(values, this.props.authHandler);
  }

  render() {
    return <Buy authHandler={this.props.authHandler} onSubmit={this.handleSubmit}/>;
  }
}
    
const mapDispatchToProps = (dispatch, props) => ({
  handlePurchase: async (values, authHandler) => {
    try {
      const conf = config();
      let res = await axios.post(conf.apiEndpoint + 'exchange/buyToken', {amount: values.amount, paymentMethodId: values.card}, { headers: { accessToken: authHandler.token } });
      dispatch({type: 'saveToken', payload: {token: res.data.refreshToken.token, account: authHandler.account} });
      return dispatch(replace('/managePaymentMethods'));
    } catch (err) {
      if(err.response.data.message.code == 'INVALID_TOKEN_FROM_API' || err.response.data.message.code == 'INVALID_TOKEN_DB'){
        return dispatch({type: 'logout'});
      } else {
        console.log(err.response.data.message);
        throw new SubmissionError({_error: err.response.data.message});
      }
    }
  },
});
  
const mapStateToProps = (state) => ({
  authHandler: state.authHandler
});

BuyToken.propTypes = {
  authHandler: PropTypes.object,
  handlePurchase:  PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(BuyToken);  