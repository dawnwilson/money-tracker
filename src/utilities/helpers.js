export function formatCurrency(amount) {
  return `$ ${(amount / 100).toFixed(2)}`;
}

export function convertCurrencyToInteger(currency) {
  let dollars
  let cents
  const periodIndex = currency.indexOf('.')

  if (periodIndex === -1) {
    dollars = currency
    cents = '00'
  } else {
    dollars = currency.slice(0, periodIndex)
    cents = currency.slice(periodIndex + 1, periodIndex + 3)
    if (cents.length < 2) {
      cents = `${cents}0`
    }
  }

  return +`${dollars}${cents}`
}