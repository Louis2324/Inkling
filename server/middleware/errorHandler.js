export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(statusCode)
    .json({ message: err.message || "Something went wrong" });
};
