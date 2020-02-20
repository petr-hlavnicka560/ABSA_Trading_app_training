async function loadData(currencies) {
  console.log('======== INSIDE loadData()');
  console.log('======== currencies: ' + currencies);
  console.log(currencies);
  const promises = currencies.map(currency => {
    return fetch(
      `https://sandbox.iexapis.com/stable/stock/${
        currency.symbol
      }/quote?token=Tpk_d6fe47c7f6f54c389c7ac9c0c60f5e2c`
    ).then(response => response.json());
  });

  console.log('===Promises:', promises);

  let responsesJson;
  try {
    responsesJson = await Promise.all(promises);
  } catch (e) {
    console.log('Error in loadData' + e);
  }

  console.log('===== responsesJson: ', responsesJson);
  const updatedCurrencies = currencies.map((val, idx) => {
    return {...val, rate: responsesJson[idx].latestPrice};
  });
  return updatedCurrencies;
}

export default loadData;
