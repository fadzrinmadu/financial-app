const Cash = require('../models/Cash.js');
const { currencyFormatter } = require('../helpers/formatter.js');

const index = async (req, res) => {
  const data = {
    siteTitle: 'Dashboard',
    totalCashIn: await Cash.getTotalCashIn(),
    totalCashOut: await Cash.getTotalCashOut(),
    totalCash: await Cash.getTotalCash(),
    helpers: {
      currencyFormatter,
    },
  };

  res.render('dashboard/dashboard_view', data);
};

module.exports = {
  index,
};
