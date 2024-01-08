import type { DisCommand } from "./command";
import type { DisEvent } from "./event";
import { Client, type ClientOptions } from "discord.js";
import { vinta } from "vinta";

export type DisClientOptions = ClientOptions & {
  paths: {
    commands?: string;
    events?: string;
  };
};

export class DisClient extends Client {
  constructor({ paths: { commands, events }, ...props }: DisClientOptions) {
    super(props);

    if (commands) this.setupCommands(commands);
    if (events) this.setupEvents(events);
  }

  private async setupCommands(path: string) {
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

  private async setupEvents(path: string) {
    const { modules: events } = await vinta<DisEvent>(path, {
      onlyDefault: true,
    });

    for (const event of events) this.on(event.name, event.executable);
  }
}
