const index = async (req, res) => {
  try {
    const data = {
      siteTitle: 'Profile',
    };

    res.render('profile/profile_view', data);
  } catch(error) {
    console.log(error);
  }
};

module.exports = {
  index,
};
