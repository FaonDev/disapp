import { DisClient, GatewayIntentBits } from "disapp";

const client = new DisClient({
  intents: [GatewayIntentBits.Guilds],
});

await client.setupCommands("src/commands/*.js");
await client.setupEvents("src/events/*.js");

await client.login(process.env.DISCORD_APP_TOKEN);
