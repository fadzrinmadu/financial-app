const index = (req, res) => {
  res.render('admin/index', {
    template: 'cash_in',
    title: 'Cash In',
  });
};

const cashOut = (req, res) => {
  res.render('admin/index', {
    template: 'cash_out',
    title: 'Cash Out',
  });
};

module.exports = {
  index,
  cashOut,
};
