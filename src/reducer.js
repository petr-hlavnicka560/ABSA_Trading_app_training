import {combineReducers} from 'redux';
import {
  ADD_CURRENCY,
  CHANGE_AMOUNT_HELD_FINISH,
  CHANGE_AMOUNT_HELD_START,
} from './actions';

const initialState = {
  currencies: [{symbol: 'IBM', amount: 10}, {symbol: 'XOM', amount: 5}],
};

function appData(state = initialState, action) {
  switch (action.type) {
    case ADD_CURRENCY: {
      return {...state, currencies: [...state.currencies, action.payload]};
    }
    case CHANGE_AMOUNT_HELD_START: {
      return {...state, stockSymbolInChange: action.payload};
    }
    case CHANGE_AMOUNT_HELD_FINISH: {
      return {
        ...state,
        currencies: state.currencies.map(currency =>
          currency.symbol === action.payload.symbol
            ? {symbol: currency.symbol, amount: action.payload.amount}
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
