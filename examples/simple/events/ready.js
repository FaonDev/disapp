const { DisEvent } = require("../../../dist/index.js");

module.exports = new DisEvent("ready", (client) => {
  console.log(`Logged as ${client.user.username}`);
});
