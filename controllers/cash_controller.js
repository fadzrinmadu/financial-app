const index = (req, res) => {
  res.render('admin/index', {
    template: 'cash_in',
    title: 'Cash In',
  });
};

module.exports = {
  index,
};
