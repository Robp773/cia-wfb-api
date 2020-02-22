const axios = require("axios");
const { Country } = require("./models");

exports.updateCountries = () => {
  axios
    .get(
      "https://raw.githubusercontent.com/iancoleman/cia_world_factbook_api/master/data/factbook.json"
    )
    .then(res => {
      for (let country in res.data.countries) {
        Country.findOneAndUpdate(
          { name: res.data.countries[country].data.name },
          res.data.countries[country].data,
          {
            useFindAndModify: false,
            upsert: true
          }
        )
          .then(() => {
            console.log(`Saved ${res.data.countries[country].data.name} data`);
          })
          .catch(err => {
            console.log(`Error saving ${country} data`, err);
            return;
          });
      }
    });
};
