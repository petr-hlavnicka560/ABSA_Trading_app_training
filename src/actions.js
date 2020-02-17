export const ADD_CURRENCY = 'ADD_CURRENCY';
export const CHANGE_AMOUNT_HELD = 'CHANGE_AMOUNT_HELD';
export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
export const CURRENCIES_LOAD = 'CURRENCIES_LOAD';

export function addCurrency(currency) {
  return {type: ADD_CURRENCY, payload: currency};
}

export function loadCurrencies(currencies) {
  return {type: CURRENCIES_LOAD, payload: currencies};
}

export function toggleIsLoading(toggle) {
  return {type: TOGGLE_IS_LOADING, payload: toggle};
}

export function changeAmountHeld(currency) {
  return {
    type: CHANGE_AMOUNT_HELD,
    payload: currency,
  };
}
