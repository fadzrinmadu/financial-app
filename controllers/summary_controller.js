const cashSummary = (req, res) => {
  try {
    const data = {
      siteTitle: 'Cash Summary',
    };

    res.render('summary/cash_summary_view', data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  cashSummary,
};
