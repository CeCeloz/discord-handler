const { ApplicationCommandOptionType} = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'ping',
    options: [
        {
            name: 'message',
            description: 'send message',
            type: ApplicationCommandOptionType.String,
            require: true
        }
    ],
    run: async(client, interaction) => {
        interaction.reply({content: "pong"});
    }
}