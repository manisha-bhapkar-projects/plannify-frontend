import * as React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Field, reduxForm } from "redux-form";
import {
  renderTextField,
  renderPhoneField,
  renderCountrySelector,
} from "../Components/formComponents";
import { email, password } from "../Components/formValidators";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
let Profile = (props) => {
  const { handleSubmit, error } = props;
  console.log(props);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        style={{
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            width: "100%",
            mt: 1,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              variant="outlined"
              fullWidth={true}
              disabled={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              validate={email}
              component={renderTextField}
              type="email"
              label="Email Address"
            />
            <Field
              name="password"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              validate={password}
              component={renderTextField}
              type="password"
              label="Password"
            />
            <Field
              name="firstName"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderTextField}
              type="text"
              label="First Name"
            />
            <Field
              name="lastName"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderTextField}
              type="text"
              label="Last Name"
            />
            <Field
              name="orgName"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderTextField}
              type="text"
              label="Organization Name"
            />
            <Field
              name="phoneMobile"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderPhoneField}
              label="Phone Mobile"
            />
            <Field
              name="phoneLandline"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderPhoneField}
              label="Phone Landline"
            />
            <Field
              name="address"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderTextField}
              type="text"
              label="Address"
            />
            <Field
              name="address2"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderTextField}
              type="text"
              label="Address 2"
            />
            <Field
              name="city"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderTextField}
              type="text"
              label="City"
            />
            <Field
              name="state"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderTextField}
              type="text"
              label="State"
            />
            <Field
              name="zipCode"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderTextField}
              type="text"
              label="Zip Code"
            />
            <Field
              name="country"
              variant="outlined"
              fullWidth={true}
              style={{ marginTop: 10, marginBottom: 10 }}
              component={renderCountrySelector}
              label="Country"
            />

            {error && (
              <div style={{ marginBottom: 10, marginTop: 10, color: "red" }}>
                <strong>{error}</strong>
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: 20, mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
            <Link style={{ textDecoration: "none" }} to="/managePaymentMethods">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ marginTop: 20, mt: 3, mb: 2 }}
              >
                Manage Payment Methods
              </Button>
            </Link>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

Profile = reduxForm({ form: "profile", enableReinitialize: true })(Profile);

Profile.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
};

export default Profile;
