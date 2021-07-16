import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactCodeInput from 'react-verification-code-input';
import MuiPhoneNumber from 'material-ui-phone-number';
import countryList from 'country-list';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const cList = countryList.getNames();

const getCardLogo = (type) => {
  if(type == 'visa'){
    return('/images/visa.png');
  }
  if(type == 'mastercard'){
    return('/images/mastercard.png');
  }
  if(type == 'jcb'){
    return('/images/jcb.png');
  }
  if(type == 'unionpay'){
    return('/images/unionpay.png');
  }
  if(type == 'discover'){
    return('/images/discover.png');
  }
  if(type == 'diners_club'){
    return('/images/diners_club.png');
  }
  if(type == 'cartes_bancaires'){
    return('/images/cartes_bancaires.png');
  }
  if(type == 'amex'){
    return('/images/amex.png');
  }
};

const renderCountrySelector = ({
  label,
  input,
  ...custom
}) => (
  <Select
    labelId="country"
    id="country"
    {...input}
    {...custom}
  >
    {cList.map(x => {
      return <MenuItem key={x} value={x}>{x}</MenuItem>;
    })}
  </Select>
);

const renderCardSelector = ({
  data,
  label,
  input,
  ...custom
}) => (
  <>
    <FormControl fullWidth>
      <InputLabel style={{marginLeft: 10, marginTop: 5}} id="paymentMethodLabel">Payment Method*</InputLabel>
      <Select
        labelId="cards"
        id="cards"
        label="Payment Method"
        {...input}
        {...custom}
      >
        {data.map(x => {
          return <MenuItem key={x._id} value={x._id}>
            <p> <img style={{height: 20, float: 'left', paddingRight: 5}} src={getCardLogo(x.cardType)}/>Ending with: {x.last4Digits}</p>
          </MenuItem>;
        })}
      </Select>
    </FormControl>

  </>
);

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderPhoneField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <MuiPhoneNumber
    label={label}
    data-cy="user-phone"
    defaultCountry={'us'}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCodeInput= ({
  input,
  ...custom
}) => (
  <div style={{margin: 25}}>
    <ReactCodeInput type='text' fields={6} {...input} {...custom}/>
  </div>
);

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
);
  
export { renderTextField, renderCardSelector, renderCheckbox, renderCodeInput, renderPhoneField, renderCountrySelector };