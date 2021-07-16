import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './Redux/configureStore';
import LoggedIn from './Views/Layouts/loggedIn';
import Users from './Views/Pages/users';
import Login from './Views/Pages/login';
import SignUp from './Views/Pages/signup';
import { PersistGate } from 'redux-persist/integration/react';
import Profile from './Views/Pages/profile';
import AddPaymentMethod from './Views/Pages/addPaymentMethod';
import ManagePaymentMethods from './Views/Pages/managePaymentMethods';
import BuyToken from './Views/Pages/buyToken';

const {store, persistor} = configureStore(/* provide initial state if any */);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <>
            <Switch>
              <Route exact path="/buyToken" render={() => (<LoggedIn title="Buy F2P Token" ><BuyToken/></LoggedIn>)} />
              <Route exact path="/managePaymentMethods" render={() => (<LoggedIn title="Manage Payment Methods" ><ManagePaymentMethods/></LoggedIn>)} />
              <Route exact path="/addPaymentMethod" render={() => (<LoggedIn title="Add Payment Method" ><AddPaymentMethod/></LoggedIn>)} />
              <Route exact path="/" render={() => (<LoggedIn title="Dashboard" ><Users/></LoggedIn>)} />
              <Route exact path="/users" render={() => (<LoggedIn title="Users" ><Users/></LoggedIn>)} />
              <Route exact path="/login" render={() => (<Login title="Login" />)} />
              <Route exact path="/signup" render={() => (<SignUp title="Sign Up" />)} />
              <Route exact path="/profile" render={() => (<LoggedIn title="Profile" ><Profile /></LoggedIn>)} />
            </Switch>
          </>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}


export default App;
