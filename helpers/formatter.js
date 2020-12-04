const currencyFormatter = (number) => {
  const formatter = new Intl.NumberFormat('id-Id', {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: 'narrowSymbol'
  });

  return formatter.format(number);
};

module.exports = {
  currencyFormatter,
};
