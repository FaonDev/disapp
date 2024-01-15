# DisApp

## An intuitive Discord framework

```sh-session
bun add disapp
npm add disapp
pnpm add disapp
yarn add disapp
```

### Quick Start

```js
// src/index.js
import { DisClient, GatewayIntentBits } from "disapp";

const client = new DisClient({
  intents: [GatewayIntentBits.Guilds],
});

await client.setupCommands("src/commands/*.js");
await client.setupEvents("src/events/*.js");

await client.login("DISCORD_APP_TOKEN");
```

### Example command

```ts
// src/commands/ping.js
import { DisCommand } from "disapp";

export default new DisCommand()
  .setName("ping")
  .setDescription("See the application's ping")
  .setExecutable(async (interaction) => {
    await interaction.reply(`${interaction.client.ws.ping}`);
  });
```

### Example event

```ts
// src/events/ready.js
import { DisEvent } from "disapp";

export default new DisEvent("ready", (client) => {
  console.log(`Logged as ${client.user.username}`);
});
```

### License

Refer to the [LICENSE](LICENSE).
