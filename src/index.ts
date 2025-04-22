import { config } from 'dotenv';
config();

import { Client, GatewayIntentBits } from 'discord.js';
import { registerCommands } from './commands';
import { onReady } from './events/ready';
import { onInteractionCreate } from './events/interactionCreate';
import { logger } from './utils/logger';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    onReady();
});

client.on('interactionCreate', (interaction) => {
    onInteractionCreate(interaction);
});

registerCommands(client);

const TOKEN = process.env.DISCORD_TOKEN;
client.login(TOKEN).catch(err => logger.error('Failed to login:', err));