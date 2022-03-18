const {Client, Collection} = require("discord.js")

// 32767 is all discord intents
const client = new Client({intents: 32767})
module.exports = client

//Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Loading
require("./handler")(client);

client.login(client.config.token);