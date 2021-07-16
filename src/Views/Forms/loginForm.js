import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../Components/formComponents';
import { email, password } from '../Components/formValidators';
import PropTypes from 'prop-types';

let SignIn = props => {
  const { handleSubmit, error } = props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        style={{
          marginTop: '20%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar style={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography style={{marginTop: 10, marginBottom: 10}} component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          style={{
            width: '100%', 
            mt: 1,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Field name="email" fullWidth={true} style={{marginTop: 10, marginBottom: 10 }} validate={email} component={renderTextField} required={true} type="email" label="Email Address" />
            <Field name="password" fullWidth={true} style={{marginTop: 10, marginBottom: 25}} validate={password} component={renderTextField} required={true} type="password" label="Password" />
            {/* <Field name="remember" component={renderCheckbox} label="Remember Me" /> */}
            <Button type="submit" fullWidth variant="contained" style={{ mt: 3, mb: 2 }}>
            Sign In
            </Button>
          </form>
          {error && <div style={{marginBottom: 10, marginTop: 10, color: 'red'}}><strong>{error}</strong></div>}

          <Grid container style={{marginTop: 10}}>
            <Grid item>
              <Link href="/#/signup" variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

SignIn = reduxForm({ form: 'singin' })(SignIn);

SignIn.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string
};

export default SignIn;
  