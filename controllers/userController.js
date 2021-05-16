const User = require('../models/User');
const sha256 = require('js-sha256');
const jwt = require('jwt-then');
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // const emailRegex = /@gmail.com|@yahoo.com//regex if only some particular email req
    // if (!emailRegex.test(email)) throw 'Enter correct email address.';

    const userExists = await User.findOne({
      email,
    });
    if (userExists) throw new Error('User with same email already exists');

    if (name === '') throw new Error('Enter your name');
    if (email === '') throw new Error('Enter your email');
    if (password === '') throw new Error('Enter a password');

    if (password !== undefined && password.length < 6)
      throw new Error('Enter a password of length equal to or greater than 6');

    const user = new User({
      name,
      email,
      password: sha256(password + process.env.SALT),
    });
    await user.save();
    res.json({
      message: `User ${name} registered successfully`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      password: sha256(password + process.env.SALT),
    });

    if (!user) throw new Error('Invalid Credentials');
    const token = await jwt.sign({ id: user.id }, process.env.SECRET);

    res.json({
      message: `User ${user.name} logged in`,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};
