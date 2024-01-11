import type { DisCommand } from "./command";
import type { DisEvent } from "./event";
import { Client, type ClientOptions } from "discord.js";
import { vinta } from "vinta";

export type DisClientOptions = ClientOptions & {
  paths?: {
    commands?: string | string[];
    events?: string | string[];
  };
};

export class DisClient extends Client {
  constructor({ paths, ...props }: DisClientOptions) {
    super(props);

    if (paths?.commands) this.setupCommands(paths.commands);
    if (paths?.events) this.setupEvents(paths.events);
  }

  private async setupCommands(path: string | string[]) {
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
  }

  private async setupEvents(path: string | string[]) {
    const { modules: events } = await vinta<DisEvent>(path, {
      onlyDefault: true,
    });

    for (const event of events) this.on(event.name, event.executable);
  }
}
