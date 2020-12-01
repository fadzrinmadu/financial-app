const index = (req, res) => {
  res.render('cash/cash_in_view');
};

const cashOut = (req, res) => {
  res.render('cash/cash_out_view');
};

module.exports = {
  index,
  cashOut,
};
