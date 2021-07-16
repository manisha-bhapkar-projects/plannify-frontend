import * as React from "react";
import { connect } from "react-redux";
import { SubmissionError } from "redux-form";
import ProfileForm from "../Forms/profileForm";
import PropTypes from "prop-types";
import config from "../../config";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    return this.props.handleSubmit(values, this.props.authHandler);
  }

  render() {
    console.log(this.props.authHandler);

    return (
      <ProfileForm
        initialValues={this.props.initialValues}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: async (values, authHandler) => {
    try {
      const conf = config();
      console.log({
        password: values.password,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        orgName: values.orgName,
        phoneMobile: values.phoneMobile,
        phoneLandline: values.phoneLandline,
        city: values.city,
        state: values.state,
        address: values.address,
        address2: values.address2,
        zipCode: values.zipCode,
        country: values.country,
      });

      let profile = await axios.post(
        conf.apiEndpoint + "user/updateProfile",
        {
          password: values.password,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          orgName: values.orgName,
          phoneMobile: values.phoneMobile,
          phoneLandline: values.phoneLandline,
          city: values.city,
          state: values.state,
          address: values.address,
          address2: values.address2,
          zipCode: values.zipCode,
          country: values.country,
        },
        { headers: { accessToken: authHandler.token } }
      );
      console.log({ profile });
      return dispatch({
        type: "saveToken",
        payload: {
          token: profile.data.refreshToken.token,
          account: profile.data.body,
        },
      });
    } catch (err) {
      if (
        err.response.data.message.code == "INVALID_TOKEN_FROM_API" ||
        err.response.data.message.code == "INVALID_TOKEN_DB"
      ) {
        return dispatch({ type: "logout" });
      } else {
        throw new SubmissionError({ _error: err.response.data.message });
      }
    }
  },
});

const mapStateToProps = (state) => ({
  initialValues: state.authHandler.account,
  authHandler: state.authHandler,
});

Profile.propTypes = {
  authHandler: PropTypes.object,
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
