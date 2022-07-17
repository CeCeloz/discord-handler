const { Client, Collection } = require('discord.js');
const fs = require('fs')

const client = new Client({
    intents: 32767
});
client.setMaxListeners(0);

client.slashCommands = new Collection() ;

module.exports = client;
client.config = require("./config.json");

["events", "slashCommands"].forEach(handler => {
    require(`./structures/${handler}`)(client);
});

process.on('unhandledRejection', err => {
    console.log(`[ERROR] Unhandled promise rejection: ${err.message}.`);
    console.log(err);
});

client.login(client.config.token);