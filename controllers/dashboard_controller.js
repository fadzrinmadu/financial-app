const index = (req, res) => {
  res.render('admin/index', {
    template: 'dashboard',
    title: 'Dashboard',
  });
};

module.exports = {
  index,
};
