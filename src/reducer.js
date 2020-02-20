import {combineReducers} from 'redux';
import {
  ADD_CURRENCY,
  CHANGE_AMOUNT_HELD,
  CHANGE_STOCK_FORM_SCREEN_TITLE,
  RATES_LOADED,
  TURN_ON_IS_LOADING,
} from './actions';

const initialState = {
  currencies: [{symbol: 'IBM', amount: 10}, {symbol: 'XOM', amount: 5}],
};

function appData(state = initialState, action) {
  switch (action.type) {
    case ADD_CURRENCY: {
      return {...state, currencies: [...state.currencies, action.payload]};
    }
    case CHANGE_STOCK_FORM_SCREEN_TITLE: {
      return {...state, stockFormScreenTitle: action.payload};
    }
    case TURN_ON_IS_LOADING: {
      return {...state, isLoading: true};
    }
    case RATES_LOADED: {
      return {currencies: action.payload, isLoading: false};
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
