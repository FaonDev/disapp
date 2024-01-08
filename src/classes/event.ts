import type { ClientEvents } from "discord.js";

export class DisEvent<K extends keyof ClientEvents = keyof ClientEvents> {
  constructor(
    public name: K,
    public executable: (...params: ClientEvents[K]) => void,
  ) {}
}
