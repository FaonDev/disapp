const { DisClient, GatewayIntentBits } = require("../../dist/index.js");

const client = new DisClient({
  intents: [GatewayIntentBits.Guilds],
  paths: {
    commands: "examples/simple/commands/*.js",
    events: "examples/simple/events/*.js",
  },
});

client.login(process.env.EXAMPLE_DISCORD_BOT_TOKEN);
