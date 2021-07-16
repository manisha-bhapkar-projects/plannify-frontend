import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import authHandler from './authHandler';
const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  authHandler: authHandler
});

export default rootReducer;
