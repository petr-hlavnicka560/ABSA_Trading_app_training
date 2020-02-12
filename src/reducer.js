import {combineReducers} from 'redux';
import {ADD_CURRENCY} from './actions';

const initialCurrencies = {
  currencies: [{symbol: 'BTC', amount: 10}, {symbol: 'ETH', amount: 5}],
};

function appData(state = initialCurrencies, action) {
  switch (action.type) {
    case ADD_CURRENCY: {
      return {currencies: [...state.currencies, action.payload]};
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  appData,
});

export default rootReducer;
