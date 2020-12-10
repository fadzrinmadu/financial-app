const User = require('../models/User.js');

const index = (req, res) => {
  try {
    
    if (req.session.user === null || req.session.user === undefined) {
      const data = {
        siteTitle: 'Login',
      };

      res.render('login/login_view', data);
    } else {
      res.redirect('/admin');
    }
  } catch(error) {
    console.log(error);
  }
};

const loginAction = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    req.session.user = {
      id: user._id,
      name: user.name,
      username: user.username,
    };

    res.redirect('/admin');
  } catch(error) {
    console.log(error);
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
