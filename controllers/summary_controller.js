const Cash = require('../models/Cash.js');
const { currencyFormatter } = require('../helpers/formatter.js');

const cashSummary = async (req, res) => {
  try {
    const cashes = await Cash.find().sort({ date: 'asc' });

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
