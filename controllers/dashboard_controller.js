const Cash = require('../models/Cash.js');
const { currencyFormatter } = require('../helpers/formatter.js');

const index = async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const totalCashInThisMonth = await Cash.getTotalCashInByPeriod(month, year);
    const totalCashOutThisMonth = await Cash.getTotalCashOutByPeriod(month, year);

    const totalCashInEveryMonthByYear = await Cash.getTotalCashInEveryMonthByYear(year);
    const totalCashOutEveryMonthByYear = await Cash.getTotalCashOutEveryMonthByYear(year);

    const cashIn = await Cash.find()
      .where({ type: 'cash-in' })
      .sort({ amount: 'desc' })
      .limit(5);

    const cashOut = await Cash.find()
      .where({ type: 'cash-out' })
      .sort({ amount: 'desc' })
      .limit(5);

    res.render('dashboard/dashboard_view', {
      siteTitle: 'Dashboard',
      totalCashIn: await Cash.getTotalCashIn(),
      totalCashOut: await Cash.getTotalCashOut(),
      totalCash: await Cash.getTotalCash(),
      totalCashInThisMonth,
      totalCashOutThisMonth,
      totalCashInEveryMonthByYear,
      totalCashOutEveryMonthByYear,
      year,
      cashIn,
      cashOut,
      user: req.session.user,
      helpers: {
        currencyFormatter,
      },
    });
  } catch(error) {
    console.log(error);
    res.redirect('/admin');
  }
};

module.exports = {
  index,
};
