const User = require('../models/User.js');

const index = (req, res) => {
  try {
    const data = {
      siteTitle: 'Login',
    };

    res.render('login/login_view', data);
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

module.exports = {
  index,
  loginAction,
};
