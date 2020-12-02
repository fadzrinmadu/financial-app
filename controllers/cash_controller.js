const Cash = require('../models/Cash');

const index = (req, res) => {
  res.render('cash/cash_in_view');
};

const addCashIn = async (req, res) => {
  try {
    await Cash.addCashIn(req.body);
    res.redirect('/admin/cash-in');
  } catch(error) {
    console.log(error);
  }
};

const cashOut = (req, res) => {
  res.render('cash/cash_out_view');
};

module.exports = {
  index,
  addCashIn,
  cashOut,
};
