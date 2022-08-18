const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
const { clientId, guildId } = process.env;

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandsFolders = fs.readdirSync('./src/commands');
        for (const folder of commandsFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith('.js'));

            const {commands, commandArray} = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`${command.data.name} has been loaded.`);
            }
        }

        const rest = new REST({version: '10'}).setToken(process.env.token);
        try {
            console.log('Stated refresing commands')

            await rest.put(Routes.applicationGuildCommands(clientId, guildId),
                {body: client.commandArray},
            );

            console.log('Commands refreshed')
        }catch (error) {
            console.log(error);
        }


    }
}