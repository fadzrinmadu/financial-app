const User = require('../models/User.js');

const index = (req, res) => {
  try {
    if (req.session.user === null || req.session.user === undefined) {
      const alert = {
        message: req.flash('alertMessage'),
        status: req.flash('alertStatus'),
      };

      res.render('login/login_view', {
        siteTitle: 'Login',
        alert,
      });    
    } else {
      res.redirect('/admin');
    }
  } catch(error) {
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/');
  }
};

const loginAction = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.login(username, password);

    req.session.user = {
      id: user._id,
      name: user.name,
      username: user.username,
      image: user.image,
    };

    res.redirect('/admin');
  } catch(error) {
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/');
  }
};

const logoutAction = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

module.exports = {
  index,
  loginAction,
  logoutAction,
};
