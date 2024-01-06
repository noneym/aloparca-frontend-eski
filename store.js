import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import reducer from './reducers';

const persistConfig = {
  key: 'aloparca',
  storage,
  blacklist: ['pratikBakim', 'garage']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const initializeStore = () => createStore(
  persistedReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk)),
);
