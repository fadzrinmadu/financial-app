const index = (req, res) => {
  const data = {
    siteTitle: 'Login',
  };

  res.render('login/login_view', data);
};

module.exports = {
  index,
};
