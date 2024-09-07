const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");
const config = require("config");

mongoose
  .connect(`${config.get("MONGODB_URI")}`)
  .then(function () {
    dbgr("Connected to MongoDB");
    console.log("DEBUG output is set properly.");

  })
  .catch(function (err) {
    dbgr("Connection error:", err);
  });


  console.log("DEBUG environment variable:", process.env.DEBUG);


module.exports = mongoose.connection;
