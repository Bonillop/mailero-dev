// Figure out what set of credentials return

// This is env variable is provided by heroku
if(process.env.NODE_ENV === "production") {
  // We are in production
  module.exports = require("./prod");
} else {
  // We are in development
  module.exports = require("./dev");
}