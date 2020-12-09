const Cash = require('../models/Cash.js');
const { currencyFormatter } = require('../helpers/formatter.js');

const index = async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const totalCashInThisMonth = await Cash.getTotalCashInByPeriod(month, year);
    const totalCashOutThisMonth = await Cash.getTotalCashOutByPeriod(month, year);

    const cashIn = await Cash.find()
      .where({ type: 'cash-in' })
      .sort({ amount: 'desc' })
      .limit(5);

    const cashOut = await Cash.find()
      .where({ type: 'cash-out' })
      .sort({ amount: 'desc' })
      .limit(5);

    const data = {
      siteTitle: 'Dashboard',
      totalCashIn: await Cash.getTotalCashIn(),
      totalCashOut: await Cash.getTotalCashOut(),
      totalCash: await Cash.getTotalCash(),
      totalCashInThisMonth,
      totalCashOutThisMonth,
      year,
      cashIn,
      cashOut,
      helpers: {
        currencyFormatter,
      },
    };

    res.render('dashboard/dashboard_view', data);
  } catch(error) {
    console.log(error);
  }
};

module.exports = {
  index,
};
