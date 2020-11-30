const index = (req, res) => {
  res.render('login', {
    title: 'Login Page',
  });
};

module.exports = {
  index,
};
