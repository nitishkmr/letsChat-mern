const notFound = (req, res, next) => {
  // this middleware will catch any wrong urls as other ones would've been taken by above.
  // if this middleware was not there then error would've been - Cannot Get/
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // if any request has sent an error then this middleware will be used to structure/handle the error o/p properly
  // the next(error) from above method will also come here
  // Also for DB ops, they throw an error so will be catched here
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // sometimes with error also statusCode is sent as 200, so handled that case
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
