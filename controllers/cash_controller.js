const Cash = require('../models/Cash');
const { currencyFormatter } = require('../helpers/formatter.js');

const index = async (req, res) => {
  try {
    let cashIn = await Cash.find().where({ type: 'cash-in' }).sort({ date: 'desc' });

    const alert = {
      status: req.flash('alertStatus'),
      message: req.flash('alertMessage'),
    };

    const data = {
      siteTitle: 'Kas Masuk',
      cashIn,
      totalCashIn: cashIn.reduce((total, item) => total + item.amount, 0),
      alert,
      helpers: {
        currencyFormatter,
      },
    };

    res.render('cash/cash_in_view', data);
  } catch(error) {
    console.log(error);
  }
};

const addCashIn = async (req, res) => {
  try {
    await Cash.addCashIn(req.body);

    req.flash('alertStatus', 'success');
    req.flash('alertMessage', 'Berhasil menambahkan data kas masuk');
    res.redirect('/admin/cash-in');
  } catch(error) {  
    console.log(error);
  }
};

const editCashIn = async (req, res) => {
  try {
    await Cash.editCashIn(req.body);

    req.flash('alertStatus', 'success');
    req.flash('alertMessage', 'Berhasil mengubah data kas masuk');
    res.redirect('/admin/cash-in');
  } catch (error) {
    console.log(error);
  }
};

const deleteCashIn = async (req, res) => {
  try {
    await Cash.deleteCashIn(req.params);

    req.flash('alertStatus', 'success');
    req.flash('alertMessage', 'Berhasil menghapus data kas masuk');
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
  editCashIn,
  deleteCashIn,
  cashOut,
};
