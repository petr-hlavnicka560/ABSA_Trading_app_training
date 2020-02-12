import {combineReducers} from 'redux';
import {ADD_CURRENCY} from './actions';

// const currencies = [{symbol: 'BTC', amount: 10}, {symbol: 'ETH', amount: 5}];

const currencies = {
  currencies: [{symbol: 'BTC', amount: 10}, {symbol: 'ETH', amount: 5}],
};

// function setInitialState(state, action) {
//   console.log('=====INSIDE setInitialState reducer');
//   if (typeof state === 'undefined') {
//     console.log('=====INSIDE setInitialState reducer - returning initial state');
//     return currencies;
//   }
//   return state;
// }

function appData(state = currencies, action) {
  switch (action.type) {
    case ADD_CURRENCY: {
      return {currencies: [...state.currencies, action.payload]};
    }
    default:
      console.log('=====INSIDE add reducer - returning initial state');
      return state;
  }
}

const rootReducer = combineReducers({
  // setInitialState,
  appData,
});

export default rootReducer;
