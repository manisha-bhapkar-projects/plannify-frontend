const axios = require('axios');
const config = require('../../config');

const initialState = {
  isSignedIn: false,
  token: '',
  account: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'saveToken':
    return {isSignedIn: true, token: action.payload.token, account: action.payload.account};

  case 'logout':
    return initialState;

  default:
    return state;
  }
};

export default reducer;