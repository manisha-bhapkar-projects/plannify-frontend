import * as React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Field, reduxForm } from 'redux-form';
import { renderTextField, renderCardSelector } from '../Components/formComponents';
import { required } from '../Components/formValidators';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';

let Buy = props => {
  const { handleSubmit, error } = props;
  console.log(props);
  return (
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
          <form onSubmit={handleSubmit}>
            <Field name="amount" variant="outlined" InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}} fullWidth={true} required={true} style={{marginTop: 10, marginBottom: 10 }} validate={required} component={renderTextField} type="number" label="Amount" />
            <Field name="card" variant="outlined" fullWidth={true} required={true} style={{marginTop: 10, marginBottom: 10 }} validate={required} component={renderCardSelector} label="Choose a payment method" data={props.authHandler.account.cardsOnFile} />

            {error && <div style={{marginBottom: 10, marginTop: 10, color: 'red'}}><strong>{error}</strong></div>}

            <Button type="submit" fullWidth variant="contained" style={{ marginTop: 20, mt: 3, mb: 2 }}>
            Buy Now
            </Button>

            <Link style={{textDecoration: 'none'}} to="/managePaymentMethods">
              <Button type="submit" fullWidth variant="contained" style={{ marginTop: 20, mt: 3, mb: 2 }}>
                Manage Payment Methods
              </Button>
            </Link>

          </form>
        </Box>
      </Box>
    </Container>
  );
};

Buy = reduxForm({ form: 'buy', enableReinitialize: true })(Buy);

Buy.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
  authHandler: PropTypes.object
};

export default Buy;
