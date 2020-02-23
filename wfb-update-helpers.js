const axios = require("axios");
const { Country } = require("./models");

exports.updateCountries = () => {
  axios
    .get(
      "https://raw.githubusercontent.com/iancoleman/cia_world_factbook_api/master/data/factbook.json"
    )
    .then(res => {
      logDataStats(res.data.countries);
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

// console logs some basic stats about the WFB data
function logDataStats(countries) {
  let total = { countryCount: 0 };
  for (let country in countries) {
    total.countryCount++;
    for (let key in countries[country].data) {
      if (keyExists(key)) {
        total[key] ? total[key]++ : (total[key] = 1);
      }
    }
  }
  console.log("*************************************");
  for (let totalKey in total) {
    if (totalKey === "countryCount") {
      console.log(`${totalKey}: ${total[totalKey]}`);
    } else {
      console.log(
        `${totalKey}: ${((total[totalKey] / 259) * 100).toFixed(2) + "%"}`
      );
    }
  }
  console.log("*************************************");
}

const mainKeys = [
  "name",
  "introduction",
  "geography",
  "people",
  "government",
  "economy",
  "energy",
  "communications",
  "transportation",
  "military_and_security",
  "transnational_issues"
];

function keyExists(key) {
  return mainKeys.includes(key);
}
