import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export class DisCommand extends SlashCommandBuilder {
  public executable?: (interaction: ChatInputCommandInteraction) => void;

  constructor() {
    super();
  }

  public setExecutable(executable: typeof this.executable) {
    this.executable = executable;

    return this;
  }
}
