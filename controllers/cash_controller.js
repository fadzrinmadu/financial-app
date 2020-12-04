const Cash = require('../models/Cash');
const { currencyFormatter } = require('../helpers/formatter.js');

const index = async (req, res) => {
  try {
    let cashIn = await Cash.find().where({ type: 'cash-in' });

    const data = {
      siteTitle: 'Kas Masuk',
      cashIn,
      totalCashIn: cashIn.reduce((total, item) => total + item.amount, 0),
      helpers: {
        currencyFormatter,
      },
    };

    console.log(data.totalCashIn)

    res.render('cash/cash_in_view', data);
  } catch(error) {
    console.log(error);
  }
};

const addCashIn = async (req, res) => {
  try {
    await Cash.addCashIn(req.body);
    res.redirect('/admin/cash-in');
  } catch(error) {
    console.log(error);
  }
};

const deleteCashIn = async (req, res) => {
  try {
    await Cash.deleteCashIn(req.params);
    res.redirect('/admin/cash-in');
  } catch (error) {
    console.log(error);
  }
};

const cashOut = (req, res) => {
  res.render('cash/cash_out_view');
};

module.exports = {
  index,
  addCashIn,
  deleteCashIn,
  cashOut,
};
