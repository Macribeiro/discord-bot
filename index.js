import { startBot } from "./commands/sabadaco.js";
import { Client, GatewayIntentBits, PermissionsBitField } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

export function initializeBot() {
  startBot(client);
  client.login(process.env.TOKEN);
}

initializeBot();
