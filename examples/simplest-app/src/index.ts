import { DisClient, GatewayIntentBits } from "disapp";

const client = new DisClient({
  intents: [GatewayIntentBits.Guilds],
  paths: {
    commands: "src/commands/*.ts",
    events: "src/events/*.ts",
  },
});

await client.login(process.env.DISCORD_BOT_TOKEN);
