import loadData from './services/loadService';

export const ADD_CURRENCY = 'ADD_CURRENCY';
export const CHANGE_AMOUNT_HELD = 'CHANGE_AMOUNT_HELD';
export const TURN_ON_IS_LOADING = 'TURN_ON_IS_LOADING';
export const RATES_LOADED = 'CURRENCIES_LOAD';
export const CHANGE_STOCK_FORM_SCREEN_TITLE = 'CHANGE_STOCK_FORM_SCREEN_TITLE';

export function loadRates(currencies) {
  return async dispatch => {
    dispatch(turnOnIsLoading());
    let response;
    try {
      response = await loadData(currencies);
    } catch (e) {
      console.log('Error in loadData()' + e);
    }
    return dispatch({type: RATES_LOADED, payload: response});
  };
}

export function addCurrencyAndReloadRates(newCurrency) {
  return async (dispatch, getState) => {
    dispatch(addCurrency(newCurrency));
    const currencies = getState().appData.currencies;
    dispatch(loadRates(currencies));
  };
}

export function turnOnIsLoading() {
  return {type: TURN_ON_IS_LOADING};
}

export function changeStockFormScreenTitle(title) {
  return {type: CHANGE_STOCK_FORM_SCREEN_TITLE, payload: title};
}

export function addCurrency(currency) {
  return {type: ADD_CURRENCY, payload: currency};
}

export function changeAmountHeld(currency) {
  return {
    type: CHANGE_AMOUNT_HELD,
    payload: currency,
  };
}
