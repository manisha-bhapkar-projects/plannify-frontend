import * as React from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Redirect } from 'react-router-dom';
import LoginForm from '../Forms/loginForm';
import PropTypes from 'prop-types';
import config from '../../config';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  handleSubmit(values){
    return this.props.handleSignIn(values);
  }

  render() {
    console.log(this.props.authHandler);

    return !this.props.authHandler.isSignedIn ? <LoginForm onSubmit={this.handleSubmit} /> : <Redirect to='/'/>;
  }
}
    
const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSignIn: async (values) => {
    try {
      const conf = config();
      let token = await axios.post(conf.apiEndpoint + 'user/login', {password: values.password, email: values.email });
      return dispatch({type: 'saveToken', payload: {token: token.data.token, account: token.data.account} });
    } catch (err) {
      throw new SubmissionError({_error: err.response.data.message});
    }
  },
});
  
const mapStateToProps = (state) => ({
  authHandler: state.authHandler,
});

Login.propTypes = {
  authHandler: PropTypes.object,
  handleSignIn:  PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);  