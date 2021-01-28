const currencyFormatter = (number) => {
  const formatter = new Intl.NumberFormat('id-Id', {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
  });

  return formatter.format(number);
};

module.exports = {
  currencyFormatter,
};
