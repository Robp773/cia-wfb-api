const app = require("express")();
const server = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const { DATABASE_URL, PORT, CLIENT_ORIGIN } = require("./config");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
app.use(bodyParser.json());
mongoose.promise = global.promise;

server
  .listen(PORT, () => {
    console.log(`Your app is listening on port ${PORT}`);
  })
  .on("error", err => {
    mongoose.disconnect();
  });

mongoose.connect(
  DATABASE_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.log(err);
      mongoose.disconnect();
    }
  }
);
