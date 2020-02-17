import {combineReducers} from 'redux';
import {
  ADD_CURRENCY,
  CHANGE_AMOUNT_HELD,
  CURRENCIES_LOAD,
  TOGGLE_IS_LOADING,
} from './actions';

const initialState = {
  currencies: [{symbol: 'IBM', amount: 10}, {symbol: 'XOM', amount: 5}],
  isLoading: true,
};

function appData(state = initialState, action) {
  switch (action.type) {
    case ADD_CURRENCY: {
      return {...state, currencies: [...state.currencies, action.payload]};
    }
    case TOGGLE_IS_LOADING: {
      return {...state, isLoading: action.payload};
    }
    case CURRENCIES_LOAD: {
      return action.payload;
    }
    case CHANGE_AMOUNT_HELD: {
      return {
        ...state,
        currencies: state.currencies.map(currency =>
          currency.symbol === action.payload.symbol
            ? {
                symbol: currency.symbol,
                rate: currency.rate,
                amount: action.payload.amount,
              }
            : currency
        ),
      };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  appData,
});

export default rootReducer;
