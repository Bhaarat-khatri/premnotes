const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
mongoose.connect( process.env.MONGO_KEY , {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log("u are connected with mongoose");
  } else {
    console.log("u r failed " + err);
  }
});



