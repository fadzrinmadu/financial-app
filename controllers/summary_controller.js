const Cash = require('../models/Cash.js');
const { currencyFormatter } = require('../helpers/formatter.js');

const cashSummary = async (req, res) => {
  try {
    const cashes = await Cash.getCashByMonthAndYear(12, 2020);

    const data = {
      siteTitle: 'Rekapitulasi Kas',
      cashes,
      helpers: {
        currencyFormatter,
      },
    };

    res.render('summary/cash_summary_view', data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  cashSummary,
};
