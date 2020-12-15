const fs = require('fs-extra');
const path = require('path');
const User = require('../models/User.js');

const index = async (req, res) => {
  try {
    const currentUser = req.session.user;
    const userProfile = await User.findOne({ _id: currentUser.id });

    const alert = {
      message: req.flash('alertMessage'),
      status: req.flash('alertStatus'),
    };

    const data = {
      siteTitle: 'Profile',
      user: currentUser,
      userProfile,
      alert,
    };

    res.render('profile/profile_view', data);
  } catch(error) {
    console.log(error);

    req.redirect('/admin/profile');
  }
};

const editProfile = async (req, res) => {
  const { id, name, username, password, rePassword, image } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (req.file !== undefined) {
      if (fs.existsSync(path.join(`public/img/${user.image}`)) && user.image !== 'user-default.jpg') {
        await fs.unlink(path.join(`public/img/${user.image}`));
      }

      user.image = req.file.filename;
      req.session.user.image = req.file.filename;
    }

    if (password !== '') {
      await User.changePassword(id, password, rePassword);
    }

    user.name = name;
    user.username = username;
    await user.save();

    req.session.user.name = name;
    req.session.user.username = username;

    req.flash('alertMessage', 'Berhasil merubah data profile');
    req.flash('alertStatus', 'success');

    res.redirect('/admin/profile');
  } catch (error) {
    console.log(error);

    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/profile');
  }
};

module.exports = {
  index,
  editProfile,
};
