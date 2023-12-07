const express = require("express");
const env = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routers/index");
const {
  badRequestHandler,
  internalServerErrorHandler,
  methodNotAllowedHandler,
  notFoundHandler,
} = require("./middleware/error.middleware");

const app = express();
// Add this before your routes

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/db")();
app.use("/api/v1", router);

//Error Handler Middleware
// app.use(badRequestHandler);
// app.use(internalServerErrorHandler);
// app.use(methodNotAllowedHandler);
// app.use(notFoundHandler);

app.listen(process.env.PORT, function () {
  console.log("Server listening on", process.env.PORT);
});
