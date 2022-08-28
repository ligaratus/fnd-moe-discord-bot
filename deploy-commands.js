const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

require('dotenv').config()

const token = process.env.DISCORD_TOKEN
const clientId = process.env.APPLICATION_ID
const guildId = process.env.GUILD_ID
// const { token, clientId, guildId } = require('./constants');

console.log(token, clientId, guildId, "<<")

// const token = process.env.DISCORD_TOKEN
// const clientId = process.env.APPLICATION_ID
// const guildId = process.env.GUILD_ID

const commands = [
	new SlashCommandBuilder()
        .setName('register-fnd-piece')
        .setDescription('Register a FND piece to fnd.moe')
        .addStringOption(option =>
            option.setName('token-address')
                .setDescription('The NFT contract address')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('token-id')
                .setDescription('The NFT token ID')
                .setRequired(true)),
	new SlashCommandBuilder()
        .setName('register-fnd-bot')
        .setDescription('Register your account to #fnd-bot')
        .addStringOption(option =>
            option.setName('address')
                .setDescription('The FND account wallet address')
                .setRequired(true)),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
