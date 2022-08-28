const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

require('dotenv').config()
const token = process.env.DISCORD_TOKEN
const botToken = process.env.FND_MOE_BOT_KEY
const apiToken = process.env.FND_MOE_API_KEY

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'register-fnd-piece') {
        const tokenAddress = interaction.options.getString('token-address');
        const tokenId = interaction.options.getString('token-id');
        const url = "https://fndmoe.xyz/api/feeds/add/"

        try {
            const response = await axios({
                method: 'post',
                url: url,
                headers: {
                    'Authorization': botToken,
                    'Content-Type': 'application/json',
                },
                data: {
                    api_key: apiToken,
                    token_address: tokenAddress,
                    token_id: tokenId,
                }
            });
            const message = response.data.message
            
            if (message === 'already exist') {
                await interaction.reply('NFT piece is already registered');
            } else if (message === 'success') {
                await interaction.reply('Piece succesfully registered!');
            } else if (message === 'invalid arguments') {
                await interaction.reply('Anime tag not found in FND');
            } else {
                await interaction.reply('Unknown issue happened, please contact admin');
            }
        } catch (error) {
            await interaction.reply('Unknown issue happened, please contact admin');
        }

	} else if (commandName === 'register-fnd-bot') {
        const walletAddress = interaction.options.getString('address');
        const url = "https://www.fndtool.xyz/api/address/add/"

        try {
            const response = await axios({
                method: 'post',
                url: url,
                headers: {
                    'Authorization': botToken,
                    'Content-Type': 'application/json',
                },
                data: {
                    address: walletAddress,
                }
            });
            const message = response.data.message
            
            if (message === 'already exists') {
                await interaction.reply('Address already registered');
            } else if (message === 'ok') {
                await interaction.reply('Address succesfully registered!');
            } else {
                await interaction.reply('Unknown issue happened, please contact admin');
            }
        } catch (error) {
            await interaction.reply('Wrong address format');
        }
	}
});

// Login to Discord with your client's token
client.login(token);
