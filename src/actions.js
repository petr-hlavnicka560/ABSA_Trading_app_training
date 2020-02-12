export const ADD_CURRENCY = 'ADD_CURRENCY';

export function addCurrency(currency) {
  return {type: ADD_CURRENCY, payload: currency};
}
