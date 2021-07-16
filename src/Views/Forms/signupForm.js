import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../Components/formComponents';
import { email, password, required, pwdMatch } from '../Components/formValidators';
import PropTypes from 'prop-types';

let SignUp = props => {
  const { handleSubmit, error } = props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        style={{
          marginTop: '10%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar style={{ m: 1, bgcolor: 'secondary.main' }}>
          <DashboardIcon />
        </Avatar>

        <Typography style={{marginTop: 10, marginBottom: 10}} component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          style={{
            width: '100%', 
            mt: 1,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Field name="firstName" fullWidth={true} style={{marginTop: 10, marginBottom: 10 }} component={renderTextField} type="text" label="First Name" />
            <Field name="lastName" fullWidth={true} style={{marginTop: 10, marginBottom: 10 }} component={renderTextField} type="text" label="Last Name" />
            <Field name="orgName" fullWidth={true} style={{marginTop: 10, marginBottom: 10 }} component={renderTextField} type="text" label="Organization Name" />
            <Field name="email" fullWidth={true} style={{marginTop: 10, marginBottom: 10 }} validate={email} component={renderTextField} required={true} type="email" label="Email Address" />
            <Field name="password" fullWidth={true} style={{marginTop: 10, marginBottom: 10}} validate={password} component={renderTextField} required={true} type="password" label="Password" />
            <Field name="confirmPassword" fullWidth={true} style={{marginTop: 10, marginBottom: 25}} validate={pwdMatch} component={renderTextField} required={true} type="password" label="Confirm Password" />
            <Button type="submit" fullWidth variant="contained" style={{ mt: 3, mb: 2 }}>
            Sign Up
            </Button>
          </form>
          {error && <div style={{marginBottom: 10, marginTop: 10, color: 'red'}}><strong>{error}</strong></div>}

          <Grid container style={{marginTop: 10}}>
            <Grid item>
              <Link href="/#/login" variant="body2">
                {'Have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

SignUp = reduxForm({ form: 'singup' })(SignUp);

SignUp.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string
};

export default SignUp;