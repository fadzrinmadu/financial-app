const cashSummary = (req, res) => {
  const data = {
    siteTitle: 'Cash Summary',
  };

  res.render('summary/cash_summary_view', data);
};

module.exports = {
  cashSummary,
};
