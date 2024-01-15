import type { DisCommand } from "./command";
import type { DisEvent } from "./event";
import { Client } from "discord.js";
import { vinta } from "vinta";

type VintaPath = Parameters<typeof vinta>[0];

export class DisClient extends Client {
  public async setupCommands(path: VintaPath) {
    const { modules: commands } = await vinta<DisCommand>(path, {
      onlyDefault: true,
    });

    this.once("ready", async () => {
      await this.application?.commands.set(commands);
    });

    this.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = commands.find(
        ({ name }) => name === interaction.commandName,
      );

      if (command?.executable) command.executable(interaction);
      else
        await interaction.reply("You just tried to execute a invalid command");
    });

    return this;
  }

  public async setupEvents(path: VintaPath) {
    const { modules: events } = await vinta<DisEvent>(path, {
      onlyDefault: true,
    });

    for (const event of events) this.on(event.name, event.executable);

    return this;
  }
}
