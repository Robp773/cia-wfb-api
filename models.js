const mongoose = require("mongoose");

const countriesSchema = mongoose.Schema({
  name: "string",
  introduction: Object,
  geography: Object,
  people: Object,
  government: Object,
  economy: Object,
  energy: Object,
  communications: Object,
  transportation: Object,
  military_and_security: Object,
  transnational_iusses: Object
});

const summariesSchema = mongoose.Schema({
  test: Object
});

const Country = mongoose.model("Country", countriesSchema);
const Summary = mongoose.model("Summary", summariesSchema);

module.exports = {
  Country,
  Summary
};
