const { DisCommand } = require("../../../dist/index.js");

module.exports = new DisCommand()
  .setName("ping")
  .setDescription("See the application's ping")
  .setExecutable(async (interaction) => {
    await interaction.reply(`${interaction.client.ws.ping}`);
  });
