import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {replace} from 'connected-react-router';
import config from '../../config';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

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
  
class ManagePaymentMethods extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.authHandler.account);
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
              <Typography variant='h5' style={{marginBottom: 10}}>
              My Payment Cards
              </Typography>
              {this.props.authHandler && this.props.authHandler.account && this.props.authHandler.account.cardsOnFile && this.props.authHandler.account.cardsOnFile.length !== 0 ? this.props.authHandler.account.cardsOnFile.map(x => {
                return(
                  <div key={x._id}>
                    <div>
                      <img style={{height: 35, marginTop: 5, float: 'left'}} src={getCardLogo(x.cardType)}/>
                      <p style={{float: 'left', marginLeft: 10, height: 30}}>{'Ending with:' + x.last4Digits}</p>
                      <Button style={{height: 25, marginLeft: 15, marginTop: 10}} variant="contained" onClick={ () => this.props.handleRemove(x._id, this.props.authHandler)}>Remove</Button>
                    </div>
                    <div style={{clear: 'both'}}></div>
                  </div>
                );
              }) : <p>You do not have any payment method on file.</p>} 
              <Link style={{textDecoration: 'none'}} to="/addPaymentMethod">
                <Button type="submit" fullWidth variant="contained" style={{ marginTop: 20, mt: 3, mb: 2 }}>
            Add New Card
                </Button>
              </Link>

            </div>
          </Box>
        </Box>
      </Container>

    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleRemove: async (id, authHandler) => {
    try {
      const conf = config();
      let res = await axios.post(conf.apiEndpoint + 'user/manageCards', {remove: id}, { headers: { accessToken: authHandler.token } });
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

ManagePaymentMethods.propTypes = {
  authHandler: PropTypes.object,
  handleRemove:  PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePaymentMethods);  