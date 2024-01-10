import { DisEvent } from "disapp";

export default new DisEvent("ready", (client) => {
  console.log(`Logged as ${client.user.username}`);
});
