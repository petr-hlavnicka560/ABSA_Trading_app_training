// @flow
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducer';

// const currencies = {
//   currencies: [{symbol: 'BTC', amount: 10}, {symbol: 'ETH', amount: 5}],
// };

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
}
