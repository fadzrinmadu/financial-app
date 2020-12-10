const Cash = require('../models/Cash.js');
const { currencyFormatter } = require('../helpers/formatter.js');
const { summaryCashReportPrintter } = require('../helpers/printter.js');

const cashSummary = async (req, res) => {
  const { period } = req.query;

  try {
    const today = new Date();
    let cashes = [];
    let date = {};
    let totalCashIn = null;
    let totalCashOut = null;
    let totalCashBeforePeriod = null;
    
    if (period === 'all') {
      cashes = await Cash.find().sort({ date: 'asc' });
      totalCashIn = await Cash.getTotalCashIn();
      totalCashOut = await Cash.getTotalCashOut();
    } else if (period === undefined) {
      date.month = today.getMonth() + 1;
      date.year = today.getFullYear();

      cashes = await Cash.getCashByPeriod(date.month, date.year);
      totalCashIn = await Cash.getTotalCashInByPeriod(date.month, date.year);
      totalCashOut = await Cash.getTotalCashOutByPeriod(date.month, date.year);
      totalCashBeforePeriod = await Cash.getTotalCashBeforePeriod(date.month, date.year);
    } else {
      date.month = period.trim().split('-')[1];
      date.year = period.trim().split('-')[0];

      cashes = await Cash.getCashByPeriod(date.month, date.year);
      totalCashIn = await Cash.getTotalCashInByPeriod(date.month, date.year);
      totalCashOut = await Cash.getTotalCashOutByPeriod(date.month, date.year);
      totalCashBeforePeriod = await Cash.getTotalCashBeforePeriod(date.month, date.year);
    }

    const data = {
      siteTitle: 'Rekapitulasi Kas',
      cashes,
      date,
      totalCashIn,
      totalCashOut,
      totalCashBeforePeriod,
      user: req.session.user,
      helpers: {
        currencyFormatter,
      },
    };

    res.render('summary/cash_summary_view', data);
  } catch (error) {
    console.log(error);
  }
};

const cashSummaryReport = async (req, res) => {
  const { period } = req.query;

  try {
    const today = new Date();
    let cashes = [];
    let date = {};
    let totalCashIn = null;
    let totalCashOut = null;
    let totalCashBeforePeriod = null;
    
    if (period === 'all') {
      cashes = await Cash.find().sort({ date: 'asc' });
      totalCashIn = await Cash.getTotalCashIn();
      totalCashOut = await Cash.getTotalCashOut();
    } else if (period === undefined) {
      date.month = today.getMonth() + 1;
      date.year = today.getFullYear();

      cashes = await Cash.getCashByPeriod(date.month, date.year);
      totalCashIn = await Cash.getTotalCashInByPeriod(date.month, date.year);
      totalCashOut = await Cash.getTotalCashOutByPeriod(date.month, date.year);
      totalCashBeforePeriod = await Cash.getTotalCashBeforePeriod(date.month, date.year);
    } else {
      date.month = period.trim().split('-')[1];
      date.year = period.trim().split('-')[0];

      cashes = await Cash.getCashByPeriod(date.month, date.year);
      totalCashIn = await Cash.getTotalCashInByPeriod(date.month, date.year);
      totalCashOut = await Cash.getTotalCashOutByPeriod(date.month, date.year);
      totalCashBeforePeriod = await Cash.getTotalCashBeforePeriod(date.month, date.year);
    }

    const data = {
      cashes,
      date,
      totalCashIn,
      totalCashOut,
      totalCashBeforePeriod,
      helpers: {
        currencyFormatter,
      },
    };

    res.pdfFromHTML({
      filename: 'laporan_rekapitulasi_kas.pdf',
      htmlContent: summaryCashReportPrintter(data),
      options: {
        orientation: 'landscape',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  cashSummary,
  cashSummaryReport,
};
