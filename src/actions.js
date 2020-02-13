export const ADD_CURRENCY = 'ADD_CURRENCY';
export const CHANGE_AMOUNT_HELD_START = 'CHANGE_AMOUNT_HELD_START';
export const CHANGE_AMOUNT_HELD_FINISH = 'CHANGE_AMOUNT_HELD_FINISH';

export function addCurrency(currency) {
  return {type: ADD_CURRENCY, payload: currency};
}

export function changeAmountHeldStart(symbol) {
  return {type: CHANGE_AMOUNT_HELD_START, payload: symbol};
}

export function changeAmountHeldFinish(currency) {
  return {
    type: CHANGE_AMOUNT_HELD_FINISH,
    payload: currency,
  };
}
