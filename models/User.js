const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    requuired: true,
  },
  image: {
    type: String,
    default: 'user-default.jpg',
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw Error('username tidak ditemukan');
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw Error('password Anda salah');
  }

  return user;
};

userSchema.statics.changePassword = async function(id, password, rePassword) {
  if (password !== rePassword) {
    throw Error('comfirm password do not macth');
  } else {
    await User.findOneAndUpdate({ _id: id }, { password });
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
