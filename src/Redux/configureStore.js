import { createHashHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reduxMulti from 'redux-multi';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const history = createHashHistory();

const persistConfig = {
  key: 'f2p-root-key',
  storage, 
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

export default function configureStore(preloadedState) {
  const store = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools( 
      applyMiddleware(
        reduxThunk,
        reduxMulti, 
        reduxPromiseMiddleware, 
        routerMiddleware(history), 
      ),
    ),
  );

  const  persistor = persistStore(store);
  return { store, persistor };
}
