const cashSummary = (req, res) => {
  res.render('admin/index', {
    template: 'report_cash_summary',
    title: 'Report Cash Summary',
  });
};

module.exports = {
  cashSummary,
};
