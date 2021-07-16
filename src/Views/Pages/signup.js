import * as React from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import Page1 from '../Forms/signupForm';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      redirect: false
    };
  }

  handleSubmit(values){
    return this.props.handleSignUp(values);
  }

  render() {
    return this.props.authHandler && this.props.authHandler.isSignedIn ? <Redirect to='/'/> : <Page1 onSubmit={this.handleSubmit}/>;
  }
}
    
const mapDispatchToProps = (dispatch, props) => ({
  handleSignUp: async (values) => {
    try {
      const conf = config();
      await axios.post(conf.apiEndpoint + 'user/create', {firstName: values.firstName, lastName: values.lastName, password: values.password, orgName: values.orgName, email: values.email });
      let token = await axios.post(conf.apiEndpoint + 'user/login', {password: values.password, email: values.email });
      return dispatch({type: 'saveToken', payload: {token: token.data.token, account: token.data.account} });
    } catch (err) {
      throw new SubmissionError({_error: err.response.data.error});
    }
  },
});
  
const mapStateToProps = (state) => ({
  authHandler: state.authHandler
});

SignUp.propTypes = {
  authHandler: PropTypes.object,
  handleSignUp:  PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);  