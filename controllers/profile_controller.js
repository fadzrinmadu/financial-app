const User = require('../models/User.js');

const index = async (req, res) => {
  try {
    const currentUser = req.session.user;
    const userProfile = await User.findOne({ _id: currentUser.id });

    const data = {
      siteTitle: 'Profile',
      user: currentUser,
      userProfile,
    };

    res.render('profile/profile_view', data);
  } catch(error) {
    console.log(error);
  }
};

const editProfile = async (req, res) => {
  const { id, name, username, password, rePassword, image } = req.body;

  try {
    const user = await User.findOneAndUpdate({ _id: id }, { name, username });

    if (password !== '') {
      await User.changePassword(id, password, rePassword);
    }

    req.session.user.name = name;
    req.session.user.username = username;

    res.redirect('/admin/profile');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  index,
  editProfile,
};
