const notFoundHandler = (req, res, next) => {
  const error = new Error("Not Found!");
  res.status(404).json({
    status: 404,
    message: "Not Found",
    error: error.message,
  });
};

const methodNotAllowedHandler = (req, res, next) => {
  const error = new Error("Method Not Allowed!");
  res.status(405).json({
    status: 405,
    message: "Method Not Allowed",
    error: error.message,
  });
};

const badRequestHandler = (req, res, next) => {
  const error = new Error("Bad Request");
  res.status(400).json({
    status: 400,
    message: "Bad Request",
    error: error.message,
  });
};

const internalServerErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    error: err.message || "Internal Server Error",
  });
};

module.exports = {
  notFoundHandler,
  methodNotAllowedHandler,
  badRequestHandler,
  internalServerErrorHandler,
};
