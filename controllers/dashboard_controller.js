const index = (req, res) => {
  const data = {
    siteTitle: 'Dashboard',
  };

  res.render('dashboard/dashboard_view', data);
};

module.exports = {
  index,
};
