const jwt = require('jwt-then');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Unauthorized');
    const token = req.headers.authorization.split(' ')[1];
    const payload = await jwt.verify(token, process.env.SECRET);
    // console.log('Auth requested');
    req.payload = payload;
    next();
  } catch (err) {
    // console.log('Auth Err');
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
