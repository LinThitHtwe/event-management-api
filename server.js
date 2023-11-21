const express = require("express");
const env = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require("./routers/index");

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/db")();
app.use("/api/v1", router);

app.listen(process.env.PORT, function () {
  console.log("Server listening on", process.env.PORT);
});
